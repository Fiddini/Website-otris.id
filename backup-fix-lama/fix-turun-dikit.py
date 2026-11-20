import pathlib
p = pathlib.Path("index.html")
t = p.read_text(encoding="utf-8")

# 1. Turunin hero yang kelewat naik tadi
t = t.replace("margin-top: -20px !important;", "margin-top: 12px !important;")
t = t.replace("padding-top: 100px !important;", "padding-top: 70px !important;")

# 2. Biar nav tidak jatuh 2 baris kayak CONTACT US sendiri
if "fix-turun-dikit" not in t:
    fix = """<style>/* fix-turun-dikit */
header nav { display:flex !important; flex-wrap:wrap !important; justify-content:center !important; gap:6px !important; }
header nav a { white-space:nowrap !important; padding:8px 10px !important; font-size:13px !important; }
section:first-of-type { margin-top: 12px !important; padding-top: 70px !important; }
</style>
"""
    t = t.replace("</head>", fix + "</head>")
    print("UDAH DITURUNIN DIKIT + NAV DIBENERIN")
else:
    print("UDAH DITURUNIN")

p.write_text(t, encoding="utf-8")
print("SELESAI")
