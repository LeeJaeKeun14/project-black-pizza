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
    const [isZZimed, setIsZZimed] = useState(0);
    const setRating = useSetRecoilState(ratingState);
    // [{'contents_id': 영화id, 'score': 별점, 'is_picked': 보고싶어요 여부(불린값)}, ..]
    const isRating = (id, rate) => {
      console.log(rate);
      if (rate) setIsStarRated(rate);
      if (rate === isStarRated) setIsStarRated(0);
    };
    const isZZiming = () => {
      // console.log(data.key);
      const id = data.key;
      setIsZZimed(cur => (cur === 1 ? 0 : 1));
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
            isZZimed={isZZimed}
          >
            <StarRating id={parseInt(data.key)} isRating={isRating} />
            <Title>{title}</Title>
            <button onClick={isZZiming}>찜하기</button>
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
  background: linear-gradient(#00000010, #000000);
  padding: 20px 0;
  visibility: ${props => {
    if (props.isStarRated || props.isZZimed) {
      return "visible";
    } else {
      if (props.isDisplay) return "visible";
      else return "hidden";
    }
  }};
`;
const Title = styled.div`
  text-align: center;
`;

export default Item;
