import { Form, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useState, useEffect } from "react";
import moment from "moment";
//code của mình
import {
  
  SmallTitleStyled,
  SmallActionStyled,
} from "../../Styled/Text";
import ManagerTable from "./ManagerTable";
import { TextInputStyled, RangePickerStyled } from "../../Styled/Input";
import {
  fetchTableDataSaga,
  reset,
} from "../../../store/modules/ManagerTable/slice";
import {
  getManagerTableLoading,
  getUsersTable,
  getTableDataDocumentCount,
} from "../../../store/modules/ManagerTable/selectors";
const { Item } = Form;

//các thông tin để search
const initialState = {
  displayName: "",
  email: "",
  createdAtStart: undefined,
  createdAtEnd: undefined,
  currentPaginationIndex: 1,
  limit: 8,
  skip: 0,
};

const UsersTable = () => {
  const [searchValue, setSearchValue] = useState(initialState);
  const dispatch = useDispatch();

  const users = useSelector(getUsersTable);
  const loading = useSelector(getManagerTableLoading);
  const documentCount = useSelector(getTableDataDocumentCount);

 

  const data = users.map((user) => {
    const { displayName, gender, birthday } = user.informations;
   
    return {
      key: user._id + "user_table",
      _id: user._id,
      friendCount: user.friendCount,
      displayName,
      gender: gender === "male" ? "Nam" : "Nữ",
      email: user.email,
      birthday,
      createdAt: moment(user.createdAt).format("L"),
      action: (
        <SmallActionStyled to={`/wall/${user._id}`}>Ghé thăm</SmallActionStyled>
      ),
    };
  });

  const columns = [
    {
      key: "displayName",
      dataIndex: "displayName",
      title: "Tên hiển thị",
    },
    {
      key: "gender",
      dataIndex: "gender",
      title: "Giới tính",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Địa chỉ email",
    },
    {
      key: "birthday",
      dataIndex: "birthday",
      title: "Ngày sinh",
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      title: "Ngày tham gia",
    },
    {
      key: "friendCount",
      dataIndex: "friendCount",
      title: "Số lượng bạn bè",
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
    console.log(values);
    let createdAt = values.createdAt ? values.createdAt : undefined;

    let createdAtStart = undefined;
    let createdAtEnd = undefined;
    // ta dùng RangePicker nên sẽ có 2 kết quả trong mảng
    if (createdAt) {
      createdAtStart = createdAt[0]._d;
      createdAtEnd = createdAt[1]._d;
    }

    //bao gồm:
    // displayName: tên hiển thị
    // email: địa chỉ email
    // createdAtStart và createdAtEnd: ngày tham gia trong khoảng

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
    dispatch(fetchTableDataSaga({...searchValue,type:"users"}));

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
      title={"Danh sách người dùng"}
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
                label={<SmallTitleStyled>Tên hiển thị</SmallTitleStyled>}
              >
                <TextInputStyled defaultValue={""} />
              </Item>
            </Col>
            <Col>
              <Item
                name="email"
                key="email"
                label={<SmallTitleStyled>Địa chi email</SmallTitleStyled>}
              >
                <TextInputStyled defaultValue={""} />
              </Item>
            </Col>
            <Col>
              <Item
                name="createdAt"
                key="createdAt"
                label={<SmallTitleStyled>Ngày tham gia</SmallTitleStyled>}
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

export default UsersTable;
