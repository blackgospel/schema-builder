import CommonControls, { CommonControlsProps } from './common-controls'

const PrimitiveControls: React.FC<CommonControlsProps> = ({ ...props }) => {
  return <CommonControls {...props} />
}

export default PrimitiveControls
