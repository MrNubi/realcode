import { DashedLine, GroupSidebarTitle } from '@layouts/MemoWorkspace/styles';
import React, { useCallback, useState } from 'react';
import FolderOPen from '../../img/folder_open.png';
import FolderClose from '../../img/folder_close.png';
import Box from '../../img/Box.png';
import plus from '../../img/add_group.png';
import { MGroup, MInnerGroup, MLogin } from '@typings/memot';
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
function GroupTitleBar({ tocken }: Props) {
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

  return (
    <div style={{ height: '100%', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', height: '50%' }}>
        <img style={{ marginRight: 5, width: '45px', height: 45 }} src={Box} alt="group_boxImg" />
        <span style={{ color: 'black' }}>{'그룹 명 :' + ' ' + groupname}</span>
      </div>
      <div style={{ height: '50%' }}></div>
    </div>
  );
}

export default GroupTitleBar;
