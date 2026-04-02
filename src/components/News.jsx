import { useMemo, useState } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import photoCrowd from "../assets/gallery/13.webp";
import photoBackstage from "../assets/gallery/17.webp";
import photoStageSign from "../assets/gallery/12.webp";
import photoDrums from "../assets/gallery/3.webp";
import photoGuitar from "../assets/gallery/6.webp";
import photoLights from "../assets/gallery/1.webp";

const primaryFilters = ["All categories", "Upcoming", "Release"];
const secondaryFilters = [
  "Music",
  "Update",
  "Store",
  "Merch",
  "Video",
  "Live",
  "Gear",
];

const articles = [
  {
    title: "Dark Fantasia Announces Midnight Circuit Tour Dates",
    excerpt:
      "The band has expanded its summer run with six additional cities and a heavier, redesigned stage set built around the new album material.",
    category: "Upcoming",
    tags: ["Upcoming", "Live", "Update"],
    date: "April 1, 2026",
    image: photoCrowd,
  },
  {
    title: "Limited Ghost Town Vinyl Restock Opens This Friday",
    excerpt:
      "A second pressing of the marbled edition is landing in the store with signed inserts and updated artwork sleeves.",
    category: "Store",
    tags: ["Store", "Merch", "Update"],
    date: "March 29, 2026",
    image: photoBackstage,
  },
  {
    title: "Studio Diary: How August Moon Was Built",
    excerpt:
      "New behind-the-scenes clips break down the drum chain, vocal layering, and analog textures used across the record.",
    category: "Release",
    tags: ["Release", "Music", "Video"],
    date: "March 24, 2026",
    image: photoDrums,
  },
  {
    title: "Night Crew Capsule Drops Next Week",
    excerpt:
      "The first 2026 merch capsule includes heavyweight tees, distressed jackets, and stitched patches inspired by live visuals.",
    category: "Merch",
    tags: ["Merch", "Store", "Gear"],
    date: "March 21, 2026",
    image: photoGuitar,
  },
  {
    title: "New Live Session Video Premieres Tonight",
    excerpt:
      "A full-performance cut of Ghost Town filmed in one take will premiere on the band channel with a realtime chat.",
    category: "Video",
    tags: ["Video", "Music", "Live"],
    date: "March 18, 2026",
    image: photoLights,
  },
  {
    title: "Crew Notes: Stage Build and Sound System Upgrade",
    excerpt:
      "The production team details new front-of-house tuning, custom risers, and the modular rig used for tighter venue turnarounds.",
    category: "Update",
    tags: ["Update", "Gear", "Live"],
    date: "March 12, 2026",
    image: photoStageSign,
  },
];

