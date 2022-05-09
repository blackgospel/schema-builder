import {
  CaretDownOutlined,
  CaretRightOutlined,
  MinusCircleOutlined,
  OrderedListOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Button, Input, Select } from 'antd'
import _ from 'lodash'
import { schemaTypes } from 'src/helper/utils/constants'
import { Schema } from 'src/helper/utils/types'
import useSchemaControls from '../../hooks/useSchemaControls'
import { SchemaMenu } from '../schema-menu'
import styles from './schema-controls.module.sass'

interface SchemaControlsProps {
  schema: Schema
  schemaKey: string
  isCollapsed?: boolean
  onChange: (schema: Schema) => void
  onChangeKey?: (key: string) => void
  onCollapse?: () => void
  onDelete?: () => void
}

const SchemaControls: React.FC<SchemaControlsProps> = ({
  schema,
  schemaKey,
  isCollapsed,
  onChange,
  onChangeKey,
  onCollapse,
  onDelete,
}) => {
  const {
    getTypeValue,
    onChangeTitle,
    onChangeType,
    isModalVisible,
    setIsModalVisible,
  } = useSchemaControls(schema, onChange, onChangeKey)

  return (
    <div className={styles.container}>
      {_.isFunction(onCollapse) &&
        (isCollapsed ? (
          <CaretDownOutlined onClick={onCollapse} className={styles.icon} />
        ) : (
          <CaretRightOutlined onClick={onCollapse} className={styles.icon} />
        ))}
      <Input.Group className={styles.group} compact>
        {_.isFunction(onChangeKey) && (
          <Input
            defaultValue={schemaKey}
            onBlur={onChangeTitle}
            style={{ width: '40%' }}
          />
        )}
        <Select
          value={getTypeValue}
          onChange={onChangeType}
          options={schemaTypes}
          style={{ width: _.isFunction(onChangeKey) ? '40%' : '80%' }}
        />
        <Button style={{ width: '10%' }}>
          <OrderedListOutlined />
        </Button>
        <Button
          style={{ width: '10%' }}
          onClick={() => setIsModalVisible(true)}
        >
          <SettingOutlined />
        </Button>
      </Input.Group>
      {_.isFunction(onDelete) && (
        <Button
          onClick={onDelete}
          icon={<MinusCircleOutlined color="ff0000" />}
        />
      )}
      <SchemaMenu
        {...{ schema, onChange, isModalVisible, setIsModalVisible }}
      />
    </div>
  )
}

export default SchemaControls
