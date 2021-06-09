import React, { useRef } from "react";
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
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const intervalRef = useRef();
  const { costumInterval, setCostumInterval } = useData();

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
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
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
                              <MenuItem onClick={handleClose}>0.5 Min</MenuItem>
                              <MenuItem onClick={handleClose}>1 Min</MenuItem>
                              <MenuItem onClick={handleClose}>2 Min</MenuItem>
                              <MenuItem onClick={handleClose}>3 Min</MenuItem>
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
