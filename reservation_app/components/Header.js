import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";

const StyledHeader = styled.header`
  background-color: #f7418f;
  border-radius: 0 0 5px 5px;
  position: sticky;
  top: 0;
  z-index: 3;
`;
const Logo = styled(Link)`
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display: block;
  `
      : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #f7418f;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #fff;
  border-radius: 10px;
  text-decoration: none;
  padding: 15px 10px;
  transition: ease-in-out 0.5s;

  @media screen and (min-width: 768px) {
    padding: 0;
    &:hover {
      background-color: transparent;
      color: #fff;
      font-weight: 500;
      border-bottom: 1px solid #fff;
      border-radius: 10px;
      letter-spacing: 0.5px;
      padding: 0 5px;
    }
  }
  @media screen and (max-width: 768px) {
    &:hover {
      background-color: #f7418f;
      color: #000;
    }
  }
`;

const CartCircle = styled.span`
  border-radius: 50%;
  width: 6px;
  height: 4px;
  background-color: #fff;
  color: #f7418f;
  padding: 0 4px;
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartData } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  // Get the lengths of cuisines and seats arrays to display the total cart count
  const cartCount = cartData.cuisines.length + cartData.seats.length;

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>
            {/* <img src={images.logo3} alt="Logo" /> */}
            Reservation Booking
          </Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/Foods"}>Foods</NavLink>
            <NavLink href={"/seatingOptions"}>Seat Options</NavLink>
            <NavLink href={"/cart"}>
              Cart {cartCount > 0 ? <CartCircle>{cartCount}</CartCircle> : null}
            </NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
