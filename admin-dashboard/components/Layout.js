import { useSession, signIn } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "@/components/Logo";
import styled from "styled-components";

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  gap: 1px;
  height: 500px;
  width: 700px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 5px;
`;

const Description = styled.div`
  background-color: rgba(20, 33, 61, 0.4);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: #ffffff;
  h1 {
    font-size: 40px;
    font-weight: 700;
    margin: 10px 10px;
    color: rgba(252, 163, 17, 0.8);
    line-height: 1.2;
  }
  h2 {
    font-size: 20px;
    font-weight: 500;
    margin: 10px 10px;
    color: rgba(229, 229, 229, 0.8);
  }
  p {
    letter-spacing: 1px;
    line-height: 1.5;
    margin: 10px 10px;
    font-size: 15px;
    font-weight: 400;
    color: white;
  }
`;

const Login_sect = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2),
    0 0 20px rgba(255, 255, 255, 0.1);
  background-color: rgba(252, 163, 17, 0.8); /* Added background color */
  img {
    width: 345px;
    height: 490px;
    object-fit: cover; /* Ensure the image covers the container */
    border-radius: 5px;
    position: absolute;
  }
  button {
    position: absolute;
    bottom: 20px; /* Adjust as per your requirement */
    width: 80%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    background-color: rgba(20, 33, 61, 0.7); /* Blue button background */
    color: white; /* White button text */
    transition: 0.5s;
    z-index: 1; /* Ensure the button is above the image */
    &:hover {
      cursor: pointer;
      background-color: rgba(
        20,
        33,
        61,
        1
      ); /* Darker blue button background on hover */
    }
  }
`;

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  const closeNav = () => {
    setShowNav(false);
  };

  if (!session) {
    return (
      <div className="bg-gradient-to-br from-blue-950 to-amber-500 w-screen h-screen justify-center flex items-center">
        <ContentWrapper>
          <Description>
            <h1>Welcome to the Admin Dashboard</h1>
            <h2>Please login to continue</h2>
            <p>
              Welcome to our Restaurant Reservation Dashboard! Explore our
              curated menu of savory appetizers to decadent desserts, offering
              an unforgettable dining experience. Join us for exceptional
              service and exquisite cuisine.
            </p>
          </Description>
          <Login_sect>
            <img
              src="./abbe719f6bd49f7012672cbae8209894.jpg"
              alt="Restaurant_image"
            />
            <button
              onClick={() => signIn("google")}
              className="bg-white p-2 px-4 rounded-lg"
            >
              Login into Account
            </button>
          </Login_sect>
        </ContentWrapper>
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen">
      <div className="block md:hidden items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex bg-bgGray rounded-lg">
        <Nav show={showNav} closeNav={closeNav} />
        <div className="flex-grow min-h-screen p-4">{children}</div>
      </div>
    </div>
  );
}
