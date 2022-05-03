import _ from 'lodash/fp'
import { typeToValidFields } from './constants'
import { Schema, SchemaType } from './types'

export const returnUndefined = _.noop

export const getAllSchemaKeys = _.keys

export const getSchemaField = _.get

export const getSchemaFields = _.pick

export const getSchemaType = getSchemaField('type')

export const getSchemaTitle = getSchemaField('title')

export const getSchemaProperty = (key: string) =>
  getSchemaField(['properties', key])

export const getSchemaProperties = getSchemaField('properties')

export const getSchemaItems = getSchemaField('items')

export const setSchemaField = _.set

export const setSchemaType = setSchemaField('type')

export const setSchemaTitle = setSchemaField('title')

export const setSchemaProperties = setSchemaField('properties')

export const setSchemaProperty = (key: string) =>
  setSchemaField(['properties', key])

export const setSchemaItems = setSchemaField('items')

export const deleteSchemaField = _.unset

export const deleteSchemaProperty = (key: string) =>
  deleteSchemaField(['properties', key])

export const addSchemaProperty = (schema: Schema) =>
  setSchemaProperty(`__${_.now()}__`)({}, schema)

export const renameSchemaField = (oldKey: string, newKey: string) =>
  _.flow([
    _.entries,
    _.map(([k, v]) => ({ [k === oldKey ? newKey : k]: v })),
    _.reduce(_.assign, {}),
  ])

export const renameSchemaProperty = (
  oldKey: string,
  newKey: string,
  schema: Schema
) =>
  _.flow([
    getSchemaProperties,
    renameSchemaField(oldKey, newKey),
    p => setSchemaProperties(p, schema),
  ])(schema)

export const isSchemaObject = (schema: Schema) =>
  getSchemaType(schema) === 'object'

export const isSchemaArray = (schema: Schema) =>
  getSchemaType(schema) === 'array'

export const findOption = (value: string) => _.find(['value', value])

export const getValidFields = (type: SchemaType) =>
  _.get(type, typeToValidFields)

export const removeWrongFields = (schema: Schema) => {
  const type = getSchemaType(schema)
  const fields = getValidFields(type)
  return getSchemaFields(fields, schema)
}

export const hasSchemaProperties = (schema: Schema) =>
  !_.isEmpty(getSchemaProperties(schema))

export const hasSchemaItems = (schema: Schema) =>
  !_.isEmpty(getSchemaItems(schema))

export const setSchemaTypeAndRemoveWrongFields = _.flow([
  setSchemaType,
  removeWrongFields,
])
