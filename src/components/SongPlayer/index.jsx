import { useContext } from "react"
import { PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material"
import { Card, CardContent, CardMedia, IconButton, Slider, Typography } from "@mui/material"
import { SongContext } from "../App"
import Playlist from "../Playlist"

function SongPlayer() {
    const { state } = useContext(SongContext)

    return (
        <>
            <Card variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 15px', width: '50%'}}>
                    <CardContent sx={{ flex: '1 0 auto' }}> 
                        <Typography variant="h5" component="h3">
                            {state.song.title}
                        </Typography>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            {state.song.artist}
                        </Typography>
                    </CardContent>
                    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '12px', paddingRight: '12px' }}>
                        <IconButton>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton>
                            <PlayArrow sx={{ width: '38px', height: '38px' }}/>
                        </IconButton>
                        <IconButton>
                            <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            00:01:30
                        </Typography>
                    </div>
                    <Slider
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
                <CardMedia
                    sx={{ width: '150px' }}
                    image={state.song.thumbnail}
                />
            </Card>
            <Playlist />
        </>
    )
}

export default SongPlayer