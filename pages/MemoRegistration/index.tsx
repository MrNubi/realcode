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
const MemoRegistration = () => {
  const memoUrl = 'https://memolucky.run.goorm.io';
  const MemoLoginUrl = `/users/dj-rest-auth/login/`;
  const {
    data: LoginData,
    error,
    mutate,
  } = useSWR<MLogin>(memoUrl + '/users/dj-rest-auth/login/', fetcherLocals, {
    // revalidateOnFocus: false,
    // revalidateOnMount: false,

    // revalidateIfStale: false,
    dedupingInterval: 10000, // 100초 안에는 호출 보내도 캐시값안에서 처리
    //focusThrottleInterval  : 이 시간 범위 동안 단 한 번만 갱신,즉 중복 갱신요청 씹음
    //errorRetryInterval : 에러시 재시도 기간, 입력값 이후 다시 보냄,
    //loadingTimeout : 특정 시간 지나면 onLoadingSlow 이벤트를 트리거, 화면에 로딩이 지연되니 이따 오라는 식의 메세지 띄울 수 있음
    //errorRetryCount: errorRetryInterval이 시되하는 횟수의 최대값, 무한하면 서버에 디도스 넣을 수도 있기 때문(ex. 수강신청 서버폭파)
  });
  //swr을 써서 쿠키 저장해주려고, post요청후에 get요청 한번 더보내 줄 예정
  //revalidate: mutate()로 대체

  const [logInError, setLogInError] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setUNickname] = useState('');
  const [email, setEmail] = useState('');

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
  console.log('datacheck login out: ', LoginData);
  // if (LoginData) {
  //   console.log('datacheck login in: ', LoginData);
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
            <MeMoInput
              className=" mb-3"
              placeholder="User name"
              value={username}
              setValue={setUsername}
              error={error}
            />

            <MeMoInput
              className=" mb-3
            "
              type="password"
              placeholder="Passworld"
              value={password}
              setValue={setPassword}
              error={error}
            />
            <MeMoInput
              className=" mb-3
            "
              type="password"
              placeholder="PW check"
              value={password2}
              setValue={setPassword2}
              error={error}
            />

            <MeMoInput className=" mb-3" placeholder="email" value={email} setValue={setEmail} error={error} />
            <MeMoInput
              className=" mb-3"
              placeholder="Nick Name"
              value={nickname}
              setValue={setUNickname}
              error={error}
            />

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
