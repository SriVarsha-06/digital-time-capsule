"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { getAllCapsules, isUnlocked, isLoggedIn, type Capsule } from "@/lib/capsules"
import { CountdownTimer } from "@/components/countdown-timer"
import { Lock, Unlock, ArrowLeft, CalendarDays } from "lucide-react"

export function CapsuleViewer() {
  const params = useParams()
  const router = useRouter()
  const [capsule, setCapsule] = useState<Capsule | null>(null)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    if (!isLoggedIn()) {
      router.push("/login")
      return
    }
    const id = params.id as string
    getAllCapsules().then((capsules) => {
      const found = capsules.find((c) => c.id === id)
      if (!found) {
        router.push("/capsules")
        return
      }
      setCapsule(found)
      setLoading(false)
    })
  }, [params.id, router])

  if (!mounted || loading || !capsule) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const unlocked = isUnlocked(capsule)
  const openDate = new Date(capsule.unlockDate || capsule.openDate)
  const createdDate = new Date(capsule.createdAt)

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:py-16">
      <Link
        href="/capsules"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Capsules
      </Link>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border p-6 md:p-8">
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              {capsule.title}
            </h1>
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                unlocked ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent"
              }`}
            >
              {unlocked ? <Unlock className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {"Created: " + createdDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              {unlocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              {"Opens: " + openDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <span
            className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${
              unlocked
                ? "bg-primary/10 text-primary"
                : "bg-accent/15 text-accent-foreground"
            }`}
          >
            {unlocked ? "Unlocked" : "Locked"}
          </span>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {unlocked ? (
            <div className="flex flex-col gap-6">
              <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                {capsule.message}
              </p>
              {capsule.imageUrl && (
                <img
                  src={capsule.imageUrl || "/placeholder.svg"}
                  alt="Capsule attachment"
                  className="rounded-lg border border-border object-cover"
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-8 py-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/15">
                <Lock className="h-10 w-10 text-accent" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-foreground">
                  This Capsule is Still Sealed
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your message will be revealed when the countdown reaches zero.
                </p>
              </div>
              <CountdownTimer targetDate={capsule.unlockDate || capsule.openDate} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
