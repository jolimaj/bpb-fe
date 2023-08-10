import React, { Component } from "react";
import Carousel from "react-grid-carousel";
import { Typography, Container, Box } from "@mui/material";

export default class Slider extends Component {
  render() {
    return (
      <Carousel
        showDots
        containerStyle={{ maxWidth: "auto" }}
        sx={{ width: 1 }}
        loop
      >
        <Carousel.Item>
          <Container
            sx={{
              position: "relative",
              color: "primary",
              backgroundSize: "cover",
              height: 300,
            }}
          >
            <Box pt={10}>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Title
              </Typography>
              <Typography
                variant="p"
                align="center"
                color="text.secondary"
                paragraph
              >
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don&apos;t simply skip over it entirely.
              </Typography>
            </Box>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container
            sx={{
              position: "relative",
              color: "primary",
              backgroundSize: "cover",
              height: 500,
            }}
          >
            <Box sx={{ position: "absolute" }}>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Title
              </Typography>
              <Typography
                variant="p"
                align="center"
                color="text.secondary"
                paragraph
              >
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don&apos;t simply skip over it entirely.
              </Typography>
            </Box>
          </Container>
        </Carousel.Item>
      </Carousel>
    );
  }
}
