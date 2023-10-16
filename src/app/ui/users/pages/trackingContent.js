import { Component } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Button, Grid } from "@mui/material";
import ImageSrc from "../../vendor/common/images-constant";

import { AxiosInterceptor } from "../../common/interceptor";
import ServiceConfig from "../../common/service-config";
import { SERVICES } from "../../common/constant/services-constant";

export default class TrackingContent extends Component {
  #imageSrc;
  #serviceConfig;
  #axiosGeneric;
  #axiosUser;

  constructor(props) {
    super(props);
    this.state = {
      departmentList: [],
      permitList: [],
    };
    this.#imageSrc = ImageSrc();
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axiosGeneric = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.MAIN)
    ).axios;
    this.#axiosUser = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.USER)
    ).axios;
    this.getDepartmentList = this.getDepartmentList.bind(this);
  }

  componentDidMount() {
    this.getDepartmentList();
    this.getMyPermit();
  }

  async getDepartmentList() {
    try {
      const req = await this.#axiosGeneric.get(`/generic/departmentCodes`);
      this.setState({ departmentList: req.data });
    } catch (error) {
      return error;
    }
  }

  async getMyPermit() {
    try {
      const req = await this.#axiosUser.get("/services/businessPermit", {
        withCredentials: true,
      });
      this.setState({ permitList: req.data });
    } catch (error) {
      return error;
    }
  }

  render() {
    const ButtonItem = styled(Button)(({ theme }) => ({
      padding: 5,
      width: 200,
      height: 200,
      backgroundImage: `url(${
        this.state.permitList.length > 0
          ? this.#imageSrc.completeBG.src
          : this.#imageSrc.incompleteBG.src
      })`,
      "&:hover": {
        color: "primary.main",
        cursor: "pointer",
        backgroundImage: `url(${
          this.state.permitList.length > 0
            ? this.#imageSrc.completeBGHover.src
            : this.#imageSrc.incompleteBGHover.src
        })`,
        opacity: [0.9, 0.8, 0.7],
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      },
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
    }));
    return (
      <Grid container spacing={3} padding={5}>
        {this.state.departmentList.map((item) => (
          <Grid item xs={12} sm={12} md={3} key={item.id}>
            <ButtonItem
              onClick={this.handleOpen}
              disabled={this.state.permitList.length === 0}
            >
              <Typography
                variant="subtitle1"
                color="secondary.main"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {item.code}
              </Typography>
            </ButtonItem>
          </Grid>
        ))}
      </Grid>
    );
  }
}
