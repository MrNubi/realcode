import React, { useCallback, useState } from 'react';

import Box from '../../img/Box.png';
import Setting from '../../img/Setting.png';
import axios from 'axios';
import useSWR from 'swr';
import { MLogin } from '@typings/memot';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';
import { Redirect } from 'react-router';

interface Props {
  name: string;
  id: string;
}
function GroupJoinPost({ name, id }: Props) {
  const { data: tockenData } = useSWR<MLogin>('tocken', fetcherMemoLocal);

  const Join = (e: any) => {
    e.preventDefault();
    axios
      .post(
        'https://memolucky.run.goorm.io/group/request/',
        {
          to_group: id,
        },
        {
          headers: {
            Authorization: `Bearer ${tockenData}`,
          },

          withCredentials: true,
        },
      )
      .then((r) => {
        console.log('JoinClear');
        return <Redirect to={'/MemoWorkspace'} />;
      })
      .catch((e) => {
        console.log(id, ': JoinPostErr=>Post 실패', e, tockenData);
      });
  };
  return (
    <div
      style={{
        width: '100%',
        height: '200',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '25px',
        marginBottom: '10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: '50%' }}>
        <img style={{ marginRight: 5, width: '45px', height: 45 }} src={Box} alt="group_boxImg" />
        <span style={{ color: 'black' }}>{'그룹 명 :' + ' ' + name}</span>
        <button onClick={Join} style={{ marginLeft: 'auto', marginRight: '15px' }}>
          가입하기
        </button>
      </div>
      <div style={{ display: 'flex', height: '50%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <div>
            <span>{'id :' + '' + `${id}`}</span>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupJoinPost;
