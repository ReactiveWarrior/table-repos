import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

interface Props {
  searchTerm: string;
  onChangeSearchTerm: (value: string) => void;
}

const SearchInput: React.FC<Props> = ({ searchTerm, onChangeSearchTerm }) => {
  return (
    <SearchWrapper>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeSearchTerm(e.target.value)}
      />
    </SearchWrapper>
  );
};

export default SearchInput;
