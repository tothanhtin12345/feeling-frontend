import { useState } from "react";
import { Form, Radio } from "antd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
//code của mình
import { ModalStyled } from "../../Styled/Modal";
import { MediumTitleStyled, SmallTitleStyled } from "../../Styled/Text";
import { MediumSearchInputStyled } from "../../Styled/Input";
import { SmallIconStyled } from "../../Styled/Icon";
import { CheckBoxStyled } from "../../Styled/Input";
import ListTile from "../../UI/ListTile";
import OnlineAvatar from "../../UI/OnlineAvatar";
import { RectangleButtonStyled } from "../../Styled/Button";
import { toggleAddMembersModalVisible } from "../../../store/modules/Chat/slice";

const { Item } = Form;

const AddMembersModalResultStyled = styled.div`
  margin-top: 16px;

  &&& {
  }
  .result-wrapper {
    max-height: 250px;
    overflow: scroll;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
  }
  .item-search {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .list-tile:hover {
      background-color: transparent;
      .prefix {
        align-items: center;
      }
    }
    .list-tile {
      .prefix {
        align-items: center;
      }
    }
  }
`;

const FRIENDS_DUMMY = [
  {
    _id: "user_id_1",
    avatar: {
      fileUrl:
        "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/128194012_1111179915989899_5561972650668570089_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=W3qrxl4qFI0AX8KBNcz&_nc_ht=scontent.fsgn4-1.fna&oh=dad2de30b735d145ea8240ceacb29341&oe=614FECD4",
    },
    displayName: "Thanh Tín",
  },
  {
    _id: "user_id_2",
    avatar: {
      fileUrl:
        "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/128194012_1111179915989899_5561972650668570089_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=W3qrxl4qFI0AX8KBNcz&_nc_ht=scontent.fsgn4-1.fna&oh=dad2de30b735d145ea8240ceacb29341&oe=614FECD4",
    },
    displayName: "Thanh Toản",
  },
  {
    _id: "user_id_3",
    avatar: {
      fileUrl:
        "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/128194012_1111179915989899_5561972650668570089_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=W3qrxl4qFI0AX8KBNcz&_nc_ht=scontent.fsgn4-1.fna&oh=dad2de30b735d145ea8240ceacb29341&oe=614FECD4",
    },
    displayName: "Thanh Toàn",
  },
  {
    _id: "user_id_4",
    avatar: {
      fileUrl:
        "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/128194012_1111179915989899_5561972650668570089_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=W3qrxl4qFI0AX8KBNcz&_nc_ht=scontent.fsgn4-1.fna&oh=dad2de30b735d145ea8240ceacb29341&oe=614FECD4",
    },
    displayName: "Thanh Toàn",
  },
];

const AddMembersModal = ({ visible, conversationId }) => {
  const dispatch = useDispatch();
  const [friendsValue, setFriendsValue] = useState({});

  //khi search
  const handleSearchFriends = (event) => {
    console.log(event.target.value);
  };

  //khi chọn một checkbox
  const handleCheckboxChange = (event) => {
    let name = event.target.name;
    let checked = event.target.checked;
    friendsValue[name] = checked;
    //set giá trị mới
    setFriendsValue((currentFriendsValue) => {
      return {
        ...currentFriendsValue,
        ...friendsValue,
      };
    });
  };

  //khi nộp form
  const handleFormSubmit = (values) => {
   
    console.log(friendsValue);
  };

  return (
    <ModalStyled
      onCancel={() => {
        dispatch(toggleAddMembersModalVisible(false));
      }}
      visible={visible}
      title={<MediumTitleStyled>Mời thành viên</MediumTitleStyled>}
      footer={null}
      zIndex={10005}
    >
      <div>
        <MediumSearchInputStyled
          prefix={<SmallIconStyled className="fas fa-search"></SmallIconStyled>}
          placeholder="Tìm kiếm bạn bè"
          onChange={handleSearchFriends}
        />
      </div>
      <AddMembersModalResultStyled>
        <Form onFinish={handleFormSubmit}>
          <Item
            name="friendSelected"
            key="friendSelected"
            className="result-wrapper"
          >
            {FRIENDS_DUMMY.map((friend, index) => (
              <div
                key={`add_friend_item_result-${index}-${friend._id}`}
                className="item-search"
              >
                <ListTile
                  showAction={false}
                  avatar={
                    <OnlineAvatar
                      size={40}
                      online={false}
                      avatar={friend.avatar.fileUrl}
                    />
                  }
                  title={
                    <SmallTitleStyled>{friend.displayName}</SmallTitleStyled>
                  }
                />
                <CheckBoxStyled
                  onChange={handleCheckboxChange}
                  name={friend._id}
                />
              </div>
            ))}
          </Item>
          <RectangleButtonStyled textcolor="#FFFFFF" width="100%">
            <MediumTitleStyled>Xác nhận</MediumTitleStyled>
          </RectangleButtonStyled>
        </Form>
      </AddMembersModalResultStyled>
    </ModalStyled>
  );
};
export default AddMembersModal;
