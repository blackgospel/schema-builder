import { useState } from 'react'
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

const JSONBuilder: React.FC<JSONSchemaEditor> = ({ data }) => {
  const initial = data || defaultSchema()
  const [schema, setSchema] = useState<Schema>(initial)

  console.log(schema)

  return (
    <Box>
      <Title>JSON Builder V3</Title>
      <SchemaCreator schema={schema} onChange={setSchema} />
    </Box>
  )
}

export default JSONBuilder
