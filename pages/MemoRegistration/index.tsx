import useInput from '../../hooks/useInput';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Header, Inlinediv, WhiteBox, LoginBtn, WhiteBox2 } from '../MemoLogin/styles';
import useSWR from 'swr';
import fetcher from '../../utills/fetcher';
import { IUser } from '../../typings/db';
import { MLogin } from '@typings/memot';
import MeMoInput from '../../components/MemoInput';
import fetcher2 from '../../utills/fetcher2';
import fetcherLocals from '../../utills/fetcherLocals';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';
const MemoRegistration = () => {
  const memoUrl = 'https://memolucky.run.goorm.io';
  const MemoLoginUrl = `/users/dj-rest-auth/login/`;

  //swr을 써서 쿠키 저장해주려고, post요청후에 get요청 한번 더보내 줄 예정
  //revalidate: mutate()로 대체

  const [logInError, setLogInError] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setUNickname] = useState('');
  const [email, setEmail] = useState('');
  const { data: tockenData, mutate: tockenMutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setLogInError(false);

    testAxios(e);
  }, []);

  const testAxios = (e: any) => {
    e.preventDefault();
    axios
      .post(
        `https://memolucky.run.goorm.io/users/dj-rest-auth/registration/`,
        {
          username,
          password1: password,
          password2,
          email,
          nickname,
        },
        {
          withCredentials: true,
        },
      )
      .then((r) => {
        console.log('clear : ', r);
      })
      .catch(console.error);
  };

  // if (data === undefined) {
  //   return <div>로딩중...</div>;
  // }
  console.log('datacheck login out: ');
  // if (tockenData) {
  //   console.log('datacheck login in: ', tockenData);
  //   return <Redirect to="/Memoworkspace/ " />;
  // }

  return (
    <div
      id="container"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#BEBEBE' }}
    >
      <Inlinediv>
        <WhiteBox2>
          <Header>MEMOP</Header>
          <form onSubmit={onSubmit}>
            <MeMoInput className=" mb-3" placeholder="User name" value={username} setValue={setUsername} />

            <MeMoInput
              className=" mb-3
            "
              type="password"
              placeholder="Passworld"
              value={password}
              setValue={setPassword}
            />
            <MeMoInput
              className=" mb-3
            "
              type="password"
              placeholder="PW check"
              value={password2}
              setValue={setPassword2}
            />

            <MeMoInput className=" mb-3" placeholder="email" value={email} setValue={setEmail} />
            <MeMoInput className=" mb-3" placeholder="Nick Name" value={nickname} setValue={setUNickname} />

            <LoginBtn type="submit">Sign In</LoginBtn>
          </form>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link style={{ color: 'transparent' }} to="/MemoLogin">
              <small style={{ color: '#626262', marginRight: '15px' }}>로그인 하러 가기</small>
            </Link>
          </div>
        </WhiteBox2>
      </Inlinediv>
    </div>
  );
};

export default MemoRegistration;
