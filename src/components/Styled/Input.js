import { Input, DatePicker, Radio, Checkbox } from 'antd';
import styled from 'styled-components';


const { TextArea } = Input;

//định dạng chung cho input search (toàn bộ bài khi có phần search sẽ dùng input này)
const SearchInputStyled = styled(Input)`
  border: 1px solid transparent;
  background-color: #F0F2F5;
  border-radius: 30px;
  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover{
    border-color: transparent;
  }

  &.ant-input-affix-wrapper:focus,&.ant-input-affix-wrapper-focused{
    border-color: transparent;
    box-shadow: none;
  }
  & input{
    background-color: #F0F2F5;
    margin-left: 5px;
  }
`;


export const BigSearchInputStyled = styled(SearchInputStyled)`
  height: 40px;
`;

export const MediumSearchInputStyled = styled(SearchInputStyled)`
  height: 30px;
`

export const TextInputStyled = styled(Input)`
  border-radius: 5px;
  &&&:hover,
  &&&:focus {
    border-color: #615dfa;
  }
`;
export const DatePickerStyled = styled(DatePicker)`
  border-radius: 5px;
  &&&:hover,
  &&&:focus {
    border-color: #615dfa;
  }
`;
export const RangePickerStyled = styled(DatePicker.RangePicker)`
  border-radius: 5px;
  &&&:hover,
  &&&:focus {
    border-color: #615dfa;
  }
`;
export const TextAreaStyled = styled(TextArea)`
  border-radius: 5px;
  &&&:hover,
  &&&:focus {
    border-color: #615dfa;
  }
`;
export const RadioStyled = styled(Radio)`
  &&&{
    .ant-radio-inner{
      border-color:#615dfa;
    }
    .ant-radio-inner::after{
      background-color: #615dfa;
    }
  }
`

export const CheckBoxStyled = styled(Checkbox)`
  &&& {
    .ant-checkbox-checked {
      .ant-checkbox-inner {
        background-color: #615dfa;
        border-color: #615dfa;
      }
    }
    .ant-checkbox-inner{
      border-color:#615dfa;
    }
  }
`;