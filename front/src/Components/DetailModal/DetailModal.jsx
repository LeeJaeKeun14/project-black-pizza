import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { useContentDetail } from "../../hooks/useContent";
import { useUserPickPost } from "../../hooks/useUserPick";
import Portal from "../../Pages/Main/Portal";
import { detailModalState, loginState } from "../../store/atoms";
import { media } from "../../styles/theme";

const DetailModal = ({ id }) => {
  const setDetailModalState = useSetRecoilState(detailModalState);
  const isLogin = useRecoilValue(loginState);
  const { data, isLoading } = useContentDetail(parseInt(id));
  const [isPicked, setIsPicked] = useState(false);

  const userPickPost = useUserPickPost();

  useEffect(() => {
    if (data) setIsPicked(data.is_picked);
  }, [data]);

  useEffect(() => {
    if (userPickPost.isSuccess) {
      setIsPicked(cur => !cur);
    }
  }, [userPickPost.isSuccess]);

  const runningTime = inputTime => {
    return inputTime
      .split(":")
      .map((e, i) => (i === 0 ? `${parseInt(e)}시간` : `${parseInt(e)}분`))
      .join(" ");
  };
  const postUserPick = () => {
    if (!isLogin) {
      alert("로그인시 이용가능 합니다.");
    } else {
      userPickPost.mutate([{ contents_id: parseInt(id), is_picked: true }]);
    }
  };

  const cancelUserPick = () => {
    userPickPost.mutate([{ contents_id: parseInt(id), is_picked: false }]);
  };
  const closeModal = () => {
    setDetailModalState(null);
  };
  const onOutModalClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={id} />
      <DetailBlock visible={id} onClick={onOutModalClick}>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <InfoBlock>
            <DetailTitle>{`${data.title} 상세정보`}</DetailTitle>
            <Info>
              <img src={data.image} alt="poster" />
              <InfoTextPart>
                <Title>{data.title}</Title>
                <YearGenreWrap>
                  <Year>{data.open_year}</Year>
                  <div>
                    {data.genre.map((e, i) => (
                      <GenreTag key={i}>{e.trim()}</GenreTag>
                    ))}
                  </div>
                </YearGenreWrap>

                <div>{runningTime(data.runtime)}</div>
                <div>
                  <SpanTitle>감독 </SpanTitle>
                  <span> {data.director}</span>
                </div>
                <div>
                  <SpanTitle>배우 </SpanTitle>
                  {data.actor.map((e, i) => (
                    <span key={i}>
                      {i === data.actor.length - 1 ? `${e}` : `${e} ・`}
                    </span>
                  ))}
                </div>
                {data.is_picked ? (
                  <Button onClick={cancelUserPick} isPicked={isPicked}>
                    찜 취소
                  </Button>
                ) : (
                  <Button onClick={postUserPick} isPicked={isPicked}>
                    찜하기
                  </Button>
                )}
              </InfoTextPart>
            </Info>
            <SynopsisPart>
              <SynopsisTitle>시놉시스</SynopsisTitle>
              <p>{data.synopsis}</p>
            </SynopsisPart>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </InfoBlock>
        )}
      </DetailBlock>
    </Portal>
  );
};
const DetailBlock = styled.div`
  box-sizing: border-box;
  display: ${props => (props.visible ? "block" : "none")};
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  margin: 0 auto;
`;
const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${props => (props.visible ? "block" : "none")};
  position: fixed;
  top: 80px;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;
const CloseButton = styled.button`
  background-color: ${({ theme }) => theme.color.background2};
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.font};
  &:hover {
    background-color: ${({ theme }) => theme.color.coral};
  }
`;
const InfoBlock = styled.div`
  position: relative;
  width: 50%;
  top: 50%;
  text-align: center;
  transform: translateY(-50%);
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.background2};
  padding: 50px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0 0 26px 0 ${({ theme }) => theme.color.background2};
  ${media[1440]} {
    width: 80%;
  }
  ${media.tablet} {
    width: 100%;
    border-radius: 0;
  } ${media[768]} {
    padding: 20px;
    top: 0;
    transform: translateY(0);
  }
}
`;
const DetailTitle = styled.h1`
  text-align: center;
  padding: 30px 0;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;
  align-items: start;
  div + div {
    margin-top: 10px;
  }
  ${media[768]} {
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
`;
const InfoTextPart = styled.div`
  padding-left: 50px;
  text-align: start;
  ${media[768]} {
    padding-left: 0;
    padding: 20px;
  }
`;
const Title = styled.h2`
  ${({ theme }) => theme.font.large}
`;
const Year = styled.div`
  padding-right: 16px;
`;
const YearGenreWrap = styled.div`
  display: flex;
  align-items: baseline;
`;
const GenreTag = styled.span`
  background-color: ${({ theme }) => theme.color.coral};
  padding: 4px 5px;
  border-radius: 6px;
  & + & {
    margin-left: 5px;
  }
`;
const SpanTitle = styled.span`
  font-weight: bold;
`;
const SynopsisPart = styled.div`
  padding: 50px;
  text-align: start;
  ${media[768]} {
    padding: 20px;
  }
`;
const SynopsisTitle = styled.div`
  font-weight: bold;
`;
const Button = styled.button`
  background-color: ${props =>
    props.isPicked ? ({ theme }) => theme.color.coral : "#ffffff00"};
  border: ${props => (props.isPicked ? "none" : "1px solid white")};
  padding: 8px 16px;
  border-radius: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.font};
  margin-top: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.color.coral};
    border-color: runningTime ${({ theme }) => theme.color.coral};
  }
`;
export default DetailModal;
