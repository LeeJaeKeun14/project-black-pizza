import React, { forwardRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import StarRating from "../../Components/StarRating/StarRating";
import { ratingState } from "../../store/atoms";
import { media } from "../../styles/theme";

const Item = forwardRef(({ data }, ref) => {
  const [title, imgURL] = data.info;
  const [display, setDisplay] = useState(0);
  const [isStarRated, setIsStarRated] = useState(0);
  const [isUserPick, setIsUserPick] = useState(0);
  const setRating = useSetRecoilState(ratingState);

  const isRating = (id, rate) => {
    if (rate) setIsStarRated(rate);
    if (rate === isStarRated) setIsStarRated(0);
  };
  const onClickUserPick = () => {
    const id = data.key;
    setIsUserPick(cur => (cur === 1 ? 0 : 1));
    setRating(cur => {
      const newObj = { ...cur };
      if (id in newObj) {
        newObj[id] = { ...newObj[id], is_picked: !newObj[id].is_picked };
      } else {
        newObj[id] = { contents_id: id, score: 0, is_picked: true };
      }
      return newObj;
    });
  };
  return (
    <ItemWrap ref={ref}>
      <ImageWrap
        onMouseEnter={() => setDisplay(1)}
        onMouseLeave={() => setDisplay(0)}
      >
        <Image src={imgURL} alt="poster" loading="lazy" />
        <InfoWrap
          isDisplay={display}
          isStarRated={isStarRated}
          isUserPick={isUserPick}
        >
          <StarRating id={parseInt(data.key)} isRating={isRating} />
          <Title isUserPick={isUserPick}>{title}</Title>
          <UserPickButton isUserPick={isUserPick} onClick={onClickUserPick}>
            찜하기
          </UserPickButton>
        </InfoWrap>
      </ImageWrap>
    </ItemWrap>
  );
});
const ItemWrap = styled.li`
  padding: 10px;
  box-sizing: border-box;

  width: ${100 / 4}%;
  ${media.tablet} {
    width: ${100 / 3}%;
  }
  ${media.mobile} {
    width: ${100 / 2}%;
  }
`;
const ImageWrap = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 300px;
  display: block;
  @-webkit-keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  -webkit-animation: skeleton-gradient 1.8s infinite ease-in-out;
  animation: skeleton-gradient 1.8s infinite ease-in-out;
`;
const InfoWrap = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(#00000010, #000000);
  padding-top: 20px;
  visibility: ${props => {
    if (props.isStarRated || props.isUserPick) {
      return "visible";
    } else {
      if (props.isDisplay) return "visible";
      else return "hidden";
    }
  }};
`;
const Title = styled.div`
  text-align: center;
  border-bottom: ${props =>
    props.isUserPick ? "none" : "1px solid #cccccc80"};
  margin: 0 20px;
`;
const UserPickButton = styled.button`
  padding: 10px 0;
  background: ${props => (props.isUserPick ? "#cccccc80" : "none")};
  border: none;

  cursor: pointer;
  color: ${({ theme }) => theme.color.font};
`;
export default Item;
