import * as mobx from 'mobx'

import mkTag from './tag'

const mkTags = ({ input }) => {
  const tags = mobx.observable({
    map: mobx.observable.map(
      input
        ? input.map.map((tagInput) => [
          tagInput.id,
          mkTag({ input: tagInput })
        ])
        : []
    ),

    create: mobx.action((tagName) => {
      const existingTag = tags.map
        .values()
        .find((tag) => tag.name === tagName)

      if (existingTag) {
        return existingTag
      } else {
        const tag = mkTag({ input: tagName })
        tags.map.set(tag.id, tag)
        return tag
      }
    }),

    serialize: () => ({
      map: tags.map.values().map(tag => tag.serialize())
    })
  })

  return tags
}

export default mkTags
