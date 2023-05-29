// import useSocket from '@hooks/useSocket';
import { CollapseButton } from '../DMList/styles';
import { IChannel, IUser } from '@typings/db';
import fetcher from '../../utills/fetcher';
import React, { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { MGroup, MInnerGroup, MLogin } from '@typings/memot';
import fetchMemoGet from '../../utills/fetchMemoGet';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';
import fetcherMemoGIData from '../../utills/fetcherMemoGIData';
import { DashedLine, GroupSidebarTitle } from '@layouts/MemoWorkspace/styles';
import FolderOPen from '../../img/folder_open.png';
import FolderClose from '../../img/folder_close.png';
import plus from '../../img/add_group.png';

interface componentChannelList {
  onCreateNewGrop: (e: any) => void;
}

const ChannelListMeMo: FC<componentChannelList> = ({ onCreateNewGrop }: componentChannelList) => {
  const memoUrl = 'https://memolucky.run.goorm.io';
  const MemoLoginUrl = `/users/dj-rest-auth/login/`;
  const { data: tockenData, mutate: tockenMutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);

  const { groupname, groupinnerdata } = useParams<{ groupname?: string; groupinnerdata?: string }>();
  const paramsChange = () => {
    console.log('paramChange: ', groupname);
    if (!groupname) {
      return 'DEFAULTT';
    }
    return groupname!!;
  };
  const {
    data: GroupData,
    error: GroupErr,
    mutate: GroupMutate,
  } = useSWR<MGroup>(memoUrl + '/group', fetchMemoGet(memoUrl + '/group', `${tockenData}`), {});

  const {
    data: InnerGroupData,
    error: InnerGroupErr,
    mutate: InnerGroupMutate,
  } = useSWR<MInnerGroup>(
    memoUrl + `/group/group-data/${decodeURI(`${groupname}`)}/`,
    fetcherMemoGIData(memoUrl + `/group/group-data/${decodeURI(paramsChange())}/`, `${tockenData}`),
    {},
  );

  const [channelCollapse, setChannelCollapse] = useState(false);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);
  console.log('groupname :::', decodeURI(groupinnerdata ? groupinnerdata : `1+${groupinnerdata}`));
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
        {onCreateNewGrop !== undefined &&
          InnerGroupData?.results.map((r, i) => {
            return (
              <div
                key={r.pk}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  marginBottom: 10,
                  msOverflowY: 'auto',
                }}
              >
                <Link
                  style={{ cursor: 'pointer' }}
                  to={
                    groupinnerdata === `${r.pk}` ? `/Memoworkspace/${groupname}` : `/Memoworkspace/${groupname}/${r.pk}`
                  }
                >
                  <GroupSidebarTitle>
                    <img
                      style={{ marginRight: 5, backgroundColor: 'white' }}
                      src={groupinnerdata === `${r.pk}` ? FolderOPen : FolderClose}
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
                </Link>
              </div>
              // <NavLink key={r.pk} activeClassName="selected" to={`/MemoWorkspace/${decodeURI(`${groupname}`)}/${r.pk}`}>
              //   <span># {decodeURI(r.name)}</span>
              // </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default ChannelListMeMo;
