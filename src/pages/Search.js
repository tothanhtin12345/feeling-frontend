import { Switch, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ListTile from "../components/UI/ListTile";
import OnlineAvatar from "../components/UI/OnlineAvatar";
import { Affix, Spin } from "antd";

//code của mình

import { breakpoint } from "../components/Styled/mixin";
import {
  BigTitleStyled,
  MediumTitleStyled,
  SmallContentStyled,
  SmallTitleStyled,
} from "../components/Styled/Text";
import {
  getGroupsSearchPage,
  getLoadingSearchPage,
  getUsersSearchPage,
  getCanLoadSearchPage,
} from "../store/modules/SearchPage/selectors";
import { doSearchPageSaga, reset } from "../store/modules/SearchPage/slice";
import { MediumIconStyled, SmallIconStyled } from "../components/Styled/Icon";

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

const SearchStyledWrapper = styled.div`
  padding: 20px;

  .search-title {
    text-align: center;
  }

  .search-area {
    display: flex;
    //đảo ngược vị trí phần tử khi wrap
    flex-wrap: wrap-reverse;
    justify-content: space-between;
    align-items: start;
    flex-direction: wrap;
    column-gap: 10px;
    row-gap: 10px;

    .result {
      width: 100%;
      background-color: #ffffff;
      padding: 10px;
      min-height: calc(100vh - 90px);
      border: 1px solid transparent;
      border-radius: 10px;
    }
    .navigation-wrapper {
      width: 100%;

      .navigation {
        padding: 15px;
        background-color: #ffffff;
        max-height: 200px;
        border: 1px solid transparent;
        border-radius: 10px;
      }

      .navigation-title {
        text-align: center;
      }
      .navigation-action {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }
      .nav-item {
        display: flex;
        align-items: center;
        column-gap: 15px;
        padding: 5px 10px;
        border: 1px solid transparent;
        border-radius: 10px;
      }
      .nav-item:hover {
        background-color: #eaeafd;
      }
      .nav-item.chosen {
        background-color: #615dfa;
        ${MediumIconStyled},${MediumTitleStyled} {
          color: #ffffff;
        }
      }
    }

    ${breakpoint.lg`
        .result{
            width: 68%;
        }
        .navigation-wrapper{
            width: 28%;
        }
    `}
  }
`;

const Search = () => {
  const dispatch = useDispatch();

  const loading = useSelector(getLoadingSearchPage);
  const users = useSelector(getUsersSearchPage);
  const groups = useSelector(getGroupsSearchPage);
  const canLoad = useSelector(getCanLoadSearchPage);

  const location = useLocation();

  const pathname = location.pathname;

  const urlParams = new URLSearchParams(window.location.search);

  const displayName = urlParams.get("displayName") || "";
  const type = urlParams.get("type") || "users";

  useEffect(() => {
    dispatch(
      doSearchPageSaga({
        type,
        displayName,
      })
    );

    return () => {
      dispatch(reset());
    };
  }, [type, displayName]);

  const handleGetMore = () => {
    if (loading) return;

    dispatch(
      doSearchPageSaga({
        type,
        displayName,
      })
    );
  };

  return (
    <InfiniteScroll
      style={{ overflow: "hidden" }}
      dataLength={type === "users" ? users.length : groups.length}
      next={handleGetMore}
      hasMore={canLoad}
    >
      <SearchStyledWrapper>
        <div className="search-area">
          <div className="result">
            <div className="search-title">
              <BigTitleStyled>
                {loading === false &&
                  groups.length <= 0 &&
                  users.length <= 0 &&
                  "Không tìm thấy kết quả phù hợp"}
                {(groups.length > 0 || users.length) > 0 &&
                  `Kết quả tìm kiếm ${
                    type === "users" ? "người dùng" : "nhóm"
                  } theo tên: ${displayName}`}
              </BigTitleStyled>{" "}
            </div>
            {type === "users" && (
              <div>
                {users.map((user, index) => (
                  <NavLink
                    key={`search-page-user-${user._id}-${index}`}
                    to={`/wall/${user._id}`}
                  >
                    <ListTile
                      showAction={false}
                      avatar={
                        <OnlineAvatar
                          size={48}
                          avatar={
                            user.avatar ? user.avatar.files[0].fileUrl : null
                          }
                        />
                      }
                      title={
                        <SmallTitleStyled className="text-responsive">
                          {user.informations.displayName}
                        </SmallTitleStyled>
                      }
                      subTitle={
                        <SmallContentStyled>
                          {user.isCurrentUser && "Chính là bạn"}

                          {user.isCurrentUser === false &&
                            user.sameFriendCount > 0 &&
                            `Có ${user.sameFriendCount} bạn chung`}

                          {user.isCurrentUser === false &&
                            user.sameFriendCount <= 0 &&
                            (user.friendsCount > 0
                              ? `Có ${user.friendsCount} bạn bè`
                              : `Không có bạn bè`)}
                        </SmallContentStyled>
                      }
                    />
                  </NavLink>
                ))}
              </div>
            )}
            {type === "groups" && (
              <div>
                {groups.map((group, index) => (
                  <NavLink
                    key={`search-page-group-${group._id}-${index}`}
                    to={`/groups/${group._id}`}
                  >
                    <ListTile
                      showAction={false}
                      avatar={
                        <OnlineAvatar
                          size={48}
                          avatar={
                            group.avatar ? group.avatar.files[0].fileUrl : null
                          }
                        />
                      }
                      title={
                        <SmallTitleStyled className="text-responsive">
                          {group.informations.displayName}
                        </SmallTitleStyled>
                      }
                      subTitle={
                        <SmallContentStyled>{`Có ${group.memberCount} thành viên `}</SmallContentStyled>
                      }
                    />
                  </NavLink>
                ))}
              </div>
            )}
            {loading === true && (
              <div style={{ textAlign: "center" }}>
                <Spin />
              </div>
            )}
          </div>
          <AffixStyled className="navigation-wrapper">
            <div className="navigation">
              <div className="navigation-title">
                <MediumTitleStyled color="#615dfa">Tìm kiếm</MediumTitleStyled>
              </div>
              <div className="navigation-action">
                <div>
                  <NavLink
                    to={`${pathname}?type=users&displayName=${displayName}`}
                    className={`nav-item ${type === "users" && "chosen"}`}
                  >
                    <MediumIconStyled className="fas fa-user-friends"></MediumIconStyled>
                    <MediumTitleStyled>Người dùng</MediumTitleStyled>
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    to={`${pathname}?type=groups&displayName=${displayName}`}
                    className={`nav-item ${type === "groups" && "chosen"}`}
                  >
                    <MediumIconStyled className="fas fa-users"></MediumIconStyled>
                    <MediumTitleStyled>Nhóm</MediumTitleStyled>
                  </NavLink>
                </div>
              </div>
            </div>
          </AffixStyled>
        </div>
      </SearchStyledWrapper>
    </InfiniteScroll>
  );
};

export default Search;
