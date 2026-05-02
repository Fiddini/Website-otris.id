<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTRIS - Real-Time Multi-Specialist Tele-Operative System</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 1rem 0;
            transition: all 0.3s ease;
        }

        nav .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1a237e;
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        .nav-links a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .nav-links a:hover {
            color: #1a237e;
        }

        .cta-nav {
            background: #1a237e;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .cta-nav:hover {
            background: #0d47a1;
            transform: translateY(-2px);
        }

        /* Hero Section */
        .hero {
            height: 100vh;
            background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }

        .hero-content {
            max-width: 800px;
            z-index: 2;
            position: relative;
        }

        .hero h1 {
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 700;
            margin-bottom: 1rem;
            opacity: 0;
            animation: fadeInUp 1s ease forwards;
        }

        .hero .subtitle {
            font-size: clamp(1.2rem, 3vw, 1.8rem);
            font-weight: 400;
            margin-bottom: 2rem;
            opacity: 0;
            animation: fadeInUp 1s ease 0.2s forwards;
        }

        .hero .tagline {
            font-size: 1.2rem;
            margin-bottom: 3rem;
            opacity: 0.9;
            opacity: 0;
            animation: fadeInUp 1s ease 0.4s forwards;
        }

        .cta-hero {
            display: inline-block;
            background: white;
            color: #1a237e;
            padding: 1.25rem 3rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            opacity: 0;
            animation: fadeInUp 1s ease 0.6s forwards;
        }

        .cta-hero:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        /* Sections */
        section {
            padding: 120px 0;
        }

        .section-title {
            font-size: 3rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 4rem;
            color: #1a237e;
        }

        .section-subtitle {
            font-size: 1.25rem;
            text-align: center;
            max-width: 800px;
            margin: 0 auto 4rem;
            color: #666;
            font-weight: 400;
        }

        /* Problem Section */
        .problem {
            background: #f8f9ff;
        }

        .problem-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 3rem;
            margin-top: 4rem;
        }

        .problem-item {
            text-align: center;
            padding: 2rem;
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }

        .problem-item.show {
            opacity: 1;
            transform: translateY(0);
        }

        .problem-item i {
            font-size: 3rem;
            color: #1a237e;
            margin-bottom: 1.5rem;
        }

        .problem-item h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #333;
        }

        /* Solution Section */
        .solution {
            background: white;
        }

        .solution-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
            align-items: center;
        }

        .solution-text h2 {
            font-size: 2.5rem;
            color: #1a237e;
            margin-bottom: 2rem;
        }

        .solution-text ul {
            list-style: none;
            padding-left: 0;
        }

        .solution-text li {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            padding-left: 2rem;
            position: relative;
        }

        .solution-text li::before {
            content: '→';
            position: absolute;
            left: 0;
            color: #1a237e;
            font-weight: bold;
        }

        .solution-visual {
            text-align: center;
        }

        .system-diagram {
            width: 100%;
            height: 400px;
            background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            color: #1a237e;
            position: relative;
        }

        /* How It Works */
        .how-it-works {
            background: #f8f9ff;
        }

        .steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 4rem;
        }

        .step {
            background: white;
            padding: 3rem 2rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(30px);
        }

        .step.show {
            opacity: 1;
            transform: translateY(0);
        }

        .step:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .step-number {
            width: 60px;
            height: 60px;
            background: #1a237e;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 auto 1.5rem;
        }

        /* Features */
        .features {
            background: white;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 3rem;
            margin-top: 4rem;
        }

        .feature-card {
            padding: 3rem 2rem;
            border-left: 4px solid #1a237e;
            background: #f8f9ff;
            border-radius: 0 20px 20px 0;
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.6s ease;
        }

        .feature-card.show {
            opacity: 1;
            transform: translateX(0);
        }

        .feature-card h3 {
            color: #1a237e;
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }

        /* CTA Section */
        .cta-section {
            background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
            color: white;
            text-align: center;
        }

        .cta-section h2 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .cta-section .cta-hero {
            background: white;
            color: #1a237e;
            margin-top: 2rem;
        }

        /* Footer */
        footer {
            background: #1a237e;
            color: white;
            text-align: center;
            padding: 3rem 0 1rem;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        /* Animations */
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }

            .solution-content {
                grid-template-columns: 1fr;
                gap: 3rem;
            }

            .section-title {
                font-size: 2rem;
            }
        }

        /* Scroll animations */
        .fade-in {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }

        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="container">
            <div class="logo">OTRIS</div>
            <ul class="nav-links">
                <li><a href="#problem">Problem</a></li>
                <li><a href="#solution">Solution</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <a href="#contact" class="cta-nav">Request Demo</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>OTRIS</h1>
            <div class="subtitle">Real-Time Multi-Specialist Tele-Operative System</div>
            <div class="tagline">Connecting specialists in real-time without patient referral</div>
            <a href="#contact" class="cta-hero">Request Demo</a>
        </div>
    </section>

    <!-- Problem Section -->
    <section id="problem" class="problem">
        <div class="container">
            <h2 class="section-title">The Challenge</h2>
            <div class="section-subtitle">
                Regional hospitals face critical limitations in specialist access, causing delays and increased costs.
            </div>
            <div class="problem-grid">
                <div class="problem-item fade-in">
                    <i class="fas fa-map-marker-alt"></i>
                    <h3>Limited Specialist Access</h3>
                    <p>Regional hospitals lack immediate access to specialized expertise during critical procedures.</p>
                </div>
                <div class="problem-item fade-in">
                    <i class="fas fa-clock"></i>
                    <h3>Patient Referral Delays</h3>
                    <p>Transferring patients to specialist centers creates dangerous delays in treatment.</p>
                </div>
                <div class="problem-item fade-in">
                    <i class="fas fa-dollar-sign"></i>
                    <h3>High Operational Costs</h3>
                    <p>Referral processes increase costs for hospitals, patients, and the healthcare system.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Solution Section -->
    <section id="solution" class="solution">
        <div class="container">
            <h2 class="section-title">The System</h2>
            <div class="section-subtitle">
                OTRIS is a real-time integrated surgical collaboration system that connects doctors, patient data, and medical devices.
            </div>
            <div class="solution-content">
                <div class="solution-text fade-in">
                    <h2>NOT a device. NOT telemedicine. A complete system.</h2>
                    <ul>
                        <li>Doctors collaborate in real-time</li>
                        <li>Patient data flows seamlessly</li>
                        <li>Medical devices integrate automatically</li>
                        <li>One unified surgical ecosystem</li>
                    </ul>
                </div>
                <div class="solution-visual fade-in">
                    <div class="system-diagram">
                        <div>
                            <i class="fas fa-network-wired" style="font-size: 4rem; margin-bottom: 1rem; display: block;"></i>
                            <strong>INTEGRATED SYSTEM</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="how-it-works">
        <div class="container">
            <h2 class="section-title">System Deployment</h2>
            <div class="section-subtitle">
                Seamless integration from procurement to full operation.
            </div>
            <div class="steps">
                <div class="step fade-in">
                    <div class="step-number">1</div>
                    <h3>Procurement</h3>
                    <p>Complete system package tailored to hospital needs.</p>
                </div>
                <div class="step fade-in">
                    <div class="step-number">2</div>
                    <h3>Installation</h3>
                    <p>Professional on-site deployment by certified technicians.</p>
                </div>
                <div class="step fade-in">
                    <div class="step-number">3</div>
                    <h3>Integration</h3>
                    <p>Seamless connection with existing hospital infrastructure.</p>
                </div>
                <div class="step fade-in">
                    <div class="step-number">4</div>
                    <h3>Testing</h3>
                    <p>Comprehensive validation and staff training.</p>
                </div>
                <div class="step fade-in">
                    <div class="step-number">5</div>
                    <h3>Operation</h3>
                    <p>24/7 real-time surgical collaboration system ready.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
        <div class="container">
            <h2 class="section-title">System Capabilities</h2>
            <div class="features-grid">
                <div class="feature-card fade-in">
                    <h3><i class="fas fa-video" style="color: #1a237e; margin-right: 0.5rem;"></i>Real-Time Video Collaboration</h3>
                    <p>Multi-specialist video conferencing with surgical-grade latency and 4K quality.</p>
                </div>
                <div class="feature-card fade-in">
                    <h3><i class="fas fa-microchip" style="color: #1a237e; margin-right: 0.5rem;"></i>Multi-Device Integration</h3>
                    <p>Seamless connection with existing medical equipment and imaging systems.</p>
                </div>
                <div class="feature-card fade-in">
                    <h3><i class="fas fa-tachometer-alt" style="color: #1a237e; margin-right: 0.5rem;"></i>Doctor Dashboard</h3>
                    <p>Centralized control interface for specialists with full situational awareness.</p>
                </div>
                <div class="feature-card fade-in">
                    <h3><i class="fas fa-tablet-alt" style="color: #1a237e; margin-right: 0.5rem;"></i>Tablet Control System</h3>
                    <p>Sterile field tablet interface for precise remote instrument control.</p>
                </div>
                <div class="feature-card fade-in">
                    <h3><i class="fas fa-database" style="color: #1a237e; margin-right: 0.5rem;"></i>HL7/FHIR Data Integration</h3>
                    <p>Complete compatibility with hospital information systems and national health platforms.</p>
                </div>
                <div class="feature-card fade-in">
                    <h3><i class="fas fa-shield-alt" style="color: #1a237e; margin-right: 0.5rem;"></i>SATUSEHAT Integration</h3>
                    <p>Fully compliant with Indonesia's national health information system.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits" style="background: #f8f9ff; padding: 120px 0;">
        <div class="container">
            <h2 class="section-title">System Impact</h2>
            <div class="section-subtitle" style="margin-bottom: 4rem;">
                Transform hospital operations and patient outcomes.
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div class="fade-in" style="text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; color: #1a237e; margin-bottom: 1rem;">-90%</div>
                    <h3>Patient Referral Reduction</h3>
                </div>
                <div class="fade-in" style="text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; color: #1a237e; margin-bottom: 1rem;">50%</div>
                    <h3>Faster Treatment Times</h3>
                </div>
                <div class="fade-in" style="text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; color: #1a237e; margin-bottom: 1rem;">+30%</div>
                    <h3>Hospital Revenue Increase</h3>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section id="contact" class="cta-section">
        <div class="container">
            <h2 class="section-title" style="color: white; margin-bottom: 1rem;">Join the Future</h2>
            <div style="font-size: 1.25rem; margin-bottom: 3rem; opacity: 0.9;">
                of surgical collaboration
            </div>
            <a href="mailto:info@otris-system.com" class="cta-hero">Request System Demo</a>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div>
                    <h3>PT Hematech Nusantara</h3>
                    <p>Developer of OTRIS System</p>
                </div>
                <div>
                    <h4>Contact</h4>
                    <p><i class="fas fa-envelope"></i> info@otris-system.com</p>
                    <p><i class="fas fa-phone"></i> +62 21 1234 5678</p>
                </div>
                <div>
                    <h4>System</h4>
                    <p>Real-Time Multi-Specialist Tele-Operative System</p>
                </div>
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; margin-top: 2rem;">
                <p>&copy; 2024 PT Hematech Nusantara. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = 'none';
            }
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show', 'visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in, .problem-item, .step, .feature-card').forEach(el => {
            observer.observe(el);
        });
    </script>
</body>
</html>
