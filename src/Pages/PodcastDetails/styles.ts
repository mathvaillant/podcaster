import { makeStyles } from "tss-react/mui";

export default makeStyles()(() => ({
  root: {},
  imgWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 10
  },
  leftCard: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10
  }
}));
