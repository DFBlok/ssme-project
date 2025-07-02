import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      fullName,
      email,
      phone,
      businessName,
      businessType,
      preferredDate,
      preferredTime,
      topics,
      experience,
      challenges,
    } = body

    // Validate required fields
    if (!fullName || !email || !phone || !businessType || !preferredDate || !preferredTime || !topics || !experience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert booking into database
    const { data, error } = await supabase
      .from("mentoring_bookings")
      .insert([
        {
          full_name: fullName,
          email: email.toLowerCase().trim(),
          phone: phone.trim(),
          business_name: businessName || null,
          business_type: businessType,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          topics: topics,
          experience_level: experience,
          challenges: challenges || null,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save booking" }, { status: 500 })
    }

    // Log successful booking
    console.log("New mentoring booking:", data[0])

    return NextResponse.json(
      {
        message: "Booking submitted successfully",
        booking: data[0],
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
