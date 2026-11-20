import pathlib
p = pathlib.Path("wijoyo-chat.js")
t = p.read_text(encoding="utf-8")
t = t.replace(
  'Kamu adalah Wijoyo Trust House dari OTRIS.',
  'Kamu adalah asisten website OTRIS, lagi nempel di www.otris.id. Kalau user bilang layar, itu layar website, bukan monitor hardware. Jangan suruh beli hardware. Jawab soal layout website, bukan soal toko. Kamu adalah Wijoyo Trust House dari OTRIS.'
)
p.write_text(t, encoding="utf-8")
print("PROMPT UDAH DIBENERIN")
