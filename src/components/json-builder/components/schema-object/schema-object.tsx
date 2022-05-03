import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import _ from 'lodash'
import { getSchemaProperties } from 'src/helper/utils/schema'
import { Schema } from 'src/helper/utils/types'
import { SchemaCreator } from '../schema-creator'
import styles from './schema-object.module.sass'

interface SchemaObjectProps {
  schema: Schema
  onAdd?: () => void
  onDelete: (key: string) => void
  onChange: (key: string, schema: Schema) => void
  onChangeKey: (oldKey: string, newKey: string) => void
}

const SchemaObject: React.FC<SchemaObjectProps> = ({
  schema,
  onAdd,
  onDelete,
  onChange,
  onChangeKey,
}) => {
  return (
    <div className={styles.controlsBox}>
      {_.entries(getSchemaProperties(schema)).map(([key, properties]) => {
        return (
          <div key={key} className={styles.itemBox}>
            <SchemaCreator
              schema={properties as Schema}
              schemaKey={key}
              onChangeKey={newKey => onChangeKey(key, newKey)}
              onChange={newSchema => onChange(key, newSchema)}
              onDelete={onDelete}
            />
          </div>
        )
      })}
      {_.isFunction(onAdd) && (
        <Button className={styles.addButton} block onClick={onAdd}>
          <PlusOutlined />
        </Button>
      )}
    </div>
  )
}

export default SchemaObject
