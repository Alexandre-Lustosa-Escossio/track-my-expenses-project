const fetchApi = () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(URL)
    .then((response) => response.json())
    .then((json) => json);
};

export default fetchApi;
