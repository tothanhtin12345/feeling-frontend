import { Modal } from "antd";
//hàm style sẵn và hiển thị một modal lỗi
export const showSuccess= ({ title, content }) => {
  Modal.success({
    title,
    content,
    zIndex: 1000000000000,
  });
};
