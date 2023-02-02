import { Grid } from '@mui/material'
import Header from '../Header';
import AddSong from '../AddSong';
import SongList from '../SongList';
import SongPlayer from '../SongPlayer';

function App() {
  return (
    <div style={{ backgroundColor: "#2A2A2A" }} >
      <Header />
          
      <Grid container spacing={3} 
      sx={{ paddingTop: "80px"}}
      >
        <Grid 
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          sx={{
            position: 'fixed',
            width: '100%',
            right: '12px',
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
