"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Factory,
  Package,
  ShoppingCart,
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

export default function ManufacturerDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is a manufacturer
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.userType !== "manufacturer") {
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
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
              <Factory className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Manufacturer Dashboard</h1>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user.name}! 👋</h2>
          <p className="text-gray-600">Here's what's happening with your manufacturing operations today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+5 new orders today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R 245,890</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 new partnerships</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest orders from your customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: "ORD-001", customer: "ABC Retailers", amount: "R 15,450", status: "Processing" },
                      { id: "ORD-002", customer: "XYZ Distributors", amount: "R 8,900", status: "Shipped" },
                      { id: "ORD-003", customer: "Local Store Co", amount: "R 3,200", status: "Delivered" },
                    ].map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.amount}</p>
                          <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Production Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Production Status</CardTitle>
                  <CardDescription>Current manufacturing progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { product: "Steel Pipes", progress: 85, status: "On Track" },
                      { product: "Metal Sheets", progress: 60, status: "In Progress" },
                      { product: "Wire Mesh", progress: 95, status: "Almost Done" },
                    ].map((item) => (
                      <div key={item.product} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.product}</span>
                          <span className="text-sm text-gray-500">{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                        <p className="text-xs text-gray-500">{item.status}</p>
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
                  Important Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-800">Low Stock Alert</p>
                      <p className="text-sm text-orange-600">
                        Raw materials for Steel Pipes are running low. Reorder needed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">New Supplier Request</p>
                      <p className="text-sm text-blue-600">Johannesburg Steel Co. wants to partner with you.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Product Inventory</h3>
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
                  Add Product
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Steel Pipes", category: "Construction", stock: 450, price: "R 125", status: "In Stock" },
                { name: "Metal Sheets", category: "Industrial", stock: 23, price: "R 89", status: "Low Stock" },
                { name: "Wire Mesh", category: "Fencing", stock: 156, price: "R 45", status: "In Stock" },
                { name: "Steel Beams", category: "Construction", stock: 0, price: "R 350", status: "Out of Stock" },
              ].map((product) => (
                <Card key={product.name}>
                  <CardHeader>
                    <CardTitle className="text-base">{product.name}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Stock:</span>
                        <span className="text-sm font-medium">{product.stock} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Price:</span>
                        <span className="text-sm font-medium">{product.price}</span>
                      </div>
                      <Badge
                        variant={
                          product.status === "In Stock"
                            ? "default"
                            : product.status === "Low Stock"
                              ? "secondary"
                              : "destructive"
                        }
                        className="w-full justify-center"
                      >
                        {product.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Order Management</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Manage your customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "ORD-001",
                      customer: "ABC Retailers",
                      date: "2024-01-15",
                      amount: "R 15,450",
                      status: "Processing",
                    },
                    {
                      id: "ORD-002",
                      customer: "XYZ Distributors",
                      date: "2024-01-14",
                      amount: "R 8,900",
                      status: "Shipped",
                    },
                    {
                      id: "ORD-003",
                      customer: "Local Store Co",
                      date: "2024-01-13",
                      amount: "R 3,200",
                      status: "Delivered",
                    },
                    {
                      id: "ORD-004",
                      customer: "Metro Builders",
                      date: "2024-01-12",
                      amount: "R 22,100",
                      status: "Processing",
                    },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-500">{order.customer}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date: {order.date}</p>
                            <p className="font-medium">{order.amount}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
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

          <TabsContent value="suppliers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Supplier Network</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Supplier
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Johannesburg Steel Co.", category: "Raw Materials", rating: 4.8, orders: 45 },
                { name: "Cape Town Metals", category: "Alloys", rating: 4.6, orders: 23 },
                { name: "Durban Industrial Supply", category: "Tools & Equipment", rating: 4.9, orders: 67 },
                { name: "Pretoria Chemical Corp", category: "Chemicals", rating: 4.5, orders: 12 },
              ].map((supplier) => (
                <Card key={supplier.name}>
                  <CardHeader>
                    <CardTitle className="text-base">{supplier.name}</CardTitle>
                    <CardDescription>{supplier.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Rating:</span>
                        <span className="text-sm font-medium">⭐ {supplier.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Orders:</span>
                        <span className="text-sm font-medium">{supplier.orders}</span>
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
            <h3 className="text-lg font-semibold">Business Analytics</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Revenue Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Production Efficiency</CardTitle>
                  <CardDescription>Manufacturing performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Overall Efficiency</span>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Quality Score</span>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">On-Time Delivery</span>
                        <span className="text-sm font-medium">91%</span>
                      </div>
                      <Progress value={91} className="h-2" />
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
