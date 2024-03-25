import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    body{
        background-color: #EEEEEE;
        padding:0;
        margin:0;
        font-family: 'Poppins', sans-serif;
    }
  /* Change the width and height of the scrollbar */
    ::-webkit-scrollbar {
        width: 0px; /* Width of the vertical scrollbar */
        height: 0px; /* height of the vertical scrollbar */
    }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
