import React from 'react';

//code của mình
import {HorizontalMenuWrapperStyled} from '../Styled/Menu'
import HorizontalMenu from "../UI/HorizontalMenu";



//một menu cho phép thực hiện chuyển đổi các list về friends
//pathname: có thể nhận từ chức năng tường nhà để xem danh sách bạn bè cho tương ứng - vd: /wall/userId/friends
//- mặc định là friends



//showRequested: có show cái item lời mời kết bạn không ?
//showSent: có show cái đã gửi lời mời kết bạn không
const FriendsDashboard = React.memo(({ pathname = "/friends", showRequested = true, showSent =true }) => {
  //danh sách các item cho horizontal menu
  const itemList = [
    {
      title: "Tất cả bạn bè",
      path: `${pathname}`,
      exact: true,
    },
  ];
  if (showRequested) {
    itemList.push({
      title: "Lời mời kết bạn",
      path: `${pathname}/requested`,
      exact: true,
    });
  }
  if(showSent){
    itemList.push({
      title: "Đã gửi yêu cầu",
      path: `${pathname}/sent`,
      exact: true,
    });
  }

  return (
    <HorizontalMenuWrapperStyled>
      <HorizontalMenu itemList={itemList} />
    </HorizontalMenuWrapperStyled>
  );
});
export default FriendsDashboard;
