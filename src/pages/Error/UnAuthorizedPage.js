
//code của mình
import ErrorPage from "./ErrorPage";

const UnAuthorizedPage = () => {
  return (
   <ErrorPage urlTo={"/"} errorTitle={"Lỗi 401 - Bạn không đủ quyền hạn để truy cập trang này"}/>
  );
};
export default UnAuthorizedPage;
