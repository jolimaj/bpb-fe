import React, { Component } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Grid,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

class TableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      query: props.query,
    };
    this.rowData = props.rows;
    this.columnData = props.columns;
    this.serviceName = props.serviceName;
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }
  handleChangePage(event, newPage) {
    this.setState({ page: newPage });
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: +event.target.value });
    this.props.handleLimit(+event.target.value);
    this.setState({ page: 0 });
  }
  initChild = () => {
    if (this.rowData.length > 0) {
      const properties = this.rowData.map((property) => [property.name]);
      return properties;
    }
  };

  componentDidMount = () => this.initChild();
  render() {
    return (
      <>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          sx={{
            mb: 5,
          }}
        >
          <Grid item>{this.props.searchComponent}</Grid>
          <Grid item>
            {this.props.serviceName ? (
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                justify="flex-end"
                onClick={this.props.handleAdd}
              >
                {`Add ${this.props.serviceName}`}
              </Button>
            ) : null}
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {this.columnData.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      style={{
                        minWidth: column.minWidth,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        backgroundColor: "#1e6ea5",
                        color: "white",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {this.props.tableBody}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={this.props?.pageLength ?? 0}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        </Paper>
      </>
    );
  }
}
export default TableComponent;
