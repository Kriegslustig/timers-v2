import * as mobx from 'mobx'
import uuid from 'uuid/v4'
import { now } from 'mobx-utils'

const mkTask = ({ input, tasks }) => {
  const task = mobx.observable({
    id: input && input.id
      ? input.id
      : uuid(),

    name: input
      ? input.name
      : '',

    _now: mobx.computed(() => now(100)),

    createdAt: input && input.createdAt
      ? input.createdAt
      : Date.now(),

    setName: mobx.action((name) => {
      task.name = name
    }),

    tags: input
      ? input.tags || []
      : [],

    addTag: (tag) => {
      task.tags.push(tag)
    },

    removeTag: (tag) => {
      task.tags.remove(tag)
    },

    _runTimes: mobx.observable.shallowArray(
      input && input._runTimes
        ? input._runTimes
        : []
    ),

    _pushRunTime: mobx.action(() => {
      if (task._startTime !== null) {
        const now = Date.now()
        task._runTimes.push([task._startTime, now])
        task._startTime = now
      }
    }),

    subtractTime: mobx.action((ms) => {
      if (!task.isRunning) task.start()
      task._startTime += ms
    }),

    addTime: mobx.action((ms) => {
      if (!task.isRunning) task.start()
      task._startTime -= ms
    }),

    msRunning: mobx.computed(() => {
      const storedTime = task._runTimes.reduce(
        (msRunning, [from, to]) => msRunning + (to - from),
        0
      )

      return (
        task.isRunning
          ? storedTime + (task._now - task._startTime)
          : storedTime
      )
    }),

    _startTime: input && input._startTime
      ? input._startTime
      : null,

    isRunning: mobx.computed(() =>
      task._startTime !== null
    ),

    start: mobx.action(() => {
      task._startTime = Date.now()
    }),

    stop: mobx.action(() => {
      task._pushRunTime()
      task._startTime = null
    }),

    delete: mobx.action(() => {
      tasks.delete(task.id)
    }),

    serialize: mobx.action(() => {
      task._pushRunTime()
      return {
        tags: task.tags,
        name: task.name,
        createdAt: task.createdAt,
        id: task.id,
        _startTime: task._startTime,
        _runTimes: task._runTimes
      }
    })
  })

  return task
}

export default mkTask
