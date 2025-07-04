"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MessageSquare, Calculator, FileText, Megaphone, BookOpen, Users, LogIn, UserPlus } from "lucide-react"
import ChatInterface from "@/components/chat-interface"
import BusinessCalculator from "@/components/business-calculator"
import MarketingTools from "@/components/marketing-tools"
import ResourceCenter from "@/components/resource-center"
import ComplianceGuide from "@/components/compliance-guide"

export default function SMMEAssistant() {
  const [activeTab, setActiveTab] = useState("chat")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <Link
                    href={user.userType === "manufacturer" ? "/dashboard/manufacturer" : "/dashboard/supplier"}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Go to Dashboard
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-green-800 mb-2">Mzansi Business Buddy 🇿🇦</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your smart business assistant for South African SMMEs. Get help in English, isiZulu, isiXhosa, or Afrikaans!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">10,000+</h3>
              <p className="text-sm text-green-600">Businesses Helped</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-100 border-orange-200">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-800">500+</h3>
              <p className="text-sm text-orange-600">Templates Created</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">24/7</h3>
              <p className="text-sm text-blue-600">Support Available</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              <span className="hidden sm:inline">Marketing</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="calculator">
            <BusinessCalculator />
          </TabsContent>

          <TabsContent value="marketing">
            <MarketingTools />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceGuide />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceCenter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
