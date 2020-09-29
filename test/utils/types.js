import test from 'ava'
import {
  isBoolean,
  isNumber,
  isFunction,
  isArray,
  isObject,
  isThreejsColor,
  isValidDomParent
} from '../../app/utils/types'
import { createElement } from '../../app/utils/dom'

const booleanTrue = true
const booleanFalse = false
const zeroNumber = 0
const positiveNumber = 1
const negativeNumber = -1
const decimalNumber = 0.57
const someArray = ['a', 1, true]
const someObject = { a: 0, b: 'toto' }
const string = 'string'
const threeColor = { setHex: () => {}, getHex: () => {}, isColor: true }
const someDomNode = createElement('div')
const aFunction = () => {}

test('isBoolean', t => {
  t.true(isBoolean(booleanTrue))
  t.true(isBoolean(booleanFalse))

  t.false(isBoolean(zeroNumber))
  t.false(isBoolean(positiveNumber))
  t.false(isBoolean(negativeNumber))
  t.false(isBoolean(decimalNumber))
  t.false(isBoolean(string))
  t.false(isBoolean(aFunction))
  t.false(isBoolean(someArray))
  t.false(isBoolean(someObject))
  t.false(isBoolean(threeColor))
  t.false(isBoolean(undefined))
  t.false(isBoolean(null))
  t.false(isBoolean(NaN))
})

test('isFunction', t => {
  t.true(isFunction(aFunction))

  t.false(isFunction(zeroNumber))
  t.false(isFunction(positiveNumber))
  t.false(isFunction(negativeNumber))
  t.false(isFunction(decimalNumber))
  t.false(isFunction(booleanTrue))
  t.false(isFunction(booleanFalse))
  t.false(isFunction(string))
  t.false(isFunction(someArray))
  t.false(isFunction(someObject))
  t.false(isFunction(threeColor))
  t.false(isFunction(undefined))
  t.false(isFunction(null))
  t.false(isFunction(NaN))
})

test('isNumber', t => {
  t.true(isNumber(zeroNumber))
  t.true(isNumber(positiveNumber))
  t.true(isNumber(negativeNumber))
  t.true(isNumber(decimalNumber))

  t.false(isNumber(booleanTrue))
  t.false(isNumber(booleanFalse))
  t.false(isNumber(string))
  t.false(isNumber(aFunction))
  t.false(isNumber(someArray))
  t.false(isNumber(someObject))
  t.false(isNumber(threeColor))
  t.false(isNumber(undefined))
  t.false(isNumber(null))
  t.false(isNumber(NaN))
})

test('isArray', t => {
  t.true(isArray(someArray))

  t.false(isArray(zeroNumber))
  t.false(isArray(positiveNumber))
  t.false(isArray(negativeNumber))
  t.false(isArray(decimalNumber))
  t.false(isArray(booleanTrue))
  t.false(isArray(booleanFalse))
  t.false(isArray(string))
  t.false(isArray(aFunction))
  t.false(isArray(someObject))
  t.false(isArray(threeColor))
  t.false(isArray(undefined))
  t.false(isArray(null))
  t.false(isArray(NaN))
})

test('isObject', t => {
  t.true(isObject(someObject))
  t.true(isObject(threeColor))

  t.false(isObject(zeroNumber))
  t.false(isObject(positiveNumber))
  t.false(isObject(negativeNumber))
  t.false(isObject(decimalNumber))
  t.false(isObject(booleanTrue))
  t.false(isObject(booleanFalse))
  t.false(isObject(string))
  t.false(isObject(aFunction))
  t.false(isObject(someArray))
  t.false(isObject(undefined))
  t.false(isObject(null))
  t.false(isObject(NaN))
})

test('isThreejsColor', t => {
  t.true(isThreejsColor(threeColor))

  t.false(isThreejsColor(zeroNumber))
  t.false(isThreejsColor(positiveNumber))
  t.false(isThreejsColor(negativeNumber))
  t.false(isThreejsColor(decimalNumber))
  t.false(isThreejsColor(booleanTrue))
  t.false(isThreejsColor(booleanFalse))
  t.false(isThreejsColor(string))
  t.false(isThreejsColor(aFunction))
  t.false(isThreejsColor(someArray))
  t.false(isThreejsColor(someObject))
  t.false(isThreejsColor(undefined))
  t.false(isThreejsColor(null))
  t.false(isThreejsColor(NaN))
})

test('isValidDomParent', t => {
  t.true(isValidDomParent(someDomNode))
  t.true(isValidDomParent(someDomNode))

  t.false(isValidDomParent(threeColor))
  t.false(isValidDomParent(zeroNumber))
  t.false(isValidDomParent(positiveNumber))
  t.false(isValidDomParent(negativeNumber))
  t.false(isValidDomParent(decimalNumber))
  t.false(isValidDomParent(booleanTrue))
  t.false(isValidDomParent(booleanFalse))
  t.false(isValidDomParent(string))
  t.false(isValidDomParent(aFunction))
  t.false(isValidDomParent(someArray))
  t.false(isValidDomParent(someObject))
  t.false(isValidDomParent(undefined))
  t.false(isValidDomParent(null))
  t.false(isValidDomParent(NaN))
})
