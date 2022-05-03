import { useState } from 'react'
import { defaultSchema } from 'src/helper/utils/constants'
import {
  addSchemaProperty,
  renameSchemaProperty,
  setSchemaProperty,
} from 'src/helper/utils/schema'
import { Schema } from 'src/helper/utils/types'

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
