<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>OTRIS - Hero Section</title>
<style>
  body, html {
    margin: 0; padding: 0; height: 100%; width: 100%;
    background: #0a1f3d; /* deep navy background */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #a6c8ff;
    overflow: hidden;
  }
  #hero {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  /* Abstract network background dots & lines */
  #hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at center, rgba(0,115,230,0.4), transparent 50%),
      url('https://i.ibb.co/4d3L2Fw/abstract-network.png') center center no-repeat;
    background-size: cover;
    filter: blur(12px);
    opacity: 0.25;
    z-index: 0;
  }
  #hero-content {
    position: relative;
    max-width: 650px;
    z-index: 1;
  }
  #hero-content h1 {
    font-size: 3.8rem;
    font-weight: 800;
    margin-bottom: 0.45rem;
    color: #65a0ff;
    text-shadow: 0 0 15px rgba(101, 160, 255, 0.9);
  }
  #hero-content h3 {
    font-weight: 600;
    font-size: 1.3rem;
    color: #90b9ffcc;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(144, 185, 255, 0.8);
  }
  #hero-content p {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
    color: #a6c8ffe6;
    text-shadow: 0 0 8px rgba(166, 200, 255, 0.7);
  }
  button {
    background: #2b70f3;
    color: white;
    font-weight: 700;
    font-size: 1.2rem;
    padding: 1rem 3.2rem;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    box-shadow: 0 0 35px 3px rgba(43, 112, 243, 0.7);
    transition: background-color 0.3s ease;
  }
  button:hover {
    background: #1943a1;
    box-shadow: 0 0 45px 6px rgba(25, 67, 161, 0.9);
  }
  /* Animasi garis vertikal & titik */
  @keyframes rainAnimation {
    0% { transform: translateY(-200%); opacity: 1; }
    100% { transform: translateY(100%); opacity: 0; }
  }
  .rain-container {
    position: absolute;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
  .line {
    position: absolute;
    width: 1.2px;
    height: 80px;
    background: linear-gradient(to bottom, #3a76ff88, transparent);
    border-radius: 1px;
    animation: rainAnimation linear infinite;
  }
  .line:nth-child(1) { left: 10%; animation-duration: 2.3s; animation-delay: 0s; }
  .line:nth-child(2) { left: 20%; animation-duration: 2.1s; animation-delay: 0.5s; }
  .line:nth-child(3) { left: 25%; animation-duration: 2.8s; animation-delay: 1s; }
  .line:nth-child(4) { left: 30%; animation-duration: 2.2s; animation-delay: 1.3s; }
  .line:nth-child(5) { left: 40%; animation-duration: 3.0s; animation-delay: 0.7s; }
  .line:nth-child(6) { left: 50%; animation-duration: 2.5s; animation-delay: 1.1s; }
  .line:nth-child(7) { left: 60%; animation-duration: 2.7s; animation-delay: 1.5s; }
  .line:nth-child(8) { left: 70%; animation-duration: 2.4s; animation-delay: 0.8s; }
  .line:nth-child(9) { left: 80%; animation-duration: 3.1s; animation-delay: 1.2s; }
  .line:nth-child(10) { left: 90%; animation-duration: 2.6s; animation-delay: 1.7s; }
</style>
</head>
<body>
  <section id="hero" role="banner" aria-label="Hero section OTRIS">
    <div class="rain-container" aria-hidden="true">
      <div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div>
      <div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div>
    </div>
    <div id="hero-content">
      <h1>OTRIS</h1>
      <h3>Bukan alat. Bukan telemedisin. Ini sistem.</h3>
      <p>Menghubungkan dokter spesialis secara real-time tanpa rujukan pasien</p>
      <button onclick="location.href='https://wa.me/6282120000266?text=Minta%20Demo%20OTRIS'">Minta Demo Sekarang</button>
    </div>
  </section>
</body>
</html>
