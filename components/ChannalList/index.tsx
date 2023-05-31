// import useSocket from '@hooks/useSocket';
import { CollapseButton } from '../DMList/styles';
import { IChannel, IUser } from '@typings/db';
import React, { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { MGroup, MInnerGroup, MLogin } from '@typings/memot';
import fetchMemoGet from '../../utills/fetchMemoGet';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';
import { GroupSidebarTitle } from '@layouts/MemoWorkspace/styles';
import FolderOPen from '../../img/folder_open.png';
import FolderClose from '../../img/folder_close.png';

const ChannelList: FC = () => {
  const memoUrl = 'https://memolucky.run.goorm.io';
  const { data: tockenData, mutate: tockenMutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);

  const { groupname } = useParams<{ groupname?: string }>();

  const {
    data: GroupData,
    error: GroupErr,
    mutate: GroupMutate,
  } = useSWR<MGroup>(memoUrl + '/group', fetchMemoGet(memoUrl + '/group', `${tockenData}`), {});

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }}>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>File</span>
        <DashedLine />
        <img
          src={plus}
          style={{ marginRight: 5, backgroundColor: 'white' }}
          alt="create_group_plusImg"
          onClick={(e) => {
            console.log('File plus_clicked : ', groupname, groupinnerdata);
            e.preventDefault();
            onCreateNewGrop;
            console.log('addfolderclick');
          }}
        />
      </div> */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {GroupData &&
          GroupData?.results.map((r) => {
            return (
              <div
                key={r.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  marginBottom: 10,
                  msOverflowY: 'auto',
                }}
              >
                <NavLink
                  style={{ cursor: 'pointer' }}
                  to={groupname === `${r.name}` ? `/Memoworkspace` : `/Memoworkspace/${r.name}`}
                >
                  <GroupSidebarTitle>
                    <img
                      style={{ marginRight: 5, backgroundColor: 'white' }}
                      src={groupname === `${r.name}` ? FolderOPen : FolderClose}
                      alt="group_boxImg"
                    />
                    <span
                      style={{
                        display: 'inline-block',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        color: 'red',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {r.name}
                    </span>
                  </GroupSidebarTitle>
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChannelList;
