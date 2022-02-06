import { useState, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import { Avatar, Spin } from "antd";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OnlineAvatar from "../../../UI/OnlineAvatar";
import { debounce } from "lodash";

//code của mình
import {
  toggleHeaderActionButton,
  resetHeader,
} from "../../../../store/modules/Header/slice";
import { BigSearchInputStyled } from "../../../Styled/Input";
import { SmallIconStyled } from "../../../Styled/Icon";
import ListTile from "../../../UI/ListTile";
import { SmallTitleStyled } from "../../../Styled/Text";
import useClickOutside from "../../../../hooks/useClickOutside";
import {
  doHeaderSearchSaga,
  reset,
} from "../../../../store/modules/HeaderSearch/slice";
import {
  getGroupsHeaderSearch,
  getLoadingHeaderSearch,
  getUsersHeaderSearch,
} from "../../../../store/modules/HeaderSearch/selectors";
import InsideCenterSpin from "../../../UI/InsideCenterSpin";
import { IconButtonStyled } from "../../../Styled/Button";
import history from "../../../../utils/history"

const MainHeaderSearchStyled = styled.div`
  position: relative;



  & {

    .list-tile{
      .prefix{
        align-items:center;
      }
    }

    .header-main-search-result {
      display: none;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      background-color: #ffffff;
    }
    ${BigSearchInputStyled} {
      ${IconButtonStyled} {
        background-color: transparent;
      }
    }
  }

  &.on-search {
    .header-main-search-result {
      display: block;
      width: 100%;
      min-height: 100px;
      max-height: 500px;
      position: absolute;
      background-color: #ffffff;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      padding: 5px;
      overflow-y: scroll;
      overflow-x: hidden;
      //kích thước của toàn bộ thanh scrollbar (thanh chứa cục scroll và cả cục scroll)
      ::-webkit-scrollbar {
        width: 10px;
      }
      //màu của thanh scrollbar (nằm dưới cục scroll)
      ::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 8px;
      }
      //cái cục scroll
      ::-webkit-scrollbar-thumb {
        background: #ffffff;
      }
      //đổi màu cục scroll khi scroll vào
      :hover::-webkit-scrollbar-thumb {
        background: #ccced2;
      }

      //title của mỗi phần kết quả search
      .title-search-result {
        padding: 5px 10px;
      }
      .get-result-more {
        text-align: end;
        margin-top: 5px;
      }
      .no-result {
        padding: 5px;
        text-align: center;
      }
    }
    ${BigSearchInputStyled} {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

const MainHeaderSearch = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  //các kết quả search
  const groups = useSelector(getGroupsHeaderSearch);
  const users = useSelector(getUsersHeaderSearch);
  const loading = useSelector(getLoadingHeaderSearch);

  //value search
  const [value, setValue] = useState("");
  //dùng để set giá trị class name khi input thay đổi giá trị
  //thông qua classname này sẽ hiển thị một số thành phần
  const [className, setClassName] = useState("");

  const searchRef = useRef();

  useClickOutside({
    ref: searchRef,
    handleOutside: () => setClassName(""),
  });

  //khi giá trị input thay đổi
  const handleInputChange = debounce(
    (event) => {
      const inputValue = event.target.value;

      setValue((currentValue) => {
        return inputValue;
      });
    },
    [300]
  );

  //clear
  useEffect(() => {
    return () => {
      setClassName("");

      dispatch(reset());
    };
  }, [location.pathname]);

  useEffect(() => {
    //nếu giá trị search có thì hiện bảng search bằng cách setClassName thành on-search
    if (value.trim().length === 0) {
      setClassName("");
    } else {
      setClassName("on-search");
    }
    return () => {};
  }, [value]);

  useEffect(() => {
    if (className !== "on-search") return;
    const displayName = value;
    dispatch(doHeaderSearchSaga({ displayName, type: "both" }));

    return () => {
      dispatch(reset());
    };
  }, [value, className]);

  //có bất kì kết quả nào hay không ?
  const haveResult = !loading && (groups.length > 0 || users.length > 0);

  const onSearchClick = () => {
    //nếu khi người dùng nhấn vào thanh search -- mà còn dữ liệu search thì hiển thị lên cái bảng kết quả
    if (value.length > 0) {
      setClassName("on-search");
    }
    //dispatch(toggleHeaderActionButton("Search"));
  };

  //khi nhấn nút tìm kiếm
  const handleButtonSearchClick = () => {
    if(value.trim().length <=0)return;
    history.push(`/search?type=users&displayName=${value}`)
    setClassName("");
    dispatch(reset());
  }


  return (
    <MainHeaderSearchStyled className={className} ref={searchRef}>
      <BigSearchInputStyled
        prefix={
          <IconButtonStyled
            onClick={handleButtonSearchClick}
            className="search-button"
            icon={<SmallIconStyled className="fas fa-search"></SmallIconStyled>}
          />
        }
        placeholder="Tìm kiếm trên Feeling"
        onChange={handleInputChange}
        onClick={onSearchClick}
        /* Hiển thị icon clear input */
        allowClear={true}
      />

      <div className="header-main-search-result">
        {loading && <InsideCenterSpin />}

        

        {loading === false && haveResult === false && (
          <div className="no-result">
            <SmallTitleStyled>Không tìm thấy kết quả</SmallTitleStyled>
          </div>
        )}

        {users.length > 0 && (
          <div>
            {" "}
            <div className="title-search-result">
              <SmallTitleStyled color="#615DFA">
                Kết quả người dùng
              </SmallTitleStyled>
            </div>
            {users.map((user, index) => (
              <NavLink
                key={`header-search-user-${user._id}-${index}`}
                to={`/wall/${user._id}`}
              >
                <ListTile
                  showAction={false}
                  avatar={
                    <OnlineAvatar
                      size={26}
                      avatar={user.avatar ? user.avatar.files[0].fileUrl : null}
                    />
                  }
                  title={
                    <SmallTitleStyled className="text-responsive">
                      {user.informations.displayName}
                    </SmallTitleStyled>
                  }
                />
              </NavLink>
            ))}
          </div>
        )}

        {/* Fetch data tìm kiếm ở đây */}
        {groups.length > 0 && (
          <div>
            {" "}
            <div className="title-search-result">
              <SmallTitleStyled color="#615DFA">
                Kết quả cho nhóm
              </SmallTitleStyled>
            </div>
            {groups.map((group, index) => (
              <NavLink
                key={`header-search-group-${group._id}-${index}`}
                to={`/groups/${group._id}`}
              >
                <ListTile
                  showAction={false}
                  avatar={
                    <OnlineAvatar
                      size={26}
                      avatar={group.avatar ? group.avatar.files[0].fileUrl : null}
                    />
                  }
                  title={
                    <SmallTitleStyled className="text-responsive">
                      {group.informations.displayName}
                    </SmallTitleStyled>
                  }
                />
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </MainHeaderSearchStyled>
  );
};
export default MainHeaderSearch;
