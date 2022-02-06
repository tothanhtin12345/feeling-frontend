import { Form, Row, Col, InputNumber } from "antd";
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
  getPostsTable,
  getTableDataDocumentCount,
} from "../../../store/modules/ManagerTable/selectors";
import { MakeOnlyInteger } from "../../../utils/input";
const { Item } = Form;

//các thông tin để search
const initialState = {
  createdAtStart: undefined,
  createdAtEnd: undefined,
  likeCountStart: undefined,
  likeCountEnd: undefined,
  commentCountStart: undefined,
  commentCountEnd: undefined,
  reportCountStart: undefined,
  reportCountEnd: undefined,

  currentPaginationIndex: 1,
  limit: 8,
  skip: 0,
};

const PostsTable = () => {
  const [searchValue, setSearchValue] = useState(initialState);
  const dispatch = useDispatch();

  const posts = useSelector(getPostsTable);
  const loading = useSelector(getManagerTableLoading);
  const documentCount = useSelector(getTableDataDocumentCount);

  const data = posts.map((post, index) => {
    //lấy ra thông tin chủ nhân bài viết
    const { informations, _id: ownerId } = post.owner;
    //lấy ra các thông tin của bài viết
    const { _id, reportCount, commentCount, likeCount, createdAt } = post;

    return {
      key: post._id + "post_table",
      _id,
      owner: (
        <SmallActionStyled to={`/wall/${ownerId}`}>
          {informations.displayName}
        </SmallActionStyled>
      ),
      reportCount,
      commentCount,
      likeCount,
      createdAt: moment(post.createdAt).format("L"),
      action: (
        <SmallActionStyled to={`/post/details?_id=${_id}`}>
          Xem chi tiết
        </SmallActionStyled>
      ),
    };
  });

  const columns = [
    {
      key: "_id",
      dataIndex: "_id",
      title: "ID",
    },
    {
      key: "owner",
      dataIndex: "owner",
      title: "Chủ bài viết",
    },
    {
      key: "reportCount",
      dataIndex: "reportCount",
      title: "Lượt báo cáo",
    },
    {
      key: "commentCount",
      dataIndex: "commentCount",
      title: "Lượt bình luận",
    },
    {
      key: "likeCount",
      dataIndex: "likeCount",
      title: "Lượt thích",
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
    dispatch(fetchTableDataSaga({ ...searchValue, type: "posts" }));

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
      title={"Danh sách bài đăng"}
      onPaginationChange={handlePagination}
      currentPaginationIndex={searchValue.currentPaginationIndex}
      onSubmitFilter={handleSubmitFilter}
      limit={initialState.limit}
      filterComponents={
        <Fragment>
          <Row gutter={24}>
            <Col>
              <Item
                name="likeCountStart"
                key="likeCountStart"
                label={<SmallTitleStyled>Lượt thích từ:</SmallTitleStyled>}
              >
                <TextInputStyled type={"number"} onKeyPress={MakeOnlyInteger} />
              </Item>
            </Col>
            <Col>
              <Item
                name="likeCountEnd"
                key="likeCountEnd"
                label={<SmallTitleStyled>Lượt thích đến:</SmallTitleStyled>}
              >
                <TextInputStyled type={"number"} />
              </Item>
            </Col>
            <Col>
              <Item
                name="commentCountStart"
                key="commentCountStart"
                label={
                  <SmallTitleStyled>Lượt bình luận từ:</SmallTitleStyled>
                }
              >
                <TextInputStyled type={"number"} />
              </Item>
            </Col>
            <Col>
              <Item
                name="commentCountEnd"
                key="commentCountEnd"
                label={
                  <SmallTitleStyled>Lượt bình luận đến:</SmallTitleStyled>
                }
              >
                <TextInputStyled type={"number"} />
              </Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col>
              <Item
                name="reportCountStart"
                key="reportCountStart"
                label={
                  <SmallTitleStyled>Lượt báo cáo từ:</SmallTitleStyled>
                }
              >
                <TextInputStyled type={"number"} />
              </Item>
            </Col>
            <Col>
              <Item
                name="reportCountEnd"
                key="reportCountEnd"
                label={
                  <SmallTitleStyled>Lượt báo cáo đến:</SmallTitleStyled>
                }
              >
                <TextInputStyled type={"number"} />
              </Item>
            </Col>
            <Col>
              <Item
                name="createdAt"
                key="createdAt"
                label={<SmallTitleStyled>Ngày đăng bài</SmallTitleStyled>}
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

export default PostsTable;
