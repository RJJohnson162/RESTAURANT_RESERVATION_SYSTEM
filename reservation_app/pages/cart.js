import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";

const Bg = styled.div`
  background-color: #f7418f;
  color: #fff;
  padding: 50px 0;
  min-height: 100vh;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  border-radius: 10px;
  padding: 30px;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3),
    -5px -5px 20px rgba(0, 0, 0, 0.3);
  h2 {
    color: #fff;
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 70px;
  padding: 2px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartData, addCuisine, removeItem, addSeat, clearCart } =
    useContext(CartContext);
  const [cuisineItems, setCuisineItems] = useState([]);
  const [seatItems, setSeatItems] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartData && cartData.cuisines && cartData.cuisines.length > 0) {
      axios
        .post("/api/cart", { ids: cartData.cuisines })
        .then((response) => {
          setCuisineItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cart cuisine data:", error);
        });
    } else {
      setCuisineItems([]);
    }

    if (cartData && cartData.seats && cartData.seats.length > 0) {
      axios
        .post("/api/cart/seats", { ids: cartData.seats })
        .then((response) => {
          setSeatItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cart seat data:", error);
        });
    } else {
      setSeatItems([]);
    }
  }, [cartData]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);
  let total = 0;
  for (const cuisine of cuisineItems) {
    total +=
      (cartData?.cuisines?.filter((id) => id === cuisine._id).length || 0) *
      cuisine.price;
  }

  function moreOfThisProduct(id, type) {
    if (type === "cuisines") {
      const cuisineToAdd = cuisineItems.find((item) => item._id === id);
      if (cuisineToAdd) {
        addCuisine(id);
      }
    }
  }

  function lessOfThisProduct(id, type) {
    if (type === "cuisines") {
      removeItem(id);
    } else if (type === "seats") {
      removeItem(id);
    }
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartData,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  for (const seat of seatItems) {
    // Calculate total price for seat items
    total += seat.price;
  }

  if (isSuccess) {
    clearCart();
    return (
      <>
        <Header />
        <Bg>
          <Center>
            <ColumnsWrapper>
              <Box>
                <h1>Thanks for your order!</h1>
                <c>We will email you when your order will be sent.</c>
              </Box>
            </ColumnsWrapper>
          </Center>
        </Bg>
      </>
    );
  }

  return (
    <>
      <Header />
      <Bg>
        <Center>
          <ColumnsWrapper>
            <Box>
              <h2>Cart</h2>
              {!cuisineItems.length && !seatItems.length && (
                <div>Your cart is empty</div>
              )}
              {(cuisineItems.length > 0 || seatItems.length > 0) && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Render cuisine items */}
                    {cuisineItems.map((cuisine) => (
                      <tr key={cuisine._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={cuisine.images[0]} alt="" />
                          </ProductImageBox>
                          {cuisine.title}
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() =>
                              lessOfThisProduct(cuisine._id, "cuisines")
                            }
                          >
                            -
                          </Button>
                          <QuantityLabel>
                            {
                              cartData?.cuisines?.filter(
                                (id) => id === cuisine._id
                              ).length
                            }
                          </QuantityLabel>
                          <Button
                            onClick={() =>
                              moreOfThisProduct(cuisine._id, "cuisines")
                            }
                          >
                            +
                          </Button>
                        </td>
                        <td>
                          Kshs.{" "}
                          {cartData?.cuisines?.filter(
                            (id) => id === cuisine._id
                          ).length * cuisine.price}
                        </td>
                      </tr>
                    ))}
                    {/* Render seat items */}
                    {seatItems.map((seat) => (
                      <tr key={seat._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={seat.image} alt="" />
                          </ProductImageBox>
                          {seat.title}
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() => lessOfThisProduct(seat._id, "seats")}
                          >
                            -
                          </Button>
                          <QuantityLabel>
                            {
                              cartData?.seats?.filter((id) => id === seat._id)
                                .length
                            }
                          </QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(seat._id, "seats")}
                          >
                            +
                          </Button>
                        </td>
                        <td>
                          Tables booked{" "}
                          {
                            cartData?.seats?.filter((id) => id === seat._id)
                              .length
                          }
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Kshs. {total}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
            {!!(cuisineItems.length || seatItems.length) && (
              <Box>
                <h2>Reservation information</h2>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Telephone number"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="Arrival time"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Departure Time"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Date"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Button block onClick={goToPayment}>
                  Continue to payment
                </Button>
              </Box>
            )}
          </ColumnsWrapper>
        </Center>
      </Bg>
    </>
  );
}
