import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { Button, Card } from "@material-ui/core";
import Header from "../components/Header";
import KeyWordsBar from "../components/KeyWordsBar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { useData } from "../context/DataContext";
import {useAuth} from '../context/AuthContext'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function AlertConfig() {
    const {currentUser} = useAuth();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const intervalRef = useRef();
  const { costumInterval, setCostumInterval } = useData();
  const handleIntervalPick = async (intervalValue,event) => {
    handleClose(event);
    try {
        await axios.put("http://localhost:8080/api/interval", {userEmail: currentUser.email, interval:intervalValue});
        setCostumInterval(intervalValue);
    } catch (error) {
        console.log(error);
    }
  };

  const handleSubmit = async () => {
    console.log(intervalRef);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <h1>Dashboard</h1>
      </div>
      <div className="alertFormContainer">
        <div className="alertForm">
          <Card style={{ width: "50vh", height: "60vh" }}>
            <div className={classes.margin}>
              <div style={{ display: "flex" }}>
                <AccessAlarmIcon />
                <div>
                  <Button
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    Udpate data every?
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem onClick={(e) => handleIntervalPick(1,e)}>
                                1 Min
                              </MenuItem>
                              <MenuItem onClick={(e) => handleIntervalPick(2,e)}>
                                2 Min
                              </MenuItem>
                              <MenuItem onClick={(e) => handleIntervalPick(3,e)}>
                                3 Min
                              </MenuItem>
                              <MenuItem onClick={(e) => handleIntervalPick(4,e)}>
                                4 Min
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </div>
              <div
                style={{
                  marginTop: "3rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p>{`⏲  Current interval is every ${costumInterval} min ⏲ `}</p>
              </div>
              <div
                style={{
                  marginTop: "3rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p>Choose you subjects you would like to be update about</p>
              </div>
              <KeyWordsBar />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5rem",
              }}
            >
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
