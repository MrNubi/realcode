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
import fetcherLocals from '../../utills/fetcherLocals';
const MemoLogin = () => {
  const memoUrl = 'https://memolucky.run.goorm.io';
  const MemoLoginUrl = `/users/dj-rest-auth/login/`;
  const {
    data: LoginData,
    error,
    mutate,
  } = useSWR<MLogin>(memoUrl + '/users/dj-rest-auth/login/', fetcherLocals, {
    dedupingInterval: 10000, // 100초 안에는 호출 보내도 캐시값안에서 처리
    //focusThrottleInterval  : 이 시간 범위 동안 단 한 번만 갱신,즉 중복 갱신요청 씹음
    //errorRetryInterval : 에러시 재시도 기간, 입력값 이후 다시 보냄,
    //loadingTimeout : 특정 시간 지나면 onLoadingSlow 이벤트를 트리거, 화면에 로딩이 지연되니 이따 오라는 식의 메세지 띄울 수 있음
    //errorRetryCount: errorRetryInterval이 시되하는 횟수의 최대값, 무한하면 서버에 디도스 넣을 수도 있기 때문(ex. 수강신청 서버폭파)
  });
  //swr을 써서 쿠키 저장해주려고, post요청후에 get요청 한번 더보내 줄 예정
  //revalidate: mutate()로 대체
  function zerofetcher(): any {
    return 'data';
  }
  const {
    data: testData,

    mutate: testMutate,
  } = useSWR<MLogin>('accessTocken', zerofetcher(), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [logInError, setLogInError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setLogInError(false);
    axios
      .post(
        '/api/users/login',
        { email: 'test1234@naver.com', password: 'test1234' },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        console.log('1차통과');
      })
      .catch((error) => {
        console.log('1차통과 에러');
      });
    testAxios(e);
  }, []);

  const testAxios = (e: any) => {
    e.preventDefault();
    axios
      .post(
        memoUrl + '/users/dj-rest-auth/login/',
        {
          username: 'han1113',
          password: 'goddns1234',
        },
        {
          withCredentials: true,
        },
      )
      .then((r) => {
        mutate(r.data, false);
        testMutate(r.data, false);
        console.log('clear : ', r);
        console.log('clear2 : ', testData);
      })
      .catch(console.error);
  };
  <></>;

  // if (data === undefined) {
  //   return <div>로딩중...</div>;
  // }
  console.log('datacheck login out: ', LoginData);
  if (LoginData) {
    console.log('datacheck login in: ', LoginData);
    // return <Redirect to="/workspace/sleact/channel/일반" />;
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
            <MeMoInput className=" mb-3" placeholder="ID" value={username} setValue={setUsername} error={error} />
            <MeMoInput
              className=" mb-3
            "
              type="password"
              placeholder="PW"
              value={password}
              setValue={setPassword}
              error={error}
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
      {/* <Header>MEMOP</Header>
      <Form onSubmit={onSubmit}>
        <Label id="username-label">
          <span>ID</span>
          <div>
            <Input type="username" id="username" name="username" value={username} onChange={onChangeUsername} />
          </div>
        </Label>
        <Label id="password-label">
          <span>PW</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer> */}
    </div>
  );
};

export default MemoLogin;
