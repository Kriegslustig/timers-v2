import * as mobx from 'mobx'

const mkViewModel = ({ props }) => {
  const vm = mobx.observable({
    value: '',

    handleKeyDown: (e) => {
      if (e.key.length === 1) {
        e.stopPropagation()
      } else if (e.key === 'Enter') {
        e.preventDefault()
        vm._handleSubmit()
      }
    },

    handleChange: mobx.action((e) => {
      vm.value = e.currentTarget.value
    }),

    _handleSubmit: mobx.action(() => {
      const newTag = vm.value
      props.task.addTag(newTag)
      vm.value = ''
    }),

    handleBlur: () => {
      props.onBlur()
    }
  })

  return vm
}

export default mkViewModel
