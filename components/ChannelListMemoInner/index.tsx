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
import axios from 'axios';
import MemoPostcardComponent from '@components/MemoPostcardComponent';

interface CLProps {
  tocken: string | undefined;
}

const ChannelListMeMoInner: VFC<CLProps> = ({ tocken }: CLProps) => {
  const { groupname, groupinnerdata } = useParams<{ groupname?: string; groupinnerdata?: string }>();
  const memoUrl = 'https://memolucky.run.goorm.io';

  const paramsChange = () => {
    console.log('paramI: ', groupinnerdata);
    if (!groupinnerdata) {
      return 'DEFAULTT';
    }
    return groupinnerdata!!;
  };

  const { data: GroupDataMemo, mutate: GroupMemoMutate } = useSWR<MGroupDataMemo>(
    memoUrl + `/group/group-memo/${groupinnerdata}`,
    fetchMemoGet(memoUrl + `/group/group-memo/${decodeURI(`${groupinnerdata}`)}`, `${tocken}`),
    { dedupingInterval: 1000 },
  );

  const [channelCollapse, setChannelCollapse] = useState(false);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);
  if (groupinnerdata && !GroupDataMemo) {
    axios
      .get(memoUrl + `/group/group-memo/${groupinnerdata}`, {
        headers: {
          Authorization: `Bearer ${tocken}`,
        },

        withCredentials: true,
      })
      .then((r) => {
        GroupMemoMutate(r.data);
        console.log('get: 2차 성공', tocken);
        console.log('get 2: ', r.data);
        return r.data;
      })
      .catch(() => console.log('get: 2차실패', tocken));
  }
  console.log('groupInnername :::', decodeURI(groupinnerdata ? groupinnerdata : `1+${groupinnerdata}`));
  console.log('groupInnerd :::', GroupDataMemo);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowY: 'auto' }}>
      {!channelCollapse &&
        GroupDataMemo?.results.map((r) => {
          return (
            // <NavLink key={r.pk} activeClassName="selected" to={`/MemoWorkspace/${groupname}/${groupinnerdata}/${r.pk}`}>
            //   <span>
            //     {r.text} [{r.file_count}]
            //   </span>
            // </NavLink>
            <MemoPostcardComponent
              postType="comment"
              postId={`${r.pk}`}
              created={r.created_at}
              profile={r ? null : null}
              hostname={r.nickname}
              message={r.text}
              is_host={sessionStorage.getItem('nickname') === r.nickname ? true : false}
            />
          );
        })}
    </div>
  );
};

export default ChannelListMeMoInner;
