import { OrderedListOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Input, Select } from 'antd'
import { schemaTypes } from 'components/json-builder/hooks/useJsonBuilder'
import {
  findOption,
  getSchemaType,
  setSchemaTypeAndRemoveWrongFields,
} from 'src/helper/utils/schema'
import { Schema } from 'src/helper/utils/types'

interface SchemaInputProps {
  schema: any
  schemaKey: string
  onChangeKey: (key: string) => void
  onChangeType: (schema: Schema) => void
}

const SchemaInput: React.FC<SchemaInputProps> = ({
  schema,
  schemaKey,
  onChangeKey,
  onChangeType,
}) => {
  return (
    <Input.Group compact>
      <Input
        defaultValue={schemaKey}
        onBlur={event => onChangeKey(event.target.value)}
        style={{ width: '40%' }}
      />
      <Select
        value={findOption(getSchemaType(schema))(schemaTypes)}
        onChange={(option: any) =>
          onChangeType(setSchemaTypeAndRemoveWrongFields(option)(schema))
        }
        options={schemaTypes}
        style={{ width: '40%' }}
      />
      <Button style={{ width: '10%' }}>
        <OrderedListOutlined />
      </Button>
      <Button style={{ width: '10%' }}>
        <SettingOutlined />
      </Button>
    </Input.Group>
  )
}

export default SchemaInput
