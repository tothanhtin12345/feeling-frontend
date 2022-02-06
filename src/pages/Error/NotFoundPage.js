
//code của mình
import ErrorPage from "./ErrorPage";

const NotFoundPage = () => {
  return (
   <ErrorPage urlTo={"/"} errorTitle={"Lỗi 404 - Trang bạn truy cập không tồn tại"}/>
  );
};
export default NotFoundPage;
