import axios from 'axios';
import { Repo } from '../components/RepoTable';

const API_URL: string = 'https://api.github.com/repositories';

export const fetchData = async () => {
  try {
    const result = await axios.get<Repo[]>(API_URL).then(response => {
      console.log(response.data);

      return response.data;
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};
