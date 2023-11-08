import { Component } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Button, Grid, Box } from "@mui/material";
import ImageSrc from "../../vendor/common/images-constant";
import RequirementsForm from "./requirements";

import { AxiosInterceptor } from "../../common/interceptor";
import ServiceConfig from "../../common/service-config";
import { SERVICES } from "../../common/constant/services-constant";

export default class TrackingContent extends Component {
  #imageSrc;
  #serviceConfig;
  #axiosGeneric;
  #axiosUser;
  #route;
  #params;
  #query;

  constructor(props) {
    super(props);
    this.state = {
      departmentList: [],
      permitList: [],
      openRequirements: false,
      deptId: null,
    };
    this.#params = new URLSearchParams(window.location.search);
    this.#query = this.#params.get("requirements");
    this.#route = props.route;
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
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
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
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
      return error;
    }
  }

  handleOpen(code) {
    window.location.href = `account?requirements=${code}`;
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
        {this.#query ? (
          <Grid item xs={12} sm={12} md={12}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                component="h1"
                variant="h3"
                color="primary"
                noWrap
                sx={{
                  flexGrow: 1,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 5,
                }}
              >
                {`${this.#query} Requirements`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <RequirementsForm
                code={this.#query}
                permitList={this.state.permitList}
              />
            </Grid>
          </Grid>
        ) : (
          this.state.departmentList.map((item) => (
            <Grid item xs={12} sm={12} md={3} key={item.id}>
              <ButtonItem
                onClick={(e) => {
                  this.setState({ openRequirements: true, deptId: item.code });
                  this.handleOpen(item.code);
                }}
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
          ))
        )}
      </Grid>
    );
  }
}
