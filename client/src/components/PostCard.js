import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    alignSelf: "center",
    minWidth: 275,
    width: "50%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    margin: "1rem 1rem",
    fontSize: "1rem",
  },
  centerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function SimpleCard({ post }) {
  const classes = useStyles();

  return (
    <div className="post">
      <div className={classes.centerContent}>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.centerContent}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {post.title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              <div className="post-body">{post.body}</div>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              By: {post.author}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {post.date}
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </div>
    </div>
  );
}
