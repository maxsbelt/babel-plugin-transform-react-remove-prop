import * as helpers from './helpers'

export default ({ assertVersion, types }) => {
  assertVersion(7)
  const createRemove = helpers.getCreateRemove(types)
  return {
    name: 'transform-react-remove-prop',
    visitor: {
      JSXOpeningElement(path, state) {
        const remove = createRemove(state)
        path.container.openingElement.attributes.forEach(remove)
        remove(path.container.openingElement)
      },
      CallExpression(path, state) {
        if (!helpers.isReactCallExpression(types, path.node.callee)) return

        const remove = createRemove(state)
        const [, arg] = path.node.arguments
        remove(arg)
        if (helpers.isAssignExpression(types, arg)) arg.arguments.forEach(remove)
      },
    },
  }
}
