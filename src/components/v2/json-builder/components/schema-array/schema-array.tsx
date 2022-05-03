import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import _ from 'lodash'
import { addSchemaProperty, isSchemaObject } from 'src/helper/utils/schema'
import { Schema } from 'src/helper/utils/types'
import { ArrayControls } from '../schema-controls/array-controls'
import styles from './schema-array.module.sass'

interface SchemaArrayProps {
  schema: Schema
  onChange: (schema: Schema) => void
}

const SchemaArray: React.FC<SchemaArrayProps> = ({ schema, onChange }) => {
  const onAdd = isSchemaObject(schema)
    ? () => onChange(addSchemaProperty(schema))
    : undefined

  return (
    <div className={styles.controlsBox}>
      <ArrayControls schema={schema} onChange={onChange} />
      {_.isFunction(onAdd) && (
        <Button className={styles.addButton} block onClick={onAdd}>
          <PlusOutlined />
        </Button>
      )}
    </div>
  )
}

export default SchemaArray
