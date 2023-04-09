import React, { useCallback, useState } from 'react';

import Box from '../../img/Box.png';
import Setting from '../../img/Setting.png';
import axios from 'axios';
import useSWR from 'swr';
import { MLogin, MNotification } from '@typings/memot';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';
import { Redirect } from 'react-router';
import fetchMemoGet from '../../utills/fetchMemoGet';

const NotificatinList = () => {
  const { data: tockenData, mutate: tockenMutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);
  const {
    data: NotiData,
    error: NotiErr,
    mutate: NotiMutate,
  } = useSWR<MNotification>(
    `https://memolucky.run.goorm.io/notification/`,
    fetchMemoGet(`https://memolucky.run.goorm.io/notification/`, `${tockenData}`),
    { dedupingInterval: 60 * 1000, errorRetryCount: 10 },
  );

  if (!NotiData) {
    console.log(tockenData, 'noti');
    axios
      .get(`https://memolucky.run.goorm.io/notification/`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${tockenData}`,
        },
      })
      .then((r) => {
        console.log('noti :', r);
        NotiMutate(r.data);
      })
      .catch((e) => {
        console.log('notiErr :', e);
      });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10 10' }}>
      {NotiData && (
        <span>
          {NotiData?.results.length > 0 ? `From : User${NotiData.results[0].from_user}` : '새로운 알림이 없습니다.'}
        </span>
      )}
    </div>
  );
};

export default NotificatinList;
