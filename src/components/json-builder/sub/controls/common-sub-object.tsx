import { Schema } from 'src/helper/utils/types'
import SchemaCreator from '../schema-creator'
import useControls from './hooks/useControls'

export interface CommonSubObjectProps {
  schema: Schema
  onDelete: (key: string) => void
  onChangeKey: (oldKey: string, newKey: string) => void
  onChange: (key: string, schema: Schema) => void
}

const CommonSubObject = ({
  schema,
  onDelete,
  onChangeKey,
  onChange,
}: CommonSubObjectProps) => {
  const { schemaEntries } = useControls({ schema })

  return (
    <>
      {schemaEntries.map(([key, properties]) => {
        return (
          <SchemaCreator
            key={key}
            schema={properties as Schema}
            schemaKey={key}
            onDelete={onDelete}
            onChangeKey={newKey => onChangeKey(key, newKey)}
            onChange={newSchema => onChange(key, newSchema)}
          />
        )
      })}
    </>
  )
}

export default CommonSubObject
