import { Form, Radio, Spin } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
//code của mình
import { SmallTitleStyled, MediumContentStyled } from "../Styled/Text";
import { RectangleButtonStyled } from "../Styled/Button";
import {
  TextInputStyled,
  DatePickerStyled,
  TextAreaStyled,
  RadioStyled,
} from "../Styled/Input";
import { getUserInformations } from "../../store/modules/User/selectors";
import { setInformationFormMessage, updateUserInformationSaga } from "../../store/modules/InformationForm/slice";
import { getInformationFormLoading, getInformationFormMessage } from "../../store/modules/InformationForm/selectors";
const { Item } = Form;

const InformationFormStyled = styled.div``;

const InformationForm = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const userInformations = useSelector(getUserInformations);
  const loading = useSelector(getInformationFormLoading);
  const message = useSelector(getInformationFormMessage)

  const handleSubmitForm = (values) => {
    //từ date-picker - ta nhận được một đối tượng ISO
    let birthday = values.birthday ? values.birthday._d : undefined;
    console.log(values.birthday)
    //thử đổi ra định dạng LT theo moment
    if(birthday){
      birthday = moment(birthday).format("L");
    }

    //gán lại cho values một giá trị birthday theo cái ISO ta lấy được
    values.birthday = birthday;

    //console.log(values);

    dispatch(updateUserInformationSaga(values));
  };

  const handleClickForm = () => {
    if(message){
      dispatch(setInformationFormMessage(null));
    }
  }

  return (
    <InformationFormStyled>
      {message && <div style={{textAlign:"center", marginBottom:"8px"}}><MediumContentStyled color="#615DFA">{message}</MediumContentStyled></div>}
      <Form onClick={handleClickForm} form={form} layout="vertical" onFinish={handleSubmitForm}>
        <Item
          name="displayName"
          key="displayName"
          label={<SmallTitleStyled>Tên hiển thị</SmallTitleStyled>}
          validateTrigger={["onBlur"]}
          rules={[
            { required: true, message: "Vui lòng nhập tên hiển thị" },
            { min: 3, message: "Tên hiển thị ít nhất phải từ 3 kí tự" },
          ]}
          initialValue={userInformations.displayName}
        >
          <TextInputStyled />
        </Item>
        <Item
          name="birthday"
          key="birthday"
          label={<SmallTitleStyled>Ngày sinh</SmallTitleStyled>}
        >
          <DatePickerStyled
            defaultValue={
              userInformations.birthday ? moment(userInformations.birthday, "DD/MM/YYYY") : null
            }
            format="DD/MM/YYYY"
            placeholder="MM/DD/YYYY"
          />
        </Item>
        <Item
          name="numberphone"
          key="numberphone"
          label={<SmallTitleStyled>Số điện thoại</SmallTitleStyled>}
          validateTrigger={["onBlur", "onChange"]}
          rules={[
            {
              validator: async (rule, value) => {
                if (!value) return;
                for (let i = 0; i < value.length; i++) {
                  let number = value[i];
                  //isNaN kiểm cha xem có phải một số hay không ?
                  //có thì ra false
                  if (isNaN(number) === true) {
                    throw new Error("Không đúng định dạng số");
                  }
                }
              },
            },
            { min: 10, message: "Số điện thoại ít nhất phải là 10 số" },
            { max: 12, message: "Số điện thoại cao nhất là 12 số" },
          ]}
          initialValue={userInformations.numberphone}
        >
          <TextInputStyled />
        </Item>
        <Item
          name="homeAddress"
          key="homeAddress"
          label={<SmallTitleStyled>Nơi ở</SmallTitleStyled>}
          initialValue={userInformations.homeAddress}
        >
          <TextAreaStyled></TextAreaStyled>
        </Item>
        <Item
          name="workAddress"
          key="workAddress"
          label={<SmallTitleStyled>Nơi làm việc</SmallTitleStyled>}
          initialValue={userInformations.workAddress}
        >
          <TextAreaStyled></TextAreaStyled>
        </Item>
        <Item
          name="gender"
          key="gender"
          label={<SmallTitleStyled>Giới tính</SmallTitleStyled>}
          required
          initialValue={userInformations.gender ? userInformations.gender : "male"}
        >
          <Radio.Group>
            <RadioStyled value="male">Nam</RadioStyled>
            <RadioStyled value="female">Nữ</RadioStyled>
          </Radio.Group>
        </Item>
        
        <Spin spinning={loading}>
          <RectangleButtonStyled width="100%" textcolor="#FFFFFF" disabled={loading}>
            <SmallTitleStyled>{loading ? "Đang trong quá trình cập nhật" : "Xác nhận"}</SmallTitleStyled>
          </RectangleButtonStyled>
        </Spin>
      </Form>
    </InformationFormStyled>
  );
};
export default InformationForm;
