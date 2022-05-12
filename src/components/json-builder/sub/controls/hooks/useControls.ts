import useDecodeSchema from 'components/json-builder/hooks/useDecodeSchema'
import _ from 'lodash/fp'
import React, { useState } from 'react'
import { schemaTypes } from 'src/helper/utils/constants'
import {
  findOption,
  getSchemaType,
  setSchemaTypeAndRemoveWrongFields,
} from 'src/helper/utils/schema'
import { Schema } from 'src/helper/utils/types'

interface UseControlProps {
  schema: Schema
  onChange?: any
  onChangeKey?: any
}

const useControls = ({ schema, onChange, onChangeKey }: UseControlProps) => {
  const [show, setShow] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const { schemaType, schemaTitle, schemaProperties } = useDecodeSchema(schema)
  const schemaEntries = _.entries(schemaProperties)

  const handleShow = () => setShow(state => !state)

  const getTypeOptions = findOption(getSchemaType(schema))(
    schemaTypes
  ) as unknown as string

  const openModal = () => setShowModal(true)

  const closeModal = () => setShowModal(false)

  const onChangeFieldName = (event: React.FocusEvent<HTMLInputElement>) =>
    onChangeKey ? onChangeKey(event.target.value) : undefined

  const onChangeFieldType = (option: string) =>
    onChange(setSchemaTypeAndRemoveWrongFields(option, schema))

  return {
    schemaType,
    schemaTitle,
    schemaEntries,
    getTypeOptions,
    show,
    showModal,
    openModal,
    closeModal,
    handleShow,
    onChangeFieldName,
    onChangeFieldType,
  }
}

export default useControls
