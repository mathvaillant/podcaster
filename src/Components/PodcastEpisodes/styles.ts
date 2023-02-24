import { makeStyles } from "tss-react/mui";

export default makeStyles()(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingLeft: "4rem"
  },
  title: {
    fontWeight: 500,
    marginLeft: 10
  },
  topCard: {
    padding: 5
  },
  bottomCard: {
    display: "flex"
  },
  tablePaper: {
    padding: "2rem"
  },
  link: {
    color: "#1976d2",
    fontWeight: 500,
    cursor: "pointer"
  },
  header: {
    fontWeight: 500
  }
}));
