import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// In-memory storage for demo purposes
// In production, use a proper database
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, userType, companyName, phone } = body

    console.log("Registration attempt:", { name, email, userType, companyName })

    // Validation
    if (!name || !email || !password || !userType || !companyName || !phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    if (!["manufacturer", "supplier"].includes(userType)) {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      userType,
      companyName: companyName.trim(),
      phone: phone.trim(),
      createdAt: new Date().toISOString(),
    }

    // Add to users array
    users.push(newUser)

    console.log("User registered successfully:", {
      id: newUser.id,
      email: newUser.email,
      userType: newUser.userType,
    })

    // Return success response (without password)
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      message: "User registered successfully",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Helper endpoint to get all users (for debugging)
export async function GET() {
  try {
    const usersWithoutPasswords = users.map(({ password, ...user }) => user)
    return NextResponse.json({
      users: usersWithoutPasswords,
      count: users.length,
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Export users array for use in login route
export { users }
