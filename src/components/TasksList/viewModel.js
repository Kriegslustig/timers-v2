import * as mobx from 'mobx'
import PT from 'prop-types'

import keyMap from '../../utils/keyMap'

const mkViewModel = ({ props, ctx }) => {
  const vm = mobx.observable({
    tasks: mobx.computed(() => props.tasks),

    taskRefs: mobx.observable.map(),

    // TODO: task refs are never deregistered. where's the hygene!
    setTaskRef: (task) => mobx.action((ref) => {
      vm.taskRefs.set(task.id, ref)
    }),

    handleTaskFocus: (task) => mobx.action(() => {
      vm._selectedIndex = vm.tasks.indexOf(task)
    }),

    handleTaskStart: (startedTask) => mobx.action(() => {
      ctx.models.tasks.runningTasks
        .filter((task) => task !== startedTask)
        .forEach((task) => { task.stop() })
    }),

    _selectedIndex: null,
    _setSelected: mobx.action((newIndex) => {
      const ref = vm.taskRefs.get(vm.tasks[newIndex].id)
      if (!ref) return
      ref.viewModel.focus()
      vm._selectedIndex = newIndex
    }),

    handleKeyDown: keyMap({
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
            : newIndex < 0
              ? vm.tasks.length - 1
              : newIndex
        )
      }
    })
  })

  return vm
}

mkViewModel.contextTypes = {
  models: PT.object
}

export default mkViewModel
