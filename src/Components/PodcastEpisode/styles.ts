import { makeStyles } from "tss-react/mui";
export default makeStyles()(() => ({
  root: {
    paddingLeft: "4rem"
  },
  cardWrapper: {
    padding: "1rem"
  },
  desc: {
    maxHeight: "300px",
    overflow: "overlay",
    margin: "1rem 0rem"
  },
  audioBar: {
    display: "flex",
    color: "white",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".3rem",
    backgroundColor: "#656565",
    cursor: "pointer",
    gap: "1rem"
  },
  slider: {
    color: "black",
    maxWidth: "80%",
    height: 10
  },
  time: {
    paddingRight: 10
  }
}));
