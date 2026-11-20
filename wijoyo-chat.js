const RUJUK_TRUST_HOUSE = "Itu detail arsitektur khusus kita buat jualan kamera / buat OTRIS. Untuk detailnya, silakan Minta di Trust House.";
const MINTA_DETAIL = [
  /\b(?:detail\w*|rinci\w*|teknis|technical|mendalam|lebih lanjut|lebih dalam|in depth|lengkap|semua|seluruh|keseluruhan|daftar|tiap topik|19 topik|all topics|all 19|full|entire)\b/,
  /\b(?:step by step|langkah\w*|tahapan|cara|how to|how does|implementasi|implementation|spesifikasi|specifications?|parameter|konfigurasi|configuration)\b/,
  /\b(?:kode|code|pseudocode|api|algoritm[ae]|algorithm|arsitektur internal|diagram|skema|pipeline|raw bytes|profile yaml|l[0-4])\b/,
  /\b(?:knowledge|json|dump|bocor\w*|salin\w*)\b/
];

const JAWABAN_PUBLIK = [
  {
    topik: /\bwater ?gate\b/,
    jawaban: "Water Gate itu teknik kita buat ngatur aliran video kamera biar stabil, nggak macet. Arsitektur khusus kita buat jualan kamera. Untuk detailnya, Minta di Trust House ya."
  },
  {
    topik: /\b(?:wakaf|dijual|jual (?:ilmu|system|sistem|hardware)|hardware (?:projek|proyek|project))\b/,
    jawaban: "Ilmu tidak dijual. System tidak dijual. Hardware projek boleh dijual."
  },
  {
    topik: /\b(?:pengelola|hadi wijoyo kusumo|hanif ahdi fiddini)\b/,
    jawaban: "Wakaf ini atas nama Hadi Wijoyo Kusumo. Pengelolanya Hanif Ahdi Fiddini."
  },
  {
    topik: /\b(?:trust house|wijoyo kusumo|wijoyo)\b/,
    jawaban: "Wijoyo Trust House adalah rumah wakaf dari OTRIS. Di sana ada Wakaf Rumah dan Pemecah Batu."
  },
  {
    topik: /\b(?:pemecah batu|stone breaker)\b/,
    jawaban: "Pemecah Batu membantu memecah pekerjaan besar menjadi bagian yang bisa diperiksa. Kalau buktinya belum cukup, hasilnya tetap belum diketahui."
  },
  {
    topik: /\b(?:satusehat|satu sehat|hl7|hl 7|fhir|pmk 24|permenkes(?: nomor)? 24)\b/,
    jawaban: "SATUSEHAT adalah platform pertukaran data kesehatan dari Kementerian Kesehatan. Platform ini memakai standar HL7 FHIR agar sistem bisa bertukar data dengan format yang seragam."
  },
  {
    topik: /\b(?:plug (?:and )?play|p p|pnp|15 menit)\b/,
    jawaban: "P&P 15 Menit adalah target pemasangan OTRIS untuk perangkat yang sudah siap. Waktunya bergantung pada kondisi dan kesiapan perangkat."
  },
  {
    topik: /\b(?:local first|lokal dulu|tanpa cloud)\b/,
    jawaban: "Local First berarti fungsi inti OTRIS tetap bisa berjalan di tempat saat cloud tidak tersedia."
  },
  {
    topik: /\b(?:prinsip|konstitusi|constitution|integration over replacement|vendor agnostic|canonical first|gateway first|event driven|audit first)\b/,
    jawaban: "OTRIS mengutamakan integrasi perangkat yang sudah ada. Sistem dirancang supaya bisa bekerja lintas merek dan hasilnya bisa diperiksa."
  },
  {
    topik: /\bclinical wall\b/,
    jawaban: "Clinical Wall adalah tampilan OTRIS yang membantu tenaga klinis melihat informasi di satu tempat."
  },
  {
    topik: /\b(?:core|inti otris)\b/,
    jawaban: "OTRIS Core adalah bagian inti yang mengolah informasi untuk komponen OTRIS lainnya."
  },
  {
    topik: /\bgateway\b/,
    jawaban: "Gateway membantu perangkat medis terhubung dan berbagi informasi dengan OTRIS."
  },
  {
    topik: /\bedge\b/,
    jawaban: "OTRIS Edge bekerja dekat perangkat, di lokasi tempat informasi berasal."
  },
  {
    topik: /\botris\b/,
    jawaban: "OTRIS menghubungkan perangkat medis yang sudah ada, informasi, dan tenaga ahli. ICU adalah pintu masuk. Manusia adalah tujuannya."
  }
];

