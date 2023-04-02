import useInput from '@hooks/useInput';
import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Route, useParams } from 'react-router';
import Setting from '../../img/Setting.png';
import Box from '../../img/Box.png';
import { MGroup, MGroupDataMemo, MGroupMemoDataResult, MInnerGroup, MJoinData, MLogin } from '@typings/memot';
import useSWR from 'swr';
import fetchMemoGet from '../../utills/fetchMemoGet';
import axios from 'axios';
import fetcherMemoLocal from '../../utills//fetcherMemoLocal';
import GroupTitleBar from '@components/GroupTitleBar';
import GroupJoinPost from '@components/GroupJoinPost';

interface TT {
  tocken: string;
}

const MemoInvestigtionZone: VFC<TT> = ({ tocken }) => {
  const memoUrl = 'https://memolucky.run.goorm.io';
  const { data: tockenData, mutate: tockenMutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);

  const [replyData, onChangeReplyData, setReplyData] = useInput('');
  const [settingClick, onChangeSettingClick, setSettingClick] = useInput(false);
  const [join, setJoin] = useState(true);

  const { groupname, groupmemo, groupinnerdata } = useParams<{
    groupname: string;
    groupmemo?: string;
    groupinnerdata?: string;
  }>();

  const { data: JoinData, mutate: JoinMutate } = useSWR<MJoinData>(
    'https://memolucky.run.goorm.io/group/request-list/',
    fetchMemoGet('https://memolucky.run.goorm.io/group/request-list/', `${tocken}`),
    {},
  );

  if (!JoinData) {
    axios
      .get('https://memolucky.run.goorm.io/group/request-list/', {
        headers: {
          Authorization: `Bearer ${tocken}`,
        },

        withCredentials: true,
      })
      .then((r) => {
        JoinMutate(r.data);
        console.log('JoinErr : NONE(clear)', join);
      })

      .catch((e) => {
        console.log('JoinErr : ', e);
      });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
      {JoinData?.results.map((r) => {
        return <GroupJoinPost key={r.id} name={r.name} id={`${r.id}`} />;
      })}
    </div>
  );
};

export default MemoInvestigtionZone;
