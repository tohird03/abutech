import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InboxIcon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MailIcon,
  MenuIcon,
  Toolbar,
  Typography,
} from "./Sidebar.imported";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { sidebarProps } from "../../ts/interface/sidebar.interface";
import { TextField } from "@mui/material";
import { InputChangeEvt, InputKeyUp } from "../../ts/types/const.types";

const drawerWidth = 240;
const citys = [
  "Tashkent",
  "Samarqand",
  "Qarshi",
  "Buxoro",
  "Navoiy",
  "Andijon",
  "Farg'ona",
  "Namangan",
  "Jizzax",
  "Sirdaryo",
  "Termiz",
];

export default function ResponsiveDrawer(props: sidebarProps) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickCity = (text: string) => {
    props.setCity(text);
  };

  const handleChangeSearch = (evt: InputChangeEvt) => {
    setSearch(evt.target.value)
  }

  const handelSearch = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.keyCode == 13) {
      props.setCity(search);

      setSearch("")
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {citys?.map((text, index) => (
          <ListItem
            onClick={() => handleClickCity(text)}
            key={text}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "#333",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              {props.city}
            </Typography>

            <TextField
              value={search}
              onKeyUp={handelSearch}
              onChange={handleChangeSearch}
              id="outlined-basic"
              label="Search city"
              variant="outlined"
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          position: "relative",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
