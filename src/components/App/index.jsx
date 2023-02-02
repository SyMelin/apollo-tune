import { Grid, Hidden, useMediaQuery } from '@mui/material'
import Header from '../Header';
import AddSong from '../AddSong';
import SongList from '../SongList';
import SongPlayer from '../SongPlayer';

function App() {
  const greaterThanSmall = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const greaterThanMedium = useMediaQuery(theme => theme.breakpoints.up('md'))

  return (
    <div style={{ backgroundColor: "#2A2A2A" }} >
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid
        container
        spacing={3}
        sx={{ paddingTop: greaterThanSmall ? "80px" : "10px"}}>
        <Grid 
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          sx={
            greaterThanMedium
            ? {
            position: 'fixed',
            width: '100%',
            right: '12px',
            } : {
              position: 'fixed',
              width: '100%',
              left: '0px',
              bottom: '0px'
            }}
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
