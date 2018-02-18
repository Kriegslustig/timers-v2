import * as mobx from 'mobx'
import PT from 'prop-types'

import keyMap from '../../utils/keyMap'

const mkViewModel = ({ ctx }) => {
  const vm = mobx.observable({
    value: '',

    handleChange: mobx.action(e => {
      vm.value = e.currentTarget.value
    }),

    _createTask: mobx.action(() => {
      if (vm.value.length === 0) return

      const newTask = ctx.models.tasks.create({ name: vm.value })
      ctx.models.tasks.stopOtherTasks([newTask])
      newTask.start()
      vm.value = ''
    }),

    _input: null,

    setInputRef: mobx.action(ref => {
      vm._input = ref
    }),

    _focus: () => {
      if (!vm._input) return
      vm._input.focus()
    },

    handleContainerKeyDown: keyMap({
      i: e => {
        if (e.target !== vm._input) {
          e.preventDefault()
          vm._focus()
        }
      }
    }),

    handleInputKeyDown: keyMap({
      Enter: () => vm._createTask()
    }),

    search: mobx.computed(() => {
      console.log('search')
      const match = /^([^,]*)(,.+)*?$/.exec(vm.value) || []
      const [, string = '', rawTags = ''] = match
      const tags = rawTags.split(',').filter(tag => tag.length)

      return {
        string,
        tags
      }
    }),

    tasks: mobx.computed(() => {
      const tasksArr = ctx.models.tasks.map.values()
      if (vm.search.string.length === 0 && vm.search.tags.length === 0) {
        return tasksArr.sort(
          (taskA, taskB) => (taskA.createdAt < taskB.createdAt ? 1 : -1)
        )
      }

      const searchChars = vm.search.string.split('')
      return tasksArr
        .map(task => {
          const nameArr = task.name.split('')
          return [
            searchChars.reduce(
              (weight, char) => (nameArr.includes(char) ? weight + 1 : weight),
              0
            ),
            task
          ]
        })
        .sort(([weightA], [weightB]) => (weightA < weightB ? 1 : -1))
        .map(([weight, task]) => task)
        .filter(task => {
          if (vm.search.tags.length === 0) {
            return true
          } else {
            return vm.search.tags.every(tagName =>
              task.tags.some(tag => tag === tagName)
            )
          }
        })
    })
  })

  return vm
}

mkViewModel.contextTypes = {
  models: PT.object.isRequired
}

export default mkViewModel
