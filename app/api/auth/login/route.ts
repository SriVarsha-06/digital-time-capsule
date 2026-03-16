import { NextRequest, NextResponse } from "next/server"

// Mock users database (in production, use a real database)
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
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const user = mockUsers[email]

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    const token = generateToken(user.id)

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    )
  }
}
