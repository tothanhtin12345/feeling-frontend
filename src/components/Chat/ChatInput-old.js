import { useRef, useState } from "react";
import styled from "styled-components";
import { encode, decode } from "html-entities";
import InputEmoji from "react-input-emoji";
const ChatInputWrapperStyled = styled.div`
  display: flex;
  min-width: 0;
  max-width: 100%;
  column-gap: 10px;
  align-items: center;
  & {
    .text-input {
      flex: 1;
      display: flex;
      align-items: flex-end;
      min-width: 0;
      max-width: 100%;
      border: 1px solid transparent;
      border-radius: 15px;
      background-color: #f0f2f5;

      .react-input-emoji--placeholder {
        left: 0px;
      }
      .react-input-emoji--input {
        padding: 0px;
      }
      .react-input-emoji--button {
        display: flex;
      }

      .react-emoji {
        background-color: #f0f2f5;
        border-radius: 15px;

        .react-input-emoji--wrapper {
          background-color: #f0f2f5;
        }
        .react-input-emoji--button {
          svg {
            width: 20px;
            height: 20px;
            fill: #615dfa;
          }
        }
      }
      //khung chứa emojis
      .emoji-mart {
        width: 100% !important;
        //biểu tượng một mục emoji
        .emoji-mart-anchor.emoji-mart-anchor-selected {
          color: #615dfa !important;
        }
        //dấu gạch dưới được hiển thị khi chọn một mục
        .emoji-mart-anchor-bar {
          background-color: #615dfa !important;
        }
      }
    }
  }
`;

const ChatInput = () => {
  const [text, setText] = useState("");

  // const handleSendMessage = (event) => {
  //   const textValue = event.target.innerHTML;

  //   if (event.key === "Enter" && textValue.trim().length > 0) {
  //     //các câu lệnh dưới đây ngăn không cho tạo ra thẻ div br khi nhấn Enter
  //     var docFragment = document.createDocumentFragment();

  //     //add a new line
  //     var newEle = document.createTextNode("\n");
  //     docFragment.appendChild(newEle);

  //     //add the br, or p, or something else
  //     newEle = document.createElement("br");
  //     docFragment.appendChild(newEle);

  //     //make the br replace selection
  //     var range = window.getSelection().getRangeAt(0);
  //     range.deleteContents();
  //     // range.insertNode(docFragment);

  //     //create a new range
  //     range = document.createRange();
  //     range.setStartAfter(newEle);
  //     range.collapse(true);

  //     //make the cursor there
  //     var sel = window.getSelection();
  //     sel.removeAllRanges();
  //     sel.addRange(range);

  //     return false;
  //   }
  // };

  const handleTextChange = (event) => {
    console.log(event.target.value);
  };

  const handleSendMessage = () => {
    let sel;
    let range;

    if (window.getSelection) {
      // IE9 and non-IE
      sel = window.getSelection();

      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents(); // Range.createContextualFragment() would be useful here but is
        // non-standard and not supported in all browsers (IE9, for one)

        const el = document.createElement("span");
        el.innerHTML="haha"
       
        const frag = document.createDocumentFragment();
        let node;
        let lastNode;

        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }

        range.insertNode(frag); // Preserve the selection

        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  };

  return (
    <ChatInputWrapperStyled>
      {/* chỗ nhập input */}
      <div className="text-input">
        {/* Cái input */}
        {/* <div
          contentEditable={true}
          placeholder="Aa"
          className="input"
          onKeyPress={handleSendMessage}
        >
          {text}
        </div> */}

        <InputEmoji
          height={20}
          value={text}
          onChange={setText}
          onEnter={handleSendMessage}
          placeholder="Aa"
        />
      </div>

      {/* chỗ thêm hình */}
      <div className="image-input">Thêm hình</div>
    </ChatInputWrapperStyled>
  );
};

export default ChatInput;
