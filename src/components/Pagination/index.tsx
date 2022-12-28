import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
`;

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationControl: React.FC<Props> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div>
      <StyledPagination
        test-id="pagination"
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
      />
    </div>
  );
};

export default PaginationControl;
