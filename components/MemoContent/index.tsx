import { DireecMessageBar, WorkDescriptionBar, WorkspaceZone } from '@layouts/MemoWorkspace/styles';
import React, { useCallback, useState } from 'react';
import { EditColumnDiv, EditColumnDiv2, EditPost, MainDiv, ShowPostZone } from './styles';
import memo from '../../img/memo.png';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import ChannelListMeMo from '@components/ChannelListMemo';
import ChannelListMeMoInner from '@components/ChannelListMemoInner';
import { Route, Switch, useParams } from 'react-router';
import ChatList from '@components/ChatList';
import MemoPostZone from '@components/MemoPostZone';
import { MGroupDataMemo, MLogin } from '@typings/memot';
import useSWR from 'swr';
import fetchMemoGet from '../../utills/fetchMemoGet';
import axios from 'axios';
import { toast } from 'react-toastify';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';

const MemoContent = () => {
  const memoUrl = 'https://memolucky.run.goorm.io';
  const { groupmemo, groupinnerdata } = useParams<{ groupmemo?: string; groupinnerdata?: string }>();

  const [onText, changeOnText, setText] = useInput('');

  const { data: tockenData, mutate: tockenMutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);

  console.log('mc Login :', tockenData);

  const onSubmmit = useCallback(
    (e) => {
      e.preventDefault();
      if (onText.trim()) {
        axios
          .post(
            memoUrl + `/group/group-memo/${groupinnerdata}/`,
            {
              text: `${onText.trim()}`,

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

            setText('');
            location.reload();
          })
          .catch((e) => console.log('err : ', `${onText.trim()}`, tockenData));
      } else {
        console.log('textless');
      }
    },
    [tockenData, groupinnerdata, onText],
  );

  console.log('memoparam :::', groupinnerdata);
  return (
    <MainDiv>
      <WorkDescriptionBar>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 5,
            paddingLeft: 27,
            width: '100%',
            height: '10%',
          }}
        >
          <img width={38} height={37} src={memo} alt="file-color-reverse" />
          <span
            style={{
              marginLeft: '10',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400px',
              fontSize: '24px',
              color: 'white',
            }}
          >
            작업명
          </span>
        </div>
        <div style={{ width: '100%', height: '60%', display: 'flex' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                marginLeft: '29px',

                fontFamily: 'Inter',
                fontStyle: 'normal',

                fontSize: 12,

                color: ' #ffffff',
              }}
            >
              참여자 : {`유저수`}
            </span>
            <span
              style={{
                marginLeft: '29px',

                fontFamily: 'Inter',
                fontStyle: 'normal',

                fontSize: 12,
                color: ' #ffffff',
              }}
            >
              파일 수 : {`파일 수`}
            </span>
            <span
              style={{
                marginLeft: '29px',

                fontFamily: 'Inter',
                fontStyle: 'normal',

                fontSize: 12,
                color: ' #ffffff',
              }}
            >
              작업 수 : {`작업 수`}
            </span>
            <span
              style={{
                marginLeft: '29px',

                fontFamily: 'Inter',
                fontStyle: 'normal',

                fontSize: 12,
                color: ' #ffffff',
              }}
            >
              파일 설명 : {`설명`}
            </span>
            <Switch>
              <Route
                path="/MemoWorkspace/:groupname/:groupinnerdata/:groupmemo"
                render={() => <ChannelListMeMoInner tocken={`${tockenData}`} />}
              />
              <Route
                path="/MemoWorkspace/:groupname/:groupinnerdata"
                render={() => <ChannelListMeMoInner tocken={`${tockenData}`} />}
              />
            </Switch>
          </div>
        </div>
      </WorkDescriptionBar>
      <WorkspaceZone>
        <EditPost style={{ display: 'flex', width: '100%', height: '22%' }}>
          <EditColumnDiv>
            <ChatBox chat={onText} onChangeChat={changeOnText} onSubmitForm={onSubmmit} />
          </EditColumnDiv>
          <EditColumnDiv2></EditColumnDiv2>
        </EditPost>
        <ShowPostZone>
          <Route
            path={`/MemoWorkspace/:groupname/:groupinnerdata/:groupmemo`}
            render={() => <MemoPostZone tocken={`${tockenData}`} />}
          />
        </ShowPostZone>
      </WorkspaceZone>
      <DireecMessageBar />
    </MainDiv>
  );
};

export default MemoContent;
