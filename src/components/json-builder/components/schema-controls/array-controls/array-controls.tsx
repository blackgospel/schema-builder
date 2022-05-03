import { Input, Select } from 'antd'
import useSchemaControls from 'components/json-builder/hooks/useSchemaControls'
import { schemaTypes } from 'src/helper/utils/constants'
import { Schema } from 'src/helper/utils/types'
import styles from '../schema-controls.module.sass'

interface ArrayControlsProps {
  schema: Schema
  onChange: (schema: Schema) => void
  onAdd?: () => void
}

const ArrayControls: React.FC<ArrayControlsProps> = ({ schema, onChange }) => {
  const { getTypeValue, onChangeType } = useSchemaControls(schema, onChange)

  return (
    <div className={styles.container}>
      <Input.Group className={styles.group} compact>
        <Select
          value={getTypeValue}
          onChange={onChangeType}
          options={schemaTypes}
          style={{ width: '80%' }}
        />
      </Input.Group>
    </div>
  )
}

export default ArrayControls
