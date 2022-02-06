import styled from 'styled-components';


//định dạng cho fontawesome-icons


const IconStyled = styled.i`
    color: #3E3F5E;
`;

export const BigIconStyled = styled(IconStyled)`
  font-size: 25px;
  ${({color})=> color && `color:${color};`}
`;
export const MediumIconStyled = styled(IconStyled)`
  font-size: 20px;
  ${({color})=> color && `color:${color};`}
`;
export const SmallIconStyled = styled(IconStyled)`
  font-size: 16px;
  ${({color})=> color && `color:${color};`}
`;