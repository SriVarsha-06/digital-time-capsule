import { Navbar } from "@/components/navbar"
import { CapsuleViewer } from "@/components/capsule-viewer"

export const metadata = {
  title: "View Capsule | Digital Time Capsule",
  description: "View your sealed or unlocked time capsule.",
}

export default function CapsuleDetailPage() {
  return (
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
  )
}
