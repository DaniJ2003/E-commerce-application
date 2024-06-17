import styled from "styled-components";
import ProductItem from "./ProductItem";
import { popularProducts } from "../data";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function Products() {
  return (
    <Container>
      {popularProducts.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </Container>
  );
}
