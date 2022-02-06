import { NavLink } from "react-router-dom";
//code của mình
import { HeaderStyled } from "../../Styled/Header";
import { BigTitleStyled } from "../../Styled/Text";
const GuestHeader = () => {
  return (
    <HeaderStyled style={{position:"unset"}}>
      <div className="header-items">
        <div className="header-section">
        
            <BigTitleStyled>Feeling</BigTitleStyled>
       
        </div>
      </div>
    </HeaderStyled>
  );
};
export default GuestHeader;
