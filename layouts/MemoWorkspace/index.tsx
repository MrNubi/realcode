import Menu from '@components/Menu';
import React, { useCallback, useState } from 'react';

import leaf from '../../img/leaf.png';
import ChannelList from '@components/ChannalList';
import DMList from '@components/DMList/inex';
import { Route, Switch } from 'react-router';
import {
  SearchTextDiv,
  SearchTextArea,
  ContextLayout,
  DireecMessageBar,
  GroupSidebar,
  GroupTopBar,
  WorkDescriptionBar,
  WorkspaceZone,
  DashedLine,
  GroupSidebarTitle,
} from './styles';
import searchIcon from './SearchIcon.png';
import Workspace from '@layouts/Workspace';
import useInput from '@hooks/useInput';
import Box from '../../img/Box.png';
import FolderOPen from '../../img/folder_open.png';
import FolderClose from '../../img/folder_close.png';
import plus from '../../img/add_group.png';
import Setting from '../../img/Setting.png';
import fetcherLocals from '../../utills/fetcherLocals';
import useSWR from 'swr';
import { MLogin } from '@typings/memot';
import { Link } from 'react-router-dom';

const MemoWorkspace = () => {
  const [searchText, onChangeSearchText, setSearchText] = useInput('');
  const memoUrl = 'https://memolucky.run.goorm.io';
  const MemoLoginUrl = `/users/dj-rest-auth/login/`;
  const {
    data: LoginData,
    error,
    mutate,
  } = useSWR<MLogin>(memoUrl + '/users/dj-rest-auth/login/', fetcherLocals, {
    dedupingInterval: 10000,
  });
  const [folderOpen, setFolderOpen] = useState(false);
  const [onclick, setOnClick] = useState(false);
  const onSearch = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log('search clicked :', searchText);
    },
    [searchText],
  );
  console.log('mwLogin:  ', LoginData);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: '3px',
        background: ' #bebebe',
      }}
    >
      <GroupSidebar>
        {/* 서치 바 */}
        <SearchTextDiv onSubmit={onSearch}>
          <SearchTextArea
            type={'text'}
            placeholder={'참여 그룹 명을 입력하세요'}
            value={searchText}
            onChange={onChangeSearchText}
          />

          <input style={{ marginLeft: '5px', padding: '5px' }} type="image" src={searchIcon} />
        </SearchTextDiv>
        <div
          style={{
            backgroundColor: 'gray',
            height: '80%',
            flexDirection: 'column',
            margin: '5px',
            alignContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {/* group 바 상단 /이미지 이름 선 addIcon */}

          <GroupSidebarTitle>
            <img src={Box} alt="group_boxImg" />
            <span style={{ color: 'blue' }}>그룹명</span>
            <DashedLine />

            <img src={plus} alt="create_group_plusImg" />
          </GroupSidebarTitle>

          {/* 그룹 데이터 처리 : 이걸 map로 넣을 예정 */}

          <GroupSidebarTitle style={{ marginLeft: 32, cursor: 'pointer' }}>
            <img
              onClick={() => {
                setFolderOpen((prev) => !prev);
              }}
              src={folderOpen ? FolderOPen : FolderClose}
              alt="group_boxImg"
            />
            <span
              onClick={() => {
                setFolderOpen((prev) => !prev);
              }}
              style={{ color: 'blue' }}
            >
              그룹명
            </span>
            <DashedLine
              onClick={() => {
                setFolderOpen((prev) => !prev);
              }}
            />

            <img
              src={onclick ? Box : plus}
              alt="create_group_plusImg"
              onClick={(e) => {
                e.preventDefault();
                setOnClick((prev) => !prev);
              }}
            />
          </GroupSidebarTitle>

          <GroupSidebarTitle style={{ marginLeft: 48, cursor: 'pointer' }}>
            <img
              onClick={() => {
                setFolderOpen((prev) => !prev);
              }}
              src={folderOpen ? FolderOPen : FolderClose}
              alt="group_boxImg"
            />
            <span
              onClick={() => {
                setFolderOpen((prev) => !prev);
              }}
              style={{ color: 'blue' }}
            >
              그룹명-inner
            </span>
            <DashedLine
              onClick={() => {
                setFolderOpen((prev) => !prev);
              }}
            />

            <img
              src={onclick ? Box : plus}
              alt="create_group_plusImg"
              onClick={(e) => {
                e.preventDefault();
                setOnClick((prev) => !prev);
              }}
            />
          </GroupSidebarTitle>
        </div>
        <DashedLine />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'wheat',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10%',
            margin: 8,
          }}
        >
          <button style={{ width: '100%', margin: 9, height: '45px' }}>그룹가입모달</button>
          <button style={{ width: '100%', margin: 9, height: '45px' }}>그룹가입모달</button>
        </div>
      </GroupSidebar>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '79%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
      >
        <GroupTopBar>
          <div style={{ width: '100%', height: '40%', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '90%', height: '!00%' }}>
              <img
                src={Box}
                style={{ marginLeft: '18px', width: 43, height: 43, backgroundColor: 'gray', marginTop: '3px' }}
                alt="그룹설명"
              />
              <span
                style={{
                  marginLeft: '5.5px',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: 35,
                  lineHeight: 42,
                  color: ' #000000',
                }}
              >
                그룹명 :
              </span>
            </div>
            <div style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>
              <img width={46} height={46} src={Setting} alt="setting icon" />
            </div>
          </div>

          <div style={{ width: '100%', height: '60%', display: 'flex' }}>
            <div
              style={{
                width: '70%',
                display: 'flex',
                paddingTop: 10,
              }}
            >
              <span
                style={{
                  marginLeft: '29px',

                  fontFamily: 'Inter',
                  fontStyle: 'normal',

                  fontSize: 12,
                  color: ' #000000',
                }}
              >
                그룹 설명 :
              </span>
              <div
                style={{
                  marginLeft: '10px',

                  fontFamily: 'Inter',
                  fontStyle: 'normal',

                  fontSize: 12,
                  color: ' #000000',
                }}
              >
                설명 !!!!!!!
              </div>
            </div>
            <div
              style={{
                width: '30%',
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
                  color: ' #000000',
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
                  color: ' #000000',
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
                  color: ' #000000',
                }}
              >
                작업 수 : {`작업 수`}
              </span>
            </div>
          </div>
        </GroupTopBar>
        <ContextLayout>
          <WorkDescriptionBar></WorkDescriptionBar>
          <WorkspaceZone></WorkspaceZone>
          <DireecMessageBar></DireecMessageBar>
        </ContextLayout>
      </div>
    </div>
  );
};

export default MemoWorkspace;

// {/* <Header>
// <span>
//   <ProfileImg src={leaf} alt="fail to load profile" />
// </span>
// </Header>

// <WorkspaceWrapper>
// <Workspaces>
//   <AddButton>+</AddButton>
// </Workspaces>
// <Channels>
//   <WorkspaceName>
//     {/* {UserData?.Workspaces.find((v)=>{})} */}
//     sleact
//   </WorkspaceName>
//   <MenuScroll>
//     <WorkspaceModal>
//       <h2>Sleact</h2>
//       <button>채널 만들기</button>
//       <button>로그아웃</button>
//     </WorkspaceModal>
//     <ChannelList />
//     <DMList />
//   </MenuScroll>
// </Channels>
// <Chats>
//   <h1>라우팅존</h1>
//   {/* <Switch>
//     <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
//     <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} />
//   </Switch> */}
// </Chats>
// </WorkspaceWrapper> */}