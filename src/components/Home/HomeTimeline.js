import { useEffect } from "react";
import { Col, Row, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

//code của mình
import Posts from "../Post/Posts";
import AddPost from "../Post/AddPost";

import { TimelineStyled } from "../Styled/Timeline";
import { fetchHomePostSaga, reset } from "../../store/modules/Home/slice";
import {
  getAddPostModalVisible,
  getEditPostModalVisible,
  getHomePosts,
  getHomePostsCanLoad,
  getHomePostsFetchLoading,
} from "../../store/modules/Home/selectors";

import NoDataTitle from "../UI/NoDataTitle";

const HomeTimeline = () => {
  const dispatch = useDispatch();

  const loading = useSelector(getHomePostsFetchLoading);
  const canLoad = useSelector(getHomePostsCanLoad);
  const posts = useSelector(getHomePosts);

  //hàm xử lý để lấy thêm dữ liệu
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    if (loading) return;
    dispatch(fetchHomePostSaga());
  };

  //ở đây ta sẽ dùng một effect để get 10 posts mới nhất

  useEffect(() => {
    dispatch(fetchHomePostSaga());

    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <TimelineStyled id="home-timeline-wrapper">
      <Row justify="center">
        <Col xs={24} sm={20} md={18} xl={16}>
          <AddPost />
          <InfiniteScroll
            dataLength={posts.length}
            next={handleGetMore}
            hasMore={canLoad}
           
          >
            {loading !== true && posts.length <= 0 && (
              <NoDataTitle message={"Không có bài viết nào để hiển thị"} />
            )}
            
            {posts.length > 0 && <Posts posts={posts} />}
            {loading === true && posts.length <= 0 && (
              <div style={{ textAlign: "center" }}>
                <Spin />
              </div>
            )}
          </InfiniteScroll>
        </Col>
      </Row>

      {/* Dùng để hiển thị modal chia sẻ bài post - sẽ làm sau */}
    </TimelineStyled>
  );
};
export default HomeTimeline;
