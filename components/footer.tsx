import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://i.postimg.cc/cCtZ1kyL/vitap-logo1.png"
            alt="Vitap Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <p className="text-sm text-muted-foreground">
          Digital Time Capsule
        </p>
      </div>
    </footer>
  )
}
