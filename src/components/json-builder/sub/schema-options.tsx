import { Form, Input, InputNumber, Modal, Select, Switch } from 'antd'
import { nanoid } from 'nanoid'
import React, { PropsWithChildren, useMemo } from 'react'
import {
  getSchemaField,
  getSchemaMenuOptions,
  getSchemaType,
  setSchemaField,
  stringsToOptions,
} from 'src/helper/utils/schema'
import { Schema, SchemaFieldOptionType } from 'src/helper/utils/types'

interface SchemaOptionsProps {
  showModal: boolean
  onClose: () => void
  schema: Schema
  onChange: (schema: Schema) => void
}

const SchemaOptions = ({
  showModal,
  onClose,
  schema,
  onChange,
}: SchemaOptionsProps) => {
  const type = getSchemaType(schema)
  const allOptions = useMemo(() => getSchemaMenuOptions(type), [type])

  const getDefaultValue = (props: PropsWithChildren<any>) =>
    getSchemaField(props.option.value, props.schema) as string

  const onChangeText =
    (props: any) => (event: React.FocusEvent<HTMLInputElement>) =>
      props.onChange(
        setSchemaField(props.option.value, event.target.value, props.schema)
      )

  const onChangeNumber =
    (props: any) => (event: React.FocusEvent<HTMLInputElement>) =>
      props.onChange(
        setSchemaField(props.option.value, event.target.value, props.schema)
      )

  const onChangeBoolean = (props: any) => (checked: boolean) =>
    props.onChange(setSchemaField(props.option.value, checked, props.schema))

  const onChangeSelect = (props: any) => (value: string) =>
    props.onChange(setSchemaField(props.option.value, value, props.schema))

  const typeToField: Record<SchemaFieldOptionType, React.FC<any>> = {
    text: props => (
      <Input
        defaultValue={getDefaultValue(props)}
        onBlur={onChangeText(props)}
      />
    ),
    number: props => (
      <InputNumber
        defaultValue={getDefaultValue(props)}
        onBlur={onChangeNumber(props)}
      />
    ),
    boolean: props => (
      <Switch
        defaultChecked={getDefaultValue(props) as unknown as boolean}
        onClick={onChangeBoolean(props)}
      />
    ),
    multi: props => {
      const multiSelected = getSchemaField(props.option.value, props.schema)
      const multiSelectOptions = stringsToOptions(multiSelected)

      return (
        <Select
          mode="tags"
          allowClear
          placeholder="Please select options"
          tokenSeparators={[',']}
          defaultValue={getDefaultValue(props)}
          onChange={onChangeSelect(props)}
        />
      )
    },
    select: props => (
      <Select
        defaultValue={getDefaultValue(props) as string}
        placeholder="Please select option"
        options={props.option.optionList}
        onChange={onChangeSelect(props)}
      />
    ),
  }

  return (
    <Modal
      title="Additional Settings"
      visible={showModal}
      onOk={onClose}
      onCancel={onClose}
    >
      <Form
        name="initialSettings"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        {allOptions &&
          allOptions.map(option => {
            return (
              <Form.Item key={nanoid()} label={option.label}>
                {[typeToField[option.type]({ option, schema, onChange })]}
              </Form.Item>
            )
          })}
      </Form>
    </Modal>
  )
}

export default SchemaOptions
