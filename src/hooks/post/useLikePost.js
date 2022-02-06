import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//code của mình
import socket from "../../utils/socket/socket";
import { updateHomePost } from "../../store/modules/Home/slice";
import { updateWallPost } from "../../store/modules/Wall/slice";
import { updateGroupsDashboardPost } from "../../store/modules/GroupsDashboard/slice";
import { updateGroupsPost } from "../../store/modules/Groups/slice";
import {updatePostDetails} from "../../store/modules/PostDetails/slice";
//một hook tương tác với dữ liệu like của một bài post
const useLikePost = ({ postId, likeCount, emotion, isLike, offSocket = true }) => {
  //giá trị likeValue này dùng để hiển thị cho phần Post Modal Item
  //vì khi ta cập nhấn like bài post
  //thì store sẽ được cập nhật nhưng dữ liệu ở Post Modal thì không
  //do đó ta sẽ dùng cách này
  const [likeValue, setLikeValue] = useState({ isLike, likeCount, emotion });

  const dispatch = useDispatch();
  useEffect(() => {
    //lắng nghe sự kiện like
    socket.on(`${postId}-like-post`, ({ isLike, emotion, likeCount, fromWhere, anotherPerson = false }) => {
      let updateData = { likeCount, _id: postId };

      //nếu dữ liệu gửi đến là của chính mình - thì mới emotion vào để cập nhật
      if(anotherPerson === false){
        updateData = {
          ...updateData,
          emotion,
        }
      }
    
      //isLike sẽ có nếu sự kiện like này được trả về cho chính người like
      if (isLike !== undefined) {
        updateData.isLike = isLike;
      }
      
      //cập nhật ở home
      if (fromWhere === "") {
        dispatch(updateHomePost(updateData));
      }
      //cập nhật ở wall
      else if (fromWhere === "wall") {
        dispatch(updateWallPost(updateData));
      }
      //cập nhật ở groups
      else if (fromWhere === "groups") {
        dispatch(updateGroupsPost(updateData));
      }
      //cập nhật ở groups/dashboard
      else if (fromWhere === "groups/dashboard") {
        dispatch(updateGroupsDashboardPost(updateData));
      }
      //nếu là từ một người khác thì cập nhật lại tất cả (bởi vì không biết chính xác là phải cập nhật ở đâu)
      if(anotherPerson === true){

        dispatch(updateHomePost(updateData));
        dispatch(updateWallPost(updateData));
        dispatch(updateGroupsPost(updateData));
        dispatch(updateGroupsDashboardPost(updateData));
      }

      //cập nhật ở trang chi tiết một bài post
     
      dispatch(updatePostDetails(updateData));
      
      

      
      //cập nhật likeValue
      setLikeValue((currentValue) => {
        return {
          ...currentValue,
          ...updateData,
        };
      });
    });
    return () => {
      //ta phải có biến này để phần post item modal khi tắt thì có thể ngăn chặn việc tắt socket
      if(offSocket){
        socket.off(`${postId}-like-post`);
      }
      
      setLikeValue({ likeCount, isLike, emotion });
    };
  }, [postId, dispatch]);

  return { likeValue };
};

export default useLikePost;
