import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { sliderItems } from "../data";
import { useState } from "react";
import styled from "styled-components";
import mobile from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $direction }) => ($direction === "left" ? "10px" : "auto")};
  right: ${({ $direction }) => ($direction === "right" ? "10px" : "auto")};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 0.8s ease-in-out;
  transform: ${({ $slideIndex }) => `translateX(${$slideIndex}vw)`};
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ $bg }) => $bg};
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  margin-left: 7%;
`;

const Image = styled.img`
  height: 90%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Description = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    direction === "right"
      ? setSlideIndex((slideIndex) => (slideIndex - 100) % -300)
      : setSlideIndex((slideIndex) =>
          slideIndex + 100 <= 0 ? slideIndex + 100 : -200
        );
  };

  return (
    <Container>
      <Arrow $direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper $slideIndex={slideIndex}>
        {sliderItems.map(({ id, bg, title, img, desc }) => (
          <Slide $bg={bg} key={id}>
            <ImgContainer>
              <Image src={img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{title}</Title>
              <Description>{desc}</Description>
              <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow $direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  );
}
