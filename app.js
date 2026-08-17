// Portfolio & Interactive Resume Logic for Ulrich OUEDRAOGO
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Register GSAP Plugins
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Stagger Reveal
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    heroTimeline
      .from('.hero-anim', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2
      });

    // Floating Navbar Morphing on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('bg-void/90', 'border-violet-accent/40', 'shadow-violet-accent/20');
        navbar.classList.remove('bg-void/60', 'border-white/10');
      } else {
        navbar.classList.remove('bg-void/90', 'border-violet-accent/40', 'shadow-violet-accent/20');
        navbar.classList.add('bg-void/60', 'border-white/10');
      }
    });

    // About Section ScrollTrigger Reveal
    gsap.from('.about-reveal', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });

    // Timeline Experience Cards Reveal
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });
    });

    // Skills Gauges & Counter Animation
    ScrollTrigger.create({
      trigger: '#skills',
      start: 'top 75%',
      onEnter: () => {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card) => {
          const circle = card.querySelector('.circle-progress');
          const percentText = card.querySelector('.skill-percent');
          if (!circle || !percentText) return;

          const targetPercent = parseInt(circle.getAttribute('data-target-percent') || '0', 10);
          const circumference = 2 * Math.PI * 40; // 251.2
          const strokeDashoffset = circumference - (targetPercent / 100) * circumference;

          // Animate Circle Gauge
          circle.style.strokeDashoffset = strokeDashoffset;

          // Counter Animation
          let currentPercent = 0;
          const duration = 1500; // ms
          const stepTime = 20; // ms
          const steps = duration / stepTime;
          const increment = targetPercent / steps;

          const timer = setInterval(() => {
            currentPercent += increment;
            if (currentPercent >= targetPercent) {
              currentPercent = targetPercent;
              clearInterval(timer);
            }
            percentText.textContent = `${Math.round(currentPercent)}%`;
          }, stepTime);
        });
      }
    });

    // Education Cards Reveal
    gsap.from('.edu-card', {
      scrollTrigger: {
        trigger: '#education',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Contact Cards Reveal
    gsap.from('.contact-card', {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      scale: 0.95,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  // 3. Dynamic PDF Generation and Download
  function generateAndDownloadCV() {
    const cvTextContent = `
================================================================================
                       ULRICH OUEDRAOGO — RESUME & CV
             Étudiant en Génie Électrique & Tech Entrepreneur
                    Ouagadougou, Burkina Faso
              Email: ouedraogo.ulrich@isge-bf.org | Tél: +226 70 00 00 00
================================================================================

PROFIL & À PROPOS
--------------------------------------------------------------------------------
Passionné par l'innovation technologique et l'impact sociétal, je combine le
Génie Électrique, la robotique et le développement web moderne (Vibe Coding).
Cofondateur de Markan School et créateur de la plateforme Gosanté, je conçois 
des solutions techniques concrètes et percutantes.

CURSUS ACADÉMIQUE & DIPLÔMES
--------------------------------------------------------------------------------
• 2025 - PRÉSENT : Génie Électrique (Études Universitaires)
  Institut Supérieur de Génie Électrique du Burkina Faso (ISGE-BF)

• 2025 : Baccalauréat Série E (Mathématiques & Technique)
  Lycée Technique National (Ouagadougou)

• CERTIFICATION : Formation Certifiée en Entrepreneuriat & Leadership
  Management de projets, vision stratégique et direction d'équipe.

• SECONDAIRE : BEPC & CEP
  Lycée Privé La Source

EXPÉRIENCES & INITIATIVES
--------------------------------------------------------------------------------
• 2026 - PRÉSENT : Co-fondateur & Formateur Robotique — Markan School
  - Élaboration de formations pratiques en robotique et Arduino pour les jeunes.
  - Initiation au prototypage électronique et au code embarqué.

• 2026 : Fondateur & Concepteur Lead — Gosanté
  - Conception et modélisation de la plateforme e-santé Gosanté.
  - Digitalisation de l'accès aux soins de santé au Burkina Faso.

• 2024 - 2025 : Participant Lead — Hackathon INGENOVA (ISGE-BF)
  - Développement accéléré d'un prototype d'ingénierie sous contrainte de temps.

• 2024 : Stagiaire en Mécanique Générale — Industrie & Prototypage
  - Immersion technique : usinage, lecture de plans et maintenance mécanique.

COMPÉTENCES CLÉS
--------------------------------------------------------------------------------
• Vibe Coding & Rapid Prototyping (95%)
• Robotique & Programmation Arduino (90%)
• Entrepreneuriat & Leadership (88%)
• Création Visuelle & Affiches par IA (85%)
• Prise de Parole en Public & Pitching (92%)

================================================================================
             CV Officiel de Ulrich OUEDRAOGO — Généré en 2026
================================================================================
`;

    // Create Blob object and trigger download
    const blob = new Blob([cvTextContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CV_Ulrich_OUEDRAOGO.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Bind download events to all download buttons
  const downloadButtons = [
    document.getElementById('download-cv-nav'),
    document.getElementById('download-cv-hero'),
    document.getElementById('download-cv-contact')
  ];

  downloadButtons.forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        generateAndDownloadCV();
      });
    }
  });

});
