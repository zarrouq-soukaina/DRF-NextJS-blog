import { makeStyles } from "@material-ui/core/styles";

import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container } from "@material-ui/core";
import { Button, CardActionArea, CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbarMain: {
    backgroundColor: "#50394c",
    
  },
  appbarDesktop: {
    backgroundColor: "#f8f8f8",
    color: "#fff",
  },
  toolbarDesktop: {
    padding: "0px",
    minHeight: 30,
  },
  toolbarMain: {
    padding: "0px",
    minHeight: 60,
  },
  Typography: {
    color:"#618685",
    
  },
}));

export default function Header({data}) {
  const classes = useStyles();
  return (
    <nav>
     <AppBar
        position="relative"
        elevation={0}
        className={classes.appbarDesktop}
      >
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbarDesktop}></Toolbar>
        </Container>
      </AppBar>
      <AppBar position="static" elevation={0} className={classes.appbarMain}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbarMain}>
        <Typography variant="h6"  component="div">
      MyBlog
    </Typography>
    {data.map((category) => (
   <Button size="small" color="primary" key={category.id} href={`category/${encodeURIComponent(category.slug)}`}>
   {category.name}
 </Button>
            
          
          ))}
        </Toolbar>
        </Container>
      </AppBar>
    
    </nav>
  )
}
