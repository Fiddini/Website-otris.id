// Modal functionality
    const demoModal = document.getElementById('demo-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const demoForm = document.getElementById('demo-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    // Open modal on CTA button clicks
    
    

    // Close modal
    closeModalBtn.addEventListener('click', () => {
      demoModal.classList.add('hidden');
    });

    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) demoModal.classList.add('hidden');
    });

    // Handle form submission
    demoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Mengirim...';
      formStatus.classList.remove('hidden');
      formStatus.className = 'p-4 rounded-lg text-sm text-center bg-blue-500/10 text-blue-300';
      formStatus.textContent = 'Mengirim data...';

      const formData = {
        hospital_name: document.getElementById('hospital_name').value,
        contact_name: document.getElementById('contact_name').value,
        contact_email: document.getElementById('contact_email').value,
        contact_phone: document.getElementById('contact_phone').value,
        department: document.getElementById('department').value,
        submitted_at: new Date().toISOString()
      };

      const result = await window.dataSdk.create(formData);

      if (result.isOk) {
        formStatus.className = 'p-4 rounded-lg text-sm text-center bg-green-500/10 text-green-300';
        formStatus.textContent = '✓ Permintaan berhasil dikirim! Tim kami akan segera menghubungi Anda.';
        demoForm.reset();
        submitBtn.textContent = 'Minta Demo';
        setTimeout(() => {
          demoModal.classList.add('hidden');
          formStatus.classList.add('hidden');
        }, 3000);
      } else {
        formStatus.className = 'p-4 rounded-lg text-sm text-center bg-red-500/10 text-red-300';
        formStatus.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
        submitBtn.textContent = 'Kirim Permintaan';
      }

      submitBtn.disabled = false;
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    lucide.createIcons();

    // Element SDK
    const defaultConfig = {
      hero_title: 'Menghubungkan Dokter Spesialis Secara Real-Time Tanpa Harus Merujuk Pasien',
      hero_subtitle: 'Mengubah cara rumah sakit menangani kasus kritis. Yang berpindah bukan pasien, tapi keahlian.',
      cta_primary: 'Minta Demo',
      cta_secondary: 'Lihat Simulasi Sistem',
      background_color: '#0a0f1a',
      accent_color: '#00c896',
      text_color: '#ffffff',
      surface_color: '#111827',
      font_family: 'Space Grotesk',
      font_size: 16
    };

    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (config) => {
        const c = { ...defaultConfig, ...config };
        document.getElementById('hero-title').innerHTML = c.hero_title.replace('Secara Real-Time', '<span class="text-[#00c896]">Secara Real-Time</span>');
        document.getElementById('hero-subtitle').textContent = c.hero_subtitle;
        document.getElementById('cta-primary-btn').textContent = c.cta_primary;
        document.getElementById('cta-secondary-btn').textContent = c.cta_secondary;
        document.getElementById('nav-cta').textContent = c.cta_primary;

        document.body.style.backgroundColor = c.background_color;
        document.querySelectorAll('.font-heading').forEach(el => { el.style.fontFamily = `${c.font_family}, sans-serif`; });

        const baseSize = c.font_size;
        document.body.style.fontSize = `${baseSize}px`;
      },
      mapToCapabilities: (config) => {
        const c = { ...defaultConfig, ...config };
        return {
          recolorables: [
            { get: () => c.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
            { get: () => c.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
            { get: () => c.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
            { get: () => c.accent_color, set: (v) => { config.accent_color = v; window.elementSdk.setConfig({ accent_color: v }); } }
          ],
          borderables: [],
          fontEditable: { get: () => c.font_family, set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); } },
          fontSizeable: { get: () => c.font_size, set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); } }
        };
      },
      mapToEditPanelValues: (config) => {
        const c = { ...defaultConfig, ...config };
        return new Map([
          ['hero_title', c.hero_title],
          ['hero_subtitle', c.hero_subtitle],
          ['cta_primary', c.cta_primary],
          ['cta_secondary', c.cta_secondary]
        ]);
      }
    });