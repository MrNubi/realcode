import axios from 'axios';
import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '../utills/fetcher';

const Workspace: FC = (children) => {
  const { data, error, mutate } = useSWR('/api/users', fetcher, {
    dedupingInterval: 10000, // 100초 안에는 호출 보내도 캐시값안에서 처리
    //focusThrottleInterval  : 이 시간 범위 동안 단 한 번만 갱신,즉 중복 갱신요청 씹음
    //errorRetryInterval : 에러시 재시도 기간, 입력값 이후 다시 보냄,
    //loadingTimeout : 특정 시간 지나면 onLoadingSlow 이벤트를 트리거, 화면에 로딩이 지연되니 이따 오라는 식의 메세지 띄울 수 있음
    //errorRetryCount: errorRetryInterval이 시되하는 횟수의 최대값, 무한하면 서버에 디도스 넣을 수도 있기 때문(ex. 수강신청 서버폭파)
  });

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then((response) => {
        mutate(response.data);
      });
  }, []);

  return (
    <div>
      <button onClick={onLogout}> 로그아웃 </button>
      {children}
    </div>
  );
};

export default Workspace;
