"use client"

import { Navbar } from "@/components/navbar"
import { CreateCapsuleForm } from "@/components/create-capsule-form"
import { AuthWrapper } from "@/components/auth-wrapper"

export default function CreatePage() {
  return (
    <AuthWrapper>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="mx-auto max-w-2xl px-4 py-12 md:py-16">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Create a Time Capsule
              </h1>
              <p className="mt-2 text-muted-foreground">
                Write a message, pick a date, and seal it shut. Your future self will read it when the time comes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
              <CreateCapsuleForm />
            </div>
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
