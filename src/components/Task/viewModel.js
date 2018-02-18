import * as mobx from 'mobx'
import { now } from 'mobx-utils'
import { DateTime } from 'luxon'

import { formatTime } from '../../utils/time'
import keyMap from '../../utils/keyMap'

const mkViewModel = ({ props }) => {
  const TIMEZONE_OFFSET = (new Date()).getTimezoneOffset()

  const vm = mobx.observable({
    task: mobx.computed(() => props.task),

    showToday: mobx.computed(() => props.showToday !== false),

    timeByMinute: mobx.computed(() => now(60000)),

    timeRunning: mobx.computed(() =>
      formatTime(
        vm.showToday
          ? vm._timeRunningToday
          : props.task.msRunning
      )
    ),

    _timeRunningToday: mobx.computed(() =>
      props.task.getMsRunningInTimeframe(
        DateTime.fromMillis(vm.timeByMinute)
          .startOf('day')
          .plus({ minutes: TIMEZONE_OFFSET })
          .valueOf(),
        DateTime.fromMillis(vm.timeByMinute)
          .endOf('day')
          .plus({ minutes: TIMEZONE_OFFSET })
          .valueOf()
      )
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
      vm.listItem
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

    listItem: null,
    setListItemRef: mobx.action((ref) => {
      vm.listItem = ref
    }),

    focus: () => {
      if (!vm.listItem) return
      vm.listItem.focus()
    },

    handleFocus: mobx.computed(() => props.onFocus),

    isRunning: mobx.computed(() => props.task.isRunning)
  })

  return vm
}

export default mkViewModel
