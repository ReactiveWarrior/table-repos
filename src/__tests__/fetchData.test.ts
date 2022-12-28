import axios from 'axios';
import { fetchData } from '../api';
import { Repo } from '../components/RepoTable';

jest.mock('axios');

describe('fetchData', () => {
  it('should fetch data from the API and return the response', async () => {
    // Arrange
    const mockData: Repo[] = [
      {
        id: 1,
        name: 'Jack',
        html_url: 'https://asdasd.asd',
        description: 'asdasdasdasd',
        owner: {
          login: 'mojombo',
          avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        },
      },
      {
        id: 2,
        name: 'Jack',
        html_url: 'https://asdasd.asd',
        description: 'asdasdasdasd',
        owner: {
          login: 'mojombo',
          avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        },
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    // Act
    const result = await fetchData();

    // Assert
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/repositories');
  });

  it('should handle errors when fetching the data', async () => {
    // Arrange
    const mockError = new Error('Failed to fetch data');
    (axios.get as jest.Mock).mockRejectedValue(mockError);

    // Act
    const result = await fetchData();

    // Assert
    expect(result).toBeUndefined();
  });
});
