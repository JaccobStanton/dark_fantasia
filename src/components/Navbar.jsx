import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";

const navItems = ["MUSIC", "EVENTS", "NEWS", "CONTACT", "STORE"];
const mobileNavFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const NavbarRoot = styled("header", {
  shouldForwardProp: (prop) => prop !== "navalpha" && prop !== "fulldark",
})(({ theme, navalpha, fulldark }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  width: "100%",
  zIndex: 40,
  backgroundColor: `rgba(0, 0, 0, ${navalpha})`,
  transition: `background-color ${theme.custom.motion.navBg}, border-color ${theme.custom.motion.navBg}`,
  borderBottom: `0.2px solid ${fulldark ? theme.custom.colors.navBorder : "transparent"}`,
}));

const NavbarInner = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  gap: "1rem",
  padding: `0.95rem ${theme.custom.layout.insetPage} 0`,
  position: "relative",
  zIndex: 65,
  "@media (max-width:980px)": {
    gridTemplateColumns: "1fr auto",
    gap: "0.8rem 1rem",
    padding: "1.2rem 1rem 0.45rem",
  },
}));

const BrandLogo = styled(MuiLink)(({ theme }) => ({
  justifySelf: "start",
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  textDecoration: "none",
  transition: `transform ${theme.custom.motion.fast}`,
  "&:hover": {
    transform: "scale(0.94)",
  },
}));

const BrandLogoImage = styled("img")(({ theme }) => ({
  display: "block",
  width: "auto",
  height: theme.custom.fontSizes.logo.xs,
  objectFit: "contain",
  [theme.breakpoints.up("sm")]: {
    height: theme.custom.fontSizes.logo.sm,
  },
  [theme.breakpoints.up("md")]: {
    height: theme.custom.fontSizes.logo.md,
  },
  [theme.breakpoints.up("lg")]: {
    height: theme.custom.fontSizes.logo.lg,
  },
  [theme.breakpoints.up("xl")]: {
    height: theme.custom.fontSizes.logo.xl,
  },
  "@media (max-width:980px)": {
    height: theme.custom.fontSizes.logo.mobile,
  },
}));

const DesktopNav = styled(Box)(({ theme }) => ({
  justifySelf: "center",
  display: "flex",
  alignItems: "center",
  gap: "clamp(1.1rem, 2vw, 2.1rem)",
  "@media (max-width:980px)": {
    display: "none",
  },
  "& a": {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.custom.fontSizes.nav.xs,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.custom.fontSizes.nav.sm,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: theme.custom.fontSizes.nav.md,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: theme.custom.fontSizes.nav.lg,
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: theme.custom.fontSizes.nav.xl,
    },
    fontWeight: 600,
    letterSpacing: "0.025em",
    textDecoration: "none",
    transition: `text-shadow ${theme.custom.motion.fast}, color ${theme.custom.motion.fast}, opacity ${theme.custom.motion.fast}`,
    "&:hover": {
      color: theme.palette.primary.main,
      textShadow: theme.custom.glow.purple,
    },
  },
}));

const SiteActions = styled(Stack)(() => ({
  justifySelf: "end",
  alignItems: "center",
  gap: "0.65rem",
  flexDirection: "row",
  "@media (max-width:980px)": {
    position: "relative",
    zIndex: 85,
  },
}));

const CartButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
  color: theme.palette.text.primary,
  alignItems: "flex-start",
  gap: "0.4rem",
  transition: `color ${theme.custom.motion.fast}, text-shadow ${theme.custom.motion.fast}`,
  "&:hover, &:focus-visible": {
    color: theme.palette.primary.main,
    textShadow: theme.custom.glow.purple,
  },
  "&:focus-visible": {
    outline: `2px solid ${theme.custom.focus.outline}`,
    outlineOffset: "3px",
  },
  "& svg": {
    width: "1.55rem",
    height: "1.55rem",
    fill: "currentColor",
  },
}));

