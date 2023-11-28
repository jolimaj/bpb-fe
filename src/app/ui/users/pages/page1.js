import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Grid,
  Container,
  Typography,
  Button,
  Breadcrumbs,
  Link,
} from "@mui/material";
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
  #queryView;
  #queryID;
  #queryRequirements;
  #url;

  constructor(props) {
    super(props);
    this.state = {
      departmentList: [],
      permitList: [],
      openRequirements: false,
      deptId: null,
      open: false,
    };
    this.#queryRequirements = props.searchParams.get("requirements");
    this.#queryView = props.searchParams.get("view");
    this.#queryID = props.searchParams.get("permitId");
    this.#url = `${props?.route}?${props?.searchParams}`;
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
    this.handleCrumbs = this.handleCrumbs.bind(this);
    this.handleCrumbs2 = this.handleCrumbs2.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  async componentDidMount() {
    const data = await this.getMyPermit();
    if (data) {
      this.setState({ permitList: data });
    }
    await this.getDepartmentList();
  }

  async getMyPermit() {
    try {
      const { data } = await this.#axiosUser.get("/services/businessPermit", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        this.props.redirect("/signin");
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
    window.location.href = `/account?requirements=${code}`;
  }
  handleCrumbs() {
    window.location.href = `/account`;
  }

  handleCrumbs2(key) {
    window.location.href = `/account?requirements=${key}`;
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
                {this.#url.includes("requirements") ? (
                  <>
                    {this.#url.includes("view") ? (
                      <>
                        <Breadcrumbs aria-label="breadcrumb">
                          <Link
                            underline="hover"
                            color="primary"
                            sx={{
                              fontWeight: "bold",
                              "&:hover": {
                                color: "tertiary.text",
                                cursor: "pointer",
                              },
                            }}
                            onClick={this.handleCrumbs}
                          >
                            REQUIRMENTS
                          </Link>
                          <Link
                            underline="hover"
                            color="inherit"
                            sx={{
                              fontWeight: "bold",
                              "&:hover": {
                                color: "tertiary.text",
                                cursor: "pointer",
                              },
                            }}
                            onClick={(e) => {
                              this.handleCrumbs2(this.#queryRequirements);
                            }}
                          >
                            {this.#queryRequirements}
                          </Link>
                          <Typography color="text.primary">
                            {this.#queryView}
                          </Typography>
                        </Breadcrumbs>
                      </>
                    ) : (
                      <>
                        <Breadcrumbs aria-label="breadcrumb">
                          <Link
                            underline="hover"
                            color="primary"
                            sx={{
                              fontWeight: "bold",
                              "&:hover": {
                                color: "tertiary.text",
                                cursor: "pointer",
                              },
                            }}
                            onClick={this.handleCrumbs}
                          >
                            REQUIRMENTS
                          </Link>

                          <Typography color="text.primary">
                            {this.#queryRequirements}
                          </Typography>
                        </Breadcrumbs>
                      </>
                    )}

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
                          {`${this.#queryRequirements} Requirements`}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <RequirementsForm
                          name={this.#queryView}
                          code={this.#queryRequirements}
                          queryID={this.#queryID}
                          route={this.props.route}
                          permitList={permitList}
                          url={this.#url}
                          reloadPage={this.props.reloadPage}
                          redirect={this.props.redirect}
                        />
                      </Grid>
                    </Grid>
                  </>
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
