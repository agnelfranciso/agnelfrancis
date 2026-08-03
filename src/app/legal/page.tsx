import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal, Disclaimer & Privacy Policy | Agnel Francis",
  description: "Comprehensive legal policies, terms and conditions, and disclaimers for Agnel Francis Olakkengil's portfolio and projects.",
};

export default function LegalPage() {
  const headerStyle = {
    fontFamily: "'PPSupplySans', sans-serif",
    fontWeight: "normal",
    color: "var(--text-main)",
  };

  return (
    <main className="page-container" style={{ padding: "4rem 10vw" }}>
      <div className="about-text" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ ...headerStyle, fontSize: "2.8rem", marginBottom: "3rem" }}>Legal, Disclaimer & Privacy</h1>
        
        <p className="about-description" style={{ fontStyle: "italic", marginBottom: "4rem" }}>
          Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} <br />
          Please read this document carefully before using this website or engaging with any of the projects, source code, or media listed within. By continuing to use this website, you signify your legally binding acceptance of these terms.
        </p>

        <section style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ ...headerStyle, fontSize: "1.6rem", marginBottom: "1.2rem" }}>1. Website Purpose & Representation</h2>
          <p className="about-description">
            This website ("the Website") operates strictly as a personal and professional portfolio for <strong>Agnel Francis Olakkengil</strong>. The sole purpose of this site is to showcase my skills, document my professional experience, and provide a comprehensive public directory of the software, design, and digital projects I have authored or contributed to.
          </p>
          <p className="about-description">
            All statements regarding project capabilities, usage statistics, development timelines, and my personal qualifications are true, accurate, and stated in good faith to the best of my knowledge at the time of publication. However, the rapidly changing nature of software means information may become outdated without notice.
          </p>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ ...headerStyle, fontSize: "1.6rem", marginBottom: "1.2rem" }}>2. Software Licensing & Project Usage</h2>
          <p className="about-description">
            The digital assets and projects listed on this Website fall into two distinct legal categories, and you must strictly adhere to the terms governing each:
          </p>
          <ul style={{ marginTop: "1.5rem", marginBottom: "1.5rem", listStyleType: "disc", paddingLeft: "2rem", color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "1.6" }}>
            <li style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--text-main)", fontFamily: "'PPSupplySans', sans-serif", fontWeight: "normal", fontSize: "1.2rem" }}>Open-Source Projects:</strong> Projects explicitly marked as open-source or linked to a public source code repository (e.g., GitHub) without a proprietary license are free to use. You are legally permitted to view, fork, modify, and distribute the source code of these projects, strictly on the condition that <strong>full attribution is provided to Agnel Francis Olakkengil</strong> as the original author.
            </li>
            <li>
              <strong style={{ color: "var(--text-main)", fontFamily: "'PPSupplySans', sans-serif", fontWeight: "normal", fontSize: "1.2rem" }}>Proprietary & Closed-Source Projects:</strong> Projects that are not explicitly open-sourced (including but not limited to specific FramePixel applications, client work, or commercial software) are strictly proprietary. You are expressly forbidden from reverse-engineering, decompiling, copying, manipulating, or reproducing these projects in any form without prior written authorization.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ ...headerStyle, fontSize: "1.6rem", marginBottom: "1.2rem" }}>3. "As-Is" Warranty & Limitation of Liability</h2>
          <p className="about-description" style={{ textTransform: "uppercase", fontSize: "1rem", lineHeight: "1.8" }}>
            All open-source software, code snippets, and projects provided or linked on this website are provided strictly "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. 
          </p>
          <p className="about-description" style={{ textTransform: "uppercase", fontSize: "1rem", lineHeight: "1.8" }}>
            In no event shall Agnel Francis Olakkengil be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software, projects, or the use or other dealings in the software or projects.
          </p>
          <p className="about-description">
            By downloading, modifying, or deploying any of my code, you agree to assume total legal responsibility and risk for its use.
          </p>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ ...headerStyle, fontSize: "1.6rem", marginBottom: "1.2rem" }}>4. Indemnification</h2>
          <p className="about-description">
            You agree to defend, indemnify, and hold harmless Agnel Francis Olakkengil from and against any claims, actions or demands, liabilities, and settlements including without limitation, reasonable legal and accounting fees, resulting from, or alleged to result from, your violation of these Terms and Conditions or your unauthorized implementation of my software.
          </p>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ ...headerStyle, fontSize: "1.6rem", marginBottom: "1.2rem" }}>5. Identity, Branding & Intellectual Property</h2>
          <p className="about-description">
            This Website, its underlying source code, design layout, UI/UX elements, typography, original text, and graphical assets are the exclusive intellectual property of Agnel Francis Olakkengil.
          </p>
          <p className="about-description">
            You are <strong>strictly prohibited</strong> from cloning, scraping, or stealing the design of this portfolio for your own use. Furthermore, impersonating my identity, mimicking the <strong>FramePixel</strong> brand, or misrepresenting my projects as your own constitutes intellectual property theft and fraud. Such actions will be met with immediate legal action, including but not limited to DMCA takedown notices sent to your hosting provider.
          </p>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ ...headerStyle, fontSize: "1.6rem", marginBottom: "1.2rem" }}>6. Privacy Policy & Data Collection</h2>
          <p className="about-description">
            I respect your privacy and believe in a transparent, non-invasive digital ecosystem.
          </p>
          <ul style={{ marginTop: "1.5rem", marginBottom: "1.5rem", listStyleType: "disc", paddingLeft: "2rem", color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "1.6" }}>
            <li style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--text-main)", fontFamily: "'PPSupplySans', sans-serif", fontWeight: "normal", fontSize: "1.2rem" }}>No Invasive Tracking:</strong> This Website does not employ aggressive third-party trackers, retargeting pixels, or cross-site advertising cookies.
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong style={{ color: "var(--text-main)", fontFamily: "'PPSupplySans', sans-serif", fontWeight: "normal", fontSize: "1.2rem" }}>Information Collection:</strong> If you contact me via email or any provided contact forms, I will collect only the information you voluntarily provide (e.g., name, email address, message contents).
            </li>
            <li>
              <strong style={{ color: "var(--text-main)", fontFamily: "'PPSupplySans', sans-serif", fontWeight: "normal", fontSize: "1.2rem" }}>Data Usage & Protection:</strong> Your contact information will be kept strictly confidential and will only be used to respond to your professional inquiries. I will never sell, rent, or distribute your personal data to third parties under any circumstances.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ ...headerStyle, fontSize: "1.6rem", marginBottom: "1.2rem" }}>7. External Links & Third-Party Content</h2>
          <p className="about-description">
            This Website may contain links to external websites, public repositories, or services that are not operated by me. I have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services. Accessing external links is done entirely at your own risk.
          </p>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ ...headerStyle, fontSize: "1.6rem", marginBottom: "1.2rem" }}>8. Modifications to Legal Terms</h2>
          <p className="about-description">
            I reserve the right, at my sole discretion, to modify or replace these legal terms and disclaimers at any time without prior notice. By continuing to access or use the Website after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ ...headerStyle, fontSize: "1.6rem", marginBottom: "1.2rem" }}>9. Copyright Notice</h2>
          <p className="about-description">
            <strong>&copy; {new Date().getFullYear()} Agnel Francis Olakkengil. All rights reserved.</strong>
          </p>
          <p className="about-description">
            Unauthorized use and/or duplication of the proprietary material on this Website without express and written permission from Agnel Francis Olakkengil is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to Agnel Francis Olakkengil with appropriate and specific direction to the original content.
          </p>
        </section>
      </div>
    </main>
  );
}
