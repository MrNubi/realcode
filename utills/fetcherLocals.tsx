import axios from 'axios';

const fetcherLocals = <Data,>(url: string): any => {
  const A = axios
    .post<Data>(url, {
      withCredentials: true,
    })
    .then((r) => {
      logout;
      testAxios;
    })
    .catch(() => {
      logout;
      testAxios;
    });

  const testAxios = axios
    .post<Data>(
      'https://memolucky.run.goorm.io/users/dj-rest-auth/login/',
      {
        username: 'han1113',
        password: 'goddns1234',
      },
      {
        withCredentials: true,
      },
    )
    .then((r) => r.data)
    .catch(console.error);

  const logout = axios
    .post('http://localhost:3095/api/users/logout', null, {
      withCredentials: true,
    })
    .then(() => {
      console.log('onLogOut');
    })
    .catch((error) => {
      console.log('error', error);
    });

  return A;
};

export default fetcherLocals;
