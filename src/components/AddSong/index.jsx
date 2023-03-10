import { useEffect, useState } from "react"
import { AddBoxOutlined, Link } from "@mui/icons-material"
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    InputAdornment,
    TextField,
    DialogActions
} from "@mui/material"
import ReactPlayer from "react-player"
import SoundCloudPlayer from "react-player/soundcloud"
import YouTubePlayer from "react-player/youtube"
import { useMutation } from "@apollo/client"
import { ADD_SONG } from "../../graphql/mutations"

const DEFAULT_SONG = {
    duration: 0,
    title: "",
    artist: "",
    thumbnail: ""
}

function AddSong() {
    const [addSong, { error }] = useMutation(ADD_SONG)

    const [url, setUrl] = useState('')
    const [playable, setPlayable] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [song, setSong] = useState(DEFAULT_SONG)

    useEffect(() => {
        const isPlayable = SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url)
        setPlayable(isPlayable)
    }, [url])

    function handleCloseDialog() {
        setDialog(false)
    }

    async function handleAddSong() {
        try {
            const { url, thumbnail, duration, title, artist } = song

            await addSong({
                variables: {
                    url: url.length > 0 ? url : null,
                    thumbnail: thumbnail.length > 0 ? thumbnail : null,
                    duration: duration > 0 ? duration : null,
                    title: title.length > 0 ? title : null,
                    artist: artist.length > 0 ? artist : null
            }
        })
        handleCloseDialog()
        setSong(DEFAULT_SONG)
        setUrl("")
        } catch (error) {
            console.log("Error adding song", error)
        }
    }

    function handleChangeSong(e) {
        const { name, value } = e.target
        setSong(prevSong => ({
            ...prevSong,
            [name]: value
        }))
    }

    function getYoutubeInfo(player) {
        const duration = player.getDuration()
        const { title, video_id, author } = player.getVideoData()
        const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`
        return {
            duration,
            title,
            artist: author,
            thumbnail
        }
    }

    function getSoundcloudInfo(player) {
        return new Promise(resolve => {
            player.getCurrentSound(songData => {
                if (songData) {
                    resolve ({
                        duration: Number(songData.duration / 1000), //orginal duration is in milliseconds
                        title: songData.title,
                        artist: songData.user.username,
                        thumbnail: songData.artwork_url.replace('-large', '-t500x500')
                    })
                }
            })
        })
    }

    async function handleEditSong({ player }) {
        const nestedPlayer = player.player.player
        let songData = {}
        if (nestedPlayer.getVideoData) {
            songData = getYoutubeInfo(nestedPlayer)
        } else if (nestedPlayer.getCurrentSound) {
            songData = await getSoundcloudInfo(player)
        }
        setSong({...songData, url})
    }

    function handleError(field) {
        return error && error.graphQLErrors[0]?.extensions?.path.includes(field)
    }

    const { thumbnail, title, artist } = song
    //console.dir(error)
    return (
        <div
            style={{
                display: "flex",
                alignItems:"center"
        }}
        >
            <Dialog
                sx={{ textAlign: "center"}}
                open={dialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img
                        src={thumbnail}
                        alt="Song thumbnail"
                        style={{ width: "90%" }}
                    />
                    <TextField
                        value={title}
                        onChange={handleChangeSong}
                        margin="dense"
                        name="title"
                        label="Title"
                        fullWidth
                        error={handleError('title')}
                        helperText={handleError('title') && "Fill out field"}
                    />
                    <TextField
                        value={artist}
                        onChange={handleChangeSong}
                        margin="dense"
                        name="artist"
                        label="Artist"
                        fullWidth
                        error={handleError('artist')}
                        helperText={handleError('artist') && "Fill out field"}
                    />
                    <TextField
                        value={thumbnail}
                        onChange={handleChangeSong}
                        margin="dense"
                        name="thumbnail"
                        label="Thumbnail"
                        fullWidth
                        error={handleError('thumbnail')}
                        helperText={handleError('thumbnail') && "Fill out field"}
                    />
                </DialogContent>
                <DialogActions
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <Button
                        color="secondary"
                        onClick={handleCloseDialog}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAddSong}
                    >
                        Add song
                    </Button>
                </DialogActions>
            </Dialog>
            <TextField
                sx={{ margin: "12px"}}
                placeholder="Add Youtube or Soundcloud URL"
                fullWidth
                maring="normal"
                type="url"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Link />
                        </InputAdornment>
                    )
                }}
                onChange={(e) => setUrl(e.target.value)}
                value={url}
            />
            <Button
                sx={{ margin: "12px"}}
                variant="contained"
                color="primary"
                endIcon={<AddBoxOutlined />}
                onClick={() => setDialog(true)}
                disabled={!playable}
            >
                Add
            </Button>
            {/*ReactPlayer will provide all the data from the url*/}
            <ReactPlayer
                url={url}
                hidden
                onReady={handleEditSong}
            />
        </div>
    )
}

export default AddSong