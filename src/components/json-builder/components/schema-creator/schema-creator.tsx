import clsx from 'clsx'
import _ from 'lodash/fp'
import {
  getSchemaItems,
  isSchemaArray,
  isSchemaObject,
} from 'src/helper/utils/schema'
import { Schema } from 'src/helper/utils/types'
import useSchemaCreator from '../../hooks/useSchemaCreator'
import { SchemaArray } from '../schema-array'
import { SchemaControls } from '../schema-controls'
import { SchemaObject } from '../schema-object'
import styles from './schema-creator.module.sass'

interface SchemaCreatorProps {
  schema: Schema
  schemaKey?: string
  onChange?: (schema: Schema) => void
  onChangeKey?: (key: string) => void
  onDelete?: (key: string) => void
}

const SchemaCreator: React.FC<SchemaCreatorProps> = ({
  schema,
  schemaKey = '__root__',
  onChange = _.noop,
  onChangeKey = _.noop,
  onDelete = _.noop,
}) => {
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
    <>
      <SchemaControls
        schema={schema}
        schemaKey={schemaKey}
        isCollapsed={isCollapsed}
        onChange={onChange}
        onChangeKey={schemaKey !== '__root__' ? onChangeKey : undefined}
        onCollapse={onCollapse}
        onDelete={
          schemaKey !== '__root__' ? () => onDelete(schemaKey) : undefined
        }
      />
      <div
        className={clsx({
          [styles.collapsed]: !isCollapsed,
          [styles.isCollapsed]: isCollapsed,
        })}
      >
        <div className={styles.box}>
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
    </>
  )
}

export default SchemaCreator
