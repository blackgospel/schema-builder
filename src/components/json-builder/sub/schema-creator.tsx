import _ from 'lodash'
import React from 'react'
import { ROOT_KEY } from 'src/helper/utils/constants'
import { addSchemaProperty, isSchemaObject } from 'src/helper/utils/schema'
import { Schema, SchemaType } from 'src/helper/utils/types'
import useDecodeSchema from '../hooks/useDecodeSchema'
import ArrayControls from './controls/array-controls'
import ObjectControls from './controls/object-controls'
import PrimitiveControls from './controls/primitive-controls'

interface SchemaCreatorProps {
  schema: Schema
  schemaKey?: string
  onChange?: (schema: Schema) => void
  onChangeKey?: (key: string) => void
  onDelete?: (key: string) => void
}

const typeToControl: Record<SchemaType | 'default', React.FC<any>> = {
  object: props => <ObjectControls controlType="object" {...props} />,
  array: props => <ArrayControls controlType="array" {...props} />,
  string: props => <PrimitiveControls controlType="primitive" {...props} />,
  number: props => <PrimitiveControls controlType="primitive" {...props} />,
  boolean: props => <PrimitiveControls controlType="primitive" {...props} />,
  default: props => <PrimitiveControls controlType="primitive" {...props} />,
}

const SchemaCreator: React.FC<SchemaCreatorProps> = ({
  schema,
  schemaKey = ROOT_KEY,
  onChange = _.noop,
  onDelete = _.noop,
  onChangeKey = _.noop,
}) => {
  const { schemaType } = useDecodeSchema(schema)

  const onAdd = isSchemaObject(schema)
    ? () => onChange(addSchemaProperty(schema))
    : undefined

  return typeToControl[schemaType || 'default']({
    schema,
    schemaKey,
    rootNode: schemaKey === ROOT_KEY,
    onDelete: () => onDelete(schemaKey),
    onAdd,
    onChangeKey,
    onChange,
  })
}

export default SchemaCreator
