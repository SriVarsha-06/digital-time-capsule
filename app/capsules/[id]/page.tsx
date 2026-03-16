"use client"

import { Navbar } from "@/components/navbar"
import { CapsuleViewer } from "@/components/capsule-viewer"
import { AuthWrapper } from "@/components/auth-wrapper"

export default function CapsuleDetailPage() {
  return (
    <AuthWrapper>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <CapsuleViewer />
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
