import { Grid } from '@mui/material'
import Header from '../Header';
import AddSong from '../AddSong';
import SongList from '../SongList';
import SongPlayer from '../SongPlayer';

function App() {
  return (
    <div className="App">
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid item xs={12} md={5}>
          <SongPlayer />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
