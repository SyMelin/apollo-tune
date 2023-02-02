import { AddBoxOutlined, Link } from "@mui/icons-material"
import { Button, Dialog, DialogTitle, DialogContent, InputAdornment, TextField, DialogActions } from "@mui/material"
import { useState } from "react"

function AddSong() {
    const [dialog, setDialog] = useState(false)

    function handleCloseDialog() {
        setDialog(false)
    }

    return (
        <div style={{display: "flex", alignItems:"center"}}>
            <Dialog
                sx={{ textAlign: "center"}}
                open={dialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img
                        src="https://i1.sndcdn.com/artworks-000670470790-ej1gvb-t500x500.jpg"
                        alt="Song thumbnail"
                        style={{ width: "90%" }}
                    />
                    <TextField
                        margin="dense"
                        name="title"
                        label="Title"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="artiste"
                        label="Artiste"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="thumbnail"
                        label="Thumbnail"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions sx={{ display: "flex", justifyContent: "space-between"}}>
                    <Button
                        color="secondary"
                        onClick={handleCloseDialog}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleCloseDialog}
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
            />
            <Button
                sx={{ margin: "12px"}}
                variant="contained"
                color="primary"
                endIcon={<AddBoxOutlined />}
                onClick={() => setDialog(true)}
            >
                Add
            </Button>
        </div>
    )
}

export default AddSong