import { useState } from 'react'
import { defaultSchema } from 'src/helper/utils/constants'
import { Schema } from 'src/helper/utils/types'
import { SchemaCreator } from './components/schema-creator'
import styles from './json-builder.module.sass'

const JsonBuilder: React.FC = () => {
  const [schema, setSchema] = useState<Schema>(defaultSchema)

  console.log(schema)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Json Builder</h1>
      <section>
        <SchemaCreator schema={schema} onChange={setSchema} />
      </section>
    </div>
  )
}

export default JsonBuilder
