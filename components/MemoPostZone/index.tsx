import ChatBox from '@components/ChatBox';
import MemoPostcardComponent from '@components/MemoPostcardComponent';
import useInput from '@hooks/useInput';
import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Route, useParams } from 'react-router';
import profile from '../../img/user.png';
import { MGroupDataMemo, MGroupMemoDataResult, MInnerGroup, MLogin } from '@typings/memot';
import useSWR from 'swr';
import fetchMemoGet from '../../utills/fetchMemoGet';
import axios from 'axios';
import ChannelListMeMoInner from '@components/ChannelListMemoInner';
import fetcherMemoLocal from '../../utills//fetcherMemoLocal';

const MemoPostZone: VFC = () => {
  const memoUrl = 'https://memolucky.run.goorm.io';
  const { data: tockenData, mutate: tockenMutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);

  const [replyData, onChangeReplyData, setReplyData] = useInput('');
  const [settingClick, onChangeSettingClick, setSettingClick] = useInput(false);

  const { groupname, groupmemo, groupinnerdata } = useParams<{
    groupname: string;
    groupmemo?: string;
    groupinnerdata?: string;
  }>();

  const postData = JSON.parse(`${sessionStorage.getItem(`inner${groupinnerdata}`)}`);

  // const { data: postData, mutate: Postmutate } = useSWR<MGroupMemoDataResult>(
  //   `${groupmemo ? memoUrl + `/group/group-memo/${groupinnerdata}/${groupmemo}` : null}`,
  //   fetchMemoGet(`${groupmemo ? memoUrl + `/group/group-memo/${groupinnerdata}/${groupmemo}` : null}`, `${tocken}`),
  //   { dedupingInterval: 10000, errorRetryCount: 5 },
  // );

  const onPostPatch = useCallback((e: any) => {
    e.preventDefault();
    console.log('패치클릭');
  }, []);
  const onPostDel = useCallback((e: any) => {
    e.preventDefault();
    console.log('Del클릭');
  }, []);

  if (groupname && !postData) {
  }

  const onSubmitReply = useCallback(
    (e) => {
      e.preventDefault();
      if (replyData.trim()) {
        axios
          .post(
            memoUrl + `/group/group-memo/${groupinnerdata}/`,
            {
              text: `${replyData.trim()}`,

              is_show: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${tockenData}`,
              },
              withCredentials: true,
            },
          )
          .then((r) => {
            console.log('post전송성공', r);

            setReplyData('');
            location.reload();
          })
          .catch((e) => console.log('err : ', `${replyData.trim()}`, tockenData));
      } else {
        console.log('textless');
      }
    },
    [tockenData, groupinnerdata, replyData],
  );

  return (
    <div style={{ display: 'flex', backgroundColor: 'pink', width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '79%', height: '100%', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', height: '25%' }}>
          {postData && (
            <MemoPostcardComponent
              postType="post"
              postId={`${postData.pk}`}
              created={postData.created_at}
              profile={postData ? null : null}
              hostname={postData.nickname}
              message={postData.name}
              is_host={sessionStorage.getItem('nickname') === postData.nickname ? true : false}
              settingClick={settingClick}
              onClickPostPatch={onPostPatch}
              onClickPostDel={onPostDel}
              onClickSetting={onChangeSettingClick}
            />
          )}
        </div>
        <div style={{ display: 'flex', backgroundColor: 'yellow', overflowY: 'auto', height: '50%' }}>
          <Route
            path="/MemoWorkspace/:groupname/:groupinnerdata/"
            render={() => <ChannelListMeMoInner tocken={`${tockenData}`} />}
          />
        </div>
        <div style={{ display: 'flex', backgroundColor: 'green', height: '25%', padding: 10 }}>
          <ChatBox
            chat={replyData}
            onChangeChat={onChangeReplyData}
            onSubmitForm={onSubmitReply}
            placeholder="댓글을 입력하세요"
          />
        </div>
      </div>
      {/* 여기는 세로 창 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '21%',
          height: '100%',
          padding: '5 0 0 5',
          backgroundColor: 'white',
          borderTopRightRadius: '25px',
          borderBottomRightRadius: '25px',
        }}
      >
        참조 : {postData.parent ? postData.parent : '없음'}
      </div>
    </div>
  );
};

export default MemoPostZone;
