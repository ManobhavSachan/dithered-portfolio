import ThemedDitheredLogo from "./components/ThemedDitheredLogo";
import BottomTab from "./components/BottomTab";

// ============================================================================
// DATA
// ============================================================================

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ProjectItem {
  title: string;
  description: string;
  link: string;
}

interface EducationItem {
  institution: string;
  period: string;
  details: string;
}

interface AchievementItem {
  title: string;
  period: string;
  description: string;
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    title: "Software Dev Engineer",
    company: "Amazon",
    period: "Jul '25 - Present",
    description:
      "Building large-scale backend systems and reliability-focused services for Alexa. Working on high-traffic infrastructure, observability, and performance. Worked to drive emotionally intelligent, context-aware AI responses for millions of users.",
  },
  {
    title: "Software Developer",
    company: "Oncourse AI",
    period: "Apr '24 - Jul '25",
    description:
      "Led the end-to-end development of a high-traffic mobile MVP, contributing 80% of the codebase and securing 2,000+ sign-ups within the first week. Engineered a custom spaced-repetition algorithm that boosted user retention by 45% and established a robust observability stack that cut critical bug resolution time by half.",
  },
  {
    title: "Software Developer Intern",
    company: "PyCray",
    period: "Jun '23 - Aug '23",
    description:
      "Engineered a comprehensive ride-sharing ecosystem featuring a 20+ screen React Native mobile application and a centralized React.js admin dashboard. Optimized the core ride-search API, reducing search latency by 40% through efficient query handling and seamless integration of the Google Maps API and Cashfree payment gateway.",
  },
  {
    title: "Research Intern",
    company: "SERB",
    period: "Jun '23 - Jul '23",
    description:
      "Conducted advanced electromagnetic research under India's premier research board, utilising Python and gprMax for subsurface object detection. Developed sophisticated visualization models for scattered fields, enhancing the accuracy of underground material identification and data interpretation.",
  },
];

const PROJECTS_DATA: ProjectItem[] = [
  {
    title: "Schemer",
    description:
      "An interactive database schema designer built with Next.js and React Flow for visual table, constraint, and relationship modeling. It uses LLM-assisted workflows to help shape schemas faster and make database design more collaborative.",
    link: "https://github.com/ManobhavSachan/schemer",
  },
  {
    title: "Rejectedly-Yours",
    description:
      "A job-tracking platform that pulls Gmail updates, analyses them with AI, and turns email noise into structured application status updates. It combines a Python backend with a Next.js frontend and a database pipeline for automated processing.",
    link: "https://github.com/ManobhavSachan/rejectedly-yours",
  },
  {
    title: "Attendify",
    description:
      "A smart attendance platform built with Next.js and Python for group attendance tracking in a PWA-style workflow. It supports AWS Lambda, S3, API Gateway, Face Recognition, and attendance report automation through Google Sheets.",
    link: "https://github.com/ManobhavSachan/attendify-smart-attendance",
  },
];

const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "National Institute of Technology Goa",
    period: "Jul '20 - May '24",
    details: "B.Tech · Electronics & Communication Engineering · Grade: 9.61",
  },
  {
    institution: "Kendriya Vidyalaya, Vayu Sena Nagar, Nagpur",
    period: "Apr '19 - Mar '20",
    details: "Science · Grade: 95.6",
  },
];

