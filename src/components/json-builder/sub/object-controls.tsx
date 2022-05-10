import { Button, Input, Select } from 'antd'
import styled from 'styled-components'

const Box = styled.div``

const Control = styled(Input.Group)``

const ControlTitle = styled(Input)``

const ControlType = styled(Select)``

const ControlList = styled(Button)``

const ControlSetting = styled(Button)``

const ObjectControls: React.FC = () => {
  return (
    <Box>
      <Control></Control>
    </Box>
  )
}

export default ObjectControls
