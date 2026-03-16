"use client"

import { Navbar } from "@/components/navbar"
import { CapsuleList } from "@/components/capsule-list"
import { AuthWrapper } from "@/components/auth-wrapper"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function CapsulesPage() {
  return (
    <AuthWrapper>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  My Capsules
                </h1>
                <p className="mt-2 text-muted-foreground">
                  All your sealed messages, waiting for the right moment.
                </p>
              </div>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                New Capsule
              </Link>
            </div>
            <CapsuleList />
          </div>
        </main>
        <footer className="border-t border-border bg-card">
          <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-muted-foreground">
            Digital Time Capsule &mdash; A College Project
          </div>
        </footer>
      </div>
    </AuthWrapper>
  )
}
