"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createCapsule, isLoggedIn } from "@/lib/capsules"
import { ImagePlus, X, Send } from "lucide-react"

export function CreateCapsuleForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [openDate, setOpenDate] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login")
    }
  }, [])

  const today = new Date()
  today.setDate(today.getDate() + 1)
  const minDate = today.toISOString().split("T")[0]

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("Please enter a title for your capsule.")
      return
    }
    if (!message.trim()) {
      setError("Please write a message for your future self.")
      return
    }
    if (!openDate) {
      setError("Please select an opening date.")
      return
    }

    setLoading(true)
    try {
      await createCapsule({
        title: title.trim(),
        message: message.trim(),
        unlockDate: openDate,
        imageUrl: imagePreview ?? undefined,
      })
      router.push("/capsules")
    } catch (err) {
      setError("Failed to create capsule. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium text-foreground">
          Capsule Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Letter to Future Me"
          className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-ring focus:ring-2"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Your Message
        </label>
        <textarea
          id="message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message to your future self..."
          className="resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-ring focus:ring-2"
        />
      </div>

      {/* Opening Date */}
      <div className="flex flex-col gap-2">
        <label htmlFor="openDate" className="text-sm font-medium text-foreground">
          Opening Date
        </label>
        <input
          id="openDate"
          type="date"
          value={openDate}
          onChange={(e) => setOpenDate(e.target.value)}
          min={minDate}
          className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring focus:ring-2"
        />
        <p className="text-xs text-muted-foreground">
          Choose a future date when this capsule will be unlocked.
        </p>
      </div>

      {/* Image Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Attach an Image <span className="text-muted-foreground">(optional)</span>
        </label>
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Capsule attachment preview"
              className="h-48 w-full rounded-lg border border-border object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null)
                if (fileInputRef.current) fileInputRef.current.value = ""
              }}
              className="absolute right-2 top-2 rounded-full bg-foreground/70 p-1 text-background transition-colors hover:bg-foreground"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ImagePlus className="h-5 w-5" />
            Click to upload an image
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        {loading ? "Sealing..." : "Seal Capsule"}
      </button>
    </form>
  )
}
