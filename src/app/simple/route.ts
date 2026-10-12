import { NextResponse } from 'next/server';
import { projectsData } from '../../data/projects';
import { getAllPosts } from '../../lib/blog';

export async function GET() {
  const posts = getAllPosts();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agnel Francis | Minimal / Text Version</title>
  <meta name="description" content="Minimal, text-first portfolio and resume for Agnel Francis Olakkengil. Full-stack developer, cybersecurity student, and CEO of FramePixel.">
  <style>
    :root {
      --bg: #ffffff;
      --text: #222222;
      --muted: #666666;
      --link: #0066cc;
      --border: #e2e2e2;
      --card-bg: #fafafa;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #121214;
        --text: #ececec;
        --muted: #999999;
        --link: #66aaff;
        --border: #2c2c32;
        --card-bg: #1a1a1f;
      }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.65;
      max-width: 820px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem;
      color: var(--text);
      background: var(--bg);
    }
    a { color: var(--link); text-decoration: underline; text-underline-offset: 3px; }
    h1, h2, h3 { color: var(--text); line-height: 1.25; }
    h1 { font-size: 2.2rem; margin-bottom: 0.25rem; }
    h2 { font-size: 1.4rem; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }
    h3 { font-size: 1.15rem; margin: 0 0 0.4rem 0; }
    p { margin: 0 0 1rem 0; }
    .card {
      margin-bottom: 1.5rem;
      padding: 1.25rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--card-bg);
    }
    .meta { font-size: 0.88rem; color: var(--muted); margin-bottom: 0.5rem; }
    .tag {
      display: inline-block;
      font-size: 0.75rem;
      padding: 2px 8px;
      border: 1px solid var(--border);
      border-radius: 4px;
      margin-right: 0.4rem;
      margin-bottom: 0.4rem;
      color: var(--muted);
    }
    ul { padding-left: 1.25rem; margin-bottom: 1.5rem; }
    li { margin-bottom: 0.6rem; }
    .nav-bar {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.95rem;
    }
  </style>
</head>
<body>
  <header style="margin-bottom: 2.5rem; border-bottom: 1px solid var(--border); padding-bottom: 1.5rem;">
    <h1>Agnel Francis Olakkengil</h1>
    <p style="font-size: 1.15rem; color: var(--muted); margin-bottom: 0.75rem;">
      Full-Stack Developer • Cybersecurity Student • CEO & Founder at <strong>FramePixel</strong>
    </p>
    <p>
      📍 Thrissur, Kerala, India &nbsp;|&nbsp;
      ✉️ <a href="mailto:agnelfrancis2007@hotmail.com">agnelfrancis2007@hotmail.com</a>
    </p>
    <nav class="nav-bar">
      <a href="/">← Full Portfolio</a>
      <a href="/work">Work</a>
      <a href="/about">About</a>
      <a href="/blog">Blog</a>

      <a href="/resume/resume.pdf" download="Agnel_Francis_Resume.pdf">📄 Resume (PDF)</a>
      <a href="/links">All Links</a>
    </nav>
  </header>

  <section>
    <h2>About</h2>
    <p>
      I am a developer and designer passionate about building scalable digital solutions, interactive web-based games, and privacy-conscious software that blend clean aesthetics with thoughtful logic.
    </p>
    <p>
      As the <strong>CEO of FramePixel</strong>, I direct custom web solutions, internal developer utilities, and web-based party/puzzle games designed to deliver memorable, high-engagement user experiences.
    </p>
  </section>

  <section>
    <h2>Education & Background</h2>
    <ul>
      <li>
        <strong>Jyothi Engineering College (Autonomous), Cheruthuruthy</strong> (2025 – 2029)<br>
        <span class="meta">B.Tech in Computer Science and Engineering (Cyber Security)</span>
      </li>
      <li>
        <strong>Sarvodayam VHSS, Aryampadam</strong> (2023 – 2025)<br>
        <span class="meta">Junior Software Developer Vocational Course</span>
      </li>
      <li>
        <strong>Govt RSRV HSS, Velur</strong> (2017 – 2023)<br>
        <span class="meta">High School Education</span>
      </li>
    </ul>
  </section>

  <section>
    <h2>Core Projects (${projectsData.length})</h2>
    ${projectsData.map(p => `
      <div class="card">
        <h3>${p.title}</h3>
        <p class="meta">${p.category || 'Development'}</p>
        <p>${p.description}</p>
        ${p.tags && p.tags.length > 0 ? `
          <div style="margin-bottom: 0.75rem;">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        ` : ''}
        ${p.links && p.links.length > 0 ? p.links.map(l => 
          l.type === 'download' 
            ? `<a href="${l.url}" download="${l.fileName || 'AerisIQ-release.apk'}" onclick="return confirm('Download Agreement: This is an independent Android APK for personal evaluation. Installing requires allowing unknown sources on your Android device. Do you agree to the terms?');" style="margin-right: 1.25rem;">${l.label} (APK) ↓</a>`
            : `<a href="${l.url}" style="margin-right: 1.25rem;" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>`
        ).join('') : ''}
      </div>
    `).join('')}
  </section>

  <section>
    <h2>Articles & Blog Posts (${posts.length})</h2>
    ${posts.map(post => `
      <div class="card">
        <h3><a href="/blog/${post.slug}">${post.title}</a></h3>
        <p class="meta">Published: ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>${post.excerpt}</p>
        ${post.tags && post.tags.length > 0 ? `
          <div>
            ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `).join('')}
  </section>

  <footer style="margin-top: 3rem; border-top: 1px solid var(--border); padding-top: 1.5rem; font-size: 0.9rem; color: var(--muted);">
    <p>&copy; ${new Date().getFullYear()} Agnel Francis Olakkengil. Built with Next.js.</p>
    <p>Contact: <a href="mailto:agnelfrancis2007@hotmail.com">agnelfrancis2007@hotmail.com</a></p>
  </footer>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}

