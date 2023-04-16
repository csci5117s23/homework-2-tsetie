import { Inter } from 'next/font/google'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="85vh">
        <Grid item xs={6}>
          <Paper elevation={12} >
            <Stack alignItems="center" justifyContent="center" pt="5vh" pb="10vh">
              <h1 id="siteName">got<span id="siteNameEndingStyle">ToDo</span></h1>
              <Button variant="outlined" href="/todos" size="large" sx={{ borderColor: "black", color: "black", "&:hover":{backgroundColor:"black", color:"white"}}}>
                Login
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
