import styled from '@emotion/styled';

type ColumnDivProps = {
  widthSize: string;
};

export const MainDiv = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
`;
export const EditPost = styled.div`
  display: flex;
  width: 100%;
  border: 0.5px solid #6c6c6c;
  height: 22%;
`;
export const EditColumnDiv = styled.div`
  display: flex;
  justify-conent: center;
  align-items: center;

  margin-top: 10;
  width: 70%;
  height: 95%;
  background-color: salmon;
`;
export const EditColumnDiv2 = styled.div`
  margin-top: 10;
  width: 30%;
  height: 95%;
  background-color: orange;
`;

export const ShowPostZone = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  height: 100%;

  border: 0.5px solid #6c6c6c;
`;
