

//code của mình
import {HorizontalMenuWrapperStyled} from '../Styled/Menu'
import HorizontalMenu from "../UI/HorizontalMenu";



//một menu cho phép thực hiện chuyển đổi các list về friends
//pathname: có thể nhận từ chức năng tường nhà để xem danh sách bạn bè cho tương ứng - vd: /wall/userId/friends
//- mặc định là friends

const commonKey = "groups-dashboard";

//showRequested: có show cái item lời mời kết bạn không ?
//showSent: có show cái đã gửi lời mời kết bạn không
const GroupDashboardNavigation = ({ pathname = "/groups/dashboard"}) => {
  //danh sách các item cho horizontal menu
  const itemList = [
    {
      title: "Tin tức",
      path: `${pathname}`,
      exact: true,
    },
    {
      title: "Đang tham gia",
      path: `${pathname}/joining`,
      exact: true,
    },
    {
      title: "Đang quản lý",
      path: `${pathname}/managing`,
      exact: true,
    },
    {
      title: "Đã gửi yêu cầu",
      path: `${pathname}/sent`,
      exact: true,
    },
  ];
  

  return (
    <HorizontalMenuWrapperStyled>
      <HorizontalMenu itemList={itemList} />
    </HorizontalMenuWrapperStyled>
  );
};
export default GroupDashboardNavigation;
