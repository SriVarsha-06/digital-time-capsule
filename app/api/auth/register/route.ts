import { NextRequest, NextResponse } from "next/server"

// Mock users database (in production, use a real database with proper password hashing)
const mockUsers: Record<string, { id: string; name: string; email: string; password: string }> = {
  "user@example.com": {
    id: "1",
    name: "John Doe",
    email: "user@example.com",
    password: "password123",
  },
}

// Mock JWT token generation (in production, use a proper JWT library)
function generateToken(userId: string): string {
  return Buffer.from(JSON.stringify({ userId, iat: Date.now() })).toString("base64")
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      )
    }

    if (mockUsers[email]) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      )
    }

    const userId = Date.now().toString()
    mockUsers[email] = {
      id: userId,
      name,
      email,
      password,
    }

    const token = generateToken(userId)

    return NextResponse.json({
      token,
      user: {
        id: userId,
        name,
        email,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    )
  }
}
