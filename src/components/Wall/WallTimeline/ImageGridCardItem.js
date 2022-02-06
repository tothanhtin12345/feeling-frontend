import { Image } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//code của mình
import { IconButtonStyled } from "../../Styled/Button";
import { SmallIconStyled } from "../../Styled/Icon";
import ConfirmModal from "../../UI/ConfirmModal";
import { getDeletePhotoLoading } from "../../../store/modules/Photos/selectors";
import { deletePhotoSaga } from "../../../store/modules/Photos/slice";

const ImageGridCardItem = ({ onClick, file, type, isCurrentUser }) => {
  
    const dispatch = useDispatch();
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
    const loading = useSelector(getDeletePhotoLoading)
  

  const handleClickDeletePhoto = () => {
    setDeleteConfirmModal(true);
  };

  return (
    <div className="card-item">
      <Image
        onClick={onClick.bind(null, file._id)}
        preview={false}
        src={file.fileUrl}
      />
      {/* hiển thị nút xóa nếu người dùng đang xem photos của chính mình */}
      {type === "big" && isCurrentUser && (
        <div className="remove-button-wrapper">
          <IconButtonStyled
            onClick={handleClickDeletePhoto}
            icon={<SmallIconStyled className="fas fa-trash"></SmallIconStyled>}
          />
        </div>
      )}
      {deleteConfirmModal && (
        <ConfirmModal
          onCancel={() => setDeleteConfirmModal(false)}
          title={"Xác nhận xóa hình ảnh"}
          content="Khi hình ảnh bị xóa thì không thể khôi phục lại được. Bạn có chắc muốn tiếp tục xóa chứ ?"
          loading={loading}
          onConfirm={()=>dispatch(deletePhotoSaga(file._id))}
        />
      )}
    </div>
  );
};

export default ImageGridCardItem;
