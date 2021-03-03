import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import { checkItem, removeItem } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    textAlign: "left",
    marginLeft: theme.spacing(8),
    borderBottom: "1px dashed red",
    width: "80%",
  },
  name: {
    display: "inline-block",
    margin: "auto 20px auto 20px",
    width: "60%",
  },
  expand: {
    display: "inline-block",
    margin: "auto 20px auto 20px",
    position: "relative",
    top: theme.spacing(1),
  },
  description: {
    position: "relative",
    left: theme.spacing(4),
  },
  delete: {
    position: "relative",
    top: theme.spacing(1),
    "&:hover": {
      cursor: "pointer",
      color: "red",
    },
  },
}));

export default function Item({ _id, name, description }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState(false);
  const [lineThrough, setLineThrough] = React.useState(false);
  const [expand, setExpanded] = React.useState(false);

  const handleCheckbox = (e) => {
    setLineThrough(!lineThrough);
    setChecked(e.target.checked);
    dispatch(checkItem(_id));
  };

  const deleteItem = () => {
    console.log(_id);
    dispatch(removeItem(_id));
  };
  return (
    <div className={classes.root}>
      <Checkbox
        checked={checked}
        onChange={handleCheckbox}
        inputProps={{ "aria-lable": "primary checkbox" }}
      />
      <Typography
        style={lineThrough ? { textDecoration: "line-through" } : null}
        className={classes.name}
        variant="body1"
      >
        {name}
      </Typography>
      {description.length > 0 && (
        <ExpandMoreIcon
          className={classes.expand}
          onClick={() => setExpanded(!expand)}
        ></ExpandMoreIcon>
      )}
      {checked && (
        <DeleteIcon
          className={classes.delete}
          onClick={deleteItem}
        ></DeleteIcon>
      )}
      {expand && (
        <Typography variant="body1" className={classes.description}>
          Detail: {description}
        </Typography>
      )}
    </div>
  );
}
