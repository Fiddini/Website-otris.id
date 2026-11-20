import pathlib
p = pathlib.Path("index.html")
t = p.read_text(encoding="utf-8")
if "wijoyo-chat.js" not in t:
    t = t.replace("</body>", '<script src="wijoyo-chat.js"></script>\n</body>')
    p.write_text(t, encoding="utf-8")
    print("CHAT UDAH NEMPEL")
else:
    print("UDAH NEMPEL")
