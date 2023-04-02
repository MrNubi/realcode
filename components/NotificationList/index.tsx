import React, { useCallback, useState } from 'react';

import Box from '../../img/Box.png';
import Setting from '../../img/Setting.png';
import axios from 'axios';
import useSWR from 'swr';
import { MLogin } from '@typings/memot';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';
import { Redirect } from 'react-router';

const NotificatinList = () => {
  const { data: tockenData, mutate: tockenMutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);
  // const {
  //   data: InnerGroupData,
  //   error: InnerGroupErr,
  //   mutate: InnerGroupMutate,
  // } = useSWR<MInnerGroup>(
  //   memoUrl + `/group/group-data/${nickname}/`,
  //   fetchMemoGet(memoUrl + `/group/group-data/${decodeURI(nickname.trim())}/`, `${tockenData}`),
  //   { dedupingInterval: 1000, errorRetryCount: 10 },
  // );

  return <div>NotificatinList</div>;
};

export default NotificatinList;
