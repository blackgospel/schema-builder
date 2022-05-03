import type {
  ArrayValidSchemaField,
  BoolValidSchemaField,
  CommonValidSchemaField,
  IntegerValidSchemaField,
  NumberValidSchemaField,
  ObjectValidSchemaField,
  SchemaType,
  SchemaTypeOption,
  StringValidSchemaField,
} from '../utils/types'

export const defaultSchema = {
  type: 'object',
  properties: {},
}

export const schemaTypes: SchemaTypeOption[] = [
  {
    value: 'string',
    label: 'String',
  },
  {
    value: 'number',
    label: 'Number',
  },
  {
    value: 'boolean',
    label: 'Boolean',
  },
  {
    value: 'object',
    label: 'Object',
  },
  {
    value: 'array',
    label: 'Array',
  },
]

const commonValidProperties: CommonValidSchemaField[] = [
  'description',
  'type',
  'title',
]

export const stringValidSchemaProperties: StringValidSchemaField[] = [
  ...commonValidProperties,
  'enum',
  'format',
  'maxLength',
  'minLength',
  'pattern',
]

export const numberValidSchemaProperties: NumberValidSchemaField[] = [
  ...commonValidProperties,
  'maximum',
  'minimum',
  'multipleOf',
]

export const integerValidSchemaProperties: IntegerValidSchemaField[] = [
  ...commonValidProperties,
  'maximum',
  'minimum',
  'multipleOf',
]

export const boolValidSchemaProperties: BoolValidSchemaField[] = [
  ...commonValidProperties,
]

export const arrayValidSchemaProperties: ArrayValidSchemaField[] = [
  ...commonValidProperties,
  'maxItems',
  'minItems',
  'uniqueItems',
  'items',
]

export const objectValidSchemaProperties: ObjectValidSchemaField[] = [
  ...commonValidProperties,
  'required',
  'properties',
]

export const typeToValidFields: Record<SchemaType, string[]> = {
  string: stringValidSchemaProperties,
  integer: integerValidSchemaProperties,
  number: numberValidSchemaProperties,
  boolean: boolValidSchemaProperties,
  object: objectValidSchemaProperties,
  array: arrayValidSchemaProperties,
}
