// Otak Wijoyo Trust House - versi hemat, offline, tanpa API
const OTAK_WIJOYO = [
  { kunci: ["wijoyo", "trust house", "apa itu"], jawab: "Wijoyo Trust House itu rumah wakaf dari OTRIS. Tempatnya ide, AI, dan kebebasan berkarya jadi satu. Pemecah Batu dan Wakaf Rumah sekarang jadi satu di rumah ini." },
  { kunci: ["wakaf", "rumah"], jawab: "Rumah ini diwakafkan. Ilmu tidak dijual, yang dijual tenaga dan jasa. Penghasilan dari jasa untuk anak-anak. Siapapun boleh terima dan pakai wakaf ini." },
  { kunci: ["pemecah batu", "pemecah", "batu"], jawab: "Pemecah Batu itu cara mecah ide besar jadi kecil-kecil sampai bisa divalidasi. Ada level L0 NOT VERIFIED sampai L4 PRODUCTION VALIDATED. Bukunya ada 2: THE CANDIDATES yang wakaf, dan THE STONE BREAKER yang versi Inggris teknikal." },
  { kunci: ["candidates", "kandidat"], jawab: "THE CANDIDATES itu buku wakaf. Isinya level L0 sampai L4, dari yang belum terverifikasi sampai yang sudah production validated. Tujuannya biar orang kecil bisa ikut mecah batu." },
  { kunci: ["stone breaker"], jawab: "THE STONE BREAKER itu buku versi Inggris, dari ide sampai desain teknis. Judulnya From Idea to Technical Design, tentang Open Interoperability Framework." },
  { kunci: ["pengelola", "siapa", "hadi", "hanif"], jawab: "Atas Nama: Hadi Wijoyo Kusumo. Pengelola: Hanif Ahdi Fiddini, Founder OTRIS." },
  { kunci: ["download", "pakai", "gratis"], jawab: "Boleh bro, website wakaf ini memang buat di-download dan dipakai. Ilmu-nya gratis, yang dijual cuma tenaga dan jasa." },
  { kunci: ["otris"], jawab: "OTRIS itu OTRIS.ID Official. Bikin hardware, healthcare, AI Gateway, HL7, Plug & Play, dan sekarang Wijoyo Trust House." }
];
function jawabWijoyo(tanya){
  tanya = tanya.toLowerCase();
  for(let item of OTAK_WIJOYO){
    if(item.kunci.some(k => tanya.includes(k))) return item.jawab;
  }
  return "Di Wijoyo Trust House, yang ambo tau: Wakaf Rumah itu rumah yang diwakafkan, Pemecah Batu itu cara mecah ide sampai tervalidasi L0 sampai L4. Coba tanya soal wakaf, pemecah batu, atau pengelola.";
}
function buatChatWijoyo(){
  if(document.getElementById("wijoyo-chat")) return;
  let box = document.createElement("div");
  box.id = "wijoyo-chat";
  box.innerHTML = '<button id="wijoyo-btn" style="position:fixed;bottom:20px;right:20px;z-index:9999;background:#0f172a;color:#e6c98a;border:1px solid #e6c98a;padding:12px 16px;border-radius:999px;font-weight:700;cursor:pointer">Tanya Wijoyo</button><div id="wijoyo-box" style="display:none;position:fixed;bottom:70px;right:20px;z-index:9999;width:320px;max-width:90vw;background:#fff;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.3);overflow:hidden"><div style="background:#0f172a;color:#fff;padding:12px;font-weight:700">WIJOYO TRUST HOUSE - Tanya Ambo</div><div id="wijoyo-msg" style="height:260px;overflow:auto;padding:12px;font-size:14px;color:#0f172a"></div><div style="display:flex;border-top:1px solid #eee"><input id="wijoyo-input" placeholder="Tanya soal wakaf / pemecah batu..." style="flex:1;padding:10px;border:0;outline:none;color:#0f172a"/><button id="wijoyo-kirim" style="background:#e6c98a;border:0;padding:10px 14px;font-weight:700;cursor:pointer">Kirim</button></div></div>';
  document.body.appendChild(box);
  let btn = document.getElementById("wijoyo-btn");
  let panel = document.getElementById("wijoyo-box");
  let msg = document.getElementById("wijoyo-msg");
  let input = document.getElementById("wijoyo-input");
  function kirim(){
    let q = input.value.trim();
    if(!q) return;
    msg.innerHTML += '<div style="margin-bottom:8px"><b>Kamu:</b> '+q+'</div>';
    msg.innerHTML += '<div style="margin-bottom:12px;background:#f1f5f9;padding:8px;border-radius:10px"><b>Wijoyo:</b> '+jawabWijoyo(q)+'</div>';
    input.value = "";
    msg.scrollTop = msg.scrollHeight;
  }
  btn.onclick = () => { panel.style.display = panel.style.display === "none" ? "block" : "none"; };
  document.getElementById("wijoyo-kirim").onclick = kirim;
  input.addEventListener("keydown", e => { if(e.key === "Enter") kirim(); });
  msg.innerHTML = '<div style="background:#f1f5f9;padding:8px;border-radius:10px">Halo bro, ambo otak Wijoyo Trust House. Tanya aja soal wakaf, pemecah batu, atau pengelola.</div>';
}
document.addEventListener("DOMContentLoaded", buatChatWijoyo);
