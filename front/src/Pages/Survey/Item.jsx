import React, { forwardRef, useState } from "react";
import { memo } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import StarRating from "../../Components/StarRating/StarRating";
import { ratingState } from "../../store/atoms";
import { media } from "../../styles/theme";

const Item = memo(
  forwardRef(({ data }, ref) => {
    const [title, imgURL] = data.info;
    const [display, setDisplay] = useState(0);
    const [isStarRated, setIsStarRated] = useState(0);
    const [isUserpick, setIsUserPick] = useState(0);
    const setRating = useSetRecoilState(ratingState);
    // [{'contents_id': 영화id, 'score': 별점, 'is_picked': 보고싶어요 여부(불린값)}, ..]
    const isRating = (id, rate) => {
      console.log(rate);
      if (rate) setIsStarRated(rate);
      if (rate === isStarRated) setIsStarRated(0);
    };
    const onClickUserPick = () => {
      // console.log(data.key);
      const id = data.key;
      setIsUserPick(cur => (cur === 1 ? 0 : 1));
      setRating(cur => {
        const newObj = { ...cur };
        if (id in newObj) {
          newObj[id] = { ...newObj[id], is_picked: !newObj[id].is_picked };
        } else {
          newObj[id] = { contents_id: id, score: 0, is_picked: true };
        }
        console.log(newObj);
        return newObj;
      });
    };
    return (
      <ItemWrap ref={ref}>
        <ImageWrap
          onMouseEnter={() => setDisplay(1)}
          onMouseLeave={() => setDisplay(0)}
        >
          <Image src={imgURL} alt="poster" />
          <InfoWrap
            isDisplay={display}
            isStarRated={isStarRated}
            isUserpick={isUserpick}
          >
            <StarRating id={parseInt(data.key)} isRating={isRating} />
            <Title isUserpick={isUserpick}>{title}</Title>
            <UserPickButton isUserpick={isUserpick} onClick={onClickUserPick}>
              찜하기
            </UserPickButton>
          </InfoWrap>
        </ImageWrap>
      </ItemWrap>
    );
  })
);
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
  display: block;
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
    if (props.isStarRated || props.isUserpick) {
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
    props.isUserpick ? "none" : "1px solid #cccccc80"};
  margin: 0 20px;
`;
const UserPickButton = styled.button`
  padding: 10px 0;
  background: ${props => (props.isUserpick ? "#cccccc80" : "none")};
  border: none;

  cursor: pointer;
  color: ${({ theme }) => theme.color.font};
  &:hover {
    // background-color: ${({ theme }) => theme.color.coral};
  }
`;
export default Item;
