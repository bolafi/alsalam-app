import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import moment from "moment";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    fontSize: "1.5rem",
    fontFamily: "Tajawal",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
    },
  },
  body: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Tajawal",
    border: "none",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
    },
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#44A549",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#72C777",
    },
    fontFamily: "Tajawal",
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
    background: "#333",
    direction: "rtl",
  },
});

export default function MyBookings({ bookingData }) {
  const classes = useStyles();

  // This function to display (صباحا او مساءا) depends on the time and if the time was booked is only one it removes the pipeline || if more it spereate the timings with it
  const changeAmPm = (book) => {
    if (book.length === 1) {
      return book.map((time) => {
        const p1 = time.split(" ")[0];
        return time.split(" ")[1] === "am" ? ` ${p1} صباحا ` : ` ${p1} مساءا `;
      });
    } else {
      return book.map((time) => {
        const p1 = time.split(" ")[0];
        return time.split(" ")[1] === "am"
          ? ` ${p1} صباحا ||`
          : ` ${p1} مساءا ||`;
      });
    }
  };

  return (
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>رقم الحجز</StyledTableCell>
          <StyledTableCell>تاريخ الحجز</StyledTableCell>
          <StyledTableCell>الوقت</StyledTableCell>
          <StyledTableCell>سعر الحجز</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bookingData.map((row) => (
          <StyledTableRow key={row.bookingNumber}>
            <StyledTableCell>{row.bookingNumber}</StyledTableCell>
            <StyledTableCell>
              {moment(row.bookingDate).format("DD-MM-YYYY")}
            </StyledTableCell>
            <StyledTableCell>{changeAmPm(row.bookingTime)}</StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {row.bookingPrice} ريال
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}
