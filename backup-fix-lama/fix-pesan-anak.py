import pathlib
p = pathlib.Path("index.html")
t = p.read_text(encoding="utf-8")
# 1. Tempel pesan di bawah quote Wakaf, biar anak-anak langsung liat
if "PESAN AMBO UNTUK ANAK-ANAK" not in t:
    pesan = """<div style="background:#fef3c7;border:2px solid #e6c98a;border-radius:14px;padding:16px;margin-top:16px;color:#0f172a">
<p style="font-weight:800;margin:0 0 8px;color:#0f172a">PESAN AMBO UNTUK ANAK-ANAK</p>
<p style="margin:4px 0;color:#0f172a">1. Ilmu tidak dijual. Ilmu itu wakaf, buat semua bisa belajar.</p>
<p style="margin:4px 0;color:#0f172a">2. Hardware projek boleh dijual kalau dapat. Itu hasil tenaga dan tangan kalian.</p>
<p style="margin:4px 0;color:#0f172a">3. System tidak boleh dijual. System itu wakaf, punya bersama.</p>
</div>
"""
    t = t.replace("Siapapun boleh terima dan pakai wakaf ini.", "Siapapun boleh terima dan pakai wakaf ini." + pesan)
    p.write_text(t, encoding="utf-8")
    print("PESAN UDAH NEMPEL DI WEB")
else:
    print("PESAN UDAH ADA")

# 2. Masukkin ke otak Wijoyo juga
q = pathlib.Path("wijoyo-chat.js")
c = q.read_text(encoding="utf-8")
if "tidak boleh jual ilmu" not in c.lower():
    baru = """  { kunci: ["jual", "jual apa", "boleh jual", "hardware", "system", "projek"], jawab: "Pesan ambo: Ilmu tidak dijual, ilmu itu wakaf. Hardware projek boleh dijual kalau dapat, itu hasil tenaga kalian. System tidak boleh dijual, system itu wakaf punya bersama." },
"""
    c = c.replace("const OTAK_WIJOYO = [", "const OTAK_WIJOYO = [\n" + baru, 1)
    q.write_text(c, encoding="utf-8")
    print("OTAK UDAH DIUPDATE")
else:
    print("OTAK UDAH ADA")
