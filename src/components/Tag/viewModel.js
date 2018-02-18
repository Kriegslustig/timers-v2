import * as mobx from 'mobx'

const mkViewModel = ({ props }) => {
  const vm = mobx.observable({
    tag: mobx.computed(() => props.tag),

    ref: null,
    setRef: mobx.action((ref) => {
      vm.ref = ref
    }),

    focus: () => {
      if (vm.ref) vm.ref.focus()
    },

    handleKeyDown: mobx.action((e) => {
      if (e.key === 'Backspace') {
        e.preventDefault()
        e.stopPropagation()
        props.task.removeTag(props.tag)
      }
    })
  })

  return vm
}

export default mkViewModel
