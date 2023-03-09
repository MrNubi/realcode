import React from 'react';
import cls from 'classnames';
import './style.module.css';
import './styles';

interface InputGroupProps {
  className?: string;
  type?: string;
  placeholder?: string;
  value: string;
  setValue: (str: string) => void;
}

const MeMoInput = (T: InputGroupProps) => {
  return (
    <div style={{ marginBottom: '0.8rem', width: '100%' }}>
      <input
        //input 요소들 주입시 넣어야할것 명시
        type={T.type}
        style={{
          width: '100%',
          height: '13.6%',
          border: '1px',
          borderColor: 'black',
          borderStyle: 'solid',
          borderRadius: '15px',
          textAlign: 'center',
          transitionDuration: '200ms',
        }}
        // className={cls(
        //   `w-full p-3 transition rounded-2xl text-center duration-200 border border-gray-400  bg-gray-50 focus:bg-white hover:bg-white`,

        //   { 'border-red-500': T.error },

        //   //

        //   //cls(`이름`, {Boolean판정시 교체할 값:Boolean}) ->true면 Boolean판정시 교체할 값이, false면 백틱 안의 이름 출력
        // )}
        placeholder={T.placeholder}
        value={T.value}
        onChange={(e) => {
          console.log('글자입력', e.target.value);
          T.setValue(e.target.value);
        }}
        // onChange로 위의 value번경, (e), 즉 이벤트 발생시 타겟 벨류로 밸류를 바꿔씀
      />

      {/* 에러메세지 전달*/}
    </div>
  );
};

export default MeMoInput;
