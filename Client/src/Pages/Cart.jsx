import styled from "styled-components";
import Announcement from "../Components/Announcement";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CartModal from "../Components/CartModal";

const Container = styled.div``;

const Cart = () => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      <CartModal />
      <Footer />
    </Container>
  );
};

export default Cart;
