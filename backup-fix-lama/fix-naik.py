import pathlib
p = pathlib.Path("index.html")
t = p.read_text(encoding="utf-8")
if "fix-naik-otris" not in t:
    fix = """<style>/* fix-naik-otris */
header { margin-bottom: 0 !important; }
section:first-of-type { margin-top: -20px !important; padding-top: 100px !important; }
#wijoyo-box { bottom: 100px !important; }
#wijoyo-msg { height: 320px !important; }
</style>
"""
    t = t.replace("</head>", fix + "</head>")
    p.write_text(t, encoding="utf-8")
    print("LAYAR UDAH DINAIKIN")
else:
    print("UDAH NAIK")
