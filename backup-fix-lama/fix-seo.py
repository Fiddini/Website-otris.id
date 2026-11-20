import pathlib
p = pathlib.Path("index.html")
t = p.read_text(encoding="utf-8")
if "fix-seo-otris" not in t:
    seo = """<!-- fix-seo-otris -->
<meta name="description" content="OTRIS - Jembatan Teknologi untuk Nyawa. Murah bukan murahan. Integrasi perangkat medis tanpa ganti alat. Dari OTRIS untuk Wakaf - Ilmu tidak dijual, System tidak dijual.">
<meta name="keywords" content="OTRIS, otris.id, Pemecah Batu, Wijoyo Trust House, Wakaf Rumah, integrasi rumah sakit, SATUSEHAT, FHIR, Plug Play 15 menit">
<meta property="og:title" content="OTRIS - Jembatan Teknologi untuk Nyawa">
<meta property="og:description" content="ICU adalah pintu masuk. Manusia adalah tujuannya. Murah bukan murahan.">
<meta property="og:url" content="https://www.otris.id">
<meta property="og:type" content="website">
"""
    t = t.replace("</head>", seo + "</head>")
    p.write_text(t, encoding="utf-8")
    print("SEO UDAH DITAMBAH")
else:
    print("SEO UDAH ADA")
