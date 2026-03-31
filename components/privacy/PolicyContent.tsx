import Link from 'next/link';
import { siteConfig } from '@/config/site';
import {
  POLICY_SECTIONS,
  PURPOSE_ROWS,
  RETENTION_ROWS,
  COOKIE_ROWS,
  USER_RIGHTS,
} from '@/data/privacyData';

export function PolicyContent() {
  return (
    <div className="max-w-[720px]">
      {POLICY_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="policy-section scroll-mt-[90px] mb-14"
        >
          <div className="mb-6 flex items-start gap-4 border-b border-corematrix-border pb-5">
            <span className="mt-0.5 w-7 flex-shrink-0 font-mono text-sm font-medium text-corematrix-green700">
              {section.num}
            </span>
            <h2 className="font-display text-[1.3rem] font-extrabold leading-snug tracking-tight text-corematrix-textPrimary">
              {section.title}
            </h2>
          </div>

          {section.id === 's1' && <Section1Content />}
          {section.id === 's2' && <Section2Content />}
          {section.id === 's3' && <Section3Content />}
          {section.id === 's4' && <Section4Content />}
          {section.id === 's5' && <Section5Content />}
          {section.id === 's6' && <Section6Content />}
          {section.id === 's7' && <Section7Content />}
          {section.id === 's8' && <Section8Content />}
          {section.id === 's9' && <Section9Content />}
          {section.id === 's10' && <Section10Content />}
          {section.id === 's11' && <Section11Content />}
          {section.id === 's12' && <Section12Content />}
          {section.id === 's13' && <Section13Content />}
        </section>
      ))}

      <div className="mt-12 flex items-center gap-2 rounded-lg border border-corematrix-green700/15 bg-corematrix-green900/[0.04] px-4 py-3 font-mono text-xs text-corematrix-textMuted">
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-corematrix-green400" />
        This policy was last updated on{' '}
        <strong className="mx-1 text-corematrix-green400">20 March 2026</strong>
        and is effective immediately.
      </div>
    </div>
  );
}

function Section1Content() {
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted last:mb-0">
        Corematrix is an AI-first IT services and consulting company. We act as data
        controller for website visitors, marketing, and business development. When we
        deliver services to clients, we act as a data processor under their instructions.
      </p>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted last:mb-0">
        If you have questions about how we handle your data, contact us at{' '}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-corematrix-green400 transition-colors hover:underline"
        >
          {siteConfig.email}
        </a>{' '}
        before using our services.
      </p>
    </>
  );
}

function Section2Content() {
  return (
    <>
      <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold text-corematrix-textSecondary">
        <span className="h-[1em] w-[3px] flex-shrink-0 rounded-sm bg-corematrix-green700" />
        Data you provide directly
      </h3>
      <ul className="mb-4 list-none space-y-2 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {[
          'Contact form submissions (name, email, phone, company, message)',
          'Job applications (CV, cover letter, portfolio links)',
          'Newsletter sign-ups (email, first name)',
          'Project enquiry and discovery call details',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 before:mt-2 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-corematrix-green700 before:content-['']">
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold text-corematrix-textSecondary">
        <span className="h-[1em] w-[3px] flex-shrink-0 rounded-sm bg-corematrix-green700" />
        Data collected automatically
      </h3>
      <ul className="mb-4 list-none space-y-2 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {[
          'IP address (anonymised where possible)',
          'Browser type and device info',
          'Pages visited and time on site',
          'Referrer URL',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 before:mt-2 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-corematrix-green700 before:content-['']">
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold text-corematrix-textSecondary">
        <span className="h-[1em] w-[3px] flex-shrink-0 rounded-sm bg-corematrix-green700" />
        Data from third parties
      </h3>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        We may receive limited contact data from partners or referrals when you have
        consented to that sharing. We do not buy or trade contact lists.
      </p>

      <div className="my-5 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-900/[0.08] p-4">
        <span className="mt-0.5 shrink-0 text-base" aria-hidden>⚠️</span>
        <div className="text-sm font-light leading-relaxed text-corematrix-textMuted">
          <strong className="text-corematrix-textSecondary">What we never collect:</strong>{' '}
          Sensitive categories (health, ethnicity, political views), precise geolocation,
          or data obtained through dark patterns. We do not engage in cross-site tracking.
        </div>
      </div>
    </>
  );
}

