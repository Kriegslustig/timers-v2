import * as mobx from 'mobx'
import mkTask from './task'

const mkTasks = ({ input, tags }) => {
  const tasks = mobx.observable({
    map: mobx.observable.map(),

    runningTasks: mobx.computed(() =>
      tasks.map.values().filter(task => task.isRunning)
    ),

    create: mobx.action(taskInput => {
      const task = mkTask({ input: taskInput, tasks, tags })
      tasks.map.set(task.id, task)
      return task
    }),

    delete: mobx.action(id => {
      tasks.map.delete(id)
    }),

    serialize: () => ({
      list: tasks.map.values().map(task => task.serialize())
    }),

    stopOtherTasks: excludeTasks => {
      tasks.runningTasks
        .filter(task => !excludeTasks.includes(task))
        .forEach(task => {
          task.stop()
        })
    }
  })

  mobx.runInAction(() => {
    if (!input) return

    tasks.map.replace(
      input.list.map(taskInput => {
        const task = mkTask({ input: taskInput, tasks, tags })
        return [task.id, task]
      })
    )
  })

  return tasks
}

export default mkTasks
