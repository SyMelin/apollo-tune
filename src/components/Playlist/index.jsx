import { Delete } from "@mui/icons-material"
import { Avatar, Typography, IconButton, useMediaQuery } from "@mui/material"

function AwaitingSong({ song }) {
    const { thumbnail, artist, title } = song

    return (
        <div style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateColumns: '50px auto 50px',
            gap: '12px',
            alignItems: 'center',
            marginTop: '10px'
        }}>
            <Avatar sx={{width: '44px', height: '44px'}} src={thumbnail} alt="Song thumbnail" />
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap'}}>
                <Typography sx={{textOverflow: 'ellipsis', overflow: 'hidden'}} color="textPrimary" variant="subtitle2">
                    {title}
                </Typography>
                <Typography sx={{textOverflow: 'ellipsis', overflow: 'hidden'}} color="textSecondary" variant="body2">
                    {artist}
                </Typography>
            </div>
            <IconButton>
                <Delete color="error" />
            </IconButton>
        </div>
    )
}

function Playlist() {
    const greaterThanMedium = useMediaQuery(theme => theme.breakpoints.up('md'))

    const song = {
        title: "LÜNE",
        artist: "MÖÖN",
        thumbnail: "http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg"
    }

    return greaterThanMedium && (
        <div style={{ margin: '10px 0' }}>
            <Typography color="textSecondary" variant="button">
                PLAYLIST(5)
            </Typography>
            {Array.from({ length: 5 }, () => song).map((song, index) => (
                <AwaitingSong key={index} song={song} />
            ))}
        </div>
    )
}

export default Playlist