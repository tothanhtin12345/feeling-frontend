import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import CenterSpin from "./CenterSpin";
//code của mình
import SearchInput from "./SearchInput";
import UserCard from "./UserCard";
import UserCardRow from "./UserCardRow";
import UserCardCol from "./UserCardCol";

import NoDataTitle from "./NoDataTitle";

const UserCardsStyled = styled.div`
  margin-top: 16px;
`;

const commonKey = "user-cards-list";

//component nhận vào list, type, handleSearch để render các UserCard
//path: một phần đường dẫn dùng để kết hợp với id để chuyển hướng dến một trang cá nhân hoặc một group cụ thể
//itemsList có thể là một usersList hoặc một groupsList
//currentUserInformation: thông tin của người dùng đang sử dụng hệ thống
const UserCards = ({
  itemsList,
  currentUserInformation,
  type,
  handleSearch,
  path,
  handleGetMore,
  hasMore,
  //componene được đính kèm (có thể null)
  addtionalComponent = null,
  loading,
}) => {
  //tạo ra một thông báo không có dữ liệu (sau một khoảng thời gian)
  //nếu không có dữ liệu từ mảng itemsList

  return (
    <UserCardsStyled>
      {addtionalComponent != null && addtionalComponent}
      <SearchInput onSearch={handleSearch} />

      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={itemsList.length}
        next={handleGetMore}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        }
      >
        <UserCardRow>
          {itemsList.length > 0 &&
            itemsList.map((item, index) => (
              <UserCardCol key={`${commonKey}-${index}-${item._id}-${type}`}>
                <UserCard
                  path={path}
                  type={type}
                  currentUserInformation={currentUserInformation}
                  {...item}
                />
              </UserCardCol>
            ))}
          {loading !== true && itemsList.length <= 0 && (
            <NoDataTitle message={"Không có dữ liệu!"} />
          )}
        
        </UserCardRow>
      </InfiniteScroll>
    </UserCardsStyled>
  );
};
export default UserCards;
