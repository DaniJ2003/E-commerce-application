import styled from "styled-components";
import Products from "../Components/Products";
import Newsletter from "../Components/Newsletter";
import mobile from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  ${mobile({
    margin: "0",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  })}
`;

const FilterText = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ boxSizing: "content-box", width: "100px", margin: "10px 0" })}
`;

const Option = styled.option``;

export default function ProductList() {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({
    color: "all",
    size: "all",
  });
  const [sortType, setSortType] = useState("newest");

  const handleFilterChange = (evt) => {
    const filterType = evt.target.name;
    const filtervalue = evt.target.value;
    setFilters((filter) => ({ ...filter, [filterType]: filtervalue }));
  };

  const handleSortChange = (evt) => {
    const sortvalue = evt.target.value;
    setSortType(sortvalue);
  };
  return (
    <Container>
      <Title>{category.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products: </FilterText>
          <Select name="color" onChange={handleFilterChange}>
            <Option disabled>Color</Option>
            <Option value="all">All</Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
          <Select name="size" onChange={handleFilterChange}>
            <Option disabled>Size</Option>
            <Option value="all">All</Option>
            <Option value="XS">XS</Option>
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
            <Option value="XXL">XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products: </FilterText>
          <Select name="sort" onChange={handleSortChange}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (Low - High)</Option>
            <Option value="desc">Price (High - Low)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sortType={sortType} />
      <Newsletter />
    </Container>
  );
}
