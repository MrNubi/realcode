// import useSocket from '@hooks/useSocket';
import { CollapseButton } from '../DMList/styles';
import { IChannel, IUser } from '@typings/db';
import fetcher from '../../utills/fetcher';
import React, { FC, useCallback, useState, VFC } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { MGroup, MInnerGroup, MLogin } from '@typings/memot';
import fetchMemoGet from '../../utills/fetchMemoGet';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';

const ChannelListMeMo: VFC = () => {
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
    fetchMemoGet(memoUrl + `/group/group-data/${decodeURI(paramsChange())}/`, `${tockenData}`),
    {},
  );

  const [channelCollapse, setChannelCollapse] = useState(false);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);
  console.log('groupname :::', decodeURI(groupinnerdata ? groupinnerdata : `1+${groupinnerdata}`));
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ backgroundColor: 'green' }}>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Data</span>
      </span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {!channelCollapse &&
          InnerGroupData?.results.map((r) => {
            return (
              <NavLink key={r.pk} activeClassName="selected" to={`/MemoWorkspace/${decodeURI(`${groupname}`)}/${r.pk}`}>
                <span># {decodeURI(r.name)}</span>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default ChannelListMeMo;
