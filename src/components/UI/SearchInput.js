import styled from "styled-components";
import React from 'react';
//code của mình
import { BigSearchInputStyled } from "../Styled/Input";
import { SmallIconStyled } from "../Styled/Icon";

const SearchInputWrapper = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 15px;
  background-color: #ffffff;
`;

//một thanh search
//onSearch: khi giá trị của thanh search thay đổi (người dùng nhập giá trị vào)
const SearchInput = React.memo(({ onSearch, placeholder = "Tìm kiếm" }) => {
  
  return (
    <SearchInputWrapper>
      <BigSearchInputStyled
        placeholder={placeholder}
        prefix={<SmallIconStyled className="fas fa-search"></SmallIconStyled>}
        onChange={onSearch}
      />
    </SearchInputWrapper>
  );
});

export default SearchInput;
