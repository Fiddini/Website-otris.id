import pathlib, re
# 1. Paksa di semua HTML, logo header langsung dikasih style inline
for p in pathlib.Path(".").glob("*.html"):
    t = p.read_text(encoding="utf-8", errors="ignore")
    awal = t
    # Cari img logo apapun di header, kasih width 92px
    t = re.sub(r'<img([^>]*logo[^>]*?)>', lambda m: '<img' + m.group(1) + ' style="width:92px !important;height:92px !important;min-width:92px;min-height:92px;object-fit:contain;border-radius:50%;">' if 'style="width:92px' not in m.group(0) else m.group(0), t, flags=re.I)
    if t != awal:
        p.write_text(t, encoding="utf-8")
        print("KENA:", p.name)
# 2. Paksa juga di CSS biar nggak kalah sama style lama
p = pathlib.Path("css/style.css")
t = p.read_text(encoding="utf-8")
if "FIX-LOGO-KANAN-92" not in t:
    t += """
/* FIX-LOGO-KANAN-92 */
header img { width: 92px !important; height: 92px !important; min-width: 92px !important; min-height: 92px !important; object-fit: contain !important; border-radius: 50% !important; }
header { min-height: 110px !important; align-items: center !important; }
header .logo, header .brand { gap: 14px !important; align-items: center !important; }
"""
    p.write_text(t, encoding="utf-8")
    print("CSS UDAH DITAMBAH 92px")
else:
    print("CSS UDAH ADA")
