import axios from 'axios';

const urlBase = 'https://eth-gambling-api.herokuapp.com/';

export async function get(path) {
  const url = urlBase + path;

  return axios.get(url)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
    });
}
