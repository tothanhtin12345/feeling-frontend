

//code của mình
import { SubContentStyled } from "../../Styled/Content";


//SubContent dùng để định nghĩa nội dung - phải nằm bên trong MainContent --> Layout
const SubContent = ({className, children, ...props}) => {
  return (
    <SubContentStyled className={className}>
      {children}
    </SubContentStyled>
  )
} 

export default SubContent;