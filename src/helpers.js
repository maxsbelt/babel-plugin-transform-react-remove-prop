const IDENTIFIERS = ['createElement', 'h']
export const DEFAULT_ATTRIBUTE = 'data-test-id'

export const isReactCallExpression = (t, callee) => {
  if (
    t.isMemberExpression(callee) && (
      !callee.object || callee.object.name !== 'React'
      || !callee.property || callee.property.name !== 'createElement'
    )
  ) return false
  if (t.isIdentifier(callee) && !IDENTIFIERS.includes(callee.name)) return false
  return true
}

export const isAssignExpression = (t, arg) => t.isCallExpression(arg)
  && arg.callee
  && arg.callee.property
  && arg.callee.property.name === 'assign'

const createFindIndex = (t, state) => {
  const attrs = state.opts && Array.isArray(state.opts.attrs)
    ? state.opts.attrs
    : [DEFAULT_ATTRIBUTE]
  return (item) => {
    if (t.isJSXAttribute(item)) return item.name && attrs.includes(item.name.name)
    return item.key && attrs.includes(item.key.value)
  }
}

const getArray = (t, arg) => {
  if (t.isObjectExpression(arg)) return arg.properties
  if (t.isJSXOpeningElement(arg)) return arg.attributes
  if (t.isJSXSpreadAttribute(arg) && arg.argument && Array.isArray(arg.argument.properties)) {
    return arg.argument.properties
  }
  return []
}

export const getCreateRemove = (t) => (state) => {
  const findIndex = createFindIndex(t, state)
  return (arg) => {
    const array = getArray(t, arg)
    let index = -1
    do {
      index = array.findIndex(findIndex)
      if (index !== -1) array.splice(index, 1)
    } while (index !== -1)
  }
}
