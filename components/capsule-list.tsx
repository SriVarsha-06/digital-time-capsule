"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getAllCapsules, isUnlocked, deleteCapsule, isLoggedIn, type Capsule } from "@/lib/capsules"
import { Lock, Unlock, Trash2, Eye, Plus } from "lucide-react"

export function CapsuleList() {
  const [capsules, setCapsules] = useState<Capsule[]>([])
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    if (!isLoggedIn()) {
      router.push("/login")
      return
    }
    getAllCapsules().then((data) => {
      setCapsules(data)
      setLoading(false)
    })
  }, [])

  async function handleDelete(id: string) {
    await deleteCapsule(id)
    const updated = await getAllCapsules()
    setCapsules(updated)
  }

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (capsules.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-card px-6 py-16 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">No Capsules Yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first time capsule and send a message to the future.
          </p>
        </div>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Create Capsule
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {capsules.map((capsule) => {
        const unlocked = isUnlocked(capsule)
        const openDate = new Date(capsule.unlockDate || capsule.openDate)

        return (
          <div
            key={capsule.id}
            className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-foreground line-clamp-2">
                  {capsule.title}
                </h3>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    unlocked ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent"
                  }`}
                >
                  {unlocked ? (
                    <Unlock className="h-4 w-4" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span
                  className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    unlocked
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/15 text-accent-foreground"
                  }`}
                >
                  {unlocked ? "Unlocked" : "Locked"}
                </span>
                <p className="text-xs text-muted-foreground">
                  {"Opens: " + openDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/capsules/${capsule.id}`}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Eye className="h-3.5 w-3.5" />
                View
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(capsule.id)}
                className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label={`Delete capsule: ${capsule.title}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
