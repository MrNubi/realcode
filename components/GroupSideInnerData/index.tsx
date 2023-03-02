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
import { Link } from 'react-router-dom';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';

interface innerProps {
  nickname: string;

  parentIndex: number;
  clickInnerFolder: number;
  setInnerFolderOpen: (e: any, i: number) => void;
}

function GroupSidebarInnerData({ nickname, parentIndex, clickInnerFolder, setInnerFolderOpen }: innerProps) {
  const GroupName = useParams<{ groupname?: string }>();

  const memoUrl = 'https://memolucky.run.goorm.io';
  const { data: tockenData, mutate: tockenMutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);

  const {
    data: InnerGroupData,
    error: InnerGroupErr,
    mutate: InnerGroupMutate,
  } = useSWR<MInnerGroup>(
    memoUrl + `/group/group-data/${nickname}/`,
    fetchMemoGet(memoUrl + `/group/group-data/${decodeURI(nickname.trim())}/`, `${tockenData}`),
    { dedupingInterval: 1000, errorRetryCount: 10 },
  );
  console.log('이너그룹데이터 :', decodeURI(nickname.trim()));
  if (!InnerGroupData) {
    axios
      .get(
        memoUrl + `/group/group-data/${decodeURI(nickname.trim())}/`,

        {
          headers: {
            Authorization: `Bearer ${tockenData}`,
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
        {InnerGroupData?.results.map((r, i) => {
          <Link key={r.pk} to={`/Memoworkspace/${r.name}`}>
            <GroupSidebarTitle style={{ cursor: 'pointer' }}>
              <img
                style={{ marginRight: 5 }}
                onClick={(e) => {
                  setInnerFolderOpen(e, i);
                  console.log(i);
                }}
                src={clickInnerFolder === i ? FolderOPen : FolderClose}
                alt="group_boxImg"
              />
              <span
                onClick={(e) => {
                  setInnerFolderOpen(e, i);
                }}
                style={{ color: 'red' }}
              >
                {r.name}
              </span>
              <DashedLine
                onClick={(e) => {
                  setInnerFolderOpen(e, i);
                }}
              />

              <img
                src={plus}
                alt="create_group_plusImg"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('addinnerfolderclick');
                  // onCreateNewGrop()
                }}
              />
            </GroupSidebarTitle>
          </Link>;
        })}
      </div>
    );
  }
}

export default GroupSidebarInnerData;
