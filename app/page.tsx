import ThemedDitheredLogo from "./components/ThemedDitheredLogo";
import BottomTab from "./components/BottomTab";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 pb-28 pt-10 sm:px-10 sm:pt-16">
        <section
          id="home"
          className="grid items-center gap-10 py-7 md:grid-cols-[220px_1fr]"
        >
          <div className="relative flex flex-col items-center">
            {/* Dialog above dinosaur */}
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
              I&apos;m basically making the machines nice enough to feel bad
              about replacing us.
            </p>
          </div>
        </section>

        <section id="about" className="py-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            About Me
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Currently at Amazon, teaching Alexa how to be more human. I
            specialize in scaling backend systems to survive massive traffic
            spikes and building interfaces so seamless that users forget
            they&apos;re staring at glowing rectangles all day.
          </p>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Whether I&apos;m optimising messy code or shipping end to end
            experiences, my primary goal is writing code that doesn&apos;t make
            me want to cry during code reviews.
          </p>
        </section>

        <section id="work" className="py-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Experience
          </h2>
          <div className="mt-6 space-y-5">
            <article className="rounded-2xl border border-zinc-900/10 bg-white/70 p-5 dark:border-zinc-700 dark:bg-zinc-900/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Software Dev Engineer · Amazon
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Jul 2025 - Present · Hyderabad, India
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Building large-scale backend systems and reliability-focused
                services for Alexa. Working on high-traffic infrastructure,
                observability, and performance.
              </p>
            </article>

            <article className="rounded-2xl border border-zinc-900/10 bg-white/70 p-5 dark:border-zinc-700 dark:bg-zinc-900/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Software Developer · Oncourse AI
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Apr 2024 - Jul 2025 · Bengaluru / Remote
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Progressed from intern to full-time developer. Shipped product
                features using Next.js and TypeScript and contributed across
                frontend and backend workflows.
              </p>
            </article>

            <article className="rounded-2xl border border-zinc-900/10 bg-white/70 p-5 dark:border-zinc-700 dark:bg-zinc-900/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Software Developer Intern · PyCray
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Jun 2023 - Aug 2023 · Noida / Remote
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Built and improved product modules with React Native and React,
                with a focus on practical user-facing features and clean
                component architecture.
              </p>
            </article>

            <article className="rounded-2xl border border-zinc-900/10 bg-white/70 p-5 dark:border-zinc-700 dark:bg-zinc-900/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Research Intern (SERB) · NIT Goa
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Jun 2023 - Jul 2023 · Goa
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Conducted research-driven development with Python and gprMax,
                working on simulations and experimentation in an academic
                setting.
              </p>
            </article>
          </div>
        </section>

        <section id="projects" className="py-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Projects
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-zinc-900/10 bg-white/70 p-5 dark:border-zinc-700 dark:bg-zinc-900/40">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                Rejectedly-Yours
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                AI-assisted job tracker that integrates with Gmail to parse
                application updates and classify responses. Built with Python
                for backend processing and Next.js for the interface.
              </p>
            </article>

            <article className="rounded-2xl border border-zinc-900/10 bg-white/70 p-5 dark:border-zinc-700 dark:bg-zinc-900/40">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                Schemer
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Interactive schema design platform using Next.js and React Flow
                to visualize tables, relationships, and constraints, with LLM-
                assisted workflows for faster database modeling.
              </p>
            </article>
          </div>
        </section>

        <section id="skills" className="py-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Core Focus
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Distributed Systems",
              "Backend Performance",
              "Scalability",
              "System Design",
              "API Architecture",
              "Frontend UX",
              "Developer Experience",
              "Cloud Infrastructure",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-zinc-900/15 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white dark:border-zinc-600 dark:bg-zinc-100 dark:text-zinc-900"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="py-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Contact
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Open to impactful backend and full-stack opportunities where I can
            build reliable systems, ship fast, and solve hard product problems.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="mailto:hello@example.com"
              className="rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Email Me
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-zinc-900/20 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-zinc-900/20 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>
      <BottomTab />
    </div>
  );
}
