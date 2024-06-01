import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

export default function Categories() {
  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem key={category.id} {...category} />
      ))}
    </Container>
  );
}