import useInput from '../../hooks/useInput';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
import useSWR from 'swr';
import fetcher from '../../utills/fetcher';
import { IUser } from '../../typings/db';
import { MLogin } from '@typings/memot';
import fetcherMemoLocal from '../../utills/fetcherMemoLocal';

const Login = () => {
  const { data: tockenData, mutate: tockenMutate } = useSWR<MLogin>('tocken', fetcherMemoLocal);
  const {
    data: LoginData,
    error,
    mutate,
  } = useSWR<MLogin[]>('https://memolucky.run.goorm.io/users/dj-rest-auth/login/', {
    dedupingInterval: 10000, // 100초 안에는 호출 보내도 캐시값안에서 처리
    //focusThrottleInterval  : 이 시간 범위 동안 단 한 번만 갱신,즉 중복 갱신요청 씹음
    //errorRetryInterval : 에러시 재시도 기간, 입력값 이후 다시 보냄,
    //loadingTimeout : 특정 시간 지나면 onLoadingSlow 이벤트를 트리거, 화면에 로딩이 지연되니 이따 오라는 식의 메세지 띄울 수 있음
    //errorRetryCount: errorRetryInterval이 시되하는 횟수의 최대값, 무한하면 서버에 디도스 넣을 수도 있기 때문(ex. 수강신청 서버폭파)
  });
  //swr을 써서 쿠키 저장해주려고, post요청후에 get요청 한번 더보내 줄 예정
  //revalidate: mutate()로 대체

  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          '/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          mutate(response.data, false);
          tockenMutate(response.data.access_token, false);
          console.log('로그인 성공', response.data);
        })
        .catch((error) => {
          setLogInError(error.response?.data?.statusCode === 401);
        });
      testAxios();
    },
    [email, password],
  );

  const testAxios = () => {
    axios
      .post(
        'https://memolucky.run.goorm.io/users/dj-rest-auth/login/',
        {
<<<<<<< HEAD
          username: 'han1113', 
          password: 'goddns1234',
=======
          username: 'test1234',
          password: 'clone1234',
>>>>>>> f97404bad228c96137aea3e4373b13a34ec36d64
        },
        {
          withCredentials: true,
        },
      )
      .then((r) => {
        mutate(r.data, false);
        console.log('clear : ', r);
      })
      .catch(console.error);
  };

  // if (data === undefined) {
  //   return <div>로딩중...</div>;
  // }
  console.log('datacheck login out: ', LoginData);
  if (LoginData) {
    console.log('datacheck login in: ', LoginData);
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <div id="container">
      <Header>test</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
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
      </LinkContainer>
    </div>
  );
};

export default Login;
