import pathlib
p = pathlib.Path("css/style.css")
t = p.read_text(encoding="utf-8")
if "FIX-LOGO-GEDE" not in t:
    t += """
/* FIX-LOGO-GEDE */
header .logo img,
header .brand img,
header img[src*="logo"],
.site-logo img {
  width: 64px !important;
  height: 64px !important;
  min-width: 64px !important;
  min-height: 64px !important;
  object-fit: contain !important;
  border-radius: 50% !important;
}
header .logo,
header .brand {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
}
header .logo strong,
header .brand strong,
header .logo b {
  font-size: 22px !important;
  line-height: 1.1 !important;
}
/* Logo hero kanan biar gagah, kartu P&P geser biar nggak nutupin */
.hero img[src*="logo"],
.hero-logo img {
  width: 300px !important;
  height: auto !important;
  max-width: 100% !important;
}
.hero .pp-card,
.hero .pnp-card,
.hero [class*="pnp"],
.hero [class*="card"] {
  transform: translate(18px, 22px) !important;
}
"""
    p.write_text(t, encoding="utf-8")
    print("LOGO UDAH DIGEDEIN")
else:
    print("UDAH ADA FIX LOGO")
