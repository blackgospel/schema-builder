import { schemaTypes } from 'components/json-builder/hooks/useJsonBuilder'
import {
  findOption,
  getSchemaType,
  setSchemaTypeAndRemoveWrongFields,
} from 'src/helper/utils/schema'
import { Schema } from 'src/helper/utils/types'

const useSchemaControls = (
  schema: Schema,
  onChange: (schema: Schema) => void,
  onChangeKey?: (key: string) => void
) => {
  const getTypeValue = findOption(getSchemaType(schema))(
    schemaTypes
  ) as unknown as string

  const onChangeTitle = (event: React.FocusEvent<HTMLInputElement, Element>) =>
    onChangeKey ? onChangeKey(event.target.value) : null

  const onChangeType = (option: string) =>
    onChange(setSchemaTypeAndRemoveWrongFields(option, schema))

  return {
    onChangeTitle,
    onChangeType,
    getTypeValue,
  }
}

export default useSchemaControls
