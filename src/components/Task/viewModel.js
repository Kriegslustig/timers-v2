import * as mobx from 'mobx'

import { formatTime } from '../../utils/time'
import keyMap from '../../utils/keyMap'

const mkViewModel = ({ props }) => {
  const vm = mobx.observable({
    task: mobx.computed(() => props.task),

    timeRunning: mobx.computed(() =>
      formatTime(props.task.msRunning)
    ),

    _toggleTimer: mobx.action(() => {
      if (props.task.isRunning) {
        props.task.stop()
      } else {
        props.task.start()
        props.onStart()
      }
    }),

    _delete: mobx.action(() => {
      props.task.delete()
    }),

    _addMinute: mobx.action(() => {
      props.task.addTime(60 * 1000)
    }),

    _add10Minutes: mobx.action(() => {
      props.task.addTime(60 * 1000 * 10)
    }),

    _subtractMinute: mobx.action((e) => {
      props.task.subtractTime(60 * 1000)
    }),

    _subtract10Minutes: mobx.action(() => {
      props.task.subtractTime(60 * 1000 * 10)
    }),

    _taskName: null,
    setTaskNameRef: mobx.action((ref) => {
      vm._taskName = ref
    }),

    handleKeyDown: mobx.computed(() => keyMap(
      {
        Enter: vm._toggleTimer,
        Backspace: vm._delete,
        a: vm._addMinute,
        A: vm._add10Minutes,
        s: vm._subtractMinute,
        S: vm._subtract10Minutes,
        c: () => {
          if (!vm._taskName) return
          vm._taskName.viewModel.edit()
        },
        t: vm._focusTags
      },
      true,
      true,
      vm._listItem
    )),

    _tags: null,
    setTagsRef: mobx.action((ref) => {
      vm._tags = ref
    }),

    _focusTags: () => {
      if (!vm._tags) return
      vm._tags.viewModel.focus()
    },

    handleChangeName: () => {
      vm.focus()
    },

    _listItem: null,
    setListItemRef: mobx.action((ref) => {
      vm._listItem = ref
    }),

    focus: () => {
      if (!vm._listItem) return
      vm._listItem.focus()
    },

    handleFocus: mobx.computed(() => props.onFocus),

    isRunning: mobx.computed(() => props.task.isRunning)
  })

  return vm
}

export default mkViewModel
