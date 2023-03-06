import axios from 'axios';

const fetcher2 = <Data,>(url: string): any => {
  const A = axios
    .post<Data>(url, {
      withCredentials: true,
    })
    .then((response) => response.data);

  return A;
};

export default fetcher2;
