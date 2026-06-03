import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

css_new = '''  /* 2-column grid */
  .hero-2col {
    position: relative; z-index: 1;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    gap: 4rem;
    width: 100%;
    margin: 0 auto;
  }

  /* LEFT: Content */
  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .hero-label {
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 1rem;
    background: rgba(45,212,191,0.1);
    padding: 0.4rem 1rem;
    border-radius: 100px;
    border: 1px solid rgba(45,212,191,0.25);
  }
  .hero-name {
    font-family: 'Syne', sans-serif;
    font-size: clamp(3rem, 5vw, 4.5rem);
    font-weight: 800;
    line-height: 1.05;
    color: #fff;
    text-shadow: 0 4px 12px rgba(0,0,0,0.8);
    margin-bottom: 1.2rem;
    word-break: break-word;
  }
  .hero-desc {
    font-size: 1.05rem;
    color: var(--muted);
    line-height: 1.8;
    margin-bottom: 2.5rem;
    max-width: 500px;
  }
  .hero-actions {
    display: flex;
    gap: 1.2rem;
    margin-bottom: 3rem;
  }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: var(--accent);
    color: #fff;
    font-weight: 600;
    font-size: 0.95rem;
    padding: 0.85rem 2rem;
    border-radius: 100px;
    text-decoration: none;
    transition: all 0.3s;
    box-shadow: 0 8px 24px rgba(124,106,247,0.4);
  }
  .btn-primary:hover {
    background: #6a57e6;
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(124,106,247,0.6);
  }
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border2);
    color: #fff;
    font-weight: 600;
    font-size: 0.95rem;
    padding: 0.85rem 2rem;
    border-radius: 100px;
    text-decoration: none;
    transition: all 0.3s;
    backdrop-filter: blur(8px);
  }
  .btn-secondary:hover {
    background: rgba(255,255,255,0.08);
    transform: translateY(-3px);
    border-color: var(--accent);
  }
  
  .hero-socials {
    display: flex;
    gap: 1.2rem;
  }
  .hero-socials a {
    width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
    border: 1px solid var(--border2);
    color: var(--muted);
    font-size: 1.1rem;
    text-decoration: none;
    transition: all 0.3s;
  }
  .hero-socials a:hover {
    color: #fff;
    border-color: var(--accent);
    background: rgba(124,106,247,0.15);
    transform: translateY(-4px);
  }

  /* RIGHT: Visual */
  .hero-visual {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .hero-portrait-wrap {
    position: relative;
    width: 100%;
    max-width: 380px;
    border-radius: 32px;
    background: rgba(31,31,56,0.3);
    border: 1px solid var(--border2);
    padding: 1.5rem;
    backdrop-filter: blur(20px);
    box-shadow: 0 30px 60px rgba(0,0,0,0.6);
  }
  .hero-portrait-glow {
    position: absolute;
    inset: -30px;
    background: radial-gradient(circle at 50% 50%, rgba(124,106,247,0.4) 0%, rgba(45,212,191,0.1) 60%, transparent 80%);
    border-radius: 50%;
    filter: blur(40px);
    z-index: 0;
  }
  .hero-portrait {
    position: relative; z-index: 1;
    width: 100%;
    border-radius: 20px;
    display: block;
    object-fit: cover;
  }
  .hero-badge {
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(20,20,35,0.85);
    border: 1px solid var(--accent);
    border-radius: 100px;
    padding: 0.6rem 1.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
    backdrop-filter: blur(12px);
    box-shadow: 0 10px 30px rgba(124,106,247,0.3);
  }
  .badge-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--teal);
    animation: pulse 2s infinite;
    flex-shrink: 0;
    box-shadow: 0 0 10px var(--teal);
  }
  @keyframes pulse {
    0%,100% { opacity:1; }
    50% { opacity:0.4; }
  }'''

css_pattern = re.compile(r'  /\* 3-column grid \*/.*?\.hero-cta:hover \{[^}]+\}', re.DOTALL)
content = css_pattern.sub(css_new, content)

html_new = '''<div class="hero-wrapper container">
    <div class="hero-2col">
      <!-- LEFT: Content -->
      <div class="hero-content fade-up">
        <div class="hero-label">Data Scientist &amp; AI Engineer</div>
        <h1 class="hero-name">Hirusha<br>Jayasundara</h1>
        <p class="hero-desc">Passionate about building intelligent, data-driven solutions that bridge the gap between complex algorithms and real-world impact.</p>
        
        <div class="hero-actions">
          <a href="#contact" class="btn-primary">Get In Touch <i class="fa-solid fa-arrow-right"></i></a>
          <a href="#projects" class="btn-secondary">View Projects</a>
        </div>

        <div class="hero-socials">
          <a href="https://github.com/" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
          <a href="https://linkedin.com/" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="mailto:hirusha@email.com" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
          <a href="#" aria-label="Kaggle"><i class="fa-brands fa-kaggle"></i></a>
        </div>
      </div>

      <!-- RIGHT: Visual -->
      <div class="hero-visual fade-up">
        <div class="hero-portrait-wrap">
          <div class="hero-portrait-glow"></div>
          <img src="111.png" alt="Hirusha Jayasundara" class="hero-portrait" />
          <div class="hero-badge">
            <span class="badge-dot"></span> Available for opportunities
          </div>
        </div>
      </div>
    </div>
  </div>'''

html_pattern = re.compile(r'<div class="hero-wrapper container">.*?</div>\s*</div>\s*</section>', re.DOTALL)
content = html_pattern.sub(html_new + '\n</section>', content)

responsive_old = r'''  @media \(max-width: 900px\) \{
    \.hero-3col \{
      grid-template-columns: 1fr;
      text-align: center;
    \}
    \.hero-left, \.hero-right \{
      align-items: center;
    \}
    \.hero-desc \{ max-width: 100%; \}
    \.hero-portrait-wrap \{ width: clamp\(200px, 60vw, 280px\); margin: 0 auto; \}
  \}'''

responsive_new = '''  @media (max-width: 900px) {
    .hero-2col {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 3rem;
    }
    .hero-content {
      align-items: center;
    }
    .hero-desc { max-width: 100%; }
    .hero-visual { justify-content: center; order: -1; } /* Image on top */
    .hero-portrait-wrap { width: clamp(240px, 70vw, 320px); margin: 0 auto; }
  }'''

content = re.sub(responsive_old, responsive_new, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated successfully')
