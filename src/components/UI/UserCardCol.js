import { Col } from "antd";
//code của mình

//một khung chứa từng user card - dựa theo col

const UserCardCol = ({ children }) => {
  return (
    <Col xs={24} sm={12} md={6} lg={6}>
      {children}
    </Col>
  );
};
export default UserCardCol;
