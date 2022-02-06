import styled from "styled-components";
import { Row } from "antd";

//code của mình
const UserCardStyled = styled.div`
  margin-top: 16px;
  min-height: 300px;
`;

//code của mình
//một khung chứa các user card - dựa theo row

const UserCardRow = ({ children }) => {
  return (
    <UserCardStyled>
      <Row
        gutter={[
          { sm: 20, md: 20, lg: 20 },
          { xs: 20, sm: 20, md: 20, lg: 20 },
        ]}
        
      >
        {children}
      </Row>
    </UserCardStyled>
  );
};
export default UserCardRow;
