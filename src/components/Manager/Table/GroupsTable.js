import { Form, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useState, useEffect } from "react";
import moment from "moment";
//code của mình
import { SmallTitleStyled, SmallActionStyled } from "../../Styled/Text";
import ManagerTable from "./ManagerTable";
import { TextInputStyled, RangePickerStyled } from "../../Styled/Input";
import {
  fetchTableDataSaga,
  reset,
} from "../../../store/modules/ManagerTable/slice";
import {
  getManagerTableLoading,

  getTableDataDocumentCount,
  getGroupsTable,
} from "../../../store/modules/ManagerTable/selectors";
import { MakeOnlyInteger } from "../../../utils/input";
const { Item } = Form;

//các thông tin để search
const initialState = {
  displayName: "",

  createdAtStart: undefined,
  createdAtEnd: undefined,
  memberCountStart: undefined,
  memberCountEnd: undefined,
  currentPaginationIndex: 1,
  limit: 8,
  skip: 0,
};

const GroupsTable = () => {
  const [searchValue, setSearchValue] = useState(initialState);
  const dispatch = useDispatch();

  const groups = useSelector(getGroupsTable);
  const loading = useSelector(getManagerTableLoading);
  const documentCount = useSelector(getTableDataDocumentCount);

 

  const data = groups.map((group, index) => {
    //lấy ra thông tin chủ nhân nhóm
    const { informations, _id: ownerId } = group.groupOwner;
   

    return {
      key: group._id + "group_table",
      displayName: group.informations.displayName,
      owner: (
        <SmallActionStyled to={`/wall/${ownerId}`}>
          {informations.displayName}
        </SmallActionStyled>
      ),
      memberCount:group.memberCount,
      createdAt: moment(group.createdAt).format("L"),
      action: (
        <SmallActionStyled to={`/groups/${group._id}`}>
          Thăm nhóm
        </SmallActionStyled>
      ),
    };
  });
  const columns = [
    {
      key: "displayName",
      dataIndex: "displayName",
      title: "Tên nhóm",
    },
    {
      key: "owner",
      dataIndex: "owner",
      title: "Chủ nhóm",
    },
    {
      key: "memberCount",
      dataIndex: "memberCount",
      title: "Số lượng thành viên",
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      title: "Ngày lập nhóm",
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Hành động",
    },
  ];

  //xử lý khi một nút số ở chỗ phân trang được bấm (bị thay đổi)
  const handlePagination = (value) => {
    //set lại state
    setSearchValue((current) => {
      return {
        ...current,
        currentPaginationIndex: value,
        //khi ở một trang thì ta sẽ phải lấy (số thứ tự trang đó - 1) * limit == số dữ liệu được skip
        // ví dụ như ở trang 1 ==> (1-1) * 10 == 0 ==> skip 0 dữ liệu
        skip: (value - 1) * current.limit,
      };
    });
  };

  //hàm xử lý khi người dùng nhấn nút tìm kiếm ở phần filter
  const handleSubmitFilter = (values) => {
    // console.log(values);
    let createdAt = values.createdAt ? values.createdAt : undefined;

    let createdAtStart = undefined;
    let createdAtEnd = undefined;
    // ta dùng RangePicker nên sẽ có 2 kết quả trong mảng
    if (createdAt) {
      createdAtStart = createdAt[0]._d;
      createdAtEnd = createdAt[1]._d;
    }

    delete values.createdAt;

    

    values = {
      ...values,
      createdAtStart,
      createdAtEnd,
    };

    setSearchValue((current) => {
      return {
        ...current,
        ...values,
      };
    });
  };

  //thực hiện search
  useEffect(() => {
    dispatch(fetchTableDataSaga({ ...searchValue, type: "groups" }));

    return () => {};
  }, [searchValue]);

  //clear
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <ManagerTable
      documentCount={documentCount}
      loading={loading}
      data={data}
      columns={columns}
      title={"Danh sách nhóm"}
      onPaginationChange={handlePagination}
      currentPaginationIndex={searchValue.currentPaginationIndex}
      onSubmitFilter={handleSubmitFilter}
      limit={initialState.limit}
      filterComponents={
        <Fragment>
          <Row gutter={24}>
            <Col>
              <Item
                name="displayName"
                key="displayName"
                label={<SmallTitleStyled>Tên nhóm</SmallTitleStyled>}
              >
                <TextInputStyled defaultValue={""} />
              </Item>
            </Col>
            <Col>
              <Item
                name="memberCountStart"
                key="memberCountStart"
                label={<SmallTitleStyled>Số lượng thành viên từ:</SmallTitleStyled>}
              >
                <TextInputStyled type={"number"} onKeyPress={MakeOnlyInteger} />
              </Item>
            </Col>
            <Col>
              <Item
                name="memberCountEnd"
                key="memberCountEnd"
                label={<SmallTitleStyled>Số lượng thành viên đến:</SmallTitleStyled>}
              >
                <TextInputStyled type={"number"} />
              </Item>
            </Col>
            
          </Row>

          <Row gutter={24}>
            <Col>
              <Item
                name="createdAt"
                key="createdAt"
                label={<SmallTitleStyled>Ngày thành lập</SmallTitleStyled>}
              >
                <RangePickerStyled
                  format="DD/MM/YYYY"
                  placeholder="MM/DD/YYYY"
                />
              </Item>
            </Col>
          </Row>
        </Fragment>
      }
    />
  );
};

export default GroupsTable;
