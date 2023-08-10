import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  Grid,
  Container,
  Typography,
  Stack,
  Button,
  Card,
  CardMedia,
  CardContent,
  AppBar,
} from "@mui/material";
import { PhotoCamera as CameraIcon } from "@mui/icons-material";
import Slider from "../common/component/slider";

export default class LandingPage extends Component {
  render() {
    const cards = [1, 2, 3];

    return (
      <Box sx={{ flexGrow: 1, width: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AppBar
              position="relative"
              style={{ backgroundColor: "secondary" }}
            >
              <Toolbar>
                <CameraIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="secondary" noWrap>
                  Album layout
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid item xs={12}>
              <Grid item xs={8}>
                <Box
                  sx={{
                    pt: 8,
                    pb: 6,
                  }}
                >
                  <Container maxWidth="sm">
                    <Typography
                      component="h1"
                      variant="h2"
                      align="left"
                      color="text.primary"
                      gutterBottom
                    >
                      Album layout
                    </Typography>
                    <Typography
                      variant="h5"
                      align="left"
                      color="text.secondary"
                      paragraph
                    >
                      Something short and leading about the collection below—its
                      contents, the creator, etc. Make it short and sweet, but
                      not too short so folks don&apos;t simply skip over it
                      entirely.
                    </Typography>
                    <Stack
                      sx={{ pt: 4 }}
                      direction="row"
                      spacing={2}
                      justifyContent="left"
                    >
                      <Button variant="contained">Main call to action</Button>
                      <Button variant="outlined">Secondary action</Button>
                    </Stack>
                  </Container>
                </Box>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>

            <Grid item xs={12}>
              <Box fixed backgroundColor="background.main">
                <Slider />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Container sx={{ py: 8 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                  {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardMedia
                          component="div"
                          sx={{
                            // 16:9
                            pt: "56.25%",
                          }}
                          image="https://source.unsplash.com/random?wallpapers"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            Heading
                          </Typography>
                          <Typography>
                            This is a media card. You can use this section to
                            describe the content.
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
