import * as mobx from 'mobx'

const mkViewModel = ({ props }) => {
  const vm = mobx.observable({
    showTagInput: false,

    task: mobx.computed(() => props.task),
    tags: mobx.computed(() => props.task.tags),

    handleKeyDown: mobx.action((e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()
        vm.showTagInput = true
      }
    }),

    handleTagInputBlur: mobx.action(() => {
      vm.showTagInput = false
    }),

    focus: () => {
      if (vm.tags.length > 0) {
        const ref = vm._tagRefs.get(vm.tags[0].id)
        if (ref) {
          return ref.viewModel.focus()
        }
      }
      vm._list.focus()
    },

    _list: null,
    setListRef: mobx.action((ref) => {
      vm._list = ref
    }),

    _tagRefs: mobx.observable.map(),
    setTagRef: (tag) => mobx.action((ref) => {
      vm._tagRefs.set(tag.id, ref)
    }),

    tabIndex: mobx.computed(() =>
      vm.tags.length === 0
        ? 0
        : -1
    )
  })

  return vm
}

export default mkViewModel
