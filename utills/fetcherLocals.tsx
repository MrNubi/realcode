import axios from 'axios';

const fetcherLocals = <Data,>(url: string): any => {
  const A = axios
    .get<Data>('http://localhost:3095/api/users', {
      withCredentials: true,
    })
    .then((r) => {
      console.log('1차: 통과');
      testAxios;
    })
    .catch(() => {
      console.log('1차: 실패');
      testAxios;
    });

  const testAxios = axios
    .post<Data>(
      url,
      {
        username: 'han1113',
        password: 'goddns1234',
      },
      {
        withCredentials: true,
      },
    )
    .then((r) => {
      console.log('2차 성공');
      return r.data;
    })
    .catch(() => console.log('2차실패'));

  return A;
};

export default fetcherLocals;
