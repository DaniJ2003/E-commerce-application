import styled from "styled-components";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function Products({ category, filters, sortType }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const sortProducts = () => {
    let sortMethod;
    if (sortType === "newest") {
      sortMethod = (a, b) => b.createdAt - a.createdAt;
    } else if (sortType === "asc") {
      sortMethod = (a, b) => a.price - b.price;
    } else {
      sortMethod = (a, b) => b.price - a.price;
    }
    setFilteredProducts((prev) => [...prev].sort(sortMethod));
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          category ? `products?categories=${category}` : "products"
        );
        setProducts(
          res.data.map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt),
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            value === "all" ? true : item[key].includes(value)
          )
        )
      );
    sortProducts();
  }, [products, category, filters]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <Container>
      {category
        ? filteredProducts.map((product) => (
            <ProductItem key={product._id} {...product} />
          ))
        : products
            .slice(0, 8)
            .map((product) => <ProductItem key={product._id} {...product} />)}
    </Container>
  );
}
