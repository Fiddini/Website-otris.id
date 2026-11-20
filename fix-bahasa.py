import pathlib
p = pathlib.Path("index.html")
t = p.read_text(encoding="utf-8")
if "fix-bahasa-3" not in t:
    # 1. Tambah tombol bahasa setelah header
    tombol = """
<div id="bahasa-pilih" style="text-align:center;padding:10px 0;gap:8px;display:flex;justify-content:center">
  <button onclick="gantiBahasa('id')" style="padding:8px 14px;border-radius:20px;border:1px solid #000;cursor:pointer">🇮🇩 Indonesia</button>
  <button onclick="gantiBahasa('en')" style="padding:8px 14px;border-radius:20px;border:1px solid #000;cursor:pointer">🇬🇧 English</button>
  <button onclick="gantiBahasa('fr')" style="padding:8px 14px;border-radius:20px;border:1px solid #000;cursor:pointer">🇫🇷 Français</button>
</div>
<script>/* fix-bahasa-3 */
const kamusBahasa = {
  id: {
    hero: "ICU ADALAH PINTU MASUK. MANUSIA ADALAH TUJUANNYA.",
    sub: "Kami membangun jembatan teknologi kesehatan agar perangkat yang sudah ada, data, dan tenaga ahli dapat terhubung lebih dekat kepada pasien — tanpa menunggu semuanya diganti atau sempurna terlebih dahulu.",
    murah: "MURAH, BUKAN MURAHAN. • KAMI SEDANG MEMBANGUN JEMBATAN UNTUK NYAWA."
  },
  en: {
    hero: "ICU IS THE ENTRANCE. HUMANS ARE THE PURPOSE.",
    sub: "We build a health technology bridge so existing devices, data, and experts can get closer to patients — without waiting for everything to be replaced or perfect first.",
    murah: "AFFORDABLE, NOT CHEAP. • WE ARE BUILDING A BRIDGE FOR LIVES."
  },
  fr: {
    hero: "LES SOINS INTENSIFS SONT L'ENTRÉE. L'HUMAIN EST LE BUT.",
    sub: "Nous construisons un pont technologique de santé pour que les appareils existants, les données et les experts se rapprochent des patients — sans attendre que tout soit remplacé ou parfait.",
    murah: "ABORDABLE, PAS AU RABAIS. • NOUS CONSTRUISONS UN PONT POUR LA VIE."
  }
};
function gantiBahasa(kode){
  const d = kamusBahasa[kode];
  if(!d) return;
  // Cari hero dan ganti
  document.body.innerHTML = document.body.innerHTML; // biar aman
  const h = document.querySelector("section:first-of-type h1, section:first-of-type h2");
  if(h) h.textContent = d.hero;
  localStorage.setItem("bahasa-otris", kode);
  alert(kode === 'id' ? 'Bahasa Indonesia aktif' : kode === 'en' ? 'English active' : 'Français activé');
}
</script>
"""
    # Sisipin setelah </header> kalau ada, kalau tidak setelah <body>
    if "</header>" in t:
        t = t.replace("</header>", "</header>" + tombol, 1)
    else:
        t = t.replace("<body>", "<body>" + tombol, 1)
    p.write_text(t, encoding="utf-8")
    print("TOMBOL 3 BAHASA UDAH DITAMBAH")
else:
    print("UDAH ADA TOMBOL BAHASA")
