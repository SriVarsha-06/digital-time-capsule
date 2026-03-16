const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://time-capsule-backend-production.up.railway.app"

function getToken(): string {
  if (typeof window === "undefined") return ""
  return localStorage.getItem("token") || ""
}

export interface Capsule {
  id: string
  title: string
  message: string
  createdAt: string
  openDate: string
  unlockDate: string
  imageUrl?: string
}

function fixDates(capsule: any): Capsule {
  return {
    ...capsule,
    unlockDate: capsule.unlockDate
      ? typeof capsule.unlockDate === "object"
        ? `${capsule.unlockDate.year}-${String(capsule.unlockDate.month).padStart(2, "0")}-${String(capsule.unlockDate.day).padStart(2, "0")}`
        : capsule.unlockDate
      : capsule.openDate,
    createdAt: capsule.createdAt
      ? typeof capsule.createdAt === "object"
        ? new Date(
            capsule.createdAt.year,
            capsule.createdAt.month - 1,
            capsule.createdAt.day
          ).toISOString()
        : capsule.createdAt
      : new Date().toISOString(),
  }
}

export async function getAllCapsules(): Promise<Capsule[]> {
  const res = await fetch(`${API_URL}/api/capsules`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.map(fixDates)
}

export async function getCapsuleById(id: string): Promise<Capsule | undefined> {
  const res = await fetch(`${API_URL}/api/capsules/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  if (!res.ok) return undefined
  return res.json()
}

export async function createCapsule(data: {
  title: string
  message: string
  unlockDate: string
  imageUrl?: string
}): Promise<Capsule> {
  const res = await fetch(`${API_URL}/api/capsules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function deleteCapsule(id: string): Promise<void> {
  await fetch(`${API_URL}/api/capsules/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  })
}

export function isUnlocked(capsule: Capsule): boolean {
  const date = capsule.unlockDate || capsule.openDate
  return new Date() >= new Date(date)
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Login failed")
  localStorage.setItem("token", data.token)
  localStorage.setItem("user", JSON.stringify(data.user))
  return data
}

export async function register(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Register failed")
  localStorage.setItem("token", data.token)
  localStorage.setItem("user", JSON.stringify(data.user))
  return data
}

export function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("token")
}
