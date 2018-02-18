import * as mobx from 'mobx'
import uuid from 'uuid/v4'
import { now } from 'mobx-utils'

import mkTag from './tag'

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
      ? input.tags.map((input) => mkTag({ input })) || []
      : [],

    addTag: (tag) => {
      task.tags.push(mkTag({ input: tag }))
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

    msRunning: mobx.computed(() =>
      task._getMsRunningWithRunTimes(task._runTimes)
    ),

    _getMsRunningWithRunTimes: (runTimes) => {
      const storedTime = runTimes.reduce(
        (msRunning, [start, end]) => msRunning + (end - start),
        0
      )

      return (
        task.isRunning
          ? storedTime + (task._now - task._startTime)
          : storedTime
      )
    },

    getMsRunningInTimeframe: (from, to) =>
      task._getMsRunningWithRunTimes(
        task._runTimes.filter(([start, end]) =>
          start < to && end > from
        )
      ),

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
