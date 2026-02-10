import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Lock, Unlock, Timer, PenLine } from "lucide-react"

const features = [
  {
    icon: PenLine,
    title: "Write a Message",
    description: "Compose a heartfelt note, reflection, or goal for your future self to read later.",
  },
  {
    icon: Lock,
    title: "Seal It Shut",
    description: "Choose a future date and lock your capsule. No peeking until the date arrives!",
  },
  {
    icon: Timer,
    title: "Watch the Countdown",
    description: "See a live countdown timer ticking toward the moment your capsule unlocks.",
  },
  {
    icon: Unlock,
    title: "Open & Reflect",
    description: "When the date arrives, unlock your capsule and revisit your past thoughts.",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-20 text-center md:py-32">
            <div className="relative h-48 w-48 md:h-56 md:w-56">
              <Image
                src="/hero-capsule.jpg"
                alt="A glowing digital time capsule"
                fill
                className="rounded-full object-cover shadow-lg"
                priority
              />
            </div>

            <div className="flex max-w-2xl flex-col gap-4">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                Send a Message to Your Future Self
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                Write letters, save memories, and set a date to unlock them. Your words wait patiently until the moment is right.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/create"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Create a Capsule
              </Link>
              <Link
                href="/capsules"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-8 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                View My Capsules
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-5xl px-4 py-20 md:py-24">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                How It Works
              </h2>
              <p className="mt-3 text-muted-foreground">
                Four simple steps to preserve your thoughts for the future.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, idx) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center gap-4 rounded-xl border border-border bg-background p-6 text-center transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {"Step " + (idx + 1)}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center md:py-24">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Ready to Capture This Moment?
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Your future self will thank you. Start writing your first time capsule today.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-muted-foreground">
          Digital Time Capsule
        </div>
      </footer>
    </div>
  )
}
