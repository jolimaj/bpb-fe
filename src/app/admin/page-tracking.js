import React, { Component } from "react";
import { Paper, Grid, Container, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { AxiosInterceptor } from "../ui/common/interceptor";
import ServiceConfig from "../ui/common/service-config";
import { SERVICES } from "../ui/common/constant/services-constant";

class DashBoardPage extends Component {
  #axios;
  #serviceConfig;
  constructor(props) {
    super(props);
    this.state = {
      session: props.session,
      record: [],
      datas: {},
    };
    this.getDashBoardData = this.getDashBoardData.bind(this);
    //api
    this.#serviceConfig = new ServiceConfig();
    this.#axios = new AxiosInterceptor(
      this.#serviceConfig.getServicesConfig(SERVICES.ADMIN)
    ).axios;
  }
  componentDidMount() {
    this.getDashBoardData();
  }
  async getDashBoardData() {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) {
      window.location.href = "/signin";
    }
    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );
    try {
      const req = await this.#axios.get(`/dashboard`, session);
      const labels = req.data.monthlyNew.map((item) => {
        return new Date(item.month).getDate();
      });

      const datasets = [
        {
          label: "Users Gained ",
          data: [55, 23, 96],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ];
      console.log(
        "🚀 ~ file: page-tracking.js:57 ~ DashBoardPage ~ getDashBoardData ~ datasets:",
        datasets
      );
      this.setState({ record: req.data, data: { labels, datasets } });
      return req;
    } catch (error) {
      if (error?.response.data.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
      return error;
    }
  }
  render() {
    console.log(this.state.data);
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 350,
              }}
            >
              {/* <Bar
                options={{
                  indexAxis: "y",
                  elements: {
                    bar: {
                      borderWidth: 2,
                    },
                  },
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "right",
                    },
                    title: {
                      display: true,
                      text: "Chart.js Horizontal Bar Chart",
                    },
                  },
                }}
                data={this.state.datas}
              /> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                // height: 240,
              }}
            >
              <Typography
                component="h2"
                variant="h6"
                color="primary.main"
                gutterBottom
                sx={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                New Permit
              </Typography>
              <Typography component="p" variant="h4">
                {this.state.record?.dailynewApplication ?? 0}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {`on ${new Date().toUTCString().slice(5, 16)}`}
              </Typography>
            </Paper>
            <Paper
              sx={{
                mt: 5,
                p: 2,
                display: "flex",
                flexDirection: "column",
                // height: 240,
              }}
            >
              <Typography
                component="h2"
                variant="h6"
                color="primary.main"
                gutterBottom
                sx={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                Renewal Permit
              </Typography>
              <Typography component="p" variant="h4">
                {this.state.record?.dailyrenewalApplication ?? 0}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {`on ${new Date().toUTCString().slice(5, 16)}`}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default DashBoardPage;
