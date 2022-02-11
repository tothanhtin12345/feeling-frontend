import { useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Col, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
//code của mình
import NoDataTitle from "../UI/NoDataTitle";
import {
  getGroupsDashboardPosts,
  getGroupsDashboardCanLoad,
  getGroupsDashboardFetchLoading,
  getGroupDashboardPostFirstLoad,
} from "../../store/modules/GroupsDashboard/selectors";
import { fetchGroupDashboardPostsSaga, setGroupDashboardPostFirstLoad, reset } from "../../store/modules/GroupsDashboard/slice";
import Posts from "../Post/Posts";

const GroupsDashboardTimelineStyled = styled.div`
  margin-top: 16px;
`;

const GroupsDashboardTimeline = () => {
  const dispatch = useDispatch();

  const posts = useSelector(getGroupsDashboardPosts);
  const canLoad = useSelector(getGroupsDashboardCanLoad);
  const loading = useSelector(getGroupsDashboardFetchLoading);
  const postFirstLoad = useSelector(getGroupDashboardPostFirstLoad);

  //hàm xử lý để lấy thêm dữ liệu
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    if (loading) return;
    dispatch(fetchGroupDashboardPostsSaga());
  };

  //nếu k muốn load lại dữ liệu thì mở ra
  // useEffect(() => {
  //   if(postFirstLoad) return;
  //   dispatch(fetchGroupDashboardPostsSaga());
  //   dispatch(setGroupDashboardPostFirstLoad(true));
  // }, []);

  useEffect(() => {

    dispatch(fetchGroupDashboardPostsSaga());
    return () => {
      dispatch(reset());
    }
  }, []);

  return (
    <GroupsDashboardTimelineStyled>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} xl={14}>
          <InfiniteScroll
            dataLength={posts.length}
            next={handleGetMore}
            hasMore={canLoad}
          
          >
            {loading !== true && posts.length <= 0 && <NoDataTitle message={"Không có bài viết nào để hiển thị"}/>}
            
            {posts.length > 0 && <Posts posts={posts} />}
            {loading === true && (
              <div style={{ textAlign: "center" }}>
                <Spin />
              </div>
            )}
          </InfiniteScroll>
        </Col>
      </Row>
    </GroupsDashboardTimelineStyled>
  );
};
export default GroupsDashboardTimeline;
