import styled from "styled-components";
//code của mình
import ChatInput from "../Chat/ChatInput";

const CommentInputStyled = styled.div`
  position: relative;
  &&& {
    .input {
      padding: 5px;
    }
  }
  &{
    .tags-suggest{
      position: absolute;
      width: 100%;
      height: 100px;
      background-color: red;
      bottom:40px;
      left: 0;
      display: none;
    }
    .tags-suggest.active{
      display: block;
    }
  }
`;

//onEnterMessage: khi nhấn Enter vào ô input
const CommentInput = ({ onEnterInput, onChangeInput, textDefaultValue, topEmoji }) => {
  /*ta có thể dùng ChatInput cho phần Comment Input*/
  return (
    <CommentInputStyled>
      <div className="tags-suggest">1234</div>
      <ChatInput
        textDefaultValue={textDefaultValue}
        onChangeInput={onChangeInput}
        showAddImage={false}
        onEnterInput={onEnterInput}
        placeholderContent="Nhập bình luận"
        topEmoji={topEmoji}
      />
      
    </CommentInputStyled>
  );
};
export default CommentInput;
