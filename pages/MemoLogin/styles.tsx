import styled from '@emotion/styled';

export const Header = styled.header`
  margin-bottom: 0.6rem;
  text-align: center;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
`;

export const Inlinediv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vh;

  height: 100vh;
  padding: 24px;
`;
export const WhiteBox = styled.div`
  display: felx;
  overflow: hidden
  align-items: center;
  justify-contents: center;
  min-height: 250px;
  min-width:300px;
  width: 75%;
  height: 40%;
  background-color: white;
  padding: 12px;
  padding-left: 50px;
  padding-right: 50px;
  border-radius: 0.75rem;
  margin-left: auto;
  margin-right: auto;
  @media all and (min-width: 768px) {
    .md\:w-96 {
      width: 384px;
    }
  }
`;

export const WhiteBox2 = styled.div`
  display: felx;
  overflow: hidden
  align-items: center;
  justify-contents: center;
  min-height: 250px;
  min-width:300px;
  width: 100%;
  height: 60%;
  background-color: white;
  padding: 12px;
  padding-left: 50px;
  padding-right: 50px;
  border-radius: 0.75rem;
  margin-left: auto;
  margin-right: auto;
  @media all and (min-width: 768px) {
    .md\:w-96 {
      width: 384px;
    }
  }
`;

export const LoginBtn = styled.button`
  text-align: center;
  width: 100%;

  color: rgba(var(--sk_primary_foreground, 255, 255, 255), 1);
  background-color: rgba(var(--sk_primary_background, 83, 83, 83), 1);
  cursor: pointer;
  border-radius: 15px;
  padding: 5px;

  font-family: 'Inter';
  font-style: normal;
  font-size: 15px;
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export const Label = styled.label`
  margin-bottom: 16px;
  & > span {
    display: block;
    text-align: left;
    padding-bottom: 8px;
    font-size: 15px;
    cursor: pointer;
    line-height: 1.46666667;
    font-weight: 700;
  }
`;

export const Input = styled.input`
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0 0 20px;
  width: 100%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  height: 44px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 18px;
  line-height: 1.33333333;
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export const Button = styled.button`
  margin-bottom: 12px;
  width: 100%;
  max-width: 100%;
  color: #fff;
  background-color: #4a154b;
  border: none;
  font-size: 18px;
  font-weight: 900;
  height: 44px;
  min-width: 96px;
  padding: 0 16px 3px;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: rgba(74, 21, 75, 0.9);
    border: none;
  }
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export const Error = styled.div`
  color: #e01e5a;
  margin: 8px 0 16px;
  font-weight: bold;
`;

export const Success = styled.div`
  color: #2eb67d;
  font-weight: bold;
`;

export const LinkContainer = styled.p`
  font-size: 13px;
  color: #616061;
  margin: 0 auto 8px;
  width: 400px;
  max-width: 400px;
  & a {
    color: #1264a3;
    text-decoration: none;
    font-weight: 700;
    &:hover {
      text-decoration: underline;
    }
  }
`;
