import React, { Component } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Slider from "../../common/component/slider";
import Header from "../../common/component/appBar";
class LandingPage extends Component {
  handleLogin() {
    window.location.href = "/signin";
  }
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
          <Grid item xs={12}>
            <Grid container spacing={2} xs={6} sm={12} md={12}>
              <Grid item xs={12} sm={12} md={6}>
                <Box
                  sx={{
                    padding: 5,
                  }}
                >
                  <Container
                    sx={{
                      mt: 10,
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h2"
                      align="left"
                      gutterBottom
                      color="#fc8800"
                      sx={{ fontWeight: "bold" }}
                    >
                      Business Permit ng Bayan
                    </Typography>
                    <Typography
                      variant="h5"
                      align="left"
                      color="text.secondary"
                      paragraph
                    >
                      Register and renew your business to us
                    </Typography>
                    <Stack
                      sx={{ pt: 4 }}
                      direction="row"
                      spacing={2}
                      justifyContent="left"
                    >
                      <Button variant="contained" onClick={this.handleLogin}>
                        Apply or Renew Your Business Permit Here
                      </Button>
                    </Stack>
                  </Container>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <img
                  src={`https://res.cloudinary.com/dm1hejbuu/image/upload/v1691764299/SARIAYA-2_nbitmr.png`}
                  padding={20}
                  width={500}
                  height={500}
                  alt="Gilas Sariaya"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box fixed backgroundColor="background.main" height="300">
              <Slider />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Container sx={{ py: 8 }} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4} key={1}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    key={1}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image="https://res.cloudinary.com/dm1hejbuu/image/upload/v1691846963/365314564_298204166124108_5704273225682686802_n_zl06vr.jpg"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Business One Stop Shop 2023
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} key={2}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    key={1}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image="https://res.cloudinary.com/dm1hejbuu/image/upload/v1691846962/331699752_891749258542275_4612334168093100302_n_ov8gd6.jpg"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Meeting
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} key={2}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    key={1}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image="https://res.cloudinary.com/dm1hejbuu/image/upload/v1691846986/365861931_1297196344273029_2267868302849748795_n_co4djq.jpg"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        House to house visit
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default LandingPage;
