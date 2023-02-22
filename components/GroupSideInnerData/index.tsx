import { DashedLine, GroupSidebarTitle } from '@layouts/MemoWorkspace/styles';
import { MGroup, MInnerGroup, MLogin } from '@typings/memot';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import fetcherLocals from '../../utills/fetcherLocals';
import fetchMemoGet from '../../utills/fetchMemoGet';
import plus from '../../img/add_group.png';
import FolderOPen from '../../img/folder_open.png';
import FolderClose from '../../img/folder_close.png';
import axios from 'axios';

interface innerProps {
  nickname: string;
  index: number;
}

function GroupSidebarInnerData({ nickname, index }: innerProps) {
  const GroupName = useParams<{ groupname?: string }>();

  const memoUrl = 'https://memolucky.run.goorm.io';
  const {
    data: LoginData,
    error,
    mutate,
  } = useSWR<MLogin>(memoUrl + '/users/dj-rest-auth/login/', fetcherLocals, {
    dedupingInterval: 1000,
  });

  const {
    data: GroupData,
    error: GroupErr,
    mutate: GroupMutate,
  } = useSWR<MGroup>(memoUrl + '/group', fetchMemoGet(memoUrl + '/group', `${LoginData?.access_token}`), {});

  const {
    data: InnerGroupData,
    error: InnerGroupErr,
    mutate: InnerGroupMutate,
  } = useSWR<MInnerGroup>(
    memoUrl + `/group/group-data/${nickname}/`,
    fetchMemoGet(memoUrl + `/group/group-data/${decodeURI(nickname.trim())}/`, `${LoginData?.access_token}`),
    {},
  );
  console.log('이너그룹데이터 :', decodeURI(nickname.trim()));
  if (GroupData && !InnerGroupData) {
    axios
      .get(
        memoUrl + `/group/group-data/${decodeURI(nickname.trim())}/`,

        {
          headers: {
            Authorization: `Bearer ${LoginData?.access_token}`,
          },

          withCredentials: true,
        },
      )
      .then((r) => {
        InnerGroupMutate(r.data);
        console.log('get: InnerData성공', r.data);
      })
      .catch((e) => console.log('get: Inner실패', e));
  }

  {
    return (
      <div>
        {InnerGroupData &&
          InnerGroupData.results.map((r, i = index) => {
            <GroupSidebarTitle key={r.pk} style={{ marginLeft: 48, cursor: 'pointer' }}>
              <img
                src={plus}
                alt="create_group_plusImg"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('innerclick');
                  // createNewGroupData();
                }}
              />
            </GroupSidebarTitle>;
          })}
      </div>
    );
  }
}

export default GroupSidebarInnerData;