function News() {
  const [activeFilter, setActiveFilter] = useState("All categories");

  const filteredArticles = useMemo(() => {
    if (activeFilter === "All categories") return articles;
    return articles.filter((article) => article.tags.includes(activeFilter));
  }, [activeFilter]);

  const basePillSx = (theme) => ({
    width: { xs: "calc(50% - 0.55rem)", sm: "clamp(160px, 16vw, 215px)" },
    minWidth: 0,
    height: { xs: 48, md: 54 },
    borderRadius: theme.custom.radius.pill,
    fontFamily: theme.typography.fontFamily,
    fontSize: "clamp(0.92rem, 1.05vw, 1.08rem)",
    fontWeight: 600,
    "& .MuiChip-label": {
      width: "100%",
      textAlign: "center",
      px: 0,
    },
  });

  return (
    <Box
      component="main"
      sx={(theme) => ({
        minHeight: "100vh",
        padding: `clamp(6.2rem, 9vw, 8.8rem) ${theme.custom.layout.insetSection} clamp(4rem, 8vw, 6rem)`,
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
      })}
    >
      <Box
        sx={(theme) => ({
          width: `min(${theme.custom.layout.contentMax}, 100%)`,
          margin: "0 auto",
        })}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1.35fr" },
            gap: { xs: 2.2, lg: 3 },
            alignItems: "start",
          }}
        >
          <Box>
            <Typography
              sx={(theme) => ({
                margin: 0,
                fontFamily: theme.typography.fontFamily,
                fontSize: "clamp(0.8rem, 0.95vw, 0.95rem)",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: theme.custom.text.muted,
              })}
            >
              News
            </Typography>
            <Typography
              component="h1"
              sx={(theme) => ({
                margin: "0.45rem 0 0",
                maxWidth: "11ch",
                fontFamily: theme.typography.fontFamily,
                fontSize: "clamp(2.3rem, 6.2vw, 5.5rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                textTransform: "uppercase",
                color: theme.palette.text.primary,
              })}
            >
              Explore Our Updates
            </Typography>
          </Box>

          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", lg: "stretch" },
              gap: 1.2,
              p: "clamp(0.7rem, 1.2vw, 1rem)",
              border: `1px solid ${theme.custom.surface.soft}`,
              borderRadius: theme.custom.radius.sm,
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            })}
          >
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1.05}
              sx={{ alignItems: "center" }}
            >
              {primaryFilters.map((item) => {
                const isActive = activeFilter === item;
                return (
                  <Chip
                    key={item}
                    label={item}
                    clickable
                    onClick={() => setActiveFilter(item)}
                    sx={(theme) => ({
                      ...basePillSx(theme),
                      border: `1px solid ${isActive ? "transparent" : theme.custom.surface.strong}`,
                      backgroundColor: isActive
                        ? theme.palette.text.primary
                        : "transparent",
                      color: isActive
                        ? theme.custom.colors.textInk
                        : theme.palette.text.primary,
                      "&:hover": {
                        color: isActive
                          ? theme.custom.colors.textInk
                          : theme.palette.primary.main,
                        borderColor: isActive
                          ? "transparent"
                          : theme.palette.primary.main,
                        textShadow: isActive
                          ? "none"
                          : theme.custom.glow.purple,
                        boxShadow: isActive ? "none" : theme.custom.glow.purple,
                      },
                    })}
                  />
                );
              })}
            </Stack>

            <Stack
              direction="row"
              flexWrap="wrap"
              gap={0.95}
              sx={{ alignItems: "center" }}
            >
              {secondaryFilters.map((item) => {
                const isActive = activeFilter === item;
                return (
                  <Chip
                    key={item}
                    label={item}
                    clickable
                    onClick={() => setActiveFilter(item)}
                    sx={(theme) => ({
                      ...basePillSx(theme),
                      border: `1px solid ${isActive ? theme.palette.primary.main : theme.custom.surface.strong}`,
                      backgroundColor: isActive
                        ? "rgba(165, 107, 214, 0.16)"
                        : "transparent",
                      color: isActive
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                      "&:hover": {
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                        textShadow: theme.custom.glow.purple,
                        boxShadow: theme.custom.glow.purple,
                      },
                    })}
                  />
                );
              })}
            </Stack>

            <Typography
              sx={(theme) => ({
                margin: 0,
                fontFamily: theme.typography.fontFamily,
                fontSize: "0.78rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: theme.custom.text.dim72,
              })}
            >
              Showing {filteredArticles.length} updates
            </Typography>
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            marginTop: "clamp(1.8rem, 2.8vw, 2.4rem)",
            borderBottom: `1px solid ${theme.custom.surface.soft}`,
          })}
        />

        <Box
          sx={{
            marginTop: "clamp(2.7rem, 5vw, 4.2rem)",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            columnGap: { xs: 2, md: 2.8, lg: 3.2 },
            rowGap: { xs: 11, md: 3.5, lg: 4 },
          }}
        >
          {filteredArticles.map((article, index) => (
            <Box
              key={article.title}
              sx={{
                mt: {
                  xs: 0,
                  md: index % 2 === 1 ? "clamp(2.6rem, 8vw, 6rem)" : 0,
                },
                pb: { xs: 0.6, md: 0 },
              }}
            >
              <Box
                sx={(theme) => ({
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: theme.custom.radius.sm,
                  border: `1px solid ${theme.custom.surface.soft}`,
                  background: "rgba(255,255,255,0.02)",
                })}
              >
                <Box
                  component="img"
                  src={article.image}
                  alt={article.title}
                  sx={{
                    display: "block",
                    width: "100%",
                    aspectRatio: index % 3 === 0 ? "16 / 10" : "4 / 3",
                    objectFit: "cover",
                    transition: "transform 380ms ease",
                    ".MuiBox-root:hover &": {
                      transform: "scale(1.04)",
                    },
                  }}
                />
              </Box>

              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1.2, alignItems: "center", flexWrap: "wrap" }}
              >
                <Typography
                  sx={(theme) => ({
                    margin: 0,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: theme.palette.primary.main,
                  })}
                >
                  {article.category}
                </Typography>
                <Typography
                  sx={(theme) => ({
                    margin: 0,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: "0.8rem",
                    color: theme.custom.text.dim72,
                  })}
                >
                  {article.date}
                </Typography>
              </Stack>

              <Typography
                component="h2"
                sx={(theme) => ({
                  margin: "0.55rem 0 0",
                  fontFamily: theme.typography.fontFamily,
                  fontSize: "clamp(1.12rem, 1.35vw, 1.45rem)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: theme.palette.text.primary,
                })}
              >
                {article.title}
              </Typography>

              <Typography
                sx={(theme) => ({
                  marginTop: "0.55rem",
                  fontFamily: theme.typography.fontFamily,
                  fontSize: "clamp(0.88rem, 1vw, 1rem)",
                  lineHeight: 1.45,
                  color: theme.custom.text.muted,
                  maxWidth: "54ch",
                })}
              >
                {article.excerpt}
              </Typography>

              <Button
                variant="text"
                sx={(theme) => ({
                  marginTop: "0.7rem",
                  p: 0,
                  fontFamily: theme.typography.fontFamily,
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: theme.palette.text.primary,
                  "&:hover": {
                    color: theme.palette.primary.main,
                    textShadow: theme.custom.glow.purple,
                    backgroundColor: "transparent",
                  },
                })}
              >
                Read Article
              </Button>
            </Box>
          ))}
        </Box>

        {filteredArticles.length === 0 ? (
          <Typography
            sx={(theme) => ({
              marginTop: "2rem",
              fontFamily: theme.typography.fontFamily,
              fontSize: "clamp(0.95rem, 1.05vw, 1.08rem)",
              color: theme.custom.text.muted,
            })}
          >
            No updates in this category yet.
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}

export default News;
