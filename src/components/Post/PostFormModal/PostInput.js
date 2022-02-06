import { useState, useRef, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import styled from "styled-components";
import Picker from "emoji-picker-react";
import htmlParse from "html-react-parser";
//code của mình
import { ChatDropDownButtonStyled } from "../../Styled/Button";
import { SmallIconStyled } from "../../Styled/Icon";
import { updateContent } from "../../../store/modules/PostForm/slice";
import { getPostContent } from "../../../store/modules/PostForm/selectors";

const PostInputStyled = styled.div`
  .emoji-input {
    text-align: end;
    margin-bottom: 8px;
  }

  .input {
    outline: none;
    flex: 1;
    display: inline-block;
    padding: 0px 5px;
    width: 100%;
    max-width: 100%;
    /* max-height: 150px;
    overflow: scroll;
    overflow-y: auto;
    overflow-x: hidden; */
    position: relative;
  }
  .input:after {
    display: ${({ placeholder }) => (placeholder === "true" ? "table" : "none")};
    content: "Hãy chia sẻ câu chuyện của bạn";
    position: absolute;
    left: 1%;
    top: 0;
    color: #3e3f5e;
  }
  .emoji-input {
    padding: 0 5px;
  }
`;

//content: có thể rỗng hoặc có giá trị (lúc được thay đổi hoặc được nhập)
const PostInput = ({onContentChange, textInputRef, content}) => {
  
  
  




  //khi nhập dữ liệu (onInput) ô contenteditTable thay đổi
  const handleTextChange = (event) => {
    let text = event.target.innerHTML;
    
  
    
    //xóa đi dấu <br> thừa
    if(text==="<br>"){
      textInputRef.current.innerHTML = "";
      text=""
    }
    
    //gọi hàm xử lý thay đổi được truyền vào
    onContentChange(text)
  };

  //khi nhấn vào một icon
  const handleEmojiClick = (event, emojiObject) => {
    

    //trong contenteditable sẽ luôn có một thẻ br nằm cuối (ta không cần thẻ này)
    // do đó ta sẽ di chuyển con trỏ văn bản ngược lên nó để thêm icon

    let sel = document.getSelection();

    let nodes = textInputRef.current.childNodes;

    let lastNode = nodes[nodes.length - 1];

    let finalNode;

    //nếu chưa có gì trong input thì thêm trực tiếp vào
    if (nodes.length === 0) {
      textInputRef.current.append(
        document.createTextNode(emojiObject.emoji + " ")
      );
      //gọi hàm xử lý thay đổi được truyền vào
    onContentChange(textInputRef.current.innerHTML)
      return;
      //nếu đã có
    } else if (nodes.length === 1) {
      //nếu ở trong chỉ còn mỗi thẻ br
      if (lastNode.outerHTML === "<br>") {
        //thì xóa nó luôn
        textInputRef.current.innerHTML = "";
      }
      //thêm emoji vào
      textInputRef.current.append(
        document.createTextNode(emojiObject.emoji + " ")
      );
      //gọi hàm xử lý thay đổi được truyền vào
    onContentChange(textInputRef.current.innerHTML)
      return;
      //nếu có hơn 1
    } else if (nodes.length > 1) {
      //thẻ cuối là br
      if (lastNode.outerHTML === "<br>") {
        //thì điểm bắt đầu là phần tử trước thẻ br cuối này
        finalNode = nodes[nodes.length - 2];
      } else {
        //ngược lại không phải thẻ br thì điểm bắt đầu là ngay thẻ cuối
        finalNode = nodes[nodes.length - 1];
      }
     
    }

    let range = document.createRange();
    range.setStartAfter(finalNode);

    range.insertNode(document.createTextNode(emojiObject.emoji));

    sel.removeAllRanges();
    sel.addRange(range);
     //gọi hàm xử lý thay đổi được truyền vào
     onContentChange(textInputRef.current.innerHTML)
   
  };

  //xử lý khi nhấn nút Enter
  const handleKeypress = (event) => {
    if (event.key === "Enter") {
    }
  };

  return (
    <PostInputStyled placeholder={content.trim().length <=0 ? "true" : "false"}>
      <div
        
        id="post-input"
        contentEditable={true}
        className="input"
        onInput={handleTextChange}
        onKeyPress={handleKeypress}
        ref={textInputRef}
      >
        
      </div>
      <div className="emoji-input">
        <ChatDropDownButtonStyled
          overlayStyle={{zIndex:10006}}
          overlay={<Picker pickerStyle={{zIndex:10005}} onEmojiClick={handleEmojiClick} />}
          trigger={["click"]}
          icon={<SmallIconStyled className="fas fa-smile"></SmallIconStyled>}
        />
      </div>
    </PostInputStyled>
  );
};
export default PostInput;
