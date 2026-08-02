import { NextResponse } from 'next/server';
import { projectsData } from '../../data/projects';

export async function GET() {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Version | Agnel Francis</title>
  <style>
    body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem; color: #333; background: #fff; }
    a { color: #0066cc; text-decoration: underline; }
    .project { margin-bottom: 2rem; padding: 1rem; border: 1px solid #ddd; border-radius: 4px; }
    h1, h2, h3 { color: #111; }
  </style>
</head>
<body>
  <header style="margin-bottom: 2rem; border-bottom: 1px solid #ccc; padding-bottom: 1rem;">
    <h1>Agnel Francis</h1>
    <p>CS & Cybersecurity Student | CEO at FramePixel</p>
    <p>
      <a href="/">← Back to full site</a>
      <span style="margin: 0 10px;">|</span>
      <a href="/resume/resume.pdf" download="Agnel_Francis_Resume.pdf">📄 Download Resume</a>
    </p>
  </header>

  <section style="margin-bottom: 2rem;">
    <h2>About Me</h2>
    <p>I build digital solutions ranging from full-stack web applications to web-based games.</p>
    <p>Email: <a href="mailto:hello@agnelfrancis.com">hello@agnelfrancis.com</a></p>
  </section>

  <section style="margin-bottom: 2rem;">
    <h2>Projects</h2>
    ${projectsData.map(p => `
      <div class="project">
        <h3 style="margin: 0 0 0.5rem 0">${p.title}</h3>
        <p style="margin: 0 0 0.5rem 0">${p.description}</p>
        ${p.links && p.links.length > 0 ? p.links.map(l => `<a href="${l.url}" style="margin-right: 1rem;" target="_blank" rel="noopener noreferrer">[ ${l.label} ]</a>`).join('') : ''}
      </div>
    `).join('')}
  </section>
  
  <footer style="border-top: 1px solid #ccc; padding-top: 1rem; font-size: 0.9rem; color: #666;">
    <p>&copy; ${new Date().getFullYear()} Agnel Francis Olakkengil.</p>
  </footer>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
