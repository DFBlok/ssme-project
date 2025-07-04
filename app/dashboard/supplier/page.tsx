"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Truck,
  Package,
  FileText,
  TrendingUp,
  Users,
  AlertCircle,
  Plus,
  Search,
  Filter,
  LogOut,
  Settings,
  Bell,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  userType: string
  companyName: string
  phone: string
}

export default function SupplierDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is a supplier
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.userType !== "supplier") {
      router.push("/auth/login")
      return
    }

    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Supplier Dashboard</h1>
                <p className="text-sm text-gray-500">{user.companyName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user.name}! 🚛</h2>
          <p className="text-gray-600">Manage your supply operations and client relationships from here.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">+3 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
              <Package className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">2 due today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R 189,450</div>
              <p className="text-xs text-muted-foreground">+22% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Client Partners</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">5 new partnerships</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="catalog">Supply Catalog</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Contracts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Contracts</CardTitle>
                  <CardDescription>Latest supply agreements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: "CON-001", client: "Steel Manufacturing Co", value: "R 45,000", status: "Active" },
                      { id: "CON-002", client: "Metro Builders Ltd", value: "R 28,500", status: "Pending" },
                      { id: "CON-003", client: "Industrial Parts SA", value: "R 15,200", status: "Completed" },
                    ].map((contract) => (
                      <div key={contract.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{contract.id}</p>
                          <p className="text-sm text-gray-500">{contract.client}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{contract.value}</p>
                          <Badge variant={contract.status === "Active" ? "default" : "secondary"}>
                            {contract.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Schedule</CardTitle>
                  <CardDescription>Upcoming deliveries and logistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { client: "ABC Manufacturing", item: "Raw Steel", date: "Today", progress: 90 },
                      { client: "XYZ Builders", item: "Construction Materials", date: "Tomorrow", progress: 65 },
                      { client: "Local Industries", item: "Chemical Supplies", date: "Jan 18", progress: 30 },
                    ].map((delivery, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-medium">{delivery.client}</p>
                            <p className="text-xs text-gray-500">{delivery.item}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{delivery.date}</p>
                            <p className="text-xs text-gray-500">{delivery.progress}% ready</p>
                          </div>
                        </div>
                        <Progress value={delivery.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                  Supply Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Urgent Delivery</p>
                      <p className="text-sm text-red-600">ABC Manufacturing needs raw steel delivery by end of day.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">New Contract Opportunity</p>
                      <p className="text-sm text-blue-600">
                        Durban Steel Works wants to discuss a long-term supply agreement.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="catalog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Supply Catalog</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Raw Steel Materials", category: "Metals", availability: "In Stock", price: "R 850/ton" },
                { name: "Construction Chemicals", category: "Chemicals", availability: "Limited", price: "R 45/liter" },
                { name: "Industrial Tools", category: "Equipment", availability: "In Stock", price: "R 1,200/set" },
                { name: "Logistics Services", category: "Services", availability: "Available", price: "R 25/km" },
              ].map((item) => (
                <Card key={item.name}>
                  <CardHeader>
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Availability:</span>
                        <Badge
                          variant={
                            item.availability === "In Stock" || item.availability === "Available"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {item.availability}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Price:</span>
                        <span className="text-sm font-medium">{item.price}</span>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent" size="sm">
                        Edit Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Contract Management</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Contract
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Contracts</CardTitle>
                <CardDescription>Manage your supply agreements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "CON-001",
                      client: "Steel Manufacturing Co",
                      startDate: "2024-01-01",
                      value: "R 45,000",
                      status: "Active",
                    },
                    {
                      id: "CON-002",
                      client: "Metro Builders Ltd",
                      startDate: "2024-01-10",
                      value: "R 28,500",
                      status: "Pending",
                    },
                    {
                      id: "CON-003",
                      client: "Industrial Parts SA",
                      startDate: "2023-12-15",
                      value: "R 15,200",
                      status: "Completed",
                    },
                    {
                      id: "CON-004",
                      client: "Cape Town Manufacturers",
                      startDate: "2024-01-05",
                      value: "R 67,800",
                      status: "Active",
                    },
                  ].map((contract) => (
                    <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{contract.id}</p>
                            <p className="text-sm text-gray-500">{contract.client}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Start: {contract.startDate}</p>
                            <p className="font-medium">{contract.value}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            contract.status === "Active"
                              ? "default"
                              : contract.status === "Pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {contract.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Client Network</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Steel Manufacturing Co", industry: "Manufacturing", contracts: 3, value: "R 125,000" },
                { name: "Metro Builders Ltd", industry: "Construction", contracts: 2, value: "R 89,500" },
                { name: "Industrial Parts SA", industry: "Industrial", contracts: 5, value: "R 234,000" },
                { name: "Cape Town Manufacturers", industry: "Manufacturing", contracts: 1, value: "R 67,800" },
              ].map((client) => (
                <Card key={client.name}>
                  <CardHeader>
                    <CardTitle className="text-base">{client.name}</CardTitle>
                    <CardDescription>{client.industry}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Contracts:</span>
                        <span className="text-sm font-medium">{client.contracts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total Value:</span>
                        <span className="text-sm font-medium">{client.value}</span>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent" size="sm">
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h3 className="text-lg font-semibold">Supply Analytics</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue from supply contracts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Revenue Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supply Performance</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">On-Time Delivery</span>
                        <span className="text-sm font-medium">96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Client Satisfaction</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Contract Renewal Rate</span>
                        <span className="text-sm font-medium">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
