// import useSocket from '@hooks/useSocket';
import { CollapseButton } from '../DMList/styles';
import { IChannel, IUser } from '@typings/db';
import fetcher from '../../utills/fetcher';
import React, { FC, useCallback, useState, VFC } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { MGroup, MGroupDataMemo, MInnerGroup, MLogin } from '@typings/memot';
import fetchMemoGet from '../../utills/fetchMemoGet';
import fetcherLocals from '../../utills/fetcherLocals';
import axios from 'axios';

const ChannelListMeMoInner: VFC = () => {
  const { groupname, groupinnerdata } = useParams<{ groupname?: string; groupinnerdata?: string }>();
  const memoUrl = 'https://memolucky.run.goorm.io';

  const { data: LoginData } = useSWR<MLogin>(memoUrl + '/users/dj-rest-auth/login/', fetcherLocals, {
    dedupingInterval: 10000,
  });
  const paramsChange = () => {
    console.log('paramI: ', groupinnerdata);
    if (!groupinnerdata) {
      return 'DEFAULTT';
    }
    return groupinnerdata!!;
  };

  const { data: GroupDataMemo, mutate: GroupMemoMutate } = useSWR<MGroupDataMemo>(
    memoUrl + `/group/group-memo/${groupinnerdata}`,
    fetchMemoGet(memoUrl + `/group/group-memo/${decodeURI(`${groupinnerdata}`)}`, `${LoginData?.access_token}`),
    {},
  );

  const [channelCollapse, setChannelCollapse] = useState(false);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);
  if (groupinnerdata && !GroupDataMemo) {
    axios
      .get(memoUrl + `/group/group-memo/${groupinnerdata}`, {
        headers: {
          Authorization: `Bearer ${LoginData?.access_token}`,
        },

        withCredentials: true,
      })
      .then((r) => {
        GroupMemoMutate(r.data);
        console.log('get: 2차 성공', LoginData?.access_token);
        console.log('get 2: ', r.data);
        return r.data;
      })
      .catch(() => console.log('get: 2차실패', LoginData?.access_token));
  }
  console.log('groupInnername :::', decodeURI(groupinnerdata ? groupinnerdata : `1+${groupinnerdata}`));
  console.log('groupInnerd :::', GroupDataMemo);

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
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            GroupMemoMutate();
          }}
        >
          Data
        </span>
      </span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {!channelCollapse &&
          GroupDataMemo?.results.map((r) => {
            return (
              <NavLink
                key={r.pk}
                activeClassName="selected"
                to={`/MemoWorkspace/${groupname}/${groupinnerdata}/${r.pk}`}
              >
                <span>
                  {r.text} [{r.file_count}]
                </span>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default ChannelListMeMoInner;
