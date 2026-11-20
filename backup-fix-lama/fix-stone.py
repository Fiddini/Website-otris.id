import pathlib
p = pathlib.Path("index.html")
t = p.read_text(encoding="utf-8")
if "stone-breaker-cover.jpg" not in t:
    old = 'src="assets/the-candidates.png"'
    new = 'src="assets/the-candidates.png" style="margin-bottom:12px;" />\n          <p style="font-size:11px;letter-spacing:.14em;color:#e6c98a;margin:0;">ENGLISH BOOK COVER</p>\n          <img src="assets/stone-breaker-cover.jpg" alt="English book cover - stone split with gold circuit" style="width:100%;border-radius:14px;margin:12px 0;border:1px solid rgba(255,255,255,.2);"'
    if old in t:
        t = t.replace(old, new, 1)
        p.write_text(t, encoding="utf-8")
        print("BERES, cover Inggris udah nempel")
    else:
        print("GAGAL: the-candidates.png nggak ketemu")
else:
    print("Udah nempel bro")