function Section3Content() {
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        We use your data only for the purposes below. Each purpose has a clear legal basis
        under GDPR.
      </p>
      <div className="my-5 overflow-x-auto">
        <table className="my-5 w-full border-collapse border border-corematrix-border overflow-hidden rounded-xl text-sm">
          <caption className="sr-only">Data processing purposes and legal bases</caption>
          <thead className="bg-corematrix-card2">
            <tr>
              <th className="border-b border-corematrix-border px-4 py-3 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                Purpose
              </th>
              <th className="border-b border-corematrix-border px-4 py-3 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                Data Used
              </th>
              <th className="border-b border-corematrix-border px-4 py-3 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                Legal Basis
              </th>
            </tr>
          </thead>
          <tbody>
            {PURPOSE_ROWS.map((row) => (
              <tr key={row.purpose} className="transition-colors hover:bg-corematrix-green900/[0.02]">
                <td className="border-b border-corematrix-border/40 px-4 py-3 align-top font-medium text-corematrix-textSecondary last:border-0">
                  {row.purpose}
                </td>
                <td className="border-b border-corematrix-border/40 px-4 py-3 align-top font-light leading-snug text-corematrix-textMuted last:border-0">
                  {row.dataUsed}
                </td>
                <td className="border-b border-corematrix-border/40 px-4 py-3 align-top font-light leading-snug text-corematrix-textMuted last:border-0">
                  {row.basis}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        We never use your data for automated profiling or automated decisions that
        significantly affect you.
      </p>
    </>
  );
}

function Section4Content() {
  return (
    <>
      <ul className="mb-4 list-none space-y-2 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {[
          'Consent (Art 6(1)(a)) — e.g. newsletter, optional cookies',
          'Contract (Art 6(1)(b)) — processing necessary to perform a contract with you',
          'Legal obligation (Art 6(1)(c)) — e.g. tax, compliance, law enforcement requests',
          'Legitimate interests (Art 6(1)(f)) — e.g. fraud prevention, improving our services, responding to enquiries',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 before:mt-2 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-corematrix-green700 before:content-['']">
            {item}
          </li>
        ))}
      </ul>
      <div className="my-5 rounded-xl border border-corematrix-green700/20 bg-corematrix-green900/[0.05] p-5 text-sm font-light leading-relaxed text-corematrix-textSecondary">
        <strong>Right to Object:</strong> Where we rely on legitimate interests, you may
        object at any time. Contact us at{' '}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-corematrix-green400 transition-colors hover:underline"
        >
          {siteConfig.email}
        </a>{' '}
        to exercise this right.
      </div>
    </>
  );
}

function Section5Content() {
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        <strong className="text-corematrix-textSecondary">
          We do not sell, rent, or trade your personal data — ever.
        </strong>
      </p>

      <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold text-corematrix-textSecondary">
        <span className="h-[1em] w-[3px] flex-shrink-0 rounded-sm bg-corematrix-green700" />
        Service providers
      </h3>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        We share data only with processors who help us operate (e.g. hosting, email,
        analytics). All processors are bound by data processing agreements and handle data
        only as instructed.
      </p>

      <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold text-corematrix-textSecondary">
        <span className="h-[1em] w-[3px] flex-shrink-0 rounded-sm bg-corematrix-green700" />
        Legal requirements
      </h3>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        We may disclose data when required by law, court order, or to protect our rights
        and safety.
      </p>

      <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold text-corematrix-textSecondary">
        <span className="h-[1em] w-[3px] flex-shrink-0 rounded-sm bg-corematrix-green700" />
        Business transfers
      </h3>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        If Corematrix is acquired or merges, your data may transfer to the new entity.
        You will be notified of any material change in ownership.
      </p>

      <div className="my-5 rounded-xl border border-corematrix-green700/20 bg-corematrix-green900/[0.05] p-5 text-sm font-light leading-relaxed text-corematrix-textSecondary">
        <strong>No advertising networks:</strong> We do not use advertising cookies or
        retargeting. Your data is not shared with ad networks.
      </div>
    </>
  );
}

