import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload, UploadProps } from 'antd'
import { useState } from 'react'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/monikai.css'
import { defaultSchema } from 'src/helper/utils/funcs'
import { JSONSchemaEditor, Schema } from 'src/helper/utils/types'
import styled from 'styled-components'
import SchemaCreator from './sub/schema-creator'

const Box = styled.div`
  padding: 16px;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
`

const UploadButton = styled(Upload)`
  button {
    margin-bottom: 16px;
  }
`

const JSONContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 4fr 2fr;
  gap: 16px;
`

const JSONBuilder: React.FC<JSONSchemaEditor> = ({ data }) => {
  const initial = data || defaultSchema()
  const [schema, setSchema] = useState<Schema>(initial)

  const props: UploadProps = {
    beforeUpload: (file: { type: string; name: any }) => {
      const isJSON = file.type === 'application/json'
      if (!isJSON) {
        message.error(`${file.name} is not a JSON file`)
      }
      return false
    },
    onChange: ({ fileList }) => {
      const reader = new FileReader()
      const jsonSchema = fileList[0].originFileObj
      reader.onload = (e: any) => {
        var content = e.target.result
        setSchema(JSON.parse(content))
      }
      reader.readAsText(jsonSchema as Blob)
    },
    maxCount: 1,
    showUploadList: false,
  }

  return (
    <Box>
      <Title>JSON Builder V3</Title>
      <UploadButton {...props}>
        <Button icon={<UploadOutlined />}>Import JSON</Button>
      </UploadButton>
      <JSONContainer>
        <SchemaCreator schema={schema} onChange={setSchema} />
        {process.browser && <JSONPretty data={schema} />}
      </JSONContainer>
    </Box>
  )
}

export default JSONBuilder
