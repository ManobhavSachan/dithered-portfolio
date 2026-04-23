import DitheredLogo from "./components/DitheredLogo";
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
            <DitheredLogo
              image="/dino.webp"
              algorithm="floyd-steinberg"
              invert={true}
              scale={1}
              dotScale={1.5}
              backgroundColor="transparent"
              imageProcessing={{
                threshold: 181,
                contrast: 0,
                gamma: 1.03,
                blur: 3.75,
                highlightsCompression: 0,
              }}
              interaction={{
                mouseRepulsion: true,
                clickShockwave: true,
              }}
              gridResolution={150}
              className="h-[240px] w-[240px] rounded-2xl z-10"
            />
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

        <section id="work" className="grid gap-10 md:grid-cols-2">
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Current Role
            </p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              Amazon · Alexa
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Building scalable backend systems and human-first voice
              experiences. Focused on reliability under massive load,
              observability, and product quality that survives real world chaos.
            </p>
          </article>

          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              What I Ship
            </p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              End to End Experiences
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              From APIs and event pipelines to polished UI workflows. I like
              systems that are fast, maintainable, and understandable by
              teammates who still want to be friends after code review.
            </p>
          </article>
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
            Resume details and project history can be slotted in next. For now,
            this page is wired for your voice, your brand, and your dithered
            hero section.
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
