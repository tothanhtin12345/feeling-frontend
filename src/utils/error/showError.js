import { Modal } from "antd";
//hàm style sẵn và hiển thị một modal lỗi
export const showError = ({ title, content }) => {
  Modal.error({
    title,
    content,
    zIndex: 1000000000000,
    wrapClassName:"error-modal"
  });
};
