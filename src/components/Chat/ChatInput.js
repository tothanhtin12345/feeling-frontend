import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";

//code của mình
import { ChatDropDownButtonStyled, IconButtonStyled } from "../Styled/Button";
import { SmallIconStyled } from "../Styled/Icon";
import ChatUploadImage from "./ChatUploadImage";
import useClickOutside from "../../hooks/useClickOutside";

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
      align-items: center;
      min-width: 0;
      max-width: 100%;
      border: 1px solid transparent;
      border-radius: 15px;
      background-color: #f0f2f5;
      padding: 1px 10px;
      column-gap: 10px;

      .input {
        outline: none;
        flex: 1;
        display: inline-block;
        padding: 0px 5px;
        max-width: 100%;
        max-height: 80px;
        overflow: scroll;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
      }
      .input:empty::before {
        content: attr(placeholdercontent);
      }
    }
  }
`;

//onEnterInput: một hàm được truyền vào và được thực hiện khi người dùng nhấn Enter vào ô input

const ChatInput = ({
  onChangeInput,
  showAddImage = true,
  onEnterInput,
  placeholdercontent = "Aa",
  textDefaultValue,
  //Bảng Emoji sẽ được nằm dưới hay trên (top or bottom)
  topEmoji = true,
  onStartUploadFile,
  onFinishUploadFile,
  onFailedUploadFile,
}) => {
  const [placeholder, setPlaceholder] = useState("true");
  const [displayEmoji, setDisplayEmoji] = useState(false);
  const chatInputRef = useRef(null);
  const emoijiRef = useRef(null);

  //hook này bắt sự kiện ta click ra bên ngoài emoji để đóng cái bảng emoji lại
  useClickOutside({
    ref: emoijiRef,
    handleOutside: () => setDisplayEmoji(false),
  });

  const handleEnterPress = (event) => {
    // event.preventDefault();
    const text = event.target.innerHTML;

    if (event.key === "Enter") {
      chatInputRef.current.focus();
      //ngăn không tạo thẻ div
      const sel = window.getSelection();
      sel.removeAllRanges();

      //nếu có dữ liệu thì tiến hành gọi hàm onEnter để thực hiện một hành động
      if (text.trim().length > 0) {
        event.target.innerHTML = "";
        setPlaceholder("true");
        chatInputRef.current.focus();
        //gọi hàm thực hiện một tác vụ - hàm này được truyền từ bên ngoài vào
        if (onEnterInput) {
          onEnterInput(text);
        }
      }
    }
  };

  //khi nhập dữ liệu (onInput) ô contenteditTable thay đổi
  const handleTextChange = (event) => {
    const text = event.target.innerHTML;
    //ẩn placeholder
    if (text.trim().length > 0) {
      setPlaceholder("false");
    } else {
      setPlaceholder("true");
    }
    if (onChangeInput) {
      onChangeInput(chatInputRef.current.innerHTML);
    }
  };

  //khi nhấn vào một icon
  const handleEmojiClick = (event, emojiObject) => {
    //thêm emoji vào đoạn text hiện tại
    chatInputRef.current.append(
      document.createTextNode(emojiObject.emoji + " ")
    );

    if (onChangeInput) {
      onChangeInput(chatInputRef.current.innerHTML);
    }

    //ẩn placeholder
    setPlaceholder("false");
  };

  useEffect(() => {
    {
      /* giá trị textDefaultValue có thể có khi thực hiện chỉnh sửa comment */
    }
    if (textDefaultValue) {
      chatInputRef.current.innerHTML = textDefaultValue;
    }
    chatInputRef.current.focus();
    //thêm giá trị ở ngoài vào để hiển thị (nếu có)
  }, []);

  return (
    <ChatInputWrapperStyled placeholder={placeholder}>
      {/* chỗ nhập input */}
      <div className="text-input">
        {/* Cái input */}
        <div
          contentEditable={true}
          placeholdercontent={placeholdercontent}
          className="input"
          onKeyPress={handleEnterPress}
          onInput={handleTextChange}
          ref={chatInputRef}
        ></div>
        <div style={{ position: "relative" }} ref={emoijiRef}>
          {/* <ChatDropDownButtonStyled
             overlayStyle={{zIndex:100010}}
             overlay={<Picker pickerStyle={{zIndex:10005}} onEmojiClick={handleEmojiClick} />}
            trigger={["click"]}
            icon={<SmallIconStyled className="fas fa-smile"></SmallIconStyled>}
          /> */}
          <IconButtonStyled
            color="transparent"
            icon={<SmallIconStyled className="fas fa-smile"></SmallIconStyled>}
            onClick={() => setDisplayEmoji(!displayEmoji)}
          />
          {displayEmoji && (
            <Picker
              pickerStyle={{
                bottom: topEmoji === true ? "100%" : "unset",
                top: topEmoji === false ? "100%" : "unset",
                right: 0,
                position: "absolute",
                zIndex: 10005,
              }}
              onEmojiClick={handleEmojiClick}
            />
          )}
        </div>
      </div>

      {/* chỗ thêm hình */}
      {showAddImage && (
        <div className="image-input">
          <ChatUploadImage
            onFinishUploadFile={onFinishUploadFile}
            onStartUploadFile={onStartUploadFile}
            onFailedUploadFile={onFailedUploadFile}
          />
        </div>
      )}
    </ChatInputWrapperStyled>
  );
};

export default ChatInput;
