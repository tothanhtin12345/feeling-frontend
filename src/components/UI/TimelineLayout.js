import styled from "styled-components";
import { Row, Col, Spin, Affix } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { breakpoint } from "../Styled/mixin";

//code của mình
import InformationCard from "../Wall/WallTimeline/InformationCard";
import ImageGridCard from "../Wall/WallTimeline/ImageGridCard";

import AddPost from "../Post/AddPost";
import Posts from "../Post/Posts";
import useGetMiniPhotos from "../../hooks/wall/useGetMiniPhotos";
import NoDataTitle from "./NoDataTitle";

const TimelineLayoutStyled = styled.div`
  margin-top: 16px;
`;

const AffixStyled = styled(Affix)`
  &&& {
    div[aria-hidden="true"] {
      height: 0px !important;
    }
    .ant-affix {
      top: 0 !important;
      position: unset !important;
    }

    ${breakpoint.md`
     
      .ant-affix{
        position: fixed !important;
        top:70px !important;
      }
    `}
  }
`;

const commonKey = "timeline-layout";
//một khung định hình cho các phần của một timeline (dành cho cả wall và groups)
//informationsList mảng các informations
//type: "groups" hoặc "individual"
//images: các hình ảnh sẽ được hiển thị ở dạng lưới
//wallUserId: id người dùng hiện tại (dành cho timeline ở wall)
//isCurrentUser: có phải chủ nhân của trang không ? (dành cho individual)
//isMember: có phải thành viên của nhóm không (dành cho groups)
//onAddPostInputClick: khi nhấn vào thanh input để thêm
//handleGetMore: hàm xử lý để lấy thêm dữ liệu
//hasMore: giá trị bool - quyết định xem có lấy tiếp dữ liệu hay không ?
const TimelineLayout = ({
  informationsList,
  type,

  wallUserId,
  isCurrentUser,
  currentGroupId,
  isMember,

  posts = [],
  handleGetMore,
  hasMore,
  loading,
}) => {
  //dùng Hook để lấy ra photos (chỉ dùng khi type === "individual")
  const { photos } = useGetMiniPhotos({ active: type === "individual" });

  return (
    <TimelineLayoutStyled>
      <Row gutter={{ md: 20, lg: 20 }}>
        <Col xs={24} md={10} lg={8} style={{ marginBottom: "16px" }}>
          <AffixStyled>
            <div>
              <div>
                {informationsList.map((item, index) => (
                  <InformationCard
                    key={`${commonKey}-"big-if-card"-${index}-${item.title}`}
                    informations={item.informations}
                    title={item.title}
                  />
                ))}
              </div>
              {type === "individual" && photos.length > 0 && (
                <ImageGridCard
                  type="mini"
                  files={photos}
                  wallUserId={wallUserId}
                  hasMore={false}
                />
              )}
            </div>
          </AffixStyled>
        </Col>

        <Col xs={24} md={14} lg={16}>
          {((type === "individual" && isCurrentUser) ||
            (type === "groups" && isMember)) && <AddPost />}
          <InfiniteScroll
            dataLength={posts.length}
            next={handleGetMore}
            hasMore={hasMore}
            
          >
            {loading !== true && posts.length <= 0 && (
              <NoDataTitle message={"Không có bài viết nào để hiển thị"} />
            )}
            
            {posts.length > 0 && <Posts posts={posts} />}
            {loading === true && (
              <div style={{ textAlign: "center" }}>
                <Spin />
              </div>
            )}
          </InfiniteScroll>
        </Col>
      </Row>
    </TimelineLayoutStyled>
  );
};

export default TimelineLayout;
