import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
//code của mình
import {getPostFiles, getPostFilesToDelete} from '../../store/modules/PostForm/selectors';

//một hook dùng để xác nhận trước khi điều hướng

const useConfirmNavigation = () => {
  //lấy ra các thông tin file để check điều kiện chuyển hướng
  const filesToUpload = useSelector(getPostFiles);
  const filesToDelete = useSelector(getPostFilesToDelete);

  //xác nhận chuyển hướng
  const confirmNavigationHandler = (event) => {
    if (filesToDelete.length > 0 || filesToUpload.length > 0) {
      event.preventDefault();
      Modal.confirm({
        title: "Lưu ý",
        content: "Vẫn còn nội dung chưa lưu, bạn thật sự muốn chuyển trang",
        
      });
    }
  };

  return {confirmNavigationHandler};
};

export default useConfirmNavigation;
