import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import { Paper, Grid, Container, Typography, Button, Box } from "@mui/material";
import ImageSrc from "../../vendor/common/images-constant";
import RequirementsForm from "./requirements";

import { AxiosInterceptor } from "../../common/interceptor";
import ServiceConfig from "../../common/service-config";
import { SERVICES } from "../../common/constant/services-constant";
class Page1 extends Component {
  #serviceConfig;
  #axiosGeneric;
  #axiosUser;
  #imageSrc;
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
    this.getMyPermit = this.getMyPermit.bind(this);
  }

  componentDidMount() {
    this.getMyPermit();
    this.getDepartmentList();
  }

  async getMyPermit() {
    try {
      const { data } = await this.#axiosUser.get("/services/businessPermit", {
        withCredentials: true,
      });
      this.setState({ permitList: data });
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
      return error;
    }
  }

  async getDepartmentList() {
    try {
      const { data } = await this.#axiosGeneric.get(`/generic/departmentCodes`);
      this.setState({ departmentList: data });
    } catch (error) {
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
        permitList.length > 0
          ? this.#imageSrc.completeBG.src
          : this.#imageSrc.incompleteBG.src
      })`,
      "&:hover": {
        color: "primary.main",
        cursor: "pointer",
        backgroundImage: `url(${
          permitList.length > 0
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
    const { departmentList, permitList } = this.state;
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 5,
                display: "flex",
                flexDirection: "column",
                height: "auto",
              }}
            >
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
                        permitList={permitList}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  departmentList.map((item) => (
                    <Grid item xs={12} sm={12} md={3} key={item.id}>
                      <ButtonItem
                        onClick={(e) => {
                          this.setState({
                            openRequirements: true,
                            deptId: item.code,
                          });
                          this.handleOpen(item.code);
                        }}
                        disabled={permitList.length === 0}
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
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default Page1;
