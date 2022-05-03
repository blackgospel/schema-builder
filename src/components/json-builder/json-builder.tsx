import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { SchemaInput } from 'components/schema-input'
import _ from 'lodash/fp'
import { getSchemaProperties } from 'src/helper/utils/schema'
import useJsonBuilder from './hooks/useJsonBuilder'
import styles from './json-builder.module.sass'

const JsonBuilder: React.FC = () => {
  const { jsonSchema, addSchema, onChangeKey, onChangeType } = useJsonBuilder()
  console.log({ jsonSchema })
  console.log(getSchemaProperties(jsonSchema))

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Json Builder</h1>
      <section>
        {_.entries(getSchemaProperties(jsonSchema)).map(([key, item]) => {
          console.log({ key, item })
          return (
            <SchemaInput
              key={key}
              schema={item}
              schemaKey={key}
              onChangeKey={newKey => onChangeKey(key, newKey)}
              onChangeType={newSchema => onChangeType(key, newSchema)}
            />
          )
        })}
        <Button block onClick={addSchema}>
          <PlusOutlined />
        </Button>
      </section>
    </div>
  )
}

export default JsonBuilder
