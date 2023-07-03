import axios from 'axios';

const API_KEY = '36626912-b574e4585ceca1c969d7b8ebc';
const per_page = 12;

export const fetchItems = async (query, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );

  return response;
};
