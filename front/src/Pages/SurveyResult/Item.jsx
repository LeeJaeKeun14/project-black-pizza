import React, { memo, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { media } from "../../styles/theme";

import PurchaseType from "./PurchaseType";

const Item = forwardRef(({ id, data }, ref) => {
  const navigator = useNavigate();
  const [display, setDisplay] = useState(0);
  const [title, imgURL, saleType] = data;
  const goDetail = () => {
    navigator(`/detail/${id}`);
  };

  return (
    <ItemWrap ref={ref}>
      <ImageWrap
        onMouseEnter={() => setDisplay(1)}
        onMouseLeave={() => setDisplay(0)}
      >
        <Image src={imgURL} alt="poster" loading="lazy" />
        <Button display={display} onClick={goDetail}>
          {`${title} 상세보기`}
        </Button>
      </ImageWrap>
      <Rip></Rip>
      <AllPrice>
        {Object.entries(saleType).map(
          ([key, value], i) =>
            value.length !== 0 && (
              <PurchaseType key={i} saleType={saleType} type={[key, value]} />
            )
        )}
      </AllPrice>
    </ItemWrap>
  );
});
const ItemWrap = styled.div`
  padding: 10px;
  box-sizing: border-box;
  // height: fit-content;
  // border-radius: 10px;

  width: ${100 / 4}%;
  ${media.tablet} {
    width: ${100 / 3}%;
    // width: 240px;
  }
  // ${media.mobile} {
  //   // width: ${100 / 2}%;
  //   width: 240px;
  // }
  display: inline-block;
  position: absolute;
  border-radius: 1rem;
`;
const ImageWrap = styled.div`
  position: relative;
  cursor: pointer;
  padding: 10px;
  border-radius:  10px 10px 0 0;
  background-color: ${({ theme }) => theme.color.background3};
  }
`;
const Image = styled.img`
  width: 100%;
  height: 300px;
  display: block;
  border-radius: 10px 10px 0 0;
  margin: 0 auto;
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
const Button = styled.button`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  cursor: pointer;
  background: linear-gradient(#00000030, black);
  color: white;
  border: none;
  width: 100%;
  height: 100%;
  visibility:${props => (props.display ? "visible" : "hidden")} ;
}
`;
const Rip = styled.div`
  height: 20px;

  margin: 0 10px;
  background-color: ${({ theme }) => theme.color.background3};
  position: relative;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAACCAYAAAB7Xa1eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAAaSURBVBhXY5g7f97/2XPn/AcCBmSMQ+I/AwB2eyNBlrqzUQAAAABJRU5ErkJggg==);
  background-size: 4px 2px;
  background-repeat: repeat-x;
  background-position: center;
  &:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    -webkit-transform: translate(-50%, -50%) rotate(45deg);
    transform: translate(-50%, -50%) rotate(45deg);
    border: 5px solid transparent;
    border-top-color: ${({ theme }) => theme.color.background3};
    border-right-color: ${({ theme }) => theme.color.background3};
    border-radius: 100%;
    left: -10px;
  }
  &:after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    -webkit-transform: translate(-50%, -50%) rotate(45deg);
    transform: translate(-50%, -50%) rotate(45deg);
    border: 5px solid transparent;
    border-top-color: ${({ theme }) => theme.color.background3};
    border-right-color: ${({ theme }) => theme.color.background3};
    border-radius: 100%;
    -webkit-transform: translate(-50%, -50%) rotate(225deg);
    transform: translate(-50%, -50%) rotate(225deg);
    right: -40px;
  }
`;
const AllPrice = memo(styled.div`
  background-color: ${({ theme }) => theme.color.background3};
  border-radius: 0 0 10px 10px;
  padding: 10px;
`);

export default Item;
