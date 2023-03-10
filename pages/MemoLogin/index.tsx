import useInput from '../../hooks/useInput';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Header, Inlinediv, WhiteBox, LoginBtn } from './styles';
import useSWR from 'swr';
import fetcher from '../../utills/fetcher';
import { IUser } from '../../typings/db';
import { MLogin } from '@typings/memot';
import MeMoInput from '../../components/MemoInput';
import fetcher2 from '../../utills/fetcher2';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';
const MemoLogin = () => {
  const { data: tockenData, mutate: tockenMutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);

  const [logInError, setLogInError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setLogInError(false);
    axios
      .post(
        'http://localhost:3095' + '/api/users/login',
        { email: 'test1234@naver.com', password: 'test1234' },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        console.log('test-로그인 성공');
      })
      .catch((error) => {
        console.log('test-로실, ', error);
      });

    testAxios(e);
  }, []);

  const testAxios = (e: any) => {
    e.preventDefault();
    axios
      .post(
        '/users/dj-rest-auth/login/',
        {
          username,
          password,
          // username: 'test1234',
          // password: 'clone1234',
        },
        {
          headers: {
            Accept: '*/*',
          },
          withCredentials: true,
        },
      )
      .then((r) => {
        sessionStorage.setItem('tocken', r.data.access_token);
        sessionStorage.setItem('username', r.data.user.username);
        sessionStorage.setItem('pk', r.data.user.pk);
        sessionStorage.setItem('nickname', r.data.user.nickname);

        tockenMutate(r.data.access_token, false);

        console.log('clear : ', r);
        console.log('clear2 : ', tockenData);
        return <Redirect to="/Memoworkspace" />;
      })
      .catch((e) => {
        console.log('testAxios:  ', e);
      });
  };

  // if (data === undefined) {
  //   return <div>로딩중...</div>;
  // }
  if (`${tockenData}` != 'non-tocken' && tockenData != undefined) {
    console.log('datacheck login in: ', tockenData);
    return <Redirect to="/Memoworkspace" />;
  }

  return (
    <div
      id="container"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#BEBEBE' }}
    >
      <Inlinediv>
        <WhiteBox>
          <Header>MEMOP</Header>
          <form onSubmit={onSubmit}>
            <MeMoInput className=" mb-3" placeholder="ID" autofocus={true} value={username} setValue={setUsername} />
            <MeMoInput
              className=" mb-3
            "
              type="password"
              placeholder="PW"
              value={password}
              setValue={setPassword}
            />
            <LoginBtn type="submit">LogIn</LoginBtn>
          </form>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link style={{ color: 'transparent' }} to="/memoSignup">
              <small style={{ color: '#626262', marginRight: '15px' }}>아이디 찾기</small>
            </Link>
            <Link style={{ color: 'transparent' }} to="/memoSignup">
              <small style={{ color: '#626262' }}>비밀번호 찾기</small>
            </Link>
          </div>
        </WhiteBox>
      </Inlinediv>
    </div>
  );
};

export default MemoLogin;
