import { useState } from 'react'
import {
  addSchemaProperty,
  deleteSchemaProperty,
  isSchemaArray,
  isSchemaObject,
  renameSchemaProperty,
  setSchemaProperty,
} from 'src/helper/utils/schema'
import { Schema } from 'src/helper/utils/types'

const useSchemaCreator = (
  schema: Schema,
  onChange: (schema: Schema) => void
) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  const onCollapse =
    isSchemaObject(schema) || isSchemaArray(schema)
      ? () => setIsCollapsed(state => !state)
      : undefined

  const onAddField = isSchemaObject(schema)
    ? () => onChange(addSchemaProperty(schema))
    : undefined

  const onChangeObjectTitle = (oldKey: string, newKey: string) =>
    onChange(renameSchemaProperty(oldKey, newKey, schema))

  const onChangeObjectType = (key: string, newSchema: Schema) =>
    onChange(setSchemaProperty(key)(newSchema, schema))

  const onDeleteObjectField = (key: string) =>
    onChange(deleteSchemaProperty(key)(schema))

  return {
    isCollapsed,
    onCollapse,
    onChangeObjectTitle,
    onChangeObjectType,
    onAddField,
    onDeleteObjectField,
  }
}

export default useSchemaCreator