import styled from '@emotion/styled';

type ColumnDivProps = {
  widthSize: string;
};

export const MainDiv = styled.div`
  display: flex;
  flex-direction:column;
  width:100%;
  height:100%
  padding: 9px;
  padding-bottom: 24px;
  
`;
export const EditPost = styled.div`
  display: flex;
  width: 100%;
  border: 0.5px solid #6c6c6c;
  height: 22%;
`;
export const EditColumnDiv = styled.div`
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
  width: 100%;
  height: 78%;
  background-color: yellow;
  margin-top: 18;
  border: 0.5px solid #6c6c6c;
`;
