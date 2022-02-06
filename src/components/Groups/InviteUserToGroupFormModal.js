import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { Spin } from "antd";
//code của mình

import { ModalStyled } from "../Styled/Modal";
import { MediumTitleStyled, SmallTitleStyled } from "../Styled/Text";
import {
  getInviteUserToGroupFormSearchLoading,
  getInviteUserToGroupFormSubmitLoading,
  getInviteUserToGroupFormUsers,
} from "../../store/modules/InviteUserToGroupForm/selectors";

import {
  toggleInviteUserModalVisible,
  searchUserToInviteSaga,
  resetSearchResult,
  reset,
  submitInviteUserFormSaga,
} from "../../store/modules/InviteUserToGroupForm/slice";
import { MediumSearchInputStyled } from "../Styled/Input";
import { SmallIconStyled } from "../Styled/Icon";
import InsideCenterSpin from "../UI/InsideCenterSpin";
import ListTile from "../UI/ListTile";
import OnlineAvatar from "../UI/OnlineAvatar";
import { RectangleButtonStyled } from "../Styled/Button";

const InviteUserToGroupFormModalStyled = styled(ModalStyled)`
  &&& {
    .chosen-wrapper {
      .chosen-title {
        margin-top: 8px;
      }
    }
    .search-result,
    .chosen-area {
      margin-top: 8px;
      max-height: 200px;
      min-height: 200px;
      overflow: scroll;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .result-notification {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;
    }
  }
`;

const InviteUserToGroupFormModal = ({ visible, groupId }) => {
  const dispatch = useDispatch();

  //những user đã được chọn
  const [usersChosen, setUsersChosen] = useState([]);
  const [displayName, setDisplayname] = useState("");

  const searchLoading = useSelector(getInviteUserToGroupFormSearchLoading);
  const submitLoading = useSelector(getInviteUserToGroupFormSubmitLoading);
  const users = useSelector(getInviteUserToGroupFormUsers);

  //khi nhấn nút đóng close
  const handleCloseClick = () => {
    if (submitLoading) return;
    dispatch(toggleInviteUserModalVisible(false));
  };

  //khi search
  const handleSearchFriend = debounce(
    (event) => {
      const value = event.target.value;
      setDisplayname((currentValue) => {
        return value;
      });
    },
    [300]
  );

  //khi nhấn vào một kết quả search (một user)
  const handleOnClickUser = (user) => {
    //thêm nó vào mảng usersChosen
    setUsersChosen((currentList) => {
      currentList = [...currentList, user];
      return currentList;
    });
  };

  //khi nhấn vào một user đã chọn
  const handleOnClickUserInUsersChosen = (userId) => {
    //bỏ thằng đó ra khỏi mạng chosen
    setUsersChosen((currentList) => {
      currentList = currentList.filter((user) => user._id !== userId);
      return currentList;
    });
  };

  //khi nhấn nộp form
  const handleOnSubmit = () => {
    //gửi lên cho server mảng _id của các users được chọn và groupId
 
    const usersChosenId = usersChosen.map((user) => user._id);
    dispatch(submitInviteUserFormSaga({usersChosenId, groupId}));
  }

  //use effect dùng để search

  useEffect(() => {
    //gửi lên mảng id người dùng đã chọn, groupId và displayName
    const usersChosenId = usersChosen.map((user) => user._id);

    dispatch(searchUserToInviteSaga({ displayName, usersChosenId, groupId }));

    return () => {
      //không cần thêm hàm này, nó sẽ làm cho dữ liệu bị giật giật
      //dispatch(resetSearchResult());
    };
  }, [displayName, usersChosen, groupId]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [groupId]);

  return (
    <InviteUserToGroupFormModalStyled
      zIndex={10004}
      onCancel={handleCloseClick}
      visible={visible}
      footer={null}
      title={<MediumTitleStyled>Mời bạn bè vào nhóm</MediumTitleStyled>}
    >
      <div>
        <MediumSearchInputStyled
          prefix={<SmallIconStyled className="fas fa-search"></SmallIconStyled>}
          placeholder="Tìm kiếm bạn bè"
          onChange={handleSearchFriend}
        />
        <div className="search-area">
          {users.length > 0 && (
            <div className="search-result">
              {submitLoading && <InsideCenterSpin />}
              {!submitLoading &&
                users.map((user) => (
                  <ListTile
                    id={user._id}
                    key={user._id + "search_invite_group"}
                    title={user.informations.displayName}
                    avatar={
                      <OnlineAvatar
                        avatar={
                          user.avatar ? user.avatar.files[0].fileUrl : null
                        }
                      />
                    }
                    showAction={false}
                    onClick={handleOnClickUser.bind(null, user)}
                  />
                ))}
            </div>
          )}
          {users.length <= 0 && (
            <div className="result-notification">
              <SmallTitleStyled>Không tìm thấy người bạn nào</SmallTitleStyled>
            </div>
          )}
        </div>
      </div>
      <div className="chosen-wrapper">
        {usersChosen.length > 0 && (
          <div>
            <div className="chosen-title">
              <SmallTitleStyled>Đã chọn</SmallTitleStyled>
            </div>
            <div className="chosen-area">
              {usersChosen.map((user) => (
                <ListTile
                  id={user._id}
                  key={user._id + "search_invite_group_chosen"}
                  title={user.informations.displayName}
                  avatar={
                    <OnlineAvatar
                      avatar={user.avatar ? user.avatar.files[0].fileUrl : null}
                    />
                  }
                  showAction={false}
                  onClick={handleOnClickUserInUsersChosen.bind(null, user._id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Spin spinning={submitLoading}>
      <RectangleButtonStyled
        style={{ marginTop: "16px" }}
        type="submit"
        width="100%"
        textcolor="#FFFFFF"
        disabled={usersChosen.length <=0}
        onClick={handleOnSubmit}
      >
        <SmallTitleStyled>
          {submitLoading ? "Đang xử lý" : "Mời bạn"}
        </SmallTitleStyled>
      </RectangleButtonStyled>
      </Spin>
    </InviteUserToGroupFormModalStyled>
  );
};

export default InviteUserToGroupFormModal;
