import pathlib
p = pathlib.Path("index.html")
t = p.read_text(encoding="utf-8")
if "the-candidates.png" not in t:
    t = t.replace('<h3>Satu Download, Dapat Dua</h3>', '<img src="assets/the-candidates.png" alt="The Candidates - Pemecah Batu" style="width:100%;border-radius:14px;margin:12px 0;border:1px solid rgba(255,255,255,.2);"/>\n          <h3>Satu Download, Dapat Dua</h3>')
    p.write_text(t, encoding="utf-8")
    print("BERES BRO, poster udah nempel di Pemecah Batu")
else:
    print("Udah nempel bro")
