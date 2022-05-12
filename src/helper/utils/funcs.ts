import { Schema } from './types'

export const defaultSchema = (): Schema => {
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    title: 'root',
    properties: {},
  }
}
