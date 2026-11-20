import pathlib, re
p = pathlib.Path("index.html")
t = p.read_text(encoding="utf-8")
# 1. Hapus fix grid yang kelebaran kemarin
t = re.sub(r'section:has\(\[class\*="trust-white"\]\) > div \{[^}]+\}', '', t)
t = t.replace('header + * { padding-top: 140px !important; }', '')
t = t.replace('section:first-of-type { padding-top: 140px !important; }', '')
# 2. Kunci biar nggak koplak kanan-kiri lagi
if "fix-koplak-otris" not in t:
    fix = """<style>/* fix-koplak-otris */
html, body { overflow-x:hidden !important; max-width:100vw !important; }
* { box-sizing:border-box !important; }
img, video { max-width:100% !important; height:auto !important; }
section, div { max-width:100vw !important; }
#wijoyo-chat, #wijoyo-box { max-width:calc(100vw - 40px) !important; }
section:has([class*="trust-white"]) { overflow:hidden !important; }
</style>
"""
    t = t.replace("</head>", fix + "</head>")
p.write_text(t, encoding="utf-8")
print("UDAH DIKUNCI, koplak hilang?", "fix-koplak-otris" in t)
