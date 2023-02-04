import { useSubscription } from "@apollo/client"
import { PlayArrow, Save } from "@mui/icons-material"
import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from "@mui/material"
import { GET_SONGS } from "../../graphql/subscriptions"

function Song({ song }) {
    const { title, artist, thumbnail } = song

    return (
        <Card sx={{ margin: "36px" }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <CardMedia sx={{ objectFit: 'cover', width: '140px', height: '140px' }} image={thumbnail} />
                <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body1" component="p" color="textSecondary">
                            {artist}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton size="small" color="primary">
                            <PlayArrow />
                        </IconButton>
                        <IconButton size="small" color="secondary">
                            <Save />
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    )
}

function SongList() {
    const { data, loading, error } = useSubscription(GET_SONGS)

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 50,
            }}>
                <CircularProgress />
            </div>
        )
    }
    /*
    const song = {
        title: "LÜNE",
        artist: "MÖÖN",
        thumbnail: "http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg"
    }*/

    if (error) {
        return <div>Error fetching songs</div>
    }

    return (
        <div>
            {data.songs.map((song) => (
                <Song key={song.id} song={song} />
            ))}
        </div>
    )
}

export default SongList