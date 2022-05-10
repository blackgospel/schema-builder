import { Form, Switch } from 'antd'
import React, { PropsWithChildren } from 'react'
import { setSchemaField } from 'src/helper/utils/schema'

const DisabledItem = (props: PropsWithChildren<any>) => {
  return (
    <Form.Item name="suffix" noStyle>
      <Switch
        size="small"
        {...props}
        onClick={() => setSchemaField(props.item.value)}
      />
    </Form.Item>
  )
}

export default DisabledItem
