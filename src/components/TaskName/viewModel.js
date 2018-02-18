import * as mobx from 'mobx'

const mkViewModel = ({
  props,
  afterUpdate
}) => {
  const vm = mobx.observable({
    name: mobx.computed(() => props.task.name),
    value: '',

    showLabel: mobx.computed(() => !vm._editing),

    setInputRef: mobx.action((ref) => {
      vm._input = ref
    }),

    _focus: () => {
      if (!vm._input) return
      vm._input.focus()
    },

    edit: mobx.action(() => {
      vm._startEdit()
      afterUpdate(vm._focus)
    }),

    _editing: false,
    _startEdit: mobx.action(() => {
      vm._editing = true
      vm.value = vm.name
    }),

    _stopEdit: mobx.action(() => {
      vm._editing = false
      vm.value = ''
      props.onChange()
    }),

    handleFocus: mobx.action(() => {
      vm._startEdit()
    }),

    handleNameKeyDown: (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()
        vm._startEdit()
      }
    },

    handleInputBlur: mobx.action(() => {
      vm._stopEdit()
    }),

    handleInputKeyDown: mobx.action((e) => {
      if (e.key.length === 0) {
        e.stopPropagation()
      } else if (e.key === 'Escape') {
        vm._stopEdit()
      } else if (e.key === 'Enter') {
        props.task.setName(vm.value)
        vm._stopEdit()
      }
    }),

    handleChange: mobx.action((e) => {
      vm.value = e.currentTarget.value
    })
  })

  return vm
}

export default mkViewModel
