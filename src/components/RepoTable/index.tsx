import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { fetchData } from '../../api';
import PaginationControl from '../Pagination';
import SearchInput from '../SearchInput';

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const StyledTableRow = styled(TableRow)`
  background-color: #f2f2f2;
`;

const TableWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledTable = styled(Table)`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledTableHead = styled(TableHead)`
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
  & > tr > th {
    font-weight: bold;
    background-color: #eee;
  }
`;

const StyledTableCell = styled(TableCell)`
  &:first-child {
    width: 120px;
  }

  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
`;

const RepoTable: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredRepos = repos.filter(repo => repo.name?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

  const fetchReposData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await fetchData();
      result && setRepos(result);
    } catch (error: any) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReposData();
  }, []);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <SearchInput searchTerm={searchTerm} onChangeSearchTerm={setSearchTerm} />
      <TableWrapper component={Paper}>
        <StyledTable>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Owner Profile Picture</StyledTableCell>
              <StyledTableCell>Owner Name</StyledTableCell>
              <StyledTableCell>Repo Name</StyledTableCell>
              <StyledTableCell>Repo URL</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {filteredRepos.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(repo => (
              <StyledTableRow key={repo.id}>
                <StyledTableCell>
                  <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                </StyledTableCell>
                <StyledTableCell>{repo.owner.login}</StyledTableCell>
                <StyledTableCell>{repo.name}</StyledTableCell>
                <StyledTableCell>
                  <a href={repo.html_url}>{repo.html_url}</a>
                </StyledTableCell>
                <StyledTableCell>{repo.description}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableWrapper>
      <PaginationControl currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default RepoTable;
