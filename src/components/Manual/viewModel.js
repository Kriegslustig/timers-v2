import * as mobx from 'mobx'

import keyMap from '../../utils/keyMap'

const mkViewModel = () => {
  const vm = mobx.observable({
    show: false,

    handleKeyDown: mobx.computed(() => keyMap({
      '?': vm.toggle
    }, true, true)),

    ref: null,
    setRef: mobx.action((ref) => {
      vm.ref = ref
    }),

    toggle: mobx.action(() => {
      vm.show = !vm.show
      if (vm.show && vm.ref) {
        vm.ref.focus()
      }
    }),

    sections: mobx.observable.ref([
      [
        'List',
        [
          ['i', 'Enter search field'],
          ['j', 'Down'],
          ['k', 'Up'],
          ['m', 'Toggle show day/all time'],
          ['m', 'Toggle show day/all time']
        ]
      ],
      [
        'Search',
        [
          ['Enter', 'Create entered task'],
          [',', 'Search for tag']
        ]
      ],
      [
        'List Item',
        [
          ['Backspace', 'Delete Task'],
          ['a', 'Add one minute'],
          ['A', 'Add 10 minutes'],
          ['s', 'Subtract one minute'],
          ['S', 'Subtract 10 minutes'],
          ['c', 'Edit Name'],
          ['t', 'Focus Tags']
        ]
      ],
      [
        'Tags',
        [
          ['Enter', 'Add Tag'],
          ['Backspace', 'Delete Tag']
        ]
      ]
    ])
  })

  return vm
}

export default mkViewModel