const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    title: "GSoC Contributor · gprMax",
    period: "Sep '25",
    description:
      "Selected for Google Summer of Code and contributed to gprMax, focusing on impactful open-source development. Engineered a high-performance Apple Metal GPU backend, enabling complex electromagnetic simulations to run natively on M-series chips. Optimised thread utilisation and memory management to achieve 2× faster runtimes compared to traditional OpenMP CPU implementations.",
  },
  {
    title: "Winner · Smart India Hackathon",
    period: "Dec '23",
    description:
      "Won SIH 2023 under the Ministry of Rural Development for building a solution focused on FPO comparison, income tracking, and farmer support workflows.",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

function HeroSection() {
  return (
    <section
      id="home"
      className="grid items-center gap-10 py-7 md:grid-cols-[220px_1fr]"
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute z-20 -top-12 select-none">
          <div className="relative rounded-xl bg-zinc-100/95 px-5 py-2 text-base font-semibold text-zinc-900 ring-1 ring-zinc-300 dark:bg-zinc-900/90 dark:text-zinc-100 dark:ring-zinc-700">
            Don&apos;t touch
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-zinc-300 bg-zinc-100/95 dark:border-zinc-700 dark:bg-zinc-900/90"
            />
          </div>
        </div>
        <ThemedDitheredLogo />
      </div>

      <div className="space-y-5">
        <h1 className="text-balance text-3xl font-semibold leading-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl sm:leading-tight">
          Manobhav Sachan
        </h1>
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Building the infrastructure, the interface, and the soul.
          <br />
          I&apos;m basically making the machines nice enough to feel bad about
          replacing us.
        </p>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-2">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        About Me
      </h2>
      <p className="mt-5 text-pretty text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        Currently at Amazon, teaching Alexa how to be more human. I specialize
        in scaling backend systems to survive massive traffic spikes and
        building interfaces so seamless that users forget they&apos;re staring
        at glowing rectangles all day.
      </p>
      <p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        Whether I&apos;m optimising messy code or shipping end to end
        experiences, my primary goal is writing code that doesn&apos;t make me
        want to cry during code reviews.
      </p>
    </section>
  );
}

function ExperienceItem({ item, isLast }: { item: ExperienceItem; isLast: boolean }) {
  return (
    <article
      className={`${
        isLast
          ? "py-5"
          : "border-b border-zinc-900/10 py-5 dark:border-zinc-700"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          {item.title} · {item.company}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {item.period}
        </p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {item.description}
      </p>
    </article>
  );
}

function ExperienceSection() {
  return (
    <section id="work" className="py-2">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Experience
      </h2>
      <div className="mt-6 space-y-0">
        {EXPERIENCE_DATA.map((item, index) => (
          <ExperienceItem
            key={`${item.company}-${index}`}
            item={item}
            isLast={index === EXPERIENCE_DATA.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

interface ExternalLinkIconProps {
  className?: string;
}

function ExternalLinkIcon({ className }: ExternalLinkIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4h6v6" />
      <path d="M12 4 4 12" />
    </svg>
  );
}

function ProjectItem({ item, isLast }: { item: ProjectItem; isLast: boolean }) {
  return (
    <article
      className={`${
        isLast
          ? "py-5"
          : "border-b border-zinc-900/10 py-5 dark:border-zinc-700"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          {item.title}
        </h3>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex shrink-0 items-center gap-1 text-sm font-medium text-zinc-900 underline underline-offset-4 transition hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
        >
          Visit
          <ExternalLinkIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {item.description}
      </p>
    </article>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-2">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Projects
      </h2>
      <div className="mt-6 space-y-0">
        {PROJECTS_DATA.map((item, index) => (
          <ProjectItem
            key={`${item.title}-${index}`}
            item={item}
            isLast={index === PROJECTS_DATA.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function EducationItem({ item, isLast }: { item: EducationItem; isLast: boolean }) {
  return (
    <article
      className={`${
        isLast
          ? "py-5"
          : "border-b border-zinc-900/10 py-5 dark:border-zinc-700"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          {item.institution}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {item.period}
        </p>
      </div>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        {item.details}
      </p>
    </article>
  );
}

function EducationSection() {
  return (
    <section id="education" className="py-2">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Education
      </h2>
      <div className="mt-6 space-y-0">
        {EDUCATION_DATA.map((item, index) => (
          <EducationItem
            key={`${item.institution}-${index}`}
            item={item}
            isLast={index === EDUCATION_DATA.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function AchievementItem({ item, isLast }: { item: AchievementItem; isLast: boolean }) {
  return (
    <article
      className={`${
        isLast
          ? "py-5"
          : "border-b border-zinc-900/10 py-5 dark:border-zinc-700"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          {item.title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {item.period}
        </p>
      </div>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        {item.description}
      </p>
    </article>
  );
}

function AchievementsSection() {
  return (
    <section id="achievements" className="py-2">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Achievements
      </h2>
      <div className="mt-6 space-y-0">
        {ACHIEVEMENTS_DATA.map((item, index) => (
          <AchievementItem
            key={`${item.title}-${index}`}
            item={item}
            isLast={index === ACHIEVEMENTS_DATA.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-2">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Contact
      </h2>
      <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        Open to impactful opportunities where I can build reliable systems,
        ship fast, and solve hard product problems. If you made it this far,
        the bottom bar has exactly the buttons you are looking for.
      </p>
    </section>
  );
}

// ============================================================================
// PAGE
// ============================================================================

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 pb-28 pt-10 sm:px-10 sm:pt-16">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <BottomTab />
    </div>
  );
}
