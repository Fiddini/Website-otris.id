# OTRIS.id — Versi Profesional untuk VS Code
Website ini dibuat ulang dari file lama (hasil ChatGPT, 19 MB, 1 baris) menjadi proyek bersih untuk VS Code.

## Struktur
```
website-otris-profesional-vscode/
  index.html        -> HOME
  about.html, hardware.html, healthcare.html, ai-gateway.html
  wijoyo-kusumo.html, plug-play.html, hl7.html, wakaf.html
  trust-house.html, pemecah-batu.html, contact.html, otris-core.html
  css/style.css     -> Semua styling, tidak lagi inline 1 baris
  js/script.js      -> Posisi header dan pengalihan tautan lama
  wijoyo-chat.js    -> Tanya Wijoyo di semua halaman
  assets/           -> TARUH GAMBAR DI SINI
    logo.png
    P&P-15-MENIT.png
    Hero otris.png
    ai-gateway.png
    hardware-topology.png
    healthcare-otris.png
    otris-humanis.jpg
  README.md         -> File ini
```

## Cara sambung ke VS Code
1. Copy isi folder ini ke `~/Desktop/Website-otris.id/` (timpa index.html lama, backup dulu: cp index.html index-lama-backup.html)
2. Copy semua PNG/JPG dari repo lama ke folder `assets/` — nama file harus SAMA persis seperti di index.html (case-sensitive)
3. Di VS Code: File > Open Folder > Website-otris.id
4. Jalankan: `python3 -m http.server 8000` lalu buka http://127.0.0.1:8000
5. Klik semua menu atas. Setiap menu membuka file HTML yang sesuai.

## Kenapa versi lama tidak bisa dipencet?
- Versi lama pakai <div> + JS data-view, bukan <a>. Versi baru pakai <a href="#..."> beneran.
- Gambar versi lama ada yang jadi background CSS. Versi baru pakai <img src="assets/..."> + alt.
- Versi lama 1 file 19 MB. Versi baru dipisah HTML/CSS/JS, jadi Codex / Claude bisa baca.

## Prompt untuk Codex / Claude di VS Code
Copy prompt ini ke Codex / Claude Code di VS Code:

> Kamu adalah senior frontend engineer. Proyek ini adalah website OTRIS.id di folder ini.
> Tugas: (1) Pastikan semua <a> dan <button> bisa diklik, tidak ada teks yang pointer-events:none.
> (2) Pastikan semua <img src="assets/..."> ada filenya, kalau tidak ada, beri placeholder yang jelas dan list file yang hilang.
> (3) Jangan ubah isi tulisan, judul, dan amanah WIJOYO KUSUMO. Jangan ubah warna navy #071426 dan gold #cba760.
> (4) Tambahkan responsive untuk HP, aksesibilitas (alt, focus-visible), dan cek dengan `python3 -m http.server`.
> (5) Jangan hapus section #trust-house — itu pintu dari website inti ke WIJOYO TRUST HOUSE + PEMECAH BATU.
> Laporkan file apa yang kamu ubah dan cara test-nya.

## Pintu
- Menu TRUST HOUSE membuka `trust-house.html`.
- Tombol Pemecah Batu di HOME dan TRUST HOUSE membuka `pemecah-batu.html`.
- Petunjuk Satu Download Dapat Dua tersedia di kedua halaman.
