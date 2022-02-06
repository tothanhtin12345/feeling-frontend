import { MainContentStyled } from "../../Styled/Content";


//chứa các content khác bên trong
const MainContent = ({className, children, ...props}) => {
  return (
    <MainContentStyled className={className}>
      {children}
    </MainContentStyled>
  )
}

export default MainContent;