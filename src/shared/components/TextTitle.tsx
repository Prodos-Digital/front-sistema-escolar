"use client";

import Typography from "@mui/material/Typography";

interface TextTitleProps {
  title: string;
  align?: "left" | "center" | "right";
}

export default function TextTitle({ title, align = "left" }: TextTitleProps) {
  return (
    <Typography
      sx={{
        textAlign: align,
        fontSize: { xs: 18, sm: 18, md: 26 },
        fontWeight: 700,
      }}
      variant="h1"
    >
      {title}
    </Typography>
  );
}
