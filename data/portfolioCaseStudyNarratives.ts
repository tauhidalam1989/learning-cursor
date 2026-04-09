import type { PortfolioCaseNarrative, Project } from '@/types/portfolio';

/**
 * Long-form narrative per portfolio slug. Drives challenge / solution / results on inner pages.
 * Add a row here when you add a project with a public `/portfolio/[slug]` page.
 */
const NARRATIVES: Record<string, PortfolioCaseNarrative> = {
  'ai-contract-intelligence-platform': {
    challenge:
      'A legal tech startup was drowning in contract review: thousands of documents per day, eight hours of manual work per file, and inconsistent risk flagging across reviewers.',
    solution:
      'We designed an end-to-end RAG pipeline with GPT-4, Pinecone for vector retrieval, and a Next.js operations dashboard. Legal teams upload contracts, get clause extraction, risk scoring, and plain-language summaries in seconds — with full audit trails.',
    results:
      'The platform eliminated 92% of manual review time, scaled past 10k documents per month, and reached production in eight weeks with a measurable drop in operational cost.',
    datePublished: '2024-09-12',
  },
  'saas-analytics-platform': {
    challenge:
      'The founding team had validated demand but no production platform: they needed multi-tenant SaaS, usage-based billing, and embedded AI insights before their next funding round.',
    solution:
      'We architected multi-tenancy with strict data isolation, Stripe billing with metering, custom analytics dashboards, and an AI layer for automated insight summaries — plus a self-serve onboarding flow tuned for conversion.',
    results:
      'The product launched in fourteen weeks, passed 200+ enterprise accounts, and reached $1M ARR within nine months with a onboarding flow converting at 42%.',
    datePublished: '2024-04-18',
  },
  'enterprise-internal-ops-platform': {
    challenge:
      'A 500-person firm was spending $240k annually on three disconnected SaaS tools for projects, resources, and client reporting — with no SSO, duplicated data, and poor reporting for leadership.',
    solution:
      'We replaced all three with a unified internal platform: SSO, RBAC, project and resource management, client reporting, and audit logging — built for their exact workflows instead of generic SaaS boxes.',
    results:
      'Delivery in ten weeks, $240k/year in eliminated subscriptions, 500 daily active users, and leadership dashboards that finally matched how the business actually runs.',
    datePublished: '2024-11-03',
  },
  'ai-customer-support-agent': {
    challenge:
      'An eCommerce brand could not hire fast enough to handle 5,000+ monthly tickets; first-response time was slipping and repeat issues burned agent morale.',
    solution:
      'We shipped an LLM support agent with RAG over product and policy docs, order lookup integrations, and explicit escalation rules when confidence or sentiment thresholds were hit.',
    results:
      'Roughly 80% of tickets resolve without human handoff, volume scaled without proportional headcount, and the system went live in six weeks.',
    datePublished: '2025-01-22',
  },
  'hipaa-telehealth-platform': {
    challenge:
      'A healthcare provider needed a modern patient experience — booking, records, video visits, and prescriptions — without compromising HIPAA or slowing clinical staff.',
    solution:
      'We built a full-stack telehealth platform with encrypted records, WebRTC consultations, prescription flows, and an optional AI symptom pre-screen to route urgency — all reviewed against HIPAA patterns from day one.',
    results:
      'Twelve thousand active patients, HIPAA-aligned architecture, and a sixteen-week path from kickoff to controlled launch.',
    datePublished: '2024-07-08',
  },
  'ai-personal-finance-app': {
    challenge:
      'The product vision was a consumer finance app that felt trustworthy: bank-grade security, clear AI guidance, and fast onboarding in a crowded app store.',
    solution:
      'We delivered a cross-platform app with biometric auth, Plaid integration, an ML layer for spend categorisation, and an AI coach that explains recommendations in plain language.',
    results:
      '85k downloads in the first month, 4.8★ store rating, and an eighteen-week build including security review iterations.',
    datePublished: '2024-12-01',
  },
  'ai-recruitment-intelligence': {
    challenge:
      'An HR tech company had to screen thousands of CVs weekly; recruiters were bottlenecked and shortlists varied by individual judgment.',
    solution:
      'We implemented CV parsing, scoring, skills-gap detection, interview question generation, and a ranked shortlist dashboard — with human-in-the-loop review for final decisions.',
    results:
      '70% faster shortlisting, 2k+ CVs processed per week, and an eight-week delivery including model evaluation and bias review checkpoints.',
    datePublished: '2024-05-14',
  },
  'adaptive-learning-platform': {
    challenge:
      'An EdTech team wanted to move beyond static courses: learners needed adaptive difficulty, instant help, and practice that matched each student’s gaps.',
    solution:
      'We built an adaptive engine with an AI tutor for Q&A, dynamic difficulty, and generated practice sets tied to curriculum objectives — on Next.js and Supabase for real-time progress.',
    results:
      '34% measured grade improvement cohort-wide, 8k active students, and a twenty-week build from architecture to classroom pilot.',
    datePublished: '2024-08-20',
  },
  'ai-route-optimisation-saas': {
    challenge:
      'Fleet operators needed more than maps: they wanted fuel savings, reliable ETAs, and a mobile experience drivers would actually use.',
    solution:
      'We shipped a logistics SaaS stack — traffic-aware route ML, dispatcher dashboards, a driver app, and predictive maintenance signals from telemetry — on PostgreSQL and AWS.',
    results:
      '28% average fuel cost reduction reported by operators, 300+ fleets onboarded, and a twenty-four-week full-platform delivery.',
    datePublished: '2024-10-05',
  },
  'proptech-ai-valuation-engine': {
    challenge:
      'Estate agencies needed fast, defensible valuations at scale — not spreadsheets and guesswork — to qualify leads and win instructions.',
    solution:
      'We trained and deployed an ML valuation model on 2M+ comparable sales, exposed it through a real-time API, and wrapped it in a lead-gen SaaS layer for agent workflows — with Next.js for the product surface.',
    results:
      '50k+ properties valued, 94% accuracy against hold-out benchmarks, and twenty-two weeks from data pipeline to production API.',
    datePublished: '2024-06-30',
  },
};

export function getPortfolioCaseNarrative(slug: string, project: Project): PortfolioCaseNarrative {
  const explicit = NARRATIVES[slug];
  if (explicit) return explicit;

  const extended = project as Project & { fullDescription?: string };
  const body: string =
    typeof extended.fullDescription === 'string' && extended.fullDescription.trim() !== ''
      ? extended.fullDescription
      : project.description;

  return {
    challenge: `Teams in ${project.industry} needed a product that could scale reliably while staying secure and maintainable — without pausing the rest of the roadmap.`,
    solution:
      body.trim() !== ''
        ? body
        : 'We partnered with the client from discovery through launch, aligning architecture with their constraints and shipping iteratively with weekly demos.',
    results:
      project.metrics.length > 0
        ? `Outcomes included ${project.metrics.map((m) => `${m.value} (${m.label})`).join(', ')}.`
        : 'We delivered production software on schedule with clear handover documentation and monitoring.',
    datePublished: '2024-06-01',
  };
}
