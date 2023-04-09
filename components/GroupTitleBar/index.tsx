import { DashedLine, GroupSidebarTitle } from '@layouts/MemoWorkspace/styles';
import React, { useCallback, useState } from 'react';
import FolderOPen from '../../img/folder_open.png';
import FolderClose from '../../img/folder_close.png';
import Box from '../../img/Box.png';
import Setting from '../../img/Setting.png';
import plus from '../../img/add_group.png';
import { MGroup, MInnerGroup, MLogin } from '@typings/memot';
import useSWR from 'swr';
import fetchMemoGet from '../../utills/fetchMemoGet';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import GroupSidebarInnerData from '@components/GroupSideInnerData';
import { Session } from 'inspector';
import FetchGroupModal from '@components/FetchGroupModal';
import GroupInviteModal from '@components/GroupInviteModal';

interface Props {
  tocken?: string;
  resultName?: string;
  i?: number;
  clickFolder?: number;

  clickInnerFolder?: number;
  onCreateNewGroup?: (e: any, i: number) => void;
}
function GroupTitleBar({}: Props) {
  const memoUrl = 'https://memolucky.run.goorm.io';
  const { groupname, groupmemo, groupinnerdata } = useParams<{
    groupname?: string;
    groupmemo?: string;
    groupinnerdata?: string;
  }>();
  const GroupInnerData = useParams<{ groupinnerdata?: string }>();
  const [showUpdateGroupModal, setShowUpdateGroupModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const onCloseModal = () => {
    setShowUpdateGroupModal(false);
    setShowInviteModal(false);
  };

  let groupData = JSON.parse(`${sessionStorage.getItem('group')}`);
  console.log('그룹데이터', groupData);
  return (
    <div style={{ height: '100%', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', height: '50%' }}>
        <img style={{ marginRight: 5, width: '45px', height: 45 }} src={Box} alt="group_boxImg" />
        <span style={{ color: 'black' }}>{'그룹 명 :' + ' ' + groupData.name}</span>
        <img
          style={{ marginLeft: 'auto', marginRight: '15px', cursor: 'pointer' }}
          src={Setting}
          onClick={(e) => {
            console.log('click');
            setShowUpdateGroupModal((prev) => !prev);
          }}
        />
      </div>
      <div style={{ display: 'flex', height: '50%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '65%' }}>
          <div>
            <span>{'설명 :' + '' + `${groupData.desc}`}</span>{' '}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '25%' }}>
          <div>
            <span>{'참여자 :' + '' + `${groupData.user}`}</span>{' '}
          </div>
          <div>
            <span>{'id :' + '' + `${groupData.id}`}</span>{' '}
          </div>
        </div>
        <input
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowInviteModal((prev) => !prev);
          }}
          value="그룹 초대"
        ></input>
      </div>
      <FetchGroupModal
        show={showUpdateGroupModal}
        onCloseModal={onCloseModal}
        setShowFetchGroupModal={setShowUpdateGroupModal}
      />
      <GroupInviteModal
        show={showInviteModal}
        onCloseModal={onCloseModal}
        setShowGroupInviteModal={setShowInviteModal}
      />
    </div>
  );
}

export default GroupTitleBar;
