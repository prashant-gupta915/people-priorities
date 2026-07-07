import Link from "next/link";
import {
  SparklesIcon,
  ChartBarIcon,
  MapIcon,
  BoltIcon,
  ShieldCheckIcon,
  UsersIcon,
  CpuChipIcon,
  MagnifyingGlassIcon,
  BellAlertIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CpuChipIcon as BrainIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

// ─── Data ──────────────────────────────────────────────────────────────────

const features = [
  {
    icon: MapIcon,
    title: "Geospatial Heatmaps",
    description:
      "Visualize constituency data on interactive maps. Identify hotspots, trends, and priority zones at a glance.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: ChartBarIcon,
    title: "Real-Time Analytics",
    description:
      "Live dashboards powered by AI deliver instant insights into citizen sentiment, issue categories, and resolution rates.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: BoltIcon,
    title: "Automated Routing",
    description:
      "AI classifies and routes complaints to the correct department automatically — zero manual triaging required.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure & Compliant",
    description:
      "End-to-end encryption, role-based access control, and full audit trails keep your data safe and accountable.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: UsersIcon,
    title: "Citizen Engagement",
    description:
      "Empower residents to report issues, track status, and receive real-time notifications about their submissions.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: CpuChipIcon,
    title: "Predictive AI",
    description:
      "Forecast emerging issues before they escalate using ML models trained on historical constituency patterns.",
    color: "from-indigo-500 to-blue-600",
  },
];

const aiCapabilities = [
  {
    label: "Natural Language Processing",
    desc: "Understands complaint context, urgency, and sentiment from free-text submissions.",
    pct: 94,
  },
  {
    label: "Automated Classification",
    desc: "Routes every report to the correct department with 97% accuracy.",
    pct: 97,
  },
  {
    label: "Sentiment Analysis",
    desc: "Tracks public mood over time and surfaces trends to decision-makers.",
    pct: 91,
  },
  {
    label: "Predictive Forecasting",
    desc: "Anticipates high-volume periods and critical issue spikes up to 14 days in advance.",
    pct: 88,
  },
];

const steps = [
  {
    num: "01",
    title: "Citizen Reports an Issue",
    desc: "Residents submit complaints or feedback through the intuitive multi-step wizard — desktop or mobile.",
  },
  {
    num: "02",
    title: "AI Analyses & Classifies",
    desc: "The AI engine instantly categorises the report, extracts key entities, and assesses urgency.",
  },
  {
    num: "03",
    title: "Smart Routing",
    desc: "The report is automatically assigned to the relevant government department with priority scoring.",
  },
  {
    num: "04",
    title: "Resolution & Feedback",
    desc: "Officials resolve the issue; citizens receive real-time status updates and confirmation.",
  },
];

const stats = [
  { value: "2.4M+", label: "Citizens Served" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "4.2h", label: "Avg. Resolution Time" },
  { value: "500+", label: "Constituencies Active" },
];

// ─── Components ────────────────────────────────────────────────────────────

function LandingNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-[#E5E7EB]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — matches Figma: purple rounded square + bold brand name */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center shadow-sm">
            <SparklesIcon className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-[#111827] tracking-tight">People&apos;s Priorities</div>
            <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest">AI Constituency OS</div>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B7280]">
          <a href="#features" className="hover:text-[#4F46E5] transition-colors">Features</a>
          <a href="#ai" className="hover:text-[#4F46E5] transition-colors">AI Capabilities</a>
          <a href="#how" className="hover:text-[#4F46E5] transition-colors">How It Works</a>
          <a href="#stats" className="hover:text-[#4F46E5] transition-colors">Impact</a>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-[#111827] bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            Open Dashboard
          </Link>
          <Link
            href="/citizen"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] rounded-full hover:opacity-90 transition-opacity shadow-sm"
          >
            Report Complaint
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ── Dashboard Mockup (matches Figma Command Center cards) ───────────────────
function DashboardPreview() {
  const kpis = [
    { label: 'Total Complaints', value: '12,482', trend: '+8.2%', trendUp: true, color: 'text-blue-500' },
    { label: 'High Priority', value: '1,248', trend: '-3.1%', trendUp: false, color: 'text-red-500' },
    { label: 'AI Recs', value: '42', trend: '+15.6%', trendUp: true, color: 'text-emerald-500' },
  ];
  const insights = [
    { dot: 'bg-red-500', text: 'Water supply crisis escalating' },
    { dot: 'bg-amber-400', text: 'Road accident risk — NH-48' },
    { dot: 'bg-emerald-500', text: 'Vaccination coverage +12%' },
  ];
  return (
    <div className="relative w-full max-w-[560px] mx-auto lg:mx-0">
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-[#7C3AED]/10 to-[#4F46E5]/10 rounded-3xl blur-2xl" />
      <div className="relative bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_20px_60px_rgba(0,0,0,0.10)] overflow-hidden">
        {/* Mock header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E7EB] bg-white">
          <span className="text-sm font-semibold text-[#111827]">Command Center</span>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-600">AI Active</span>
          </div>
        </div>

        {/* Welcome banner — matches Figma */}
        <div className="px-5 py-4 bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <div className="text-base font-bold text-[#111827]">Good Morning, Secretary Verma 👋</div>
          <div className="text-xs text-[#6B7280] mt-0.5">Here&apos;s what AI discovered in your constituency today.</div>
          <div className="mt-3 flex gap-4">
            {[{ l: 'New today', v: '83' }, { l: 'Resolution rate', v: '81%' }, { l: 'AI confidence avg', v: '91%' }].map(s => (
              <div key={s.l}>
                <div className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wide">{s.l}</div>
                <div className="text-lg font-bold text-[#111827]">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-3 p-4">
          {kpis.map(k => (
            <div key={k.label} className="bg-white rounded-xl border border-[#E5E7EB] p-3 shadow-sm">
              <div className="text-[9px] font-semibold text-[#6B7280] uppercase tracking-wide">{k.label}</div>
              <div className="text-xl font-bold text-[#111827] mt-1">{k.value}</div>
              <div className={`text-[10px] font-semibold mt-1 ${k.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>{k.trend} vs last month</div>
            </div>
          ))}
        </div>

        {/* Live insights strip */}
        <div className="px-4 pb-4">
          <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-3">
            <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Live Insights</div>
            <div className="space-y-2">
              {insights.map(i => (
                <div key={i.text} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full flex-shrink-0 ${i.dot}`} />
                  <span className="text-xs text-[#111827] font-medium">{i.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F3F4F6', fontFamily: 'Inter, sans-serif' }}>
      <LandingNav />

      {/* ── Hero ─────────────────────────────────────────────
          Layout: Two-column split — text left, dashboard mockup right.
          Background: #F3F4F6 with a radial blue-indigo gradient at the top
          (matching Figma's very subtle top glow on the Command Center).
      ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Figma-exact background: light gray + subtle radial indigo gradient top-center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(79,70,229,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* ── Left Column: Text ── */}
            <div>
              {/* Eyebrow badge — Figma pill style */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] text-xs font-semibold mb-5">
                <SparklesIcon className="h-3.5 w-3.5" />
                AI Constituency Intelligence Platform
              </div>

              {/* Headline — Figma style: very bold, dark, tight tracking */}
              <h1
                className="text-[42px] sm:text-5xl lg:text-[52px] font-extrabold text-[#111827] leading-[1.15] tracking-tight"
              >
                Empowering{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' }}
                >
                  Smarter
                </span>{' '}Governance
              </h1>

              {/* Sub-headline — Figma exact meta description */}
              <p className="mt-5 text-[17px] text-[#6B7280] leading-relaxed max-w-lg">
                Empowers government officials with AI-driven insights to analyze citizen complaints,
                visualize infrastructure gaps, and make data-driven development decisions.
              </p>

              {/* Trust indicators */}
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { icon: CheckCircleIcon, label: 'Real-time AI analysis' },
                  { icon: CheckCircleIcon, label: '97% routing accuracy' },
                  { icon: CheckCircleIcon, label: 'GDPR compliant' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-[#6B7280] font-medium">
                    <Icon className="h-4 w-4 text-emerald-500" />
                    {label}
                  </div>
                ))}
              </div>

              {/* CTA Buttons — Figma: primary is pill-shaped purple-indigo gradient */}
              <div className="mt-9 flex flex-col sm:flex-row items-start gap-3">
                <Link
                  href="/citizen"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full shadow-md transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' }}
                >
                  Report a Complaint
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#111827] bg-white border border-[#E5E7EB] rounded-full hover:bg-[#F9FAFB] hover:border-[#C7D2FE] transition-all duration-200 shadow-sm"
                >
                  <ChartBarIcon className="h-4 w-4 text-[#4F46E5]" />
                  Open Dashboard
                </Link>
              </div>

              {/* Stats row — matches Figma KPI numbers */}
              <div className="mt-10 flex gap-8">
                {[
                  { value: '12,482', label: 'Complaints analysed' },
                  { value: '94/100', label: 'AI System Score' },
                  { value: '500+', label: 'Constituencies' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold text-[#111827]">{s.value}</div>
                    <div className="text-xs text-[#6B7280] font-medium mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right Column: Dashboard Preview ── */}
            <div className="hidden lg:flex justify-end">
              <DashboardPreview />
            </div>

          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Govern Smarter
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive suite of AI tools built for modern constituency
              management and civic engagement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} mb-5 shadow-sm`}
                >
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Capabilities ────────────────────────────────── */}
      <section id="ai" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold uppercase tracking-wide mb-4">
                <CpuChipIcon className="h-3.5 w-3.5" />
                Powered by AI
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                AI That Works <span className="text-indigo-600">Relentlessly</span>{" "}
                for Your Constituency
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our models are trained on millions of civic interactions and
                continuously improve as they process your constituency data.
              </p>
              <div className="space-y-6">
                {aiCapabilities.map((cap) => (
                  <div key={cap.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-gray-800">{cap.label}</span>
                      <span className="text-sm font-bold text-indigo-600">{cap.pct}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${cap.pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl" />
              <div className="relative p-8 space-y-4">
                {[
                  { icon: MagnifyingGlassIcon, label: "Analysing 1,247 reports…", color: "text-blue-600 bg-blue-50" },
                  { icon: BellAlertIcon, label: "3 high-priority issues flagged", color: "text-red-600 bg-red-50" },
                  { icon: ChartBarIcon, label: "Sentiment: 72% positive this week", color: "text-emerald-600 bg-emerald-50" },
                  { icon: SparklesIcon, label: "AI readiness score: 84%", color: "text-violet-600 bg-violet-50" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────── */}
      <section id="how" className="py-24 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-indigo-200 text-lg max-w-xl mx-auto">
              From submission to resolution — our platform closes the loop in
              hours, not weeks.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={step.num} className="relative">
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-indigo-400/40 -translate-x-4" />
                )}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full">
                  <div className="text-5xl font-black text-white/20 mb-4 leading-none">{step.num}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-indigo-200 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Statistics ─────────────────────────────────────── */}
      <section id="stats" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted Across the Nation
          </h2>
          <p className="text-gray-400 text-lg mb-16 max-w-xl mx-auto">
            Governments at every level rely on PeoplePriority to deliver faster,
            smarter public services.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl py-8 px-6">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2">
                  {s.value}
                </div>
                <div className="text-gray-400 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call To Action ─────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-12 shadow-2xl shadow-indigo-200">
            <SparklesIcon className="h-10 w-10 text-white/70 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Constituency?
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of forward-thinking governments already using
              PeoplePriority to close the gap between citizens and services.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/citizen"
                className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-indigo-600 bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                Report Complaint
                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/40 rounded-xl hover:border-white hover:bg-white/10 transition-all duration-200"
              >
                Open Dashboard
                <ChartBarIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                  <SparklesIcon className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-white font-bold">PeoplePriority</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI-powered constituency intelligence for modern governments.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/citizen" className="hover:text-white transition-colors">Citizen Portal</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Intelligence</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#ai" className="hover:text-white transition-colors">AI Capabilities</a></li>
                <li><a href="#how" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#stats" className="hover:text-white transition-colors">Impact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} PeoplePriority. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm">
              Built with ❤️ for better governance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
