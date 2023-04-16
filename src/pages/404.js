import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
export default function error404(){
    return(
        <Stack mt="15vw"   
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Typography sx={{color: "#FFFFFF", fontSize: "4vw"}}>oh no! Page not found.... 404:( </Typography>
            <Button href="/todos" variant="contained" sx={{ backgroundColor: "white", color: "gray","&:hover": { backgroundColor: "gray", color: "white" }  }}>Go back to home</Button>
        </Stack>
    );
}