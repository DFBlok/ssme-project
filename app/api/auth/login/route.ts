import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Import users from register route
// In production, this would be a shared database
const users: any[] = []

// Demo users for testing
const demoUsers = [
  {
    id: "demo_manufacturer_001",
    name: "John Manufacturing",
    email: "manufacturer@demo.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    userType: "manufacturer",
    companyName: "Demo Manufacturing Co",
    phone: "+27 11 123 4567",
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo_supplier_001",
    name: "Jane Supply",
    email: "supplier@demo.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    userType: "supplier",
    companyName: "Demo Supply Chain Ltd",
    phone: "+27 21 987 6543",
    createdAt: new Date().toISOString(),
  },
]

// Add demo users to the users array
users.push(...demoUsers)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log("Login attempt:", { email })

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      console.log("User not found:", email)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      console.log("Invalid password for user:", email)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    console.log("User logged in successfully:", {
      id: user.id,
      email: user.email,
      userType: user.userType,
    })

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
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

// Function to sync users from register route
export function addUser(user: any) {
  users.push(user)
}
