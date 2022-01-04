import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { media, theme } from "../../styles/theme";

const Banner = props => {
  const navigator = useNavigate();
  const onClickHandler = () => {
    navigator("/survey");
  };
  return (
    <BannerBlock>
      <Image src="/images/banner2.png" alt="banner" />
      <Blar />
      <TextBlock>
        <Title>
          다양해진 OTT 플랫폼 사이에서
          <br />
          <Hightlight>나에게 딱 맞는 플랫폼</Hightlight>은 어떻게 찾을까?
        </Title>

        <Button onClick={onClickHandler}>
          나만의 맞춤 콘텐츠와 OTT 추천 받으러 가기
        </Button>
      </TextBlock>
    </BannerBlock>
  );
};

export default Banner;
const BannerBlock = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 100%;
  position: relative;
  right: 0;
  // top: 40%;
`;
const Image = styled.img`
  width: 60%;
  ${media.tablet} {
    width: 100%;
  }
`;
const Blar = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  width: 100%;
  background: linear-gradient(to left, ${theme.color.background} 50%, rgba(255, 255, 255, 0));
  ${media.tablet} {
    background: linear-gradient(to top,${theme.color.background} 50%,rgba(255,255,255,0)); 
  }
  
}
`;
const TextBlock = styled.div`
  position: absolute;
  /* left: 0; */
  right: 0;
  top: 40%;
  width: 50%;
  ${media.tablet} {
    position: absolute;
    top: 60%;
    width: auto;
    left: 0;
  }
  ${media.mobile} {
    top: 60%;
  }
`;
const Title = styled.h2`
  ${({ theme }) => theme.font.xlarge};
  padding-bottom: 20px;
  ${media.tablet} {
    font-size: 2rem;
  }
  ${media.mobile} {
    font-size: 1rem;
  }
`;
const Hightlight = styled.span`
  color: ${theme.color.coral};
`;
const Button = styled.button`
  border: none;
  padding: 10px 20px;
  border-radius: 16px;

  ${({ theme }) => theme.font.small};
  cursor: pointer;
  &:hover {
    background-color: ${theme.color.font};
  }
  ${media.mobile} {
    font-size: 1rem;
  }
`;
