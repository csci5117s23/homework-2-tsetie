import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import {
  UserButton
} from "@clerk/nextjs";

export default function Header(props) {
  const {done} = props;
  return (
      <AppBar position="static" sx={{ backgroundColor: "#8e9eab" }}>
        <Toolbar>
          <Typography id="headerBarTitle" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            got<span id="headerBarTitleEnding">ToDo</span>
          </Typography>        

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {!done? <Button href="/todos" variant="contained" sx={{ backgroundColor: "white", color: "gray", "&:hover": { backgroundColor: "gray", color: "white" } }}>View Uncompleted tasks</Button>
            : <Button variant="contained" href="/done" sx={{ backgroundColor: "white", color: "gray","&:hover": { backgroundColor: "gray", color: "white" }  }}>View Completed Tasks</Button>}
            <UserButton />
          </Stack>

        </Toolbar>
      </AppBar>  
  );
}