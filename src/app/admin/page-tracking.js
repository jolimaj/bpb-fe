import React, { Component } from "react";
import { Paper, Grid, Container, Typography } from "@mui/material";
import Chart from "chart.js/auto";
import {
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

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
class DashBoardPage extends Component {
  #axios;
  #serviceConfig;
  constructor(props) {
    super(props);
    this.state = {
      session: props.session,
      record: [],
      datas: {
        labels: "",
        datasets: [],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Monthly Reports",
          },
        },
      },
    };
    this.month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
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
    // if (!this.state.session) {
    //   window.location.href = "/signin";
    // }
    try {
      const req = await this.#axios.get(`/dashboard`, {
        withCredentials: true,
      });
      console.log(
        "🚀 ~ file: page-tracking.js:75 ~ DashBoardPage ~ getDashBoardData ~ req:",
        req
      );

      const renewData = this.month.map((value, index) => {
        return req.data.monthlyReNew.map((item) => {
          const monthIndex = new Date(item.month).getMonth();

          return monthIndex === index ? item.count : null;
        });
      });
      const newData = this.month.map((value, index) => {
        return req.data.monthlyNew.map((item) => {
          const monthIndex = new Date(item.month).getMonth();

          return monthIndex === index ? item.count : null;
        });
      });
      this.setState({
        record: req.data,
        datas: {
          labels: this.month,
          datasets: [
            {
              label: "New",
              data: newData.map((item) => {
                const array = item.filter((item) => {
                  return item;
                });
                return array;
              }),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Renewal",
              data: renewData.map((item) => {
                const array = item.filter((item) => {
                  return item;
                });
                return array;
              }),
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        },
      });
      return req;
    } catch (error) {
      if (error?.response?.data?.code === "LOGIN_FIRST") {
        window.location.href = "/signin";
      }
      return error;
    }
  }
  render() {
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
              <Bar options={this.state.options} data={this.state.datas} />
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
