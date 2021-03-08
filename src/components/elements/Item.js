import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Popover from "@material-ui/core/Popover";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { checkItem, removeItem, editItem } from "../../actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    margin: "auto auto auto 20px",
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
  editIcon: {
    position: "relative",
    top: theme.spacing(1),
    "& hover": {
      cursor: "pointer",
      color: "blue",
    },
  },
  editBtn: {
    marginTop: "1rem",
    width: 70,
    height: 30,
  },

  delete: {
    position: "relative",
    top: theme.spacing(1),
    color: "red",
    "&:hover": {
      cursor: "pointer",
      color: "blue",
    },
  },
}));

export default function Item({ _id, name, description }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState(false);
  const [lineThrough, setLineThrough] = React.useState(false);
  const [expand, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editedName, setEditedName] = React.useState("");
  const [editedDescription, setEditedDescription] = React.useState("");

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleCheckbox = (e) => {
    setLineThrough(!lineThrough);
    setChecked(e.target.checked);
    dispatch(checkItem(_id));
  };

  const handleEdit = () => {
    // send action to the store
    dispatch(editItem(_id, editedName, editedDescription));
    // remove edit status and close the pop
    setEditedName("");
    setEditedDescription("");
    setAnchorEl(null);
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
      <EditIcon
        className={classes.editIcon}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setEditedName(name);
          setEditedDescription(description);
        }}
      ></EditIcon>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div style={{ padding: "20px 20px 20px 20px" }}>
          <FormControl>
            <InputLabel htmlFor="component-simple">Name</InputLabel>
            <Input
              id="component-simple"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              variant="outlined"
              label="Description"
              multiline
              style={{ marginTop: "10px" }}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.editBtn}
              onClick={handleEdit}
            >
              Confirm
            </Button>
          </FormControl>
        </div>
      </Popover>
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
