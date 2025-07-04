// Test script to verify authentication flow
// Run this in the browser console or as a Node.js script

const testAuthFlow = async () => {
  const baseUrl = "http://localhost:3000"

  console.log("🧪 Testing Authentication Flow...\n")

  // Test 1: Register a new manufacturer
  console.log("1️⃣ Testing Manufacturer Registration...")
  try {
    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test Manufacturer",
        email: "test.manufacturer@example.com",
        password: "password123",
        userType: "manufacturer",
        companyName: "Test Manufacturing Co",
        phone: "+27 11 123 4567",
      }),
    })

    const registerData = await registerResponse.json()
    console.log("✅ Manufacturer Registration:", registerData)
  } catch (error) {
    console.error("❌ Manufacturer Registration Error:", error)
  }

  // Test 2: Register a new supplier
  console.log("\n2️⃣ Testing Supplier Registration...")
  try {
    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test Supplier",
        email: "test.supplier@example.com",
        password: "password123",
        userType: "supplier",
        companyName: "Test Supply Chain Ltd",
        phone: "+27 21 987 6543",
      }),
    })

    const registerData = await registerResponse.json()
    console.log("✅ Supplier Registration:", registerData)
  } catch (error) {
    console.error("❌ Supplier Registration Error:", error)
  }

  // Test 3: Login as manufacturer
  console.log("\n3️⃣ Testing Manufacturer Login...")
  try {
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "manufacturer@demo.com",
        password: "password123",
      }),
    })

    const loginData = await loginResponse.json()
    console.log("✅ Manufacturer Login:", loginData)

    if (loginData.user && loginData.user.userType === "manufacturer") {
      console.log("✅ Manufacturer should redirect to: /dashboard/manufacturer")
    }
  } catch (error) {
    console.error("❌ Manufacturer Login Error:", error)
  }

  // Test 4: Login as supplier
  console.log("\n4️⃣ Testing Supplier Login...")
  try {
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "supplier@demo.com",
        password: "password123",
      }),
    })

    const loginData = await loginResponse.json()
    console.log("✅ Supplier Login:", loginData)

    if (loginData.user && loginData.user.userType === "supplier") {
      console.log("✅ Supplier should redirect to: /dashboard/supplier")
    }
  } catch (error) {
    console.error("❌ Supplier Login Error:", error)
  }

  // Test 5: Get all users
  console.log("\n5️⃣ Testing Get All Users...")
  try {
    const usersResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: "GET",
    })

    const usersData = await usersResponse.json()
    console.log("✅ All Users:", usersData)
  } catch (error) {
    console.error("❌ Get Users Error:", error)
  }

  console.log("\n🎉 Authentication Flow Test Complete!")
}

// Run the test
if (typeof window !== "undefined") {
  // Browser environment
  testAuthFlow()
} else {
  // Node.js environment
  console.log("Run this script in the browser console or modify for Node.js with fetch polyfill")
}

export default testAuthFlow
