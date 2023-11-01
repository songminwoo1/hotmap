import Map from "./Map";

import { Container } from "@mui/material";

function Main(){
  return(
    <Container style={{minWidth: "100vw", width: "100vw", height: "100vh", padding: 0}}>
      <Map></Map>
    </Container>
  )
}

export default Main;