import { IUser } from '@typings/db';
import axios from 'axios';

const fetcherLocals = <Data,>(url: string): any => {
  const A = axios
    .get<IUser>('http://localhost:3095/api/users', {
      withCredentials: true,
    })
    .then((r) => {
      console.log('1차: 통과');

      console.log('return :');
      return;
    })
    .catch(() => {
      console.log('1차: 실패');
      console.log('return :');
      return;
    });

  return A;
};

export default fetcherLocals;
