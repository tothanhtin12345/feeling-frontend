

//code của mình
import {HorizontalMenuWrapperStyled} from '../Styled/Menu'
import HorizontalMenu from "../UI/HorizontalMenu";





const commonKey = "groups-dashboard";

const ManagerNavigation = ({ pathname = "/manager/"}) => {
  //danh sách các item cho horizontal menu
  const itemList = [
   
    {
      title: "Người dùng",
      path: `${pathname}/users`,
      exact: true,
    },
    {
      title: "Nhóm",
      path: `${pathname}/groups`,
      exact: true,
    },
    {
      title: "Bài viết",
      path: `${pathname}/posts`,
      exact: true,
    },
  ];
  

  return (
    <HorizontalMenuWrapperStyled>
      <HorizontalMenu itemList={itemList} />
    </HorizontalMenuWrapperStyled>
  );
};
export default ManagerNavigation;
