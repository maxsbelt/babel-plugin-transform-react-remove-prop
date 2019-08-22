import { transform } from '@babel/core'
import plugin from '../src'
import { DEFAULT_ATTRIBUTE } from '../src/helpers'

const testSnapshot = (code, opts) => {
  expect(
    transform(
      code,
      {
        plugins: [
          '@babel/plugin-syntax-jsx',
          [plugin, opts],
        ],
      },
    ).code,
  ).toMatchSnapshot()
}

describe('babel-plugin-transform-react-remove-prop', () => {
  it('removes attribute', () => testSnapshot(
    `React.createElement("div", { "${DEFAULT_ATTRIBUTE}": "Standard" })`,
  ))

  it('removes attribute if called without React', () => testSnapshot(
    `createElement("div", { "${DEFAULT_ATTRIBUTE}": "Standard" })`,
  ))

  it('works correctly if there is no properties', () => testSnapshot(
    'createElement("div", null, "Children")',
  ))

  it('keeps other attributes', () => testSnapshot(
    `React.createElement("div", { "${DEFAULT_ATTRIBUTE}": "Standard", "test-id": "Standard", label: "Standard" })`,
  ))

  it('keeps `createElement` arguments if it was called on custom object', () => testSnapshot(
    `obj.createElement("div", { "${DEFAULT_ATTRIBUTE}": "custom obj" })`,
  ))

  it('works with Object.assign', () => testSnapshot(
    `React.createElement("div", Object.assign({}, { "${DEFAULT_ATTRIBUTE}": "Custom obj", label: "Custom obj" }, { "another-attr": "Custom obj" }))`,
  ))

  it('works with object spread syntax', () => testSnapshot(
    `React.createElement("div", { ...props, "${DEFAULT_ATTRIBUTE}": "Custom obj", label: "Custom obj" })`,
  ))

  describe('preact', () => {
    it('removes attribute', () => testSnapshot(
      `h("div", { "${DEFAULT_ATTRIBUTE}": "Preact", label: "Preact" })`,
    ))
  })

  describe('JSX syntax', () => {
    it('removes attribute', () => testSnapshot(
      `<div ${DEFAULT_ATTRIBUTE}="JSX" test-id="JSX" label="JSX" />`,
    ))

    it('removes test-id attribute from spread', () => testSnapshot(
      `<div {...{ "${DEFAULT_ATTRIBUTE}": "Spread", label: "Spread" }} />`,
    ))
  })

  describe('`attrs` parameter', () => {
    it('removes necessary attributes', () => testSnapshot(
      'h("div", { "custom-id-1": "custom-1", "custom-id-2": "custom-2", "custom-id-3": "custom-3" })',
      {
        attrs: ['custom-id-1', 'custom-id-2'],
      },
    ))
  })

  describe('non react', () => {
    it('does not remove Identifier parameters', () => testSnapshot(
      `func("div", { "${DEFAULT_ATTRIBUTE}": "Keep it" })`,
    ))

    it('does not remove MemberExpression parameters', () => testSnapshot(
      `some.func("div", { "${DEFAULT_ATTRIBUTE}": "Keep it" })`,
    ))
  })
})
