import styled from "styled-components";
import Newsletter from "../Components/Newsletter";
import { Add, Remove } from "@mui/icons-material";
import mobile from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 1;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Quantity = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  font-weight: 500;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const [productData, setProductData] = useState({});
  const [userChoice, setUserChoice] = useState({
    color: "",
    quantity: 1,
    size: "",
  });
  const productId = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const getProductData = async () => {
      const res = await publicRequest.get(`products/find/${productId}`);
      setProductData(res.data);
    };
    getProductData();
  }, [productId]);

  const handleQuantity = (type) => {
    type === "-"
      ? userChoice.quantity > 1
        ? setUserChoice((prev) => ({ ...prev, quantity: prev.quantity - 1 }))
        : ""
      : setUserChoice((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const handleColorSize = (property, value) => {
    setUserChoice((prev) => ({ ...prev, [property]: value }));
  };
  console.log("userchoice = ", userChoice);

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={productData.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{productData.title}</Title>
          <Desc>{productData.desc}</Desc>
          <Price>$ {productData.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color: </FilterTitle>
              {productData?.color?.map((color) => (
                <FilterColor
                  key={color}
                  $color={color}
                  onClick={() => handleColorSize("color", color)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size: </FilterTitle>
              <FilterSize
                onChange={(e) => handleColorSize("size", e.target.value)}
              >
                {productData?.size?.map((size) => (
                  <FilterSizeOption key={size}>{size}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("-")} />
              <Quantity>{userChoice.quantity}</Quantity>
              <Add onClick={() => handleQuantity("+")} />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
    </Container>
  );
};

export default Product;
