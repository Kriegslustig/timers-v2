import * as mobx from 'mobx'
import uuid from 'uuid'

const mkTag = ({ input }) => {
  const tag = mobx.observable({
    id: undefined,
    name: undefined,
    _hue: undefined,
    color: mobx.computed(() => `hsl(${tag._hue}, 40%, 80%)`),
    generateHue: mobx.action(() => {
      tag._hue = Math.round(Math.random() * 360)
    }),

    toJS: () => mobx.toJS(tag)
  })

  if (typeof input === 'string') {
    tag.name = input
    tag.id = uuid()
    tag.generateHue()
  } else if (input && typeof input === 'object') {
    tag.name = input.name
    tag._hue = input._hue
    tag.id = input.id
  }

  return tag
}

export default mkTag
