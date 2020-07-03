import styled, { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
  body {
    font-family: 'Poppins', sans-serif;
  }
`

export const Error = styled.span`
  font-size: 0.8em;
  color: #ff0000;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  margin: 0 auto;
`
