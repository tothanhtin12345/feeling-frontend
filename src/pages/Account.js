import styled from "styled-components";

//code của mình
import { breakpoint } from "../components/Styled/mixin";
import UserSettingTabs from "../components/User/UserSettingTabs";


const AccountStyled = styled.div`
  padding: 10px;
  width:100%;
  margin:auto;

  
  ${breakpoint.md`

      width:90%;

  `}

  ${breakpoint.lg`

  width:60%;

  `}
  
  
`;

const Account = () => {
  
  return <AccountStyled>
    <UserSettingTabs/>
   
  </AccountStyled>;
};

export default Account;
