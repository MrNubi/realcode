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
  tocken: string;
  resultName: string;
  i: number;
  clickFolder?: number;

  clickInnerFolder?: number;
  onCreateNewGroup?: (e: any, i: number) => void;
}
function GroupSidebarA({ tocken, resultName, i, clickFolder, clickInnerFolder }: Props) {
  const memoUrl = 'https://memolucky.run.goorm.io';
  const { groupname, groupmemo, groupinnerdata } = useParams<{
    groupname?: string;
    groupmemo?: string;
    groupinnerdata?: string;
  }>();
  const GroupInnerData = useParams<{ groupinnerdata?: string }>();

  const {
    data: GroupData,
    error: GroupErr,
    mutate: GroupMutate,
  } = useSWR<MGroup>(memoUrl + '/group', fetchMemoGet(memoUrl + '/group', tocken), {
    dedupingInterval: 10000,
  });
  const {
    data: InnerGroupData,
    error: InnerGroupErr,
    mutate: InnerGroupMutate,
  } = useSWR<MInnerGroup>(
    `${groupname ? memoUrl + `/group/group-data/${decodeURI(groupname)}/` : null}`,
    fetchMemoGet(`${groupname ? memoUrl + `/group/group-data/${decodeURI(groupname)}/` : null}`, tocken),
    {
      dedupingInterval: 10000,
    },
  );
  if (!InnerGroupData) {
    axios
      .get(
        memoUrl + `/group/group-data/${decodeURI(`${groupname}`)}/`,

        {
          headers: {
            Authorization: `Bearer ${tocken}`,
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
      <Link
        style={{ cursor: 'pointer' }}
        to={groupname === GroupData?.results[i].name ? `/Memoworkspace` : `/Memoworkspace/${resultName}`}
      >
        <GroupSidebarTitle>
          <img
            style={{ marginRight: 5 }}
            src={groupname === GroupData?.results[i].name ? FolderOPen : FolderClose}
            alt="group_boxImg"
          />
          <span style={{ color: 'red' }}>{resultName}</span>
          <DashedLine />

          <img
            src={plus}
            alt="create_group_plusImg"
            onClick={(e) => {
              console.log(GroupData?.results[i].name, groupname);
              e.preventDefault();
              console.log('addfolderclick');
              // onCreateNewGrop()
            }}
          />
        </GroupSidebarTitle>
      </Link>
      {/* <div style={{ height: '70%' }}>
        {InnerGroupData?.results.map((r, i2) => {
          <Link key={r.pk} to={`/Memoworkspace/${r.name}`}>
            <GroupSidebarTitle style={{ cursor: 'pointer' }}>
              <img
                style={{ marginRight: 5 }}
                onClick={(e) => {
                  setInnerFolderOpen(e, i2);
                  console.log(i2);
                }}
                src={GroupInnerData === r.name ? FolderOPen : FolderClose}
                alt="group_boxImg"
              />
              <span
                onClick={(e) => {
                  setInnerFolderOpen(e, i2);
                }}
                style={{ color: 'red' }}
              >
                {r.name}
              </span>
              <DashedLine
                onClick={(e) => {
                  setInnerFolderOpen(e, i2);
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
      </div> */}
    </div>
  );
}

export default GroupSidebarA;
