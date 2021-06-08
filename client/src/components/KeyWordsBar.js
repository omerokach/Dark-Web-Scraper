import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray() {
  const [anchorEl, setAnchorEl] = useState(null);

  const { currentUser } = useAuth();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const [keyWords, setKeyWords] = useState([]);

  const handleDelete = (chipToDelete) => async () => {
      setKeyWords((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
      );
      const keyWordsArr = keyWords.filter((keyWord) => keyWord.key !== chipToDelete.key)
      const res = await axios.put("http://localhost:8080/api/user/key-words", {
          keyWordsArr: keyWordsArr,
          userEmail: currentUser.email,
        });
  };
  const handleKeyPick = async (keyWord) => {
    setKeyWords((prev) => [...prev, { label: keyWord, key: keyWords.length }]);
    const keyWordsArr = keyWords.map((item) => item.label);
    keyWordsArr.push(keyWord);
    console.log(keyWordsArr);
    const res = await axios.put("http://localhost:8080/api/user/key-words", {
      keyWordsArr: keyWordsArr,
      userEmail: currentUser.email,
    });
  };

  return (
    <Paper component="ul" className={classes.root}>
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Key Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleKeyPick("Weapons")}>Weapons</MenuItem>
          <MenuItem onClick={() => handleKeyPick("Sexual")}>Sexual</MenuItem>
          <MenuItem onClick={() => handleKeyPick("money")}>money</MenuItem>
          <MenuItem onClick={() => handleKeyPick("Other")}>Other</MenuItem>
        </Menu>
      </div>
      {keyWords.map((data) => {
        let icon;
        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={data.label === "React" ? undefined : handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}
