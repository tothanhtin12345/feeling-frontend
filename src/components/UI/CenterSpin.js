import {Spin} from 'antd';
import { CenterSpinStyled } from '../Styled/Spin';

const CenterSpin = ({size="default", backgroundcolor, children, ...props}) => {
  return <CenterSpinStyled backgroundcolor={backgroundcolor}><Spin size={size}/>{children}</CenterSpinStyled>
}

export default CenterSpin;