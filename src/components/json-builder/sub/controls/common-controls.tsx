import {
  CaretDownFilled,
  CaretRightFilled,
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Button, Col, Input, Row, Select } from 'antd'
import _ from 'lodash'
import { schemaTypes } from 'src/helper/utils/constants'
import {
  deleteSchemaProperty,
  getSchemaItems,
  renameSchemaProperty,
  setSchemaItems,
  setSchemaProperty,
} from 'src/helper/utils/schema'
import { Schema } from 'src/helper/utils/types'
import styled from 'styled-components'
import SchemaOptions from '../schema-options'
import CommonSubArray from './common-sub-array'
import CommonSubObject from './common-sub-object'
import useControls from './hooks/useControls'

export interface CommonControlsProps {
  schema: Schema
  schemaKey: string
  rootNode?: boolean
  controlType: 'object' | 'array' | 'primitive'
  onAdd: () => void
  onDelete: () => void
  onChange: (schema: Schema) => void
  onChangeKey: (key: string) => void
}

const Box = styled.div`
  padding-left: 20px;

  &:not(:empty) {
    margin-top: 12px;

    & > span,
    & > div {
      margin-top: 12px;
    }
  }
`

const CommonControls: React.FC<CommonControlsProps> = ({
  schema,
  schemaKey,
  rootNode,
  controlType,
  onAdd,
  onDelete,
  onChange,
  onChangeKey,
}) => {
  const {
    getTypeOptions,
    show,
    showModal,
    openModal,
    closeModal,
    handleShow,
    onChangeFieldName,
    onChangeFieldType,
  } = useControls({ schema, onChange, onChangeKey })

  const isCollection = controlType !== 'primitive'
  const isObject = controlType === 'object'
  const isArray = controlType === 'array'

  return (
    <>
      <Input.Group>
        <Row align="middle">
          <Col span={11}>
            <Row justify="space-around" align="middle">
              <Col span={2}>
                {isCollection && (
                  <Button
                    type="text"
                    onClick={handleShow}
                    style={{ width: '100%' }}
                    icon={show ? <CaretDownFilled /> : <CaretRightFilled />}
                  />
                )}
              </Col>
              <Col span={22}>
                <Input
                  defaultValue={schemaKey}
                  disabled={rootNode || schemaKey === 'items'}
                  onBlur={onChangeFieldName}
                />
              </Col>
            </Row>
          </Col>
          <Col span={isObject ? 10 : 11}>
            <Select
              style={{ width: '100%' }}
              value={getTypeOptions}
              options={schemaTypes}
              disabled={rootNode}
              onChange={onChangeFieldType}
            />
          </Col>
          <Col span={1}>
            <Button
              style={{ width: '100%' }}
              onClick={openModal}
              icon={<SettingOutlined />}
            />
          </Col>
          {isObject && (
            <Col span={1}>
              <Button
                disabled={!_.isFunction(onAdd)}
                onClick={onAdd}
                style={{ width: '100%' }}
                icon={<PlusOutlined />}
              />
            </Col>
          )}
          <Col span={1}>
            <Button
              style={{ width: '100%' }}
              onClick={onDelete}
              icon={<DeleteOutlined />}
              disabled={rootNode}
            />
          </Col>
        </Row>
      </Input.Group>
      <SchemaOptions
        {...{ showModal, onClose: closeModal, schema, onChange }}
      />
      {isCollection && show && (
        <Box>
          {isObject && (
            <CommonSubObject
              schema={schema}
              onDelete={key => onChange(deleteSchemaProperty(key)(schema))}
              onChange={(key, newSchema) =>
                onChange(setSchemaProperty(key)(newSchema, schema))
              }
              onChangeKey={(oldKey, newKey) =>
                onChange(renameSchemaProperty(oldKey, newKey, schema))
              }
            />
          )}
          {isArray && (
            <CommonSubArray
              schema={getSchemaItems(schema)}
              onChange={oldSchema =>
                onChange(setSchemaItems(oldSchema, schema))
              }
            />
          )}
        </Box>
      )}
    </>
  )
}

export default CommonControls