function Section6Content() {
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        We retain data only for as long as necessary. When retention periods expire, data
        is deleted securely or anonymised.
      </p>
      <div className="my-5 overflow-x-auto">
        <table className="my-5 w-full border-collapse border border-corematrix-border overflow-hidden rounded-xl text-sm">
          <caption className="sr-only">Data retention periods and reasons</caption>
          <thead className="bg-corematrix-card2">
            <tr>
              <th className="border-b border-corematrix-border px-4 py-3 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                Data Type
              </th>
              <th className="border-b border-corematrix-border px-4 py-3 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                Retention
              </th>
              <th className="border-b border-corematrix-border px-4 py-3 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {RETENTION_ROWS.map((row) => (
              <tr key={row.dataType} className="transition-colors hover:bg-corematrix-green900/[0.02]">
                <td className="border-b border-corematrix-border/40 px-4 py-3 align-top font-medium text-corematrix-textSecondary last:border-0">
                  {row.dataType}
                </td>
                <td className="border-b border-corematrix-border/40 px-4 py-3 align-top font-light leading-snug text-corematrix-textMuted last:border-0">
                  {row.period}
                </td>
                <td className="border-b border-corematrix-border/40 px-4 py-3 align-top font-light leading-snug text-corematrix-textMuted last:border-0">
                  {row.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Section7Content() {
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        Under GDPR, you have the following rights. Exercise them by emailing{' '}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-corematrix-green400 transition-colors hover:underline"
        >
          {siteConfig.email}
        </a>
        . We respond within 30 days.
      </p>
      <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {USER_RIGHTS.map((right) => (
          <div
            key={right.title}
            className="rounded-xl border border-corematrix-border bg-corematrix-card p-4 transition-colors hover:border-corematrix-border2"
          >
            <span className="mb-2 block text-lg" aria-hidden>
              {right.icon}
            </span>
            <h4 className="font-display text-sm font-bold text-corematrix-textPrimary">
              {right.title}
            </h4>
            <p className="mt-1 text-xs font-light leading-relaxed text-corematrix-textMuted">
              {right.description}
            </p>
          </div>
        ))}
      </div>
      <div className="my-5 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-900/[0.08] p-4">
        <span className="mt-0.5 shrink-0 text-base" aria-hidden>⚠️</span>
        <div className="text-sm font-light leading-relaxed text-corematrix-textMuted">
          There is no fee for exercising your rights. We will not charge you for access,
          rectification, erasure, or portability requests.
        </div>
      </div>
    </>
  );
}

function Section8Content() {
  return (
    <ul className="list-none space-y-2 text-sm font-light leading-[1.8] text-corematrix-textMuted">
      {[
        'TLS 1.2+ for all data in transit',
        'AES-256 encryption at rest',
        'Role-based access controls and MFA for all staff',
        'Regular security reviews and penetration testing',
        'Incident response plan with 72-hour breach notification to regulators where required',
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 before:mt-2 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-corematrix-green700 before:content-['']">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Section9Content() {
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        We use cookies only where necessary. Our cookie banner lets you manage preferences.
        You can also adjust settings in your browser.
      </p>
      <div className="my-5 overflow-x-auto">
        <table className="my-5 w-full border-collapse border border-corematrix-border overflow-hidden rounded-xl text-sm">
          <caption className="sr-only">Cookie categories and consent requirements</caption>
          <thead className="bg-corematrix-card2">
            <tr>
              <th className="border-b border-corematrix-border px-4 py-3 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                Category
              </th>
              <th className="border-b border-corematrix-border px-4 py-3 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                Purpose
              </th>
              <th className="border-b border-corematrix-border px-4 py-3 text-left font-display text-[0.68rem] font-bold uppercase tracking-wider text-corematrix-textPrimary">
                Consent
              </th>
            </tr>
          </thead>
          <tbody>
            {COOKIE_ROWS.map((row) => (
              <tr key={row.category} className="transition-colors hover:bg-corematrix-green900/[0.02]">
                <td className="border-b border-corematrix-border/40 px-4 py-3 align-top font-medium text-corematrix-textSecondary last:border-0">
                  {row.category}
                </td>
                <td className="border-b border-corematrix-border/40 px-4 py-3 align-top font-light leading-snug text-corematrix-textMuted last:border-0">
                  {row.purpose}
                </td>
                <td className="border-b border-corematrix-border/40 px-4 py-3 align-top font-light leading-snug text-corematrix-textMuted last:border-0">
                  {row.consentRequired}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        We do not use advertising or retargeting cookies.
      </p>
    </>
  );
}

function Section10Content() {
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        We may transfer data outside the EEA. When we do, we use appropriate safeguards:
      </p>
      <ul className="mb-4 list-none space-y-2 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        {[
          'Standard Contractual Clauses (SCCs) approved by the European Commission',
          'Adequacy decisions where the destination country is recognised as adequate',
          'Explicit consent where required',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 before:mt-2 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-corematrix-green700 before:content-['']">
            {item}
          </li>
        ))}
      </ul>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        A list of countries where we transfer data is available on request.
      </p>
    </>
  );
}

function Section11Content() {
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        Our services are intended for businesses and professionals aged 18 and over. We do
        not knowingly collect personal data from children under 16.
      </p>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        If you believe we have collected data from a child under 16, contact us immediately
        at{' '}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-corematrix-green400 transition-colors hover:underline"
        >
          {siteConfig.email}
        </a>{' '}
        and we will delete it.
      </p>
    </>
  );
}

function Section12Content() {
  return (
    <ul className="list-none space-y-2 text-sm font-light leading-[1.8] text-corematrix-textMuted">
      {[
        "We update the 'Last Updated' date at the top of this policy",
        'We post a notice on our homepage for 30 days for material changes',
        'Where required by law, we email you about material changes',
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 before:mt-2 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-corematrix-green700 before:content-['']">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Section13Content() {
  return (
    <>
      <p className="mb-4 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        For privacy enquiries, rights requests, or complaints, contact our Data Controller:
      </p>
      <div className="mt-5 rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-6">
        <p className="mb-4 font-display text-[0.62rem] font-bold uppercase tracking-wider text-corematrix-green400">
          DATA CONTROLLER CONTACT
        </p>
        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-3 font-medium text-corematrix-textPrimary">
            <span aria-hidden>🏢</span> Corematrix
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 text-corematrix-textMuted transition-colors hover:text-corematrix-green400"
          >
            <span aria-hidden>📧</span> {siteConfig.email}
          </a>
          <a
            href={siteConfig.phoneTel}
            className="flex items-center gap-3 text-corematrix-textMuted transition-colors hover:text-corematrix-green400"
          >
            <span aria-hidden>📞</span> {siteConfig.phone}
          </a>
        </div>
      </div>
      <p className="mt-5 text-sm font-light leading-[1.8] text-corematrix-textMuted">
        You have the right to lodge a complaint with your supervisory authority. For EU
        residents, find yours at{' '}
        <a
          href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
          target="_blank"
          rel="noopener noreferrer"
          className="text-corematrix-green400 transition-colors hover:underline"
        >
          edpb.europa.eu
          <span className="sr-only"> (opens in new tab)</span>
        </a>
        .
      </p>
    </>
  );
}
