import { makeStyles } from "tss-react/mui";

export default makeStyles()(() => ({
  root: {
    display: "flex",
    position: "relative",
    textAlign: "center",
    minWidth: 200,
    margin: ".5rem .5rem 7rem .5rem",
    ":hover": {
      cursor: "pointer"
    }
  },
  cardWrapper: {
    paddingTop: "4rem",
    width: "100%"
  },
  img: {
    width: 100,
    borderRadius: "50%",
    position: "absolute",
    zIndex: 1,
    top: 27,
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 600
  },
  author: {
    fontWeight: 400,
    color: "grey"
  }
}));
