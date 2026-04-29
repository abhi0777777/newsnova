export const metadata = { title: "Terms & Conditions" };

export default function TermsConditions() {
  const sections = [
    {
      title: "Acceptance of Terms",
      body: "By accessing or using NewsNova (newsnova.online), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our site.",
    },
    {
      title: "Intellectual Property",
      body: "All content published on NewsNova — including articles, images, and design — is the property of NewsNova or its respective creators. You may not reproduce, distribute, or republish our content without prior written permission.",
    },
    {
      title: "User Conduct",
      body: "You agree to use NewsNova only for lawful purposes. You must not attempt to gain unauthorized access to any part of the site, disrupt its operation, or use it to distribute malware or harmful content.",
    },
    {
      title: "Accuracy of Information",
      body: "We strive to publish accurate and up-to-date information, but we make no warranties as to its completeness or accuracy. NewsNova is not responsible for decisions made based on our content.",
    },
    {
      title: "Third-Party Links",
      body: "Our articles may link to third-party websites. We have no control over their content and accept no responsibility for their practices. Visiting external links is at your own risk.",
    },
    {
      title: "Limitation of Liability",
      body: "NewsNova is provided 'as is' without any warranty. To the maximum extent permitted by law, we are not liable for any damages arising from your use of the site.",
    },
    {
      title: "Changes to Terms",
      body: "We reserve the right to update these terms at any time. Continued use of the site after any changes constitutes acceptance of the new terms.",
    },
    {
      title: "Governing Law",
      body: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.",
    },
  ];

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1.25rem 5rem" }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
        Legal
      </span>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.25rem", fontWeight: 700, margin: "0.5rem 0 0.25rem" }}>
        Terms & Conditions
      </h1>
      <p style={{ fontSize: "0.8rem", fontFamily: "'DM Mono', monospace", color: "var(--ink-muted)", marginBottom: "2rem" }}>
        Last updated: January 1, 2025
      </p>
      <hr className="divider-rule" />
      <div className="post-content" style={{ marginTop: "1.5rem" }}>
        <p>
          Please read these terms carefully before using NewsNova.
        </p>
        {sections.map((s) => (
          <div key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </div>
        ))}
        <p>
          Have questions? <a href="/contact">Contact us</a>.
        </p>
      </div>
    </div>
  );
}
