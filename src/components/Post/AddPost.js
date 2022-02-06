import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//code của mình
import Card from "../UI/Card";
import OnlineAvatar from "../UI/OnlineAvatar";
import { MediumContentStyled } from "../Styled/Text";
import { getUserId, getUserAvatar } from "../../store/modules/User/selectors";
import { toggleAddPostFormModalVisible } from "../../store/modules/PostForm/slice";

const AddPostStyled = styled.div`
  
  padding: 10px;
  display: flex;
  align-items: center;
  column-gap: 10px;
  .input {
    border: 1px solid transparent;
    border-radius: 30px;
    background-color: #f0f2f5;

    width: 100%;
    padding: 10px 10px;
    cursor: pointer;
  }
`;
//onInputClick: hàm xảy ra khi nhấn vào cái ô input
const AddPost = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const avatar = useSelector(getUserAvatar);

  //hàm xử lý khi nhấn vào ô input
  const handleInputClick = () => {
    dispatch(toggleAddPostFormModalVisible(true));

  }
  return (
    <Card style={{marginBottom:"16px"}}>
      <AddPostStyled>
        <div className="prefix">
          <NavLink to={`/wall/${userId}`}>
            <OnlineAvatar
              avatar={avatar ? avatar.files[0].fileUrl : null}
              size={40}
            />
          </NavLink>
        </div>

        <div className="input" onClick={handleInputClick}>
          <MediumContentStyled>
            Hãy chia sẻ câu chuyện của bạn
          </MediumContentStyled>
        </div>
      </AddPostStyled>
    </Card>
  );
};
export default AddPost;
