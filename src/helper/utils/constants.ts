import type {
  ArraySchemaFieldOption,
  ArrayValidSchemaField,
  BoolSchemaFieldOption,
  BoolValidSchemaField,
  CommonSchemaFieldOption,
  CommonValidSchemaField,
  NumberSchemaFieldOption,
  NumberValidSchemaField,
  ObjectSchemaFieldOption,
  ObjectValidSchemaField,
  SchemaMenuOption,
  SchemaType,
  SchemaTypeOption,
  StringSchemaFieldOption,
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
]

export const numberValidSchemaProperties: NumberValidSchemaField[] = [
  ...commonValidProperties,
  'maximum',
  'minimum',
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
  // 'required',
  'properties',
]

export const formatOptions = [
  {
    value: 'date-time',
    label: 'Date',
  },
  {
    value: 'email',
    label: 'Email',
  },
  {
    value: 'hostname',
    label: 'Hostname',
  },
  {
    value: 'ipv4',
    label: 'IPv4',
  },
  {
    value: 'ipv6',
    label: 'IPv6',
  },
  {
    value: 'uri',
    label: 'URI',
  },
]

const commonSchemaOptions: CommonSchemaFieldOption[] = [
  { value: 'description', label: 'Description', type: 'text' },
]

export const stringSchemaOptions: StringSchemaFieldOption[] = [
  ...commonSchemaOptions,
  { value: 'minLength', label: 'Minimum Length', type: 'number' },
  { value: 'maxLength', label: 'Maximum Length', type: 'number' },
  { value: 'enum', label: 'Options', type: 'multi_creatable' },
  {
    value: 'format',
    label: 'Format',
    type: 'select',
    optionList: formatOptions,
  },
]

export const numberSchemaOptions: NumberSchemaFieldOption[] = [
  ...commonSchemaOptions,
  { value: 'minimum', label: 'Minimum', type: 'number' },
  { value: 'maximum', label: 'Maximum', type: 'number' },
]

export const boolSchemaOptions: BoolSchemaFieldOption[] = [
  ...commonSchemaOptions,
]

export const objectSchemaOptions: ObjectSchemaFieldOption[] = [
  ...commonSchemaOptions,
  // { value: 'required', label: 'Required', type: 'required' },
]

export const arraySchemaOptions: ArraySchemaFieldOption[] = [
  ...commonSchemaOptions,
  { value: 'minItems', label: 'Minimum Items', type: 'number' },
  { value: 'maxItems', label: 'Maximum Items', type: 'number' },
  { value: 'uniqueItems', label: 'Unique Items', type: 'boolean' },
]

export const typeToValidFields: Record<SchemaType, string[]> = {
  string: stringValidSchemaProperties,
  number: numberValidSchemaProperties,
  boolean: boolValidSchemaProperties,
  object: objectValidSchemaProperties,
  array: arrayValidSchemaProperties,
}

export const typeToOptions: Record<SchemaType, SchemaMenuOption[]> = {
  string: stringSchemaOptions,
  number: numberSchemaOptions,
  boolean: boolSchemaOptions,
  array: arraySchemaOptions,
  object: objectSchemaOptions,
}
