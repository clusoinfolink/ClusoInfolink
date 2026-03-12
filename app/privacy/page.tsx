import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Cluso Infolink',
  description: 'Cluso Infolink privacy policy. Learn how we handle and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-cluso-deep">
          <p className="text-gray-600 mb-6">
            Last updated: January 1, 2023
          </p>

          <h2>1. Introduction</h2>
          <p>
            Cluso Infolink (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting
            your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website or use our services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways, including:</p>
          <ul>
            <li><strong>Personal Data:</strong> Name, email address, phone number, and other contact details you voluntarily provide through our contact forms.</li>
            <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, pages visited, and time spent on pages.</li>
            <li><strong>Verification Data:</strong> Information provided for background verification purposes, processed solely as per service agreements.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our background verification services</li>
            <li>Process and respond to your inquiries</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations and regulatory requirements</li>
            <li>Protect against fraudulent or unauthorized activity</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect
            your personal information. This includes encryption, access controls, and regular
            security assessments. However, no electronic transmission over the Internet can
            be guaranteed to be 100% secure.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes
            for which it was collected, or as required by applicable laws and regulations.
          </p>

          <h2>6. Third-Party Sharing</h2>
          <p>
            We do not sell your personal data. We may share information with trusted third-party
            service providers who assist us in operating our website and conducting our business,
            subject to strict confidentiality agreements.
          </p>

          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (subject to legal obligations)</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>

          <h2>8. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:{' '}
            <a href="mailto:indiaops@cluso.com">indiaops@cluso.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
