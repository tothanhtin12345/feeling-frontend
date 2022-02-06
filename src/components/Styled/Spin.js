import styled from 'styled-components';

export const CenterSpinStyled = styled.div`
  position: fixed;
  z-index:90000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${({backgroundcolor})=> backgroundcolor && `background-color:${backgroundcolor}`}
  
`