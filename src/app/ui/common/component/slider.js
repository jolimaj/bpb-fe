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
        padding={10}
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
            <Box p={10}>
              <Typography
                variant="subtitle1"
                align="center"
                color="secondary"
                sx={{ fontWeight: "bold", fontStyle: "italic" }}
              >
                Mission & Vision
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="secondary"
                paragraph
              >
                To deliver fast and efficient services and encourage businessmen
                to augment revenues and job opportunities in the locality and
                inspect every establishment in accordance with the rules and
                guidelines imposed.
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
              height: 300,
            }}
          >
            <Box p={10}>
              <Typography
                variant="subtitle1"
                align="center"
                color="secondary"
                sx={{ fontWeight: "bold", fontStyle: "italic" }}
              >
                Mission & Vision
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="secondary"
                paragraph
              >
                Be the most efficient, prompt and busaness-friendly business
                permits and licensing office.
              </Typography>
            </Box>
          </Container>
        </Carousel.Item>
      </Carousel>
    );
  }
}
