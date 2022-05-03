import useSchemaCreator from 'components/json-builder/hooks/useSchemaCreator'
import {
  addSchemaProperty,
  getSchemaItems,
  isSchemaArray,
  isSchemaObject,
} from 'src/helper/utils/schema'
import { Schema } from 'src/helper/utils/types'
import { ArrayControls } from '../schema-controls/array-controls'
import { SchemaObject } from '../schema-object'
import styles from './schema-array.module.sass'

interface SchemaArrayProps {
  schema: Schema
  onChange: (schema: Schema) => void
}

const SchemaArray: React.FC<SchemaArrayProps> = ({ schema, onChange }) => {
  const onAdd = isSchemaObject(schema)
    ? () => onChange(addSchemaProperty(schema))
    : undefined

  const {
    isCollapsed,
    onCollapse,
    onChangeObjectTitle,
    onChangeObjectType,
    onAddField,
    onDeleteObjectField,
    onChangeItems,
  } = useSchemaCreator(schema, onChange)

  return (
    <div className={styles.controlsBox}>
      <ArrayControls schema={schema} onChange={onChange} />
      <div className={styles.marginTop}>
        {isSchemaObject(schema) && (
          <SchemaObject
            schema={schema}
            onAdd={onAddField}
            onChangeKey={onChangeObjectTitle}
            onChange={onChangeObjectType}
            onDelete={onDeleteObjectField}
          />
        )}
        {isSchemaArray(schema) && (
          <SchemaArray
            schema={getSchemaItems(schema)}
            onChange={onChangeItems}
          />
        )}
      </div>
    </div>
  )
}

export default SchemaArray
