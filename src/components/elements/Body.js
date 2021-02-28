import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { addItem, clearAllItems } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    width: "100%",
    marginTop: theme.spacing(2),
  },
  menu: {
    minHeight: 750,
  },
  input: {
    width: "60%",
    marginTop: theme.spacing(3),
    fontFamily: "Comic Sans MS",
    fontStyle: "Italic",
  },
  button: {
    width: "10%",
    marginTop: theme.spacing(3),
    display: "inline-block",
    marginLeft: theme.spacing(2),
    position: "relative",
    top: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(3),
    width: "60%",
    fontFamily: "Comic Sans MS",
    fontStyle: "Italic",
  },
  clearAllBtn: {
    marginBottom: 20,
    marginTop: 100,
  },

  outputTitle: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    textAlign: "left",
    position: "relative",
    left: theme.spacing(13),
    color: "green",
    fontStyle: "italic",
    fontFamily: "Comic Sans MS",
  },
}));

export default function Body(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [item, setItem] = React.useState({
    name: "",
    description: "",
    isDone: false,
  });
  const [errorInput, setErrorInput] = React.useState(false);

  const onChangeInput = (e) => {
    let value = e.target.value;
    if (value.length > 50) {
      setErrorInput(true);
    } else {
      setErrorInput(false);
    }
    setItem((prevValue) => ({ ...prevValue, name: value }));
  };

  const AddItem = () => {
    dispatch(addItem(item.name, item.description, item.isDone));
    setItem({
      name: "",
      description: "",
      isDone: "",
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid style={{ margin: "auto" }} item xs="12" sm="6" lg="4">
          <Paper className={classes.menu}>
            <Typography variant="h5" color="inherit">
              TO-DO LIST
            </Typography>
            <TextField
              id="standard-basic"
              label="Enter Item"
              error={errorInput ? true : false}
              className={classes.input}
              onChange={onChangeInput}
              value={item.name}
            />
            <TextField
              id="outlined-multiline-flexible"
              variant="outlined"
              label="Description"
              multiline
              className={classes.description}
              onChange={(e) =>
                setItem((prevValue) => ({
                  ...prevValue,
                  description: e.target.value,
                }))
              }
              value={item.description}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={AddItem}
            >
              Add
            </Button>

            <Typography
              className={classes.outputTitle}
              variant="h6"
              color="inherit"
            >
              List To-do
            </Typography>
            <div>
              {items.map((item) => (
                <Item
                  key={item._id}
                  _id={item._id}
                  name={item.name}
                  description={item.description}
                  isDone={item.isDone}
                ></Item>
              ))}
            </div>

            {items.length > 0 && (
              <Button
                className={classes.clearAllBtn}
                variant="contained"
                color="secondary"
                onClick={() => {
                  dispatch(clearAllItems());
                }}
              >
                Clear All
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
