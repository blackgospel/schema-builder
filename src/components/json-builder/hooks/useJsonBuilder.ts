import { useState } from 'react'
import {
  addSchemaProperty,
  renameSchemaProperty,
  setSchemaProperty,
} from 'src/helper/utils/schema'
import { Schema, SchemaTypeOption } from 'src/helper/utils/types'

const defaultSchema = {
  type: 'object',
  properties: {},
}

const JsonSchemaMap = {
  string: {
    type: 'string',
  },
  number: {
    type: 'number',
  },
  boolean: {
    type: 'boolean',
  },
  object: {
    type: 'object',
    properties: {},
  },
  array: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
}

export const schemaTypes: SchemaTypeOption[] = [
  {
    value: 'string',
    label: 'String',
  },
  {
    value: 'number',
    label: 'Number',
  },
  {
    value: 'boolean',
    label: 'Boolean',
  },
  {
    value: 'object',
    label: 'Object',
  },
  {
    value: 'array',
    label: 'Array',
  },
]

const useJsonBuilder = () => {
  const [jsonSchema, setJsonSchema] = useState<Schema>(defaultSchema)

  const addSchema = () => {
    setJsonSchema(addSchemaProperty(jsonSchema))
  }

  const onChangeKey = (oldKey: string, newKey: string) => {
    setJsonSchema(renameSchemaProperty(oldKey, newKey, jsonSchema))
  }

  const onChangeType = (key: string, schema: Schema) => {
    setJsonSchema(setSchemaProperty(key)(schema, jsonSchema))
  }

  return {
    jsonSchema,
    addSchema,
    onChangeKey,
    onChangeType,
  }
}

export default useJsonBuilder
