//hàm chuyển đổi một conversation thành các thông tin cần thiết
export const convertConversationToInformations = ({
  conver,
  onlineUsers = [],
  userId,
  getSubTitle = true,
}) => {
  let avatar, title, subTitle, online;

  

  //nếu cuộc hội thoại là thuộc dạng cá nhân
  if (conver.type === "individual") {
    //xác định friendUser - là người dùng trong cuộc hội thoại nhưng không phải là mình
    const friendUser = conver.users.find((item) => item._id !== userId);
    avatar = friendUser.avatar ? friendUser.avatar.files[0].fileUrl : null;
    title = friendUser.informations.displayName;

    //xét online
    //kiểm tra xem người dùng bạn mình có tồn tại trong mảng online không ?
    const onlineFriend = onlineUsers.find(
      (item) => item._id === friendUser._id
    );
    online = onlineFriend && onlineFriend.status === "online";

    //nếu là cuộc hội thoại nhóm
  } else {
    //thì ta sẽ title là tên nhóm
    title = conver.displayName;
    avatar =
      "https://firebasestorage.googleapis.com/v0/b/react-http-c3250.appspot.com/o/public%2F788858_group_512x512.png?alt=media&token=e3e6b4d4-d089-407b-81c3-5f6ef6cfb262";
    online = true; // luôn online
  }

  //nếu là tin nhắn hệ thống thì gán nội dung mà hệ thống nhắn
  if (getSubTitle) {
    //nếu người dùng muốn lấy thông tin về subTitle thì mới thực hiện
    //xác định về phần subTitle (là tin nhắn cuối cùng)
    const lastMessage = conver.lastMessage;
    const lastMessageOwner = lastMessage.owner;
    if (lastMessage.type === "system") {
      subTitle = lastMessage.text;
    }
    //nếu là dạng text hoặc url thì kèm tên người gửi
    else {
      //nếu người gửi tin nhắn cuối là mình
      if (lastMessageOwner._id === userId) {
        subTitle = "Bạn: ";
      }
      //ngược lại khong phải mình
      else {
        //xác định chữ cuối cùng trong tên
        const nameOfUserArr =
          lastMessageOwner.informations.displayName.split(" ");
        const nameOfUser = nameOfUserArr[nameOfUserArr.length - 1];
        subTitle = `${nameOfUser}: `;
      }

      //xác định là kiểu text hay url
      //nếu là text thì cộng nội dung trực tiếp
      if (lastMessage.type === "text") {
        subTitle += lastMessage.text;
      }
      //nếu là kiểu url thì tạo một nội dung nói rằng đã gửi file
      else {
        subTitle += "đã gửi một hình ảnh";
      }
    }
  }

  return { avatar, title, subTitle, online };
};
