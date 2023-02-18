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
} from './styles';
import searchIcon from './SearchIcon.png';
import Workspace from '@layouts/Workspace';
import useInput from '@hooks/useInput';
import Box from '../../img/Box.png';
import plus from '../../img/add_group.png';

const MemoWorkspace = () => {
  const [searchText, onChangeSearchText, setSearchText] = useInput('');

  const onSearch = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log('search clicked :', searchText);
    },
    [searchText],
  );

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
        <SearchTextDiv onSubmit={onSearch}>
          <SearchTextArea
            type={'text'}
            placeholder={'참여 그룹 명을 입력하세요'}
            value={searchText}
            onChange={onChangeSearchText}
          />

          <input style={{ marginLeft: '5px', padding: '5px' }} type="image" src={searchIcon} />
        </SearchTextDiv>
        <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
          <div
            style={{
              display: 'flex',
              flexBasis: '100%',
              alignItems: 'center',
              color: 'blue',
              fontSize: '14px',
              margin: '8px',
            }}
          >
            <img src={Box} alt="group" />
            {'그룹 이름 자리'}
            <div
              style={{
                content: '',
                flexGrow: '1',
                background: 'black',
                height: '1px',
                fontSize: '0px',
                lineHeight: ' 0px',
                marginTop: '0px',
                marginLeft: '3px',
                marginRight: '10px',
              }}
            ></div>

            <img src={plus} alt="create_group" />
          </div>
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
        <GroupTopBar></GroupTopBar>
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
