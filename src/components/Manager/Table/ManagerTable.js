import { Table, Collapse, Form, Spin, Row, Col } from "antd";
import { MediumTitleStyled, SmallTitleStyled } from "../../Styled/Text";
import styled from "styled-components";
//code của mình
import { TextInputStyled } from "../../Styled/Input";
import { RectangleButtonStyled } from "../../Styled/Button";

const TableStyled = styled.div`
  background-color: #ffffff;
  margin: 15px 0px;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 8px;

  .title {
    text-align: center;
    margin: 10px 0px;
  }

  width:100%;
  /* overflow: scroll;
  overflow-y:hidden; */
`;

const { Panel } = Collapse;
const { Item } = Form;
const ManagerTable = ({
  data,
  columns,
  title,
  onPaginationChange,
  currentPaginationIndex,
  onSubmitFilter,
  filterComponents,
  loading = false,
  documentCount,
  limit,
}) => {
  const [form] = Form.useForm();

  const handleSubmitForm = (values) => {
    onSubmitFilter(values);
  };

  return (
    <TableStyled>
      <div className="title">
        <MediumTitleStyled>{title}</MediumTitleStyled>
      </div>
      {/* Khu vực filter */}
      <div>
        <Collapse bordered={false}>
          <Panel
            style={{ backgroundColor: "#FFFFFF" }}
            header={<SmallTitleStyled>Mở rộng tìm kiếm</SmallTitleStyled>}
          >
            <Form layout="vertical" form={form} onFinish={handleSubmitForm}>
              {filterComponents}
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Spin spinning={loading}>
                    <RectangleButtonStyled
                      textcolor="#FFFFFF"
                      disabled={loading}
                    >
                      <SmallTitleStyled>
                        {loading ? "Đang xử lý" : "Tìm kiếm"}
                      </SmallTitleStyled>
                    </RectangleButtonStyled>
                  </Spin>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>
      </div>
      <Table
      
        scroll={{x:'max-content'}}
        bordered={true}
        columns={columns}
        dataSource={data}
        pagination={{
          total: documentCount,
          current: currentPaginationIndex,
          position: ["bottomCenter"],
          onChange: onPaginationChange,
          defaultPageSize:limit,
          responsive: true,
          showSizeChanger:false,
        }}
        loading={loading}
      />
    </TableStyled>
  );
};

export default ManagerTable;
