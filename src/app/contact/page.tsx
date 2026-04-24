"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setResult("Sending...");
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_W3FORMS_KEY as string);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setResult("Message sent successfully! I'll get back to you soon.");
        (e.target as HTMLFormElement).reset();
        
        // Reset status after a few seconds
        setTimeout(() => {
            setStatus("idle");
            setResult("");
        }, 5000);
      } else {
        setStatus("error");
        setResult(data.message);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setResult("Something went wrong! Please check your connection and try again.");
    }
  };

  return (
    <main className="page-container">
      <div className="contact-layout">
        
        <div className="contact-info">
          <div className="abstract-shape abstract-circle playful-shape-1"></div>
          <div className="abstract-shape abstract-square playful-shape-2"></div>
          
          <h1 className="page-title">Say Hello!</h1>
          <p className="contact-subtitle">
            Got an idea, a project, or just want to chat? I'm currently available for new opportunities. Drop me a line and let's build something amazing together.
          </p>
          <div className="contact-details">
            <a href="mailto:agnelfrancis2007@hotmail.com" className="email-link">agnelfrancis2007@hotmail.com</a>
          </div>
        </div>

        <div className="contact-box">
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Web3Forms required hidden fields */}
            <input type="hidden" name="subject" value="New Message from Portfolio" />
            <input type="hidden" name="from_name" value="Portfolio Contact Form" />
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell me about your project..." required></textarea>
            </div>
            
            <button 
                type="submit" 
                className="btn-primary form-submit wave-btn"
                disabled={status === "loading" || status === "success"}
                style={{ 
                    opacity: (status === "loading" || status === "success") ? 0.7 : 1,
                    cursor: (status === "loading" || status === "success") ? "default" : "pointer",
                    backgroundColor: status === "success" ? "var(--accent-blue)" : undefined,
                    color: status === "success" ? "var(--text-main)" : undefined
                }}
            >
              <span>{status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send Message"}</span>
              <span className="wave-emoji">{status === "success" ? "✅" : "🚀"}</span>
            </button>

            {result && (
              <p style={{ 
                marginTop: "1.5rem", 
                textAlign: "center", 
                fontFamily: "Aise, sans-serif",
                color: status === "error" ? "var(--accent-primary)" : "var(--text-muted)",
                fontWeight: status === "error" ? "bold" : "normal"
              }}>
                {result}
              </p>
            )}
          </form>
        </div>

      </div>
    </main>
  );
}
