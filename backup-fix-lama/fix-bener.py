import pathlib
p = pathlib.Path("index.html")
t = p.read_text(encoding="utf-8")
t = t.replace('<p style="color:#e6c98a">“Rumah ini diwakafkan.', '<p style="color:#0f172a">“Rumah ini diwakafkan.')
t = t.replace('font-size:18px;line-height:1.6;font-weight:700">“Rumah ini', 'font-size:18px;line-height:1.6;font-weight:700;color:#0f172a">“Rumah ini')
p.write_text(t, encoding="utf-8")
print("Sisa emas di quote?", 'color:#e6c98a">“Rumah' in t)
print("Udah hitam?", t.count('color:#0f172a">“Rumah'))
