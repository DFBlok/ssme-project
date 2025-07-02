"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ImageIcon, Share2, Download, Copy } from "lucide-react"

export default function MarketingTools() {
  const [posterData, setPosterData] = useState({
    businessName: "",
    service: "",
    location: "",
    contact: "",
    special: "",
  })

  const [whatsappMessage, setWhatsappMessage] = useState("")
  const [socialCaption, setSocialCaption] = useState("")

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posterRef = useRef<HTMLDivElement>(null)

  const generateWhatsAppMessage = () => {
    const { businessName, service, special, contact } = posterData
    const message = `🌟 ${businessName} 🌟

${service} ${special ? `- ${special}` : ""}

📍 ${posterData.location}
📱 Contact: ${contact}

#SupportLocal #${businessName.replace(/\s+/g, "")} #Mzansi`

    setWhatsappMessage(message)
  }

  const generateSocialCaption = () => {
    const { businessName, service, location } = posterData
    const caption = `🚀 Growing our community, one business at a time! 

Proud to support ${businessName} in ${location} 💪

${service} 

Tag a friend who needs to know about this! 👇

#SupportLocal #SMME #SouthAfrica #CommunityFirst #${location.replace(/\s+/g, "")}`

    setSocialCaption(caption)
  }

  const exportAsImage = async () => {
    if (!posterRef.current) return

    try {
      // Create canvas
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas size
      canvas.width = 800
      canvas.height = 600

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#4ade80") // green-400
      gradient.addColorStop(1, "#fb923c") // orange-400
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text properties
      ctx.fillStyle = "white"
      ctx.textAlign = "center"

      // Business name
      ctx.font = "bold 48px Arial"
      ctx.fillText(posterData.businessName || "Your Business Name", canvas.width / 2, 120)

      // Service description box
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
      ctx.fillRect(100, 180, canvas.width - 200, 200)

      // Service text
      ctx.fillStyle = "white"
      ctx.font = "24px Arial"
      const serviceText = posterData.service || "Your services description"
      ctx.fillText(serviceText, canvas.width / 2, 250)

      // Special offer
      if (posterData.special) {
        ctx.fillStyle = "#fbbf24" // yellow-400
        ctx.fillRect(200, 300, canvas.width - 400, 50)
        ctx.fillStyle = "black"
        ctx.font = "bold 20px Arial"
        ctx.fillText(`🎉 ${posterData.special}`, canvas.width / 2, 330)
      }

      // Location and contact
      ctx.fillStyle = "white"
      ctx.font = "20px Arial"
      ctx.fillText(`📍 ${posterData.location || "Your Location"}`, canvas.width / 2, 450)
      ctx.fillText(`📱 ${posterData.contact || "Your Contact"}`, canvas.width / 2, 480)

      // Hashtags
      ctx.font = "16px Arial"
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.fillText("#SupportLocal #Mzansi 🇿🇦", canvas.width / 2, 550)

      // Download the image
      const link = document.createElement("a")
      link.download = `${posterData.businessName || "business"}-poster.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error("Error exporting image:", error)
      alert("Error exporting image. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Marketing Tools</h2>
        <p className="text-gray-600">Create professional marketing materials for your business</p>
      </div>

      <Tabs defaultValue="poster" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="poster">Poster</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="poster">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-purple-600" />
                  Poster Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="e.g., Nomsa's Hair Salon"
                    value={posterData.businessName}
                    onChange={(e) => setPosterData((prev) => ({ ...prev, businessName: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="service">Service/Product</Label>
                  <Input
                    id="service"
                    placeholder="e.g., Hair styling, braids, and treatments"
                    value={posterData.service}
                    onChange={(e) => setPosterData((prev) => ({ ...prev, service: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Soweto, Johannesburg"
                    value={posterData.location}
                    onChange={(e) => setPosterData((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="contact">Contact Info</Label>
                  <Input
                    id="contact"
                    placeholder="e.g., 071 234 5678"
                    value={posterData.contact}
                    onChange={(e) => setPosterData((prev) => ({ ...prev, contact: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="special">Special Offer (Optional)</Label>
                  <Input
                    id="special"
                    placeholder="e.g., 20% off this weekend!"
                    value={posterData.special}
                    onChange={(e) => setPosterData((prev) => ({ ...prev, special: e.target.value }))}
                  />
                </div>

                <Button className="w-full" onClick={generateWhatsAppMessage}>
                  Generate Marketing Content
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Poster Preview
                  <div className="flex gap-2">
                    <Button onClick={exportAsImage} size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Image
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  ref={posterRef}
                  className="bg-gradient-to-br from-green-400 to-orange-400 rounded-lg p-6 text-white text-center min-h-[400px] flex flex-col justify-center"
                >
                  <h2 className="text-3xl font-bold mb-4">{posterData.businessName || "Your Business Name"}</h2>

                  <div className="bg-white/20 rounded-lg p-4 mb-4">
                    <p className="text-lg mb-2">{posterData.service || "Your services description"}</p>
                    {posterData.special && (
                      <div className="bg-yellow-400 text-black rounded-full px-4 py-2 font-bold">
                        🎉 {posterData.special}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="flex items-center justify-center gap-2">
                      📍 {posterData.location || "Your Location"}
                    </p>
                    <p className="flex items-center justify-center gap-2">📱 {posterData.contact || "Your Contact"}</p>
                  </div>

                  <div className="mt-4 text-sm opacity-90">#SupportLocal #Mzansi 🇿🇦</div>
                </div>
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                WhatsApp Message Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {whatsappMessage ? (
                <div>
                  <Label>Generated WhatsApp Message:</Label>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-2">
                    <pre className="whitespace-pre-wrap text-sm">{whatsappMessage}</pre>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button onClick={() => navigator.clipboard.writeText(whatsappMessage)} variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Message
                    </Button>
                    <Button
                      onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Share on WhatsApp
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Fill in your business details in the Poster tab to generate WhatsApp messages
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-blue-600" />
                Social Media Caption Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={generateSocialCaption} className="w-full">
                Generate Social Media Caption
              </Button>

              {socialCaption && (
                <div>
                  <Label>Generated Social Media Caption:</Label>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2">
                    <pre className="whitespace-pre-wrap text-sm">{socialCaption}</pre>
                  </div>
                  <Button
                    onClick={() => navigator.clipboard.writeText(socialCaption)}
                    variant="outline"
                    className="mt-4"
                  >
                    Copy Caption
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tuck Shop Special</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-100 rounded-lg p-4 text-center">
                  <h3 className="font-bold text-red-800">Weekend Special! 🎉</h3>
                  <p className="text-sm mt-2">2 for 1 on all cold drinks!</p>
                  <p className="text-xs mt-2">Valid Sat-Sun only</p>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Use Template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hair Salon Promo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-100 rounded-lg p-4 text-center">
                  <h3 className="font-bold text-purple-800">New Year, New Look! ✨</h3>
                  <p className="text-sm mt-2">Book now for January specials</p>
                  <p className="text-xs mt-2">Call to book your slot</p>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Use Template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Food Business</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-100 rounded-lg p-4 text-center">
                  <h3 className="font-bold text-orange-800">Fresh Daily! 🍽️</h3>
                  <p className="text-sm mt-2">Home-cooked meals ready</p>
                  <p className="text-xs mt-2">Order before 2pm</p>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
