import { DashedLine, GroupSidebarTitle } from '@layouts/MemoWorkspace/styles';
import React, { useCallback, useState } from 'react';
import FolderOPen from '../../img/folder_open.png';
import FolderClose from '../../img/folder_close.png';
import Box from '../../img/Box.png';
import plus from '../../img/add_group.png';
import { MGroup, MInnerGroup, MLogin } from '@typings/memot';
import fetcherLocals from '../../utills/fetcherLocals';
import useSWR from 'swr';
import fetchMemoGet from '../../utills/fetchMemoGet';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import GroupSidebarInnerData from '@components/GroupSideInnerData';

interface Props {
  resultName: string;
}

function GroupSidebarA({ resultName }: Props) {
  const [CilickInnerFolder, setCilickInnerFolder] = useState(false);
  const [clickFolder, setClickFolder] = useState(false);
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

  const setFolderOpen = () =>
    useCallback(() => {
      setClickFolder((p) => !p);
    }, []);

  const onCilickInnerFolder = (e: any) => {
    e.preventDefault();
    setCilickInnerFolder((p) => !p);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 10 }}>
      <Link to={`/Memoworkspace/${resultName}`}>
        <GroupSidebarTitle style={{ marginBottom: 12, cursor: 'pointer' }}>
          <img
            style={{ marginRight: 5 }}
            onClick={() => {
              setFolderOpen();
            }}
            src={clickFolder ? FolderOPen : FolderClose}
            alt="group_boxImg"
          />
          <span
            onClick={() => {
              setFolderOpen();
            }}
            style={{ color: 'red' }}
          >
            {resultName}
          </span>
          <DashedLine
            onClick={() => {
              setFolderOpen();
            }}
          />

          <img
            src={plus}
            alt="create_group_plusImg"
            onClick={(e) => {
              e.preventDefault();
              console.log('addfolderclick');
              // onCreateNewGrop()
            }}
          />
        </GroupSidebarTitle>
      </Link>

      {GroupData &&
        GroupData?.results.map((r, i) => {
          console.log(GroupData);
          return <GroupSidebarInnerData key={r.id} nickname={r.name} index={i}></GroupSidebarInnerData>;
        })}
    </div>
  );
}

export default GroupSidebarA;
