import styled from "styled-components";
import Header from "../../Components/Header/Header";

const Main = props => {
  return (
    <div>
      <Header />
      <Content>mainPage</Content>
    </div>
  );
};
const Content = styled.div`
  height: 7000px;
`;
export default Main;
