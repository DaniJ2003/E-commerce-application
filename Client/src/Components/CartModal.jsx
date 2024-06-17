import { Add, Margin, Remove } from "@mui/icons-material";
import styled from "styled-components";
import mobile from "../responsive";

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: "20px 0" })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  border-radius: 3px;
  background-color: ${({ $type }) =>
    $type === "filled" ? "teal" : "transparent"};
  border: ${({ $type }) => $type === "filled" && "none"};
  color: ${({ $type }) => $type === "filled" && "white"};
  cursor: pointer;
  ${mobile({ flex: "1", margin: "0 5px" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductQuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductQuantity = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 500;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  font-weight: ${({ $type }) => $type === "total" && 500};
  font-size: ${({ $type }) => $type === "total" && "24px"};
  display: flex;
  justify-content: space-between;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: teal;
  color: white;
  font-weight: 700;
  border-radius: 3px;
  border: none;
`;

const CartModal = () => {
  return (
    <Wrapper>
      <Title>YOUR BAG</Title>
      <Top>
        <TopButton>CONTINUE SHOPPING</TopButton>
        <TopTexts>
          <TopText>Shopping Bag(2)</TopText>
          <TopText>Your Wishlist(0)</TopText>
        </TopTexts>
        <TopButton $type="filled">CHECKOUT NOW</TopButton>
      </Top>
      <Bottom>
        <Info>
          <Product>
            <ProductDetails>
              <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
              <Details>
                <ProductName>
                  <b>Product:</b> Revolution 6 Running Shoes For Men
                </ProductName>
                <ProductId>
                  <b>ID:</b> 1288928392
                </ProductId>
                <ProductColor $color="black" />
                <ProductSize>
                  <b>Size:</b> M
                </ProductSize>
              </Details>
            </ProductDetails>
            <PriceDetail>
              <ProductQuantityContainer>
                <Add />
                <ProductQuantity>2</ProductQuantity>
                <Remove />
              </ProductQuantityContainer>
              <ProductPrice>$ 58</ProductPrice>
            </PriceDetail>
          </Product>
          <Hr />
          <Product>
            <ProductDetails>
              <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
              <Details>
                <ProductName>
                  <b>Product:</b> HAKURA T-Shirt for Men
                </ProductName>
                <ProductId>
                  <b>ID:</b> 5853823923
                </ProductId>
                <ProductColor $color="gray" />
                <ProductSize>
                  <b>Size:</b> L
                </ProductSize>
              </Details>
            </ProductDetails>
            <PriceDetail>
              <ProductQuantityContainer>
                <Add />
                <ProductQuantity>2</ProductQuantity>
                <Remove />
              </ProductQuantityContainer>
              <ProductPrice>$ 20</ProductPrice>
            </PriceDetail>
          </Product>
        </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Sub-Total</SummaryItemText>
            <SummaryItemPrice>$ 116</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Shipping Charges</SummaryItemText>
            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Shipping Discount</SummaryItemText>
            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem $type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>$ 80</SummaryItemPrice>
          </SummaryItem>
          <Button>CHECKOUT NOW</Button>
        </Summary>
      </Bottom>
    </Wrapper>
  );
};

export default CartModal;
