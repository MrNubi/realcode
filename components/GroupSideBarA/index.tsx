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

interface Props {
  resultName: string;
}

const GroupSidebarA = ({ resultName }: Props) => {
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

  const {
    data: InnerGroupData,
    error: InnerGroupErr,
    mutate: InnerGroupMutate,
  } = useSWR<MInnerGroup>(
    memoUrl + `/group/group-data/${GroupName}/`,
    fetchMemoGet(memoUrl + `/group/group-data/${GroupName}/`, `${LoginData?.access_token}`),
    {},
  );

  const setFolderOpen = () =>
    useCallback(() => {
      setClickFolder((p) => !p);
    }, []);

  const onCilickInnerFolder = (e: any) => {
    e.preventDefault();
    setCilickInnerFolder((p) => !p);
  };

  if (GroupData && !InnerGroupData) {
    axios
      .get(
        memoUrl + `/group/group-data/${GroupName}/`,

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 10 }}>
      {GroupData?.results.map()}
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
      {clickFolder && InnerGroupData && (
        <GroupSidebarTitle style={{ marginLeft: 48, cursor: 'pointer' }}>
          <img onClick={onCilickInnerFolder} src={CilickInnerFolder ? FolderOPen : FolderClose} alt="group_boxImg" />
          <span onClick={onCilickInnerFolder} style={{ color: 'blue' }}>
            그룹명-inner
          </span>
          <DashedLine onClick={onCilickInnerFolder} />

          <img
            src={plus}
            alt="create_group_plusImg"
            onClick={(e) => {
              e.preventDefault();
              console.log('innerclick');
              // createNewGroupData();
            }}
          />
        </GroupSidebarTitle>
      )}
    </div>
  );
};

export default GroupSidebarA;
