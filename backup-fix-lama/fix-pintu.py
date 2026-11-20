import pathlib
p = pathlib.Path("index.html")
t = p.read_text(encoding="utf-8")

# 1. Anti-mati di head
if "scroll-margin-top" not in t:
    t = t.replace('<link rel="stylesheet" href="css/style.css"/>', '<link rel="stylesheet" href="css/style.css"/>\n<style>\n  html { scroll-behavior: smooth; }\n  section[id], div[id] { scroll-margin-top: 90px; }\n  header { position: sticky; top: 0; z-index: 999; }\n  a { pointer-events: auto !important; }\n</style>')

# 2. Nav tambah PEMECAH BATU
if 'href="#pemecah-batu" class="gold"' not in t:
    t = t.replace('<a href="#trust-house" class="gold">TRUST HOUSE →</a>', '<a href="#trust-house" class="gold">TRUST HOUSE →</a>\n      <a href="#pemecah-batu" class="gold">PEMECAH BATU →</a>')

# 3. Kasih ID ke kotak Pemecah Batu
t = t.replace('<div class="trust-navy">', '<div class="trust-navy" id="pemecah-batu">')

# 4. Pintu tengah jadi 2 tombol
t = t.replace('<a class="btn btn-gold" href="#trust-house">MASUK KE TRUST HOUSE + PEMECAH BATU →</a>', '<div style="display:flex;gap:12px;flex-wrap:wrap">\n    <a class="btn btn-gold" href="#pemecah-batu">MASUK KE PEMECAH BATU →</a>\n    <a class="btn btn-outline" href="#home">← KEMBALI KE HOME</a>\n  </div>')

# 5. Download langsung jadi zip
t = t.replace('href="https://github.com/Fiddini/Website-otris.id">DOWNLOAD', 'href="https://github.com/Fiddini/Website-otris.id/archive/refs/heads/main.zip">DOWNLOAD')

p.write_text(t, encoding="utf-8")
print("BERES BRO, pintu udah kepasang")
