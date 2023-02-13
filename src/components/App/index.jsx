import { createContext, useContext, useReducer } from 'react'
import { Grid, Hidden, useMediaQuery } from '@mui/material'
import songReducer from '../../reducer'
import Header from '../Header'
import AddSong from '../AddSong'
import SongList from '../SongList'
import SongPlayer from '../SongPlayer'

export const SongContext = createContext({
  song: {
    id: "85555c6b-18e4-4594-a79f-f87d17bf76d0",
    title:"LÜNE",
    artist:"MÖÖN",
    thumbnail:"http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg",
    url:"https://www.youtube.com/watch?v=--ZtUFsIgMk",
    duration:"250"
  },
  isPlaying: false
})

function App() {
  const initialSongState = useContext(SongContext)
  const [state, dispatch] = useReducer(songReducer, initialSongState)
  const greaterThanSmall = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const greaterThanMedium = useMediaQuery(theme => theme.breakpoints.up('md'))
  
  return (
    <SongContext.Provider value={{ state, dispatch }}>
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
    </SongContext.Provider>
  );
}

export default App;
