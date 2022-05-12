import { Schema } from 'src/helper/utils/types'
import SchemaCreator from '../schema-creator'

export interface CommonSubArrayProps {
  schema: Schema
  onChange: (schema: Schema) => void
}

const CommonSubArray = ({ schema, onChange }: CommonSubArrayProps) => {
  return <SchemaCreator schema={schema} schemaKey="items" onChange={onChange} />
}

export default CommonSubArray