const CartCount = styled(Box)(({ theme }) => ({
  minWidth: "1.05rem",
  height: "1.05rem",
  border: `1px solid ${theme.custom.surface.stronger}`,
  borderRadius: theme.custom.radius.pill,
  fontSize: theme.custom.fontSizes.cartCount.xs,
  lineHeight: 1,
  display: "grid",
  placeItems: "center",
  [theme.breakpoints.up("sm")]: {
    fontSize: theme.custom.fontSizes.cartCount.sm,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: theme.custom.fontSizes.cartCount.md,
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: theme.custom.fontSizes.cartCount.lg,
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: theme.custom.fontSizes.cartCount.xl,
  },
}));

const MenuToggle = styled(IconButton)(({ theme }) => ({
  display: "none",
  width: "2rem",
  height: "2rem",
  padding: 0,
  color: theme.palette.text.primary,
  "@media (max-width:980px)": {
    display: "inline-flex",
    position: "relative",
    zIndex: 85,
  },
}));

const MenuBar = styled("span")(({ theme }) => ({
  display: "block",
  width: "1.24rem",
  height: "2px",
  margin: "4px auto",
  background: theme.palette.text.primary,
  transition: `transform ${theme.custom.motion.menu}, opacity ${theme.custom.motion.menu}`,
}));

const MobileOverlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: "none",
  "@media (max-width:980px)": {
    position: "fixed",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "clamp(8rem, 15vh, 10rem) 1.55rem 2rem",
    backgroundColor: theme.custom.colors.black97,
    transform: open ? "scaleY(1)" : "scaleY(0)",
    transformOrigin: "top",
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
    zIndex: 50,
    transition: `transform ${theme.custom.motion.overlayOpen}, opacity ${theme.custom.motion.overlayFade}`,
  },
}));

const MobileNavLinks = styled(Stack)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "clamp(1rem, 2.9vh, 1.55rem)",
}));

const MobileFooter = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  gap: "1.6rem",
  paddingBottom: "max(0.65rem, env(safe-area-inset-bottom))",
  "& p": {
    margin: 0,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontSize: "clamp(1rem, 3.6vw, 1.22rem)",
    fontWeight: 500,
    letterSpacing: "0.015em",
  },
}));

const SocialRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "1.55rem",
  "& a": {
    color: theme.palette.text.primary,
    display: "inline-flex",
    transition: `color ${theme.custom.motion.fast}, transform ${theme.custom.motion.fast}`,
    "&:hover": {
      color: theme.palette.primary.main,
      transform: "translateY(-1px)",
    },
  },
  "& svg": {
    width: "clamp(1.85rem, 7.2vw, 2.5rem)",
    height: "clamp(1.85rem, 7.2vw, 2.5rem)",
    fill: "currentColor",
  },
}));

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navBgAlpha, setNavBgAlpha] = useState(0);
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const isHomeRoute = path === "/";

  useEffect(() => {
    if (!isHomeRoute) {
      setNavBgAlpha(1);
      return undefined;
    }

    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setNavBgAlpha(window.scrollY > 8 ? 0.24 : 0);
        return;
      }

      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const progress = Math.min(
        Math.max(window.scrollY / Math.max(heroBottom, 1), 0),
        1,
      );
      setNavBgAlpha(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomeRoute]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const navHref = (item) => {
    const slug = item.toLowerCase();
    if (slug === "contact") return "/contact";
    if (slug === "news") return "/news";
    return `/#${slug}`;
  };

  return (
    <NavbarRoot navalpha={navBgAlpha} fulldark={navBgAlpha >= 0.999 ? 1 : 0}>
      <NavbarInner>
        <BrandLogo href="/" aria-label="Dark Fantasia home">
          <BrandLogoImage src="/logo.webp" alt="Dark Fantasia" />
        </BrandLogo>

        <DesktopNav component="nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <MuiLink href={navHref(item)} key={item}>
              {item}
            </MuiLink>
          ))}
        </DesktopNav>

        <SiteActions>
          <CartButton aria-label="Open cart">
            <Box component="svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 6.2A4 4 0 0 1 12 2a4 4 0 0 1 4 4.2h2.1A2.9 2.9 0 0 1 21 9.1v9A2.9 2.9 0 0 1 18.1 21H5.9A2.9 2.9 0 0 1 3 18.1v-9a2.9 2.9 0 0 1 2.9-2.9H8Zm1.7 0h4.6A2.3 2.3 0 0 0 12 3.7 2.3 2.3 0 0 0 9.7 6.2ZM5.9 7.8c-.7 0-1.3.6-1.3 1.3v9c0 .7.6 1.3 1.3 1.3h12.2c.7 0 1.3-.6 1.3-1.3v-9c0-.7-.6-1.3-1.3-1.3h-1.9v2a.8.8 0 0 1-1.6 0v-2H9.4v2a.8.8 0 0 1-1.6 0v-2H5.9Z" />
            </Box>
            <CartCount component="span">0</CartCount>
          </CartButton>

          <MenuToggle
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <Box>
              <MenuBar
                style={{
                  transform: menuOpen
                    ? "translateY(6px) rotate(45deg)"
                    : "none",
                }}
              />
              <MenuBar style={{ opacity: menuOpen ? 0 : 1 }} />
              <MenuBar
                style={{
                  transform: menuOpen
                    ? "translateY(-6px) rotate(-45deg)"
                    : "none",
                }}
              />
            </Box>
          </MenuToggle>
        </SiteActions>
      </NavbarInner>

      <MobileOverlay
        component="nav"
        open={menuOpen ? 1 : 0}
        aria-label="Mobile navigation"
      >
        <MobileNavLinks>
          {navItems.map((item, index) => (
            <MuiLink
              href={navHref(item)}
              key={item}
              onClick={closeMenu}
              sx={(theme) => ({
                color: theme.palette.text.primary,
                textDecoration: "none",
                fontFamily: theme.typography.fontFamily,
                fontSize: "clamp(2.35rem, 8.4vw, 3.35rem)",
                fontWeight: 700,
                letterSpacing: "0.015em",
                lineHeight: 0.95,
                opacity: 0,
                transform: "translateY(12px)",
                transition: `color ${theme.custom.motion.fast}, text-shadow ${theme.custom.motion.fast}`,
                animation: menuOpen
                  ? `${mobileNavFadeIn} ${theme.custom.motion.overlayItem} forwards`
                  : "none",
                animationDelay: menuOpen ? `${280 + index * 80}ms` : "0ms",
                "&:hover": {
                  color: theme.palette.primary.main,
                  textShadow: theme.custom.glow.purple,
                },
              })}
            >
              {item}
            </MuiLink>
          ))}
        </MobileNavLinks>

        <MobileFooter>
          <Typography component="p">LISTEN &amp; CONNECT WITH US</Typography>
          <SocialRow>
            <MuiLink href="#" aria-label="Instagram">
              <Box component="svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 1.8A3.2 3.2 0 0 0 3.8 7v10A3.2 3.2 0 0 0 7 20.2h10a3.2 3.2 0 0 0 3.2-3.2V7A3.2 3.2 0 0 0 17 3.8H7Zm11 1.5a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
              </Box>
            </MuiLink>
            <MuiLink href="#" aria-label="X">
              <Box component="svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.7L6 22H2.9l7.3-8.4L1 2h6.3l4.4 6L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />
              </Box>
            </MuiLink>
            <MuiLink href="#" aria-label="Facebook">
              <Box component="svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-1.6 19.9v-7h-2.3V12h2.3V9.8c0-2.3 1.3-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.5V12h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 12 2Z" />
              </Box>
            </MuiLink>
          </SocialRow>
        </MobileFooter>
      </MobileOverlay>
    </NavbarRoot>
  );
}

export default Navbar;
