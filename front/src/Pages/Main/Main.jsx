import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header/Header";

const Main = props => {
  return (
    <div>
      <Header />
      <LinkWrap>
        <Link to="/survey">survey</Link>
      </LinkWrap>

      <Content>mainPage</Content>
    </div>
  );
};
const LinkWrap = styled.div`
  > a {
    color: ${({ theme }) => theme.color.font};
    text-decoration: none;
  }
`;
const Content = styled.div`
  height: 7000px;
`;
export default Main;
