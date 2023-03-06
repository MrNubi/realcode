import { IUser } from '@typings/db';
import axios from 'axios';

const fetchMemoGet = <Data,>(url: string | null, tocken: string): any => {
  if (url) {
    const A = axios
      .get<Data>(
        url,

        {
          headers: {
            Authorization: `Bearer ${tocken}`,
          },

          withCredentials: true,
        },
      )
      .then((r) => {
        console.log('get: 2차 성공', tocken);
        console.log('get 2: ', r.data);
        return r.data;
      })
      .catch(() => console.log('get: 2차실패', tocken));

    return A;
  } else return;
};

export default fetchMemoGet;
