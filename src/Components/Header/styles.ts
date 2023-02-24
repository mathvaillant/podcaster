import { makeStyles } from "tss-react/mui";

export default makeStyles()(() => ({
  root: {
    color: "white"
  },
  button: {
    textTransform: "none",
    fontWeight: 600,
    fontSize: 20
  },
  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  }
}));
