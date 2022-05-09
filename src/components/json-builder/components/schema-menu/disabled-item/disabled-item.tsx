import { Form, Switch } from 'antd'
import React, { PropsWithChildren } from 'react'

const DisabledItem = (props: PropsWithChildren<any>) => {
  return (
    <Form.Item name="suffix" noStyle>
      <Switch size="small" {...props} />
    </Form.Item>
  )
}

export default DisabledItem
