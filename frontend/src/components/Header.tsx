import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

export default function AutoMLHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AutoML
          </Typography>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Sayan Chaudhry" src="../../static/avatar.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
