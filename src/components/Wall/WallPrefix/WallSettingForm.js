import { useState } from "react";
import { Form, Spin } from "antd";

import {useDispatch, useSelector} from 'react-redux';

import styled from "styled-components";
//code của mình
import { SmallTitleStyled, MediumContentStyled } from "../../Styled/Text";
import { RectangleButtonStyled } from "../../Styled/Button";
import { CheckBoxStyled } from "../../Styled/Input";
import {getUser} from '../../../store/modules/User/selectors';
import {getWallSettingFormLoading,getWallSettingFormMessage} from '../../../store/modules/WallSettingForm/selectors';
import {setWallSettingMessage, updateWallSettingSaga} from '../../../store/modules/WallSettingForm/slice';


const WallSettingFormStyled = styled.div`
  & {
    .ant-checkbox-wrapper {
      margin-top: 8px;
    }
    .submit-button {
      margin-top: 16px;
    }
  }
`;


//một form dùng để cài đặt các thiết lập tường nhà

const WallSettingForm = () => {

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  //đối tượng chứa các key - value của mỗi checkbox
  const [groupValue, setGroupValue] = useState({});
  const user = useSelector(getUser);

  const {showFollowerCount, showBirthday, showNumberphone, showWorkAddress, showHomeAddress} = user.userConfig;
  const loading = useSelector(getWallSettingFormLoading);
  const message = useSelector(getWallSettingFormMessage);

  const handleSubmit = (values) => {
    const valuesToUpdate = {
      ...user.userConfig,
      ...groupValue,
    }
    console.log(valuesToUpdate);
    dispatch(updateWallSettingSaga(valuesToUpdate));
  };
  const handleChange = (event) => {
    let name = event.target.name;
    let checked = event.target.checked;
    groupValue[name] = checked;
    //set giá trị mới
    setGroupValue((currentGroupValue) => {
      return {
        ...currentGroupValue,
        ...groupValue,
      };
    });
  };

  const handleFormClick = () => {
    if(message){
      dispatch(setWallSettingMessage(null));
    }
  }
 

  return (
    <WallSettingFormStyled>
      <SmallTitleStyled>Thông tin hiển thị</SmallTitleStyled>
      {message && <div style={{textAlign:"center", marginBottom:"8px"}}><MediumContentStyled color="#615DFA">{message}</MediumContentStyled></div>}
      <Form onClick={handleFormClick} form={form} onFinish={handleSubmit}>
        <CheckBoxStyled defaultChecked={showFollowerCount} onChange={handleChange} name="showFollowerCount">
          Số người theo dõi
        </CheckBoxStyled>
        <br />
        <CheckBoxStyled defaultChecked={showBirthday} onChange={handleChange} name="showBirthday">
          Ngày sinh
        </CheckBoxStyled>
        <br />
        <CheckBoxStyled defaultChecked={showNumberphone} onChange={handleChange} name="showNumberphone">
          Số điện thoại
        </CheckBoxStyled>
        {/* <br />
        <CheckBoxStyled onChange={handleChange} name="showEmail">
          Email
        </CheckBoxStyled> */}

        <br />
        <CheckBoxStyled defaultChecked={showWorkAddress} onChange={handleChange} name="showWorkAddress">
          Nơi làm việc
        </CheckBoxStyled>
        <br />
        <CheckBoxStyled defaultChecked={showHomeAddress} onChange={handleChange} name="showHomeAddress">
          Nơi ở
        </CheckBoxStyled>

        <Spin spinning={loading}>
        <RectangleButtonStyled
          className="submit-button"
          width="100%"
          textcolor="#FFFFFF"
        >
          <SmallTitleStyled>{loading ? "Đang cập nhật" : "Xác nhận"}</SmallTitleStyled>
        </RectangleButtonStyled>
        </Spin>
      </Form>
    </WallSettingFormStyled>
  );
};
export default WallSettingForm;
