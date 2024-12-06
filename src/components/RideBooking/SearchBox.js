import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #000;
  }
`;

function SearchBox({ placeholder, value, onChange }) {
  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </SearchContainer>
  );
}

export default SearchBox;
