"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, DollarSign, Users, Lightbulb, ExternalLink, Download, Calendar, Clock } from "lucide-react"
import { useState } from "react"

const fundingOptions = [
  {
    name: "SEFA (Small Enterprise Finance Agency)",
    description: "Loans and funding for small businesses",
    amount: "R50,000 - R5 million",
    type: "Loan",
    requirements: "Business plan, financial statements",
    website: "sefa.org.za",
  },
  {
    name: "NYDA (National Youth Development Agency)",
    description: "Support for youth-owned businesses (18-35 years)",
    amount: "Up to R1 million",
    type: "Grant/Loan",
    requirements: "Youth-owned (51%+), business plan",
    website: "nyda.gov.za",
  },
  {
    name: "IDC (Industrial Development Corporation)",
    description: "Funding for industrial and manufacturing businesses",
    amount: "R1 million+",
    type: "Loan/Equity",
    requirements: "Detailed business plan, feasibility study",
    website: "idc.co.za",
  },
  {
    name: "Khula Credit Guarantee",
    description: "Loan guarantees for small businesses",
    amount: "Up to R5 million",
    type: "Guarantee",
    requirements: "Viable business, collateral",
    website: "khula.org.za",
  },
]

const businessTemplates = [
  { name: "Business Plan Template", type: "PDF", description: "Complete business plan template" },
  { name: "Cash Flow Spreadsheet", type: "Excel", description: "Monthly cash flow tracker" },
  { name: "Invoice Template", type: "Word", description: "Professional invoice template" },
  { name: "Marketing Calendar", type: "Excel", description: "Plan your marketing activities" },
  { name: "Expense Tracker", type: "Excel", description: "Track business expenses" },
  { name: "Customer Database", type: "Excel", description: "Manage customer information" },
]

const learningResources = [
  {
    title: "Starting Your Business",
    lessons: ["Choosing a business structure", "Writing a business plan", "Market research basics"],
    duration: "2 hours",
  },
  {
    title: "Financial Management",
    lessons: ["Understanding cash flow", "Basic bookkeeping", "Tax obligations"],
    duration: "3 hours",
  },
  {
    title: "Marketing Your Business",
    lessons: ["Social media marketing", "Customer service", "Building your brand"],
    duration: "2.5 hours",
  },
  {
    title: "Growing Your Business",
    lessons: ["Hiring employees", "Expanding operations", "Access to funding"],
    duration: "2 hours",
  },
]

function BookingForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    preferredDate: "",
    preferredTime: "",
    topics: "",
    experience: "",
    challenges: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/mentoring/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Booking request submitted successfully! We will contact you within 24 hours to confirm your session.")
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          businessName: "",
          businessType: "",
          preferredDate: "",
          preferredTime: "",
          topics: "",
          experience: "",
          challenges: "",
        })
        setIsOpen(false)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit booking")
      }
    } catch (error) {
      console.error("Booking error:", error)
      alert("Error submitting booking. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-blue-300 bg-transparent">
          <Calendar className="h-4 w-4 mr-2" />
          Book Session
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Book Your Free Mentoring Session
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+27 82 123 4567"
                required
              />
            </div>
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                placeholder="Your business name (if applicable)"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="businessType">Business Type/Industry *</Label>
            <Select onValueChange={(value) => handleInputChange("businessType", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail/Shop</SelectItem>
                <SelectItem value="food">Food & Beverage</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="transport">Transport/Logistics</SelectItem>
                <SelectItem value="beauty">Beauty/Personal Care</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredDate">Preferred Date *</Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div>
              <Label htmlFor="preferredTime">Preferred Time *</Label>
              <Select onValueChange={(value) => handleInputChange("preferredTime", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00 - 09:30</SelectItem>
                  <SelectItem value="10:00">10:00 - 10:30</SelectItem>
                  <SelectItem value="11:00">11:00 - 11:30</SelectItem>
                  <SelectItem value="14:00">14:00 - 14:30</SelectItem>
                  <SelectItem value="15:00">15:00 - 15:30</SelectItem>
                  <SelectItem value="16:00">16:00 - 16:30</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="experience">Business Experience Level *</Label>
            <Select onValueChange={(value) => handleInputChange("experience", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idea">Just have an idea</SelectItem>
                <SelectItem value="planning">Planning to start</SelectItem>
                <SelectItem value="new">New business (0-1 years)</SelectItem>
                <SelectItem value="growing">Growing business (1-3 years)</SelectItem>
                <SelectItem value="established">Established business (3+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="topics">Topics You'd Like to Discuss *</Label>
            <Textarea
              id="topics"
              value={formData.topics}
              onChange={(e) => handleInputChange("topics", e.target.value)}
              placeholder="e.g., Business plan, funding, marketing, financial management, legal requirements..."
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="challenges">Current Business Challenges</Label>
            <Textarea
              id="challenges"
              value={formData.challenges}
              onChange={(e) => handleInputChange("challenges", e.target.value)}
              placeholder="What specific challenges are you facing? (Optional)"
              rows={3}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Session Details:
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Duration: 30 minutes</li>
              <li>• Format: Video call (Google Meet/Zoom)</li>
              <li>• Cost: Completely FREE</li>
              <li>• Follow-up: Session notes and action items provided</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? "Submitting..." : "Book Session"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function ResourceCenter() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Resource Center</h2>
        <p className="text-gray-600">Everything you need to grow your business</p>
      </div>

      <Tabs defaultValue="funding" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="funding">Funding</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="funding">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Funding Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fundingOptions.map((option, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{option.name}</CardTitle>
                          <Badge variant={option.type === "Grant" ? "default" : "secondary"}>{option.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-gray-600">{option.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Amount:</span>
                            <span className="text-green-600">{option.amount}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Requirements:</span>
                            <p className="text-gray-600 mt-1">{option.requirements}</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full bg-transparent">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit {option.website}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funding Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Prepare a Strong Business Plan</h4>
                      <p className="text-sm text-gray-600">
                        Most funders require a detailed business plan. Use our template to get started.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Keep Good Financial Records</h4>
                      <p className="text-sm text-gray-600">
                        Track your income and expenses from day one. Funders want to see financial discipline.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Start Small</h4>
                      <p className="text-sm text-gray-600">
                        Apply for smaller amounts first to build a track record before seeking larger funding.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-blue-600" />
                Business Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businessTemplates.map((template, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-sm">{template.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {template.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-4">{template.description}</p>
                      <Button size="sm" className="w-full">
                        <Download className="h-3 w-3 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">📋 How to Use Templates:</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Download the template that matches your needs</li>
                  <li>2. Fill in your business information</li>
                  <li>3. Customize it to match your brand</li>
                  <li>4. Save copies for your records</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Business Learning Modules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningResources.map((module, index) => (
                    <Card key={index} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold">{module.title}</h3>
                          <Badge variant="secondary">{module.duration}</Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">What you'll learn:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                {lesson}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button className="w-full mt-4 bg-transparent" variant="outline">
                          Start Learning
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">🎯 Study Smart:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Set aside 30 minutes daily for learning</li>
                    <li>• Apply what you learn immediately in your business</li>
                    <li>• Join our WhatsApp group for peer support</li>
                    <li>• Ask questions - we're here to help!</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-600" />
                  Get Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-green-800 mb-2">WhatsApp Community</h3>
                      <p className="text-sm text-green-600 mb-4">Join 5,000+ entrepreneurs</p>
                      <Button className="bg-green-600 hover:bg-green-700">Join WhatsApp Group</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-blue-800 mb-2">One-on-One Mentoring</h3>
                      <p className="text-sm text-blue-600 mb-4">Free 30-minute sessions</p>
                      <BookingForm />
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">📱</div>
                      <div>
                        <p className="font-medium">WhatsApp Support</p>
                        <p className="text-sm text-gray-600">+27 82 123 4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">✉️</div>
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-gray-600">help@mzansibusinessbuddy.co.za</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">🌐</div>
                      <div>
                        <p className="font-medium">Website</p>
                        <p className="text-sm text-gray-600">www.mzansibusinessbuddy.co.za</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">🤝 Remember:</h4>
                  <p className="text-sm text-orange-700">
                    You're not alone in this journey! Our community is here to support you every step of the way. Don't
                    hesitate to ask for help - that's how we all grow together.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
