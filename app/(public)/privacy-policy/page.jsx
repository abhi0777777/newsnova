export const metadata = {
  title: "Privacy Policy | NewsNova",
  description: "Read NewsNova's Privacy Policy to understand how we collect, use and protect your personal data. Your privacy is our priority — transparent, simple and trustworthy.",
  openGraph: {
    title: "Privacy Policy | NewsNova",
    description: "NewsNova ki privacy policy.",
    url: "https://newsnova.online/privacy-policy",
    siteName: "NewsNova",
  },
};
export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      body: "We collect minimal information. When you use NewsNova, we may collect standard server logs (IP address, browser type, pages visited) to maintain and improve the service. We do not require account registration to read our content.",
    },
    {
      title: "How We Use Your Information",
      body: "Server logs are used solely for security, debugging, and understanding aggregate traffic patterns. We do not sell, rent, or share your data with third parties for marketing purposes.",
    },
    {
      title: "Cookies",
      body: "NewsNova uses minimal cookies — only those necessary for the site to function (e.g., session management for admin). We do not use advertising or tracking cookies.",
    },
    {
      title: "Third-Party Services",
      body: "Images are hosted on ImgBB or Cloudinary. When you load a page with embedded images, your browser may send requests to those servers. Please review their respective privacy policies.",
    },
    {
      title: "Data Retention",
      body: "Server logs are retained for up to 30 days and then automatically deleted. Contact form submissions are retained only as long as necessary to respond to your query.",
    },
    {
      title: "Your Rights",
      body: "You may request access to or deletion of any personal data we hold about you by contacting us via our Contact page. We will respond within 30 days.",
    },
    {
      title: "Changes to This Policy",
      body: "We may update this privacy policy from time to time. The date of the latest revision will always be shown at the top of this page.",
    },
  ];

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1.25rem 5rem" }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
        Legal
      </span>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.25rem", fontWeight: 700, margin: "0.5rem 0 0.25rem" }}>
        Privacy Policy
      </h1>
      <p style={{ fontSize: "0.8rem", fontFamily: "'DM Mono', monospace", color: "var(--ink-muted)", marginBottom: "2rem" }}>
        Last updated: January 1, 2025
      </p>
      <hr className="divider-rule" />
      <div className="post-content" style={{ marginTop: "1.5rem" }}>
        <p>
          At NewsNova, we respect your privacy. This policy explains what data we
          collect, why, and how we protect it.
        </p>
        {sections.map((s) => (
          <div key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </div>
        ))}
        <p>
          Questions? <a href="/contact">Contact us</a>.
        </p>
      </div>
    </div>
  );
}
