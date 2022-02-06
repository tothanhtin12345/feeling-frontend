import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

//code của mình
import { getHeaderButtonSelected } from "../../store/modules/Header/selectors";

import { HeaderActionModalStyled } from "../Styled/Modal";

//một modal cho phần mở tin nhắn và thông báo

//window: nội dung của modal
const HeaderActionModal = ({ window, ...props }) => {
 
  return (
    <HeaderActionModalStyled visible={true}>
      <div className={"modal"}>{window}</div>
    </HeaderActionModalStyled>
  );
};

export default HeaderActionModal;
