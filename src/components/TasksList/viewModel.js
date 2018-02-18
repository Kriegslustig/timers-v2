import * as mobx from 'mobx'
import PT from 'prop-types'

import keyMap from '../../utils/keyMap'

const mkViewModel = ({ props, ctx }) => {
  const vm = mobx.observable({
    tasks: mobx.computed(() => props.tasks),

    taskRefs: mobx.observable.map(),

    showToday: true,

    _toggleShowToday: mobx.action(() => {
      vm.showToday = !vm.showToday
    }),

    // TODO: task refs are never deregistered. where's the hygene!
    setTaskRef: task =>
      mobx.action(ref => {
        vm.taskRefs.set(task.id, ref)
      }),

    handleTaskFocus: (task) =>
      mobx.action(() => {
        vm._selectedId = task.id
      }),

    handleTaskStart: (startedTask) =>
      mobx.action(() => {
        ctx.models.tasks.stopOtherTasks([startedTask])
      }),

    _selectedId: null,
    _selectedIndex: mobx.computed(() =>
      vm.tasks.findIndex((task) => task.id === vm._selectedId)
    ),
    _setSelected: mobx.action(newIndex => {
      vm._selectedId = vm.tasks[newIndex].id
    }),

    _focusMightBeOutside: false,
    handleFocus: mobx.action((e) => {
      vm._focusMightBeOutside = false
    }),
    handleBlur: mobx.action((e) => {
      vm._focusMightBeOutside = null
      if (vm._blurTimeout) clearTimeout(vm._blurTimeout)
      vm._blurTimeout = setTimeout(vm._checkIfFocusOutside)
    }),

    _checkIfFocusOutside: mobx.action(() => {
      vm._blurTimeout = null
      if (vm._focusMightBeOutside) {
        vm._selectedId = null
      }
    }),

    showLineChart: false,
    _toggleLineChart: mobx.action(() => {
      vm.showLineChart = !vm.showLineChart
    }),

    handleKeyDown: mobx.computed(() =>
      keyMap({
        j: () => {
          const newIndex = vm._selectedIndex + 1
          vm._setSelected(
            vm._selectedIndex === null || newIndex > vm.tasks.length - 1
              ? 0
              : newIndex
          )
        },

        k: () => {
          const newIndex = vm._selectedIndex - 1
          vm._setSelected(
            vm._selectedIndex === null
              ? newIndex
              : newIndex < 0 ? vm.tasks.length - 1 : newIndex
          )
        },

        m: vm._toggleShowToday,
        v: vm._toggleLineChart
      })
    ),

    componentWillUnmount: () => {
      disposeFocusReaction()
      if (vm._blurTimeout) {
        clearTimeout(vm._blurTimeout)
      }
    }
  })

  const disposeFocusReaction = mobx.reaction(
    () => vm._selectedIndex,
    (index) => {
      const taskRef = vm.taskRefs.get(vm._selectedId)
      if (taskRef) {
        taskRef.viewModel.focus()
      }
    },
    { delay: 1 }
  )

  return vm
}

mkViewModel.contextTypes = {
  models: PT.object
}

export default mkViewModel
