import styled from "styled-components";

//code của mình
import PostFiles from "../PostItem/PostFiles";
import { PostItemStyled } from "../../Styled/Post";
import { MediumContentStyled } from "../../Styled/Text";
import PostItemPrefix from "../PostItem/PostItemPrefix";

const SharePostItemStyled = styled.div`
  border: 1px solid #ccced2;
  border-radius: 15px;
  &&&{
    
    .post-item-prefix{
      margin-top: 8px;
      padding: 0px 10px;
    }
  }
`;

//một bài viết được chia sẻ đính kèm trong PostFormModal
//tác dụng chính của nó chỉ là để hiển thị

/*onFileClick hàm xử lý khi nhấn vào một file media (có thể null nếu SharedPostItem dùng để hiển thị
 PostFormModal ở chế độ share)*/
const SharedPostItem = ({ sharedPost, onFileClick }) => {
  const { _id, owner, tags, createdAt, privacy, content, files } = sharedPost;
  return (
    <SharePostItemStyled>
      <PostFiles files={files} onFileClick={onFileClick}/>
      <PostItemStyled>
        <div className="post-item-prefix">
          <PostItemPrefix
            {...{ _id, showMenu: false, owner, tags, createdAt, privacy }}
            canRedirect={false}
          />
        </div>
        <div className="post-item-content">
          <MediumContentStyled className="content">
            {content}
          </MediumContentStyled>
        </div>
      </PostItemStyled>
    </SharePostItemStyled>
  );
};

export default SharedPostItem;
