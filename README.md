# babel-plugin-transform-react-remove-prop

> Remove selected attributes in each react element by selected conditions

[![npm version](https://img.shields.io/npm/v/babel-plugin-transform-react-remove-prop.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop) [![build status](https://travis-ci.org/maxsbelt/babel-plugin-transform-react-remove-prop.svg?branch=master)](https://travis-ci.org/maxsbelt/babel-plugin-transform-react-remove-prop)   [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![Coverage Status](https://coveralls.io/repos/github/maxsbelt/babel-plugin-transform-react-remove-prop/badge.svg?branch=master)](https://coveralls.io/github/maxsbelt/babel-plugin-transform-react-remove-prop?branch=master)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Dependencies](https://img.shields.io/david/maxsbelt/babel-plugin-transform-react-remove-prop.svg)](https://david-dm.org/maxsbelt/babel-plugin-transform-react-remove-prop) [![DevDependencies](https://img.shields.io/david/dev/maxsbelt/babel-plugin-transform-react-remove-prop.svg)](https://david-dm.org/maxsbelt/babel-plugin-transform-react-remove-prop?type=dev)

## Install

Using npm:

```sh
npm install --save-dev babel-plugin-transform-react-remove-prop
```

or using yarn:

```sh
yarn add babel-plugin-transform-react-remove-prop --dev
```

## Usage

Add the following line to your .babelrc file.

#### Without options

```json
{
  "plugins": ["babel-plugin-transform-react-remove-prop"]
}
```

#### With options (and their defaults):

```json
{
  "plugins": [
    [
      "babel-plugin-transform-react-remove-prop",
      {
        "attrs": ["data-test-id"]
      }
    ]
  ]
}
```

## Options

#### attrs

array, defaults to ["data-test-id"]

Array of attribute names that should be removed from react elements.


## Supported syntax

#### JS

```js
// React.createElement
React.createElement('div', { 'data-test-id': 'id' })

// Preact / Object.assign syntax
h('div', Object.assign({}, props, { 'data-test-id': 'id' }))

// Object spread
React.createElement('div', { ...props, 'data-test-id': 'id' })
```

#### JSX

```js
// Simple attribute
<div data-test-id='id' />

// Object spread
<div {...{ 'data-test-id': 'id' }} />
```
