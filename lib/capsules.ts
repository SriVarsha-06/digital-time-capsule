export interface Capsule {
  id: string
  title: string
  message: string
  createdAt: string
  openDate: string
  imageUrl?: string
}

const STORAGE_KEY = "digital-time-capsules"

function getCapsules(): Capsule[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCapsules(capsules: Capsule[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(capsules))
}

export function getAllCapsules(): Capsule[] {
  return getCapsules().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getCapsuleById(id: string): Capsule | undefined {
  return getCapsules().find((c) => c.id === id)
}

export function createCapsule(data: Omit<Capsule, "id" | "createdAt">): Capsule {
  const capsule: Capsule = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  const all = getCapsules()
  all.push(capsule)
  saveCapsules(all)
  return capsule
}

export function deleteCapsule(id: string) {
  const all = getCapsules().filter((c) => c.id !== id)
  saveCapsules(all)
}

export function isUnlocked(capsule: Capsule): boolean {
  return new Date() >= new Date(capsule.openDate)
}
