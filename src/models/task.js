import * as mobx from 'mobx'
import uuid from 'uuid/v4'
import { now } from 'mobx-utils'

const mkTask = ({ input, tasks, tags }) => {
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

    _tagIds: input
      ? input._tagIds || []
      : [],

    tags: mobx.computed(() =>
      task._tagIds.map(tagId => tags.map.get(tagId))
    ),

    addTag: (tag) => {
      const newTag = tags.create(tag)
      task._tagIds.push(newTag.id)
    },

    removeTag: (tag) => {
      task._tagsIds.remove(tag.id)
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
        _tagIds: task._tagIds.slice(),
        name: task.name,
        createdAt: task.createdAt,
        modifiedAt: task.modifiedAt,
        id: task.id,
        _startTime: task._startTime,
        runTimes: task.runTimes
      }
    })
  })

  // migration
  if (input.tags) {
    input.tags.forEach((tag) => {
      const newTag = tags.create(tag)
      task._tagIds.push(newTag.id)
    })
  }

  return task
}

export default mkTask
