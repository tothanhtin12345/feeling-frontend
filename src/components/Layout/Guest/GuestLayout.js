import { Layout, Row, Col } from "antd";
import styled from "styled-components";
//code của mình
import GuestHeader from "./GuestHeader";
import {CardStlyled} from '../../Styled/Card';

const { Content } = Layout;

const GuestLayoutStyled = styled.div`
  & {
    background-color: #ffffff;
  }
`;

const GuestLayout = ({ children }) => {
  return (
    <Layout>
      <GuestHeader/>
      <Layout style={{ backgroundColor: "#FFFFFF" }}>
        <Content style={{ marginTop: "64px", marginBottom:"30px" }} className="guest-content">
          <Row justify="center" align="middle">
            <Col xs={23} md={16} lg={10}>
              <CardStlyled style={{padding:"10px 20px 20px 20px"}}>
                {children}
              </CardStlyled>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default GuestLayout;
