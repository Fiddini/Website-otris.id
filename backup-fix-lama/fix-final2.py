import pathlib, re
p = pathlib.Path("index.html")
t = p.read_text(encoding="utf-8")

# 1. Hajar langsung paragraf quote-nya, apapun style lamanya
t = re.sub(r'<p[^>]*>.*?Rumah ini diwakafkan.*?</p>', '<p style="color:#0f172a !important;font-size:18px;line-height:1.6;font-weight:700">“Rumah ini diwakafkan. Ilmu tidak dijual, yang dijual tenaga dan jasa. Penghasilan dari jasa untuk anak-anak.”</p>', t, count=1, flags=re.DOTALL)
# 2. Hajar Atas Nama / Pengelola
t = re.sub(r'<p[^>]*>.*?Atas Nama:.*?</p>', '<p style="color:#0f172a !important;font-size:13px"><b>Atas Nama:</b> Hadi Wijoyo Kusumo<br/><b>Pengelola:</b> Hanif Ahdi Fiddini</p>', t, count=1, flags=re.DOTALL)

# 3. CSS yang nggak peduli id, yang penting class trust-white
if "fix-final2-otris" not in t:
    fix = """<style>/* fix-final2-otris */
[class*="trust-white"], [class*="trust-white"] * { color:#0f172a !important; background:transparent !important; }
[class*="trust-white"] { background:#ffffff !important; }
[class*="trust-white"] a { color:#0b4fa7 !important; }
section:has([class*="trust-white"]) > div { display:grid !important; grid-template-columns:1fr 1fr !important; gap:24px !important; align-items:stretch !important; }
@media (max-width:768px){ section:has([class*="trust-white"]) > div { grid-template-columns:1fr !important; } }
</style>
"""
    t = t.replace("</head>", fix + "</head>")
p.write_text(t, encoding="utf-8")
print("BERES, cek:", "color:#0f172a" in t, "fix-final2:", "fix-final2-otris" in t)
