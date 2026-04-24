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
          <div className="mt-6 space-y-0">
            <article className="border-b border-zinc-900/10 py-5 last:border-b-0 dark:border-zinc-700">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Software Dev Engineer · Amazon
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Jul '25 - Present
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Building large-scale backend systems and reliability-focused
                services for Alexa. Working on high-traffic infrastructure,
                observability, and performance. Worked to drive emotionally
                intelligent, context-aware AI responses for millions of users.
              </p>
            </article>

            <article className="border-b border-zinc-900/10 py-5 last:border-b-0 dark:border-zinc-700">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Software Developer · Oncourse AI
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Apr '24 - Jul '25
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Led the end-to-end development of a high-traffic mobile MVP,
                contributing 80% of the codebase and securing 2,000+ sign-ups
                within the first week. Engineered a custom spaced-repetition
                algorithm that boosted user retention by 45% and established a
                robust observability stack that cut critical bug resolution time
                by half.
              </p>
            </article>

            <article className="border-b border-zinc-900/10 py-5 last:border-b-0 dark:border-zinc-700">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Software Developer Intern · PyCray
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Jun '23 - Aug '23
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Engineered a comprehensive ride-sharing ecosystem featuring a 20+ screen React Native mobile application and a centralized React.js admin dashboard. Optimized the core ride-search API, reducing search latency by 40% through efficient query handling and seamless integration of the Google Maps API and Cashfree payment gateway.
              </p>
            </article>

            <article className="py-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Research Intern · SERB
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Jun '23 - Jul '23
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Conducted advanced electromagnetic research under India’s premier research board, utilising Python and gprMax for subsurface object detection. Developed sophisticated visualization models for scattered fields, enhancing the accuracy of underground material identification and data interpretation.
              </p>
            </article>
          </div>
        </section>

        <section id="projects" className="py-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Projects
          </h2>
          <div className="mt-6 space-y-0">
            <article className="border-b border-zinc-900/10 py-5 dark:border-zinc-700">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                Rejectedly-Yours
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                AI-assisted job tracker that integrates with Gmail to parse
                application updates and classify responses. Built with Python
                for backend processing and Next.js for the interface.
              </p>
            </article>

            <article className="py-5">
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

        <section id="education" className="py-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Education
          </h2>
          <div className="mt-6 space-y-0">
            <article className="border-b border-zinc-900/10 py-5 dark:border-zinc-700">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  National Institute of Technology Goa
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Jul '20 - May '24
                </p>
              </div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                B.Tech · Electronics & Communication Engineering · Grade: 9.61
              </p>
            </article>

            <article className="py-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Kendriya Vidyalaya, Vayu Sena Nagar, Nagpur
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Apr '19 - Mar '20
                </p>
              </div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                Science · Grade: 95.6
              </p>
            </article>
          </div>
        </section>

        <section id="achievements" className="py-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Achievements
          </h2>
          <div className="mt-6 space-y-0">
            <article className="border-b border-zinc-900/10 py-5 dark:border-zinc-700">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  GSoC Contributor · gprMax
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Sep '25
                </p>
              </div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                Selected for Google Summer of Code and contributed to gprMax,
                focusing on impactful open-source development. Engineered a
                high-performance Apple Metal GPU backend, enabling complex
                electromagnetic simulations to run natively on M-series chips.
                Optimised thread utilisation and memory management to achieve 2×
                faster runtimes compared to traditional OpenMP CPU
                implementations.
              </p>
            </article>

            <article className="py-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Winner · Smart India Hackathon
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Dec '23
                </p>
              </div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                Won SIH 2023 under the Ministry of Rural Development for
                building a solution focused on FPO comparison, income tracking,
                and farmer support workflows.
              </p>
            </article>
          </div>
        </section>

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
      </main>
      <BottomTab />
    </div>
  );
}
