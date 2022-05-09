import { Divider, Form, Input, InputNumber, Modal, Select, Switch } from 'antd'
import _ from 'lodash/fp'
import React, { useMemo } from 'react'
import {
  getSchemaField,
  getSchemaMenuOptions,
  getSchemaType,
  setSchemaField,
} from 'src/helper/utils/schema'
import { Schema, SchemaFieldOptionType } from 'src/helper/utils/types'
import { DisabledItem } from './disabled-item'

interface SchemaMenuProps {
  schema: Schema
  onChange: (schema: Schema) => void
  isModalVisible: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
}

const SchemaMenu: React.FC<SchemaMenuProps> = ({
  schema,
  onChange,
  isModalVisible,
  setIsModalVisible,
}) => {
  const type = getSchemaType(schema)

  const allOptions = useMemo(() => {
    return getSchemaMenuOptions(type)
  }, [type])

  const onChangeText =
    (value: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(setSchemaField(value, event.target.value, schema))

  const onChangeNumber =
    (value: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(setSchemaField(value, parseInt(event.target.value), schema))

  const typeToItem: Record<SchemaFieldOptionType, React.FC<any>> = {
    text: props => {
      const defaultValue = !!getSchemaField(props.item.value, schema)
      console.log(defaultValue)
      return (
        <Input
          {...(defaultValue && {
            value: getSchemaField(props.item.value, schema) as string,
            onChange: onChangeText(props.item.value),
          })}
          addonAfter={
            <DisabledItem defaultChecked={!!defaultValue} item={props.item} />
          }
        />
      )
    },
    number: props => (
      <InputNumber
        value={getSchemaField(props.item.value, schema) as string}
        onChange={onChangeNumber(props.item.value)}
        addonAfter={
          <DisabledItem
            defaultChecked={!!getSchemaField(props.item.value, schema)}
          />
        }
        {...props}
      />
    ),
    boolean: props => <Switch {...props} />,
    multi_creatable: props => {
      return (
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select"
          options={props.item.optionList}
          {...props}
        />
      )
    },
    select: props => (
      <Select
        placeholder="Please select"
        options={props.item.optionList}
        {...props}
      />
    ),
  }

  // console.log(type, allOptions)

  return (
    <Modal
      title="Input Settings"
      visible={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
    >
      <Form
        name="inputSettings"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item label="Default Value" name="defaultValue">
          <Input placeholder="Default Value" />
        </Form.Item>
        <Form.Item label="Placeholder" name="placeholder">
          <Input placeholder="Placeholder" />
        </Form.Item>
        <Form.Item label="Format" name="format">
          <Input placeholder="/Hello World/" />
        </Form.Item>
        <Divider />
        {_.map(item => {
          return (
            <Form.Item key={item.value} label={item.label}>
              {typeToItem[item.type]({ schema, onChange, item })}
            </Form.Item>
          )
        }, allOptions)}
      </Form>
    </Modal>
  )
}

export default SchemaMenu
