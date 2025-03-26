"use client";
import React, { useState, ReactNode } from "react";

//Custom components
import TextTitle from "./TextTitle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Hooks
import { useAuthSession } from "@/shared/hooks/useAuthSession";

interface UserMenuProps {
  username: string;
  email: string;
  imageSrc?: string;
  logoutFunction: () => void;
}

interface ContainerWrapperProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  username,
  email,
  imageSrc,
  logoutFunction,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutFunction(); // Chama o logout via NextAuth
    handleMenuClose();
  };

  return (
    <>
      <Button
        onClick={handleMenuOpen}
        endIcon={<Avatar src={imageSrc} alt={username} />}
        sx={{
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold" }}
            color="text.primary"
          >
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        </Box>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
        <MenuItem onClick={handleMenuClose}>Configurações</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          Sair
        </MenuItem>
      </Menu>
    </>
  );
};

export default function ContentBoxWrapper({
  title,
  subtitle,
  children,
}: ContainerWrapperProps) {
  const { session, signOut } = useAuthSession();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minHeight: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextTitle title={title as string} />

          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        {session && (
          <UserMenu
            username={session?.user?.username.toUpperCase()}
            // imageSrc="/img/user.jpg"
            imageSrc={session.user.avatar}
            email={session?.user?.email}
            logoutFunction={signOut}
          />
        )}
      </Box>

      <Divider sx={{ width: "100%" }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          p: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
