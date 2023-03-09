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
interface pzProps {
  tocken: string;
}
const MemoPostZone: VFC<pzProps> = ({ tocken }: pzProps) => {
  const memoUrl = 'https://memolucky.run.goorm.io';

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

  const onSubmitReply = useCallback(() => {}, []);

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
              message={postData.text}
              is_host={sessionStorage.getItem('nickname') === postData.nickname ? true : false}
              settingClick={settingClick}
              onClickPostPatch={onPostPatch}
              onClickPostDel={onPostDel}
              onClickSetting={onChangeSettingClick}
            />
          )}
        </div>
        <div style={{ display: 'flex', backgroundColor: 'yellow', height: '50%' }}>
          <Route
            path="/MemoWorkspace/:groupname/:groupinnerdata/:groupmemo"
            render={() => <ChannelListMeMoInner tocken={`${tocken}`} />}
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
      <div style={{ display: 'flex', flexDirection: 'column', width: '21%', height: '100%', backgroundColor: 'white' }}>
        sssss
      </div>
    </div>
  );
};

export default MemoPostZone;
