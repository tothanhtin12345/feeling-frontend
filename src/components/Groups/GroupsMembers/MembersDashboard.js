//code của mình
import HorizontalMenu from "../../UI/HorizontalMenu";
import { HorizontalMenuWrapperStyled } from "../../Styled/Menu";

const MembersDashboard = ({ pathname, showRequested }) => {
  //danh sách các item cho horizontal menu
  const itemList = [
    {
      title: "Tất cả thành viên",
      path: `${pathname}/members`,
      exact: true,
    },
  ];
  if (showRequested) {
    itemList.push({
      title: "Yêu cầu tham gia",
      path: `${pathname}/members/requested`,
      exact: true,
    });
  }
  
  return (
    <HorizontalMenuWrapperStyled>
      <HorizontalMenu itemList={itemList}/>
    </HorizontalMenuWrapperStyled>
  );
};
export default MembersDashboard;
