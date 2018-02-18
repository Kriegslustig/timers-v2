const keyMap = (
  actionsMap,
  stopPropagation = true,
  preventDefault = false,
  target
) =>
  (e) => {
    if (target && target !== e.target) return
    const action = actionsMap[e.key]
    if (!action) return
    if (stopPropagation) e.stopPropagation()
    if (preventDefault) e.preventDefault()
    action(e)
  }

export default keyMap
