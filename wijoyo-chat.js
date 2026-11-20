// Otak Wijoyo Trust House - v2 bisa ditanya apa pun
const OTAK_WIJOYO = [
  { kunci: ["tidak dijual", "jual", "hardware", "system", "projek"], jawab: "Intinya sajo bro: Ilmu tidak dijual. Titik. Hardware projek boleh dijual kalau dapat. System tidak dijual. Titik." },
  { kunci: ["wijoyo", "trust house"], jawab: "Wijoyo Trust House itu rumah wakaf dari OTRIS. Tempatnya ide, AI, dan kebebasan berkarya jadi satu. Pemecah Batu dan Wakaf Rumah sekarang jadi satu di rumah ini." },
  { kunci: ["wakaf", "rumah"], jawab: "Rumah ini diwakafkan. Ilmu tidak dijual, yang dijual tenaga dan jasa. Penghasilan dari jasa untuk anak-anak. Siapapun boleh terima dan pakai wakaf ini." },
  { kunci: ["pemecah batu", "pemecah", "batu"], jawab: "Pemecah Batu itu cara mecah ide besar jadi kecil-kecil sampai bisa divalidasi. Ada level L0 NOT VERIFIED sampai L4 PRODUCTION VALIDATED." },
  { kunci: ["pengelola", "siapa", "hadi", "hanif"], jawab: "Atas Nama: Hadi Wijoyo Kusumo. Pengelola: Hanif Ahdi Fiddini, Founder OTRIS." }
];
function jawabKamus(tanya){
  tanya = tanya.toLowerCase();
  for(let item of OTAK_WIJOYO){
    if(item.kunci.some(k => tanya.includes(k))) return item.jawab;
  }
  return null;
}
async function jawabAI(tanya){
  // Coba otak besar gratis dulu
  try{
    let system = "Kamu adalah asisten website OTRIS, lagi nempel di www.otris.id. Kalau user bilang layar, itu layar website, bukan monitor hardware. Jangan suruh beli hardware. Jawab soal layout website, bukan soal toko. Kamu adalah Wijoyo Trust House dari OTRIS. Prinsipmu: Ilmu tidak dijual. Titik. Hardware projek boleh dijual kalau dapat. System tidak dijual. Titik. Jawab dengan bahasa santai Minang-Indonesia, singkat, jelas, seperti abang ke adik. Jangan ngarang soal wakaf, pakai prinsip di atas.";
    let res = await fetch("https://text.pollinations.ai/" + encodeURIComponent(system + "\n\nPertanyaan: " + tanya), { headers: { "Content-Type": "text/plain" } });
    if(!res.ok) throw new Error("gagal");
    let txt = await res.text();
    if(txt && txt.length > 5) return txt.slice(0, 800);
  }catch(e){}
  // Kalau gagal, balik ke kamus
  return jawabKamus(tanya) || "Di Wijoyo Trust House, yang ambo tau pasti: Ilmu tidak dijual. Titik. System tidak dijual. Titik. Coba tanya lagi soal wakaf, pemecah batu, atau yang lain, ambo jawab sebisa ambo.";
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
        <input id="wijoyo-input" placeholder="Tanya apa pun..." style="flex:1;padding:10px;border:0;outline:none;color:#0f172a"/>
        <button id="wijoyo-kirim" style="background:#e6c98a;border:0;padding:10px 14px;font-weight:700;cursor:pointer">Kirim</button>
      </div>
    </div>`;
  document.body.appendChild(box);
  let btn = document.getElementById("wijoyo-btn");
  let panel = document.getElementById("wijoyo-box");
  let msg = document.getElementById("wijoyo-msg");
  let input = document.getElementById("wijoyo-input");
  async function kirim(){
    let q = input.value.trim();
    if(!q) return;
    msg.innerHTML += '<div style="margin-bottom:8px"><b>Kamu:</b> '+q+'</div>';
    msg.innerHTML += '<div id="wijoyo-lagi" style="margin-bottom:12px;background:#f1f5f9;padding:8px;border-radius:10px">Wijoyo lagi mikir...</div>';
    input.value = "";
    msg.scrollTop = msg.scrollHeight;
    let jawab = await jawabAI(q);
    let lagi = document.getElementById("wijoyo-lagi");
    if(lagi) lagi.outerHTML = '<div style="margin-bottom:12px;background:#f1f5f9;padding:8px;border-radius:10px"><b>Wijoyo:</b> '+jawab+'</div>';
    msg.scrollTop = msg.scrollHeight;
  }
  btn.onclick = () => {
    panel.hidden = !panel.hidden;
    btn.setAttribute("aria-expanded", String(!panel.hidden));
  };
  document.getElementById("wijoyo-kirim").onclick = kirim;
  input.addEventListener("keydown", e => { if(e.key === "Enter") kirim(); });
  msg.innerHTML = '<div style="background:#f1f5f9;padding:8px;border-radius:10px">Halo bro, ambo otak Wijoyo. Sekarang bisa ditanya apa pun. Tanya aja.</div>';
}
document.addEventListener("DOMContentLoaded", buatChatWijoyo);