function jawabWijoyo(tanya){
  const pertanyaan = tanya.toLowerCase().normalize("NFKD").replace(/\p{M}/gu, "").replace(/[^a-z0-9]+/g, " ").trim();
  if(MINTA_DETAIL.some(pola => pola.test(pertanyaan))) return RUJUK_TRUST_HOUSE;
  return JAWABAN_PUBLIK.find(({ topik }) => topik.test(pertanyaan))?.jawaban
    ?? "Ambo bisa kasih gambaran singkat tentang OTRIS dan Wakaf Wijoyo. Untuk bahasan lain, silakan Minta di Trust House.";
}

function isiPesan(elemen, nama, teks){
  const label = document.createElement("b");
  label.textContent = nama;
  elemen.replaceChildren(label, ` ${teks}`);
}

function buatChatWijoyo(){
  if(document.getElementById("wijoyo-chat")) return;
  let box = document.createElement("div");
  box.id = "wijoyo-chat";
  box.innerHTML = `
    <button id="wijoyo-btn" aria-controls="wijoyo-box" aria-expanded="false" style="position:fixed;bottom:20px;right:20px;z-index:9999;background:#0f172a;color:#e6c98a;border:1px solid #e6c98a;padding:12px 16px;border-radius:999px;font-weight:700;cursor:pointer">Tanya Wijoyo</button>
    <div id="wijoyo-box" hidden>
      <div style="background:#0f172a;color:#fff;padding:12px;font-weight:700">WIJOYO TRUST HOUSE - Tanya Ambo</div>
      <div id="wijoyo-msg"></div>
      <div style="display:flex;border-top:1px solid #eee">
        <input id="wijoyo-input" placeholder="Tanya soal OTRIS atau Wakaf..." style="flex:1;padding:10px;border:0;outline:none;color:#0f172a"/>
        <button id="wijoyo-kirim" style="background:#e6c98a;border:0;padding:10px 14px;font-weight:700;cursor:pointer">Kirim</button>
      </div>
    </div>`;
  document.body.appendChild(box);
  let btn = document.getElementById("wijoyo-btn");
  let panel = document.getElementById("wijoyo-box");
  let msg = document.getElementById("wijoyo-msg");
  let input = document.getElementById("wijoyo-input");
  function kirim(){
    const q = input.value.trim();
    if(!q) return;
    const pesan = document.createElement("div");
    pesan.style.marginBottom = "8px";
    isiPesan(pesan, "Kamu:", q);
    const balasan = document.createElement("div");
    balasan.style.cssText = "margin-bottom:12px;background:#f1f5f9;padding:8px;border-radius:10px";
    isiPesan(balasan, "Wijoyo:", jawabWijoyo(q));
    msg.append(pesan, balasan);
    input.value = "";
    msg.scrollTop = msg.scrollHeight;
  }
  btn.onclick = () => {
    panel.hidden = !panel.hidden;
    btn.setAttribute("aria-expanded", String(!panel.hidden));
  };
  document.getElementById("wijoyo-kirim").onclick = kirim;
  input.addEventListener("keydown", e => { if(e.key === "Enter") kirim(); });
  msg.innerHTML = '<div style="background:#f1f5f9;padding:8px;border-radius:10px">Halo bro, ambo Wijoyo. Ambo bisa kasih gambaran singkat tentang OTRIS.</div>';
}
document.addEventListener("DOMContentLoaded", buatChatWijoyo);
