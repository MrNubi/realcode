import axios from 'axios';
import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '../utills/fetcher';

const Workspace12: FC<React.PropsWithChildren<{}>> = (children) => {
  const { data, error, mutate } = useSWR('/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then((response) => {
        mutate(response.data);
      });
  }, []);

  return (
    <div>
      <button onClick={onLogout}> 로그아웃 </button>
      {children}
    </div>
  );
};

export default Workspace12;
