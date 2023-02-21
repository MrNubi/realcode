import { IUser } from '@typings/db';
import axios from 'axios';

const fetcherLocals = <Data,>(url: string): any => {
  const A = axios
    .get<IUser>('http://localhost:3095/api/users', {
      withCredentials: true,
    })
    .then((r) => {
      console.log('1차: 통과');

      testAxios;
      console.log('return :', testAxios);
      return testAxios;
    })
    .catch(() => {
      console.log('1차: 실패');
      testAxios;
      console.log('return :', testAxios);
      return testAxios;
    });

  const testAxios = axios
    .post<Data>(
      url,
      {
        username: 'test1234',
        password: 'clone1234',
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
