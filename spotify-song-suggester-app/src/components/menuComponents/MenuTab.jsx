import React from "react";
import Link from "@material-ui/core/Link";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import Headset from "@material-ui/icons/Headset";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Link as RouterLink, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  linkButtons: {
    textDecoration: "none",
    color: "secondary",
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function MenuTab() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <Headset />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem style={{ textDecoration: "none", color: "#1DB954" }}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledMenuItem>

        <NavLink
          style={{ textDecoration: "none", color: "#1DB954" }}
          className={classes.linkButtons}
          to="/home/"
        >
          <StyledMenuItem>
            <ListItemIcon>
              <Headset fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </StyledMenuItem>
        </NavLink>

        <NavLink
          style={{ textDecoration: "none", color: "#1DB954" }}
          className={classes.linkButtons}
          to="/favorites"
        >
          <StyledMenuItem>
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </StyledMenuItem>
        </NavLink>
        <StyledMenuItem style={{ textDecoration: "none", color: "#1DB954" }}>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Update User" />
        </StyledMenuItem>
        <Link
          target="_blank"
          href="https://github.com/Build-Week-Spotify-Song-Recommender"
        >
          <StyledMenuItem>
            <ListItemIcon>
              <GitHubIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Github" />
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
}
