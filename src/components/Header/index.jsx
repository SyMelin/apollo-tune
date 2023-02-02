import { AppBar, Toolbar, Typography } from '@mui/material'
import { HeadsetTwoTone } from '@mui/icons-material'

function Header() {

    return (
        <AppBar color="primary" position="fixed">
            <Toolbar>
                <HeadsetTwoTone />
                <Typography sx={{ marginLeft: "18px" }} variant="h6" component="h1">
                    Apollo Music Share
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header