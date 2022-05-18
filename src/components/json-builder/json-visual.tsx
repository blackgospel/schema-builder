import React from 'react'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/1337.css'
import { JSONSchemaVisual } from 'src/helper/utils/types'

interface JSONPrettyFix extends React.Component {
  data: any
}

const JSONVisualiser: React.FC<JSONSchemaVisual> = ({ data }) => {
  const JSONVisual = JSONPretty as any as {
    new (): JSONPrettyFix
  }

  const props: any = {
    data,
  }

  return <JSONVisual {...props}></JSONVisual>
}

export default JSONVisualiser
