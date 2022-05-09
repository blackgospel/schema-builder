import { useState } from 'react'
import { schemaTypes } from 'src/helper/utils/constants'
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
  const [isModalVisible, setIsModalVisible] = useState(false)

  const getTypeValue = findOption(getSchemaType(schema))(
    schemaTypes
  ) as unknown as string

  const onChangeTitle = (event: React.FocusEvent<HTMLInputElement, Element>) =>
    onChangeKey ? onChangeKey(event.target.value) : null

  const onChangeType = (option: string) =>
    onChange(setSchemaTypeAndRemoveWrongFields(option, schema))

  return {
    isModalVisible,
    setIsModalVisible,
    onChangeTitle,
    onChangeType,
    getTypeValue,
  }
}

export default useSchemaControls
