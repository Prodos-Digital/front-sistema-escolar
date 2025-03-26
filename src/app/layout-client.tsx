"use client";
import { Fragment, useState, ReactNode } from "react";
import Link from "next/link";

//Contexts
import MuiThemeProvider from "@/context/MuiThemeProvider";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Collapse from "@mui/material/Collapse";

//Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const DRAWER_WIDTH = 260;

interface DrawerHeaderProps {
  open?: boolean;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  backgroundColor: "#212121",
});

const closedMixin = (theme: Theme): CSSObject => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  backgroundColor: "#212121",
});

const DrawerHeader = styled("div")<DrawerHeaderProps>(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: open ? "space-between" : "center",
  width: "100%",
  padding: "0 30px",
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: DRAWER_WIDTH,
  whiteSpace: "nowrap",
  flexShrink: 0,
  boxSizing: "border-box",

  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),

        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function LayoutClientComponentWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const theme = useTheme(); // Acessa o tema atual (dark ou light)

  const [open, setOpen] = useState(false);
  const [option, setOption] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader open={open}>
          {open && (
            <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
              Logo
            </Typography>
          )}
          <IconButton
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{
              color: open
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
              backgroundColor: "#212121",
            }}
          >
            {open ? (
              <ChevronLeftIcon sx={{ color: "#fff" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "#fff" }} />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ width: "100%", backgroundColor: "#494949" }} />

        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          <List>
            {open ? (
              <>
                <Link href="/" passHref legacyBehavior>
                  <ListItem disablePadding disableGutters>
                    <ListItemButton disableRipple={open ? false : true}>
                      <ListItemIcon>
                        <HomeRoundedIcon sx={{ color: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Home"
                        sx={[
                          open
                            ? {
                                display: 1,
                                color: "#fff",
                              }
                            : {
                                opacity: 0,
                              },
                        ]}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>

                <Link href="/users" passHref legacyBehavior>
                  <ListItem disablePadding disableGutters>
                    <ListItemButton disableRipple={open ? false : true}>
                      <ListItemIcon>
                        <AccountCircleIcon sx={{ color: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Usuários"
                        sx={[
                          open
                            ? {
                                display: 1,
                                color: "#fff",
                              }
                            : {
                                opacity: 0,
                              },
                        ]}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>

                <ListItem
                  disablePadding
                  disableGutters
                  onClick={() => setOption((state) => !state)}
                >
                  <ListItemButton disableRipple={open ? false : true}>
                    <ListItemIcon>
                      <AccountCircleIcon sx={{ color: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Teste"
                      sx={[
                        open
                          ? {
                              display: 1,
                              color: "#fff",
                            }
                          : {
                              opacity: 0,
                            },
                      ]}
                    />
                    {open &&
                      (option ? (
                        <ExpandLess sx={{ color: "#fff" }} />
                      ) : (
                        <ExpandMore sx={{ color: "#fff" }} />
                      ))}
                  </ListItemButton>
                </ListItem>

                <Collapse in={option} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {/* <Link href="/users/create" passHref legacyBehavior> */}
                    <ListItem disablePadding disableGutters sx={{ pl: 4 }}>
                      <ListItemButton disableRipple={!open}>
                        <ListItemText
                          primary="Criar Usuário"
                          sx={{
                            color: "#fff",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    {/* </Link> */}
                    {/* <Link href="/users/manage" passHref legacyBehavior> */}
                    <ListItem disablePadding disableGutters sx={{ pl: 4 }}>
                      <ListItemButton disableRipple={!open}>
                        <ListItemText
                          primary="Gerenciar Usuários"
                          sx={{
                            color: "#fff",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    {/* </Link> */}
                  </List>
                </Collapse>
              </>
            ) : (
              <>
                <Tooltip title="Home" arrow placement="right">
                  <ListItem
                    disablePadding
                    disableGutters
                    onClick={!open && handleDrawerOpen}
                  >
                    <ListItemButton disableRipple={open ? false : true}>
                      <ListItemIcon>
                        <HomeRoundedIcon sx={{ color: "#fff" }} />
                      </ListItemIcon>

                      <ListItemText
                        primary="Home"
                        sx={[
                          open
                            ? {
                                opacity: 1,
                              }
                            : {
                                opacity: 0,
                              },
                        ]}
                      />
                    </ListItemButton>
                  </ListItem>
                </Tooltip>

                <Tooltip title="Usuários" arrow placement="right">
                  <ListItem
                    disablePadding
                    disableGutters
                    onClick={!open && handleDrawerOpen}
                  >
                    <ListItemButton disableRipple={open ? false : true}>
                      <ListItemIcon>
                        <AccountCircleIcon sx={{ color: "#fff" }} />
                      </ListItemIcon>

                      <ListItemText
                        primary="Usuários"
                        sx={[
                          open
                            ? {
                                opacity: 1,
                              }
                            : {
                                opacity: 0,
                              },
                        ]}
                      />
                    </ListItemButton>
                  </ListItem>
                </Tooltip>

                <Tooltip title="Usuários" arrow placement="right">
                  <ListItem
                    disablePadding
                    disableGutters
                    onClick={!open && handleDrawerOpen}
                  >
                    <ListItemButton disableRipple={open ? false : true}>
                      <ListItemIcon>
                        <AccountCircleIcon sx={{ color: "#fff" }} />
                      </ListItemIcon>

                      <ListItemText
                        primary="Usuários"
                        sx={[
                          open
                            ? {
                                opacity: 1,
                              }
                            : {
                                opacity: 0,
                              },
                        ]}
                      />
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              </>
            )}
          </List>
        </Box>

        {/* <Divider sx={{ width: "100%" }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
            height: 100,
            p: 2,
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Image
              src="https://randomuser.me/api/portraits/men/20.jpg"
              fill
              alt="User image"
            />
          </Box>
        </Box> */}
      </Drawer>
      <MuiThemeProvider>
        <Box
          component="main"
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </Box>
      </MuiThemeProvider>
    </Box>
  );
}
