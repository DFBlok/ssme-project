"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

const complianceSteps = [
  {
    title: "Choose Business Structure",
    description: "Decide between Sole Proprietorship, Partnership, or Company",
    status: "required",
    timeframe: "Day 1",
  },
  {
    title: "Register with CIPC",
    description: "Companies and Intellectual Property Commission registration",
    status: "required",
    timeframe: "1-2 weeks",
  },
  {
    title: "Get Tax Number",
    description: "Register for income tax with SARS",
    status: "required",
    timeframe: "1 week",
  },
  {
    title: "VAT Registration",
    description: "Required if turnover exceeds R1 million annually",
    status: "conditional",
    timeframe: "When needed",
  },
  {
    title: "UIF Registration",
    description: "Unemployment Insurance Fund for employees",
    status: "conditional",
    timeframe: "When hiring",
  },
]

const taxDeadlines = [
  { type: "Personal Income Tax", deadline: "31 October", description: "Annual tax return submission" },
  { type: "Provisional Tax", deadline: "31 August & 28 February", description: "Bi-annual payments" },
  { type: "VAT Returns", deadline: "25th of each month", description: "Monthly VAT submissions" },
  { type: "PAYE", deadline: "7th of each month", description: "Employee tax deductions" },
]

export default function ComplianceGuide() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Compliance Guide</h2>
        <p className="text-gray-600">Stay compliant with South African business regulations</p>
      </div>

      <Tabs defaultValue="registration" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="tax">Tax & SARS</TabsTrigger>
          <TabsTrigger value="bee">B-BBEE</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="registration">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Business Registration Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        {step.status === "required" ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{step.title}</h3>
                          <Badge variant={step.status === "required" ? "destructive" : "secondary"}>
                            {step.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                        <p className="text-xs text-gray-500">Timeframe: {step.timeframe}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Useful Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  CIPC Online Registration
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  SARS eFiling
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  Department of Labour
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tax">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tax Deadlines 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taxDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{deadline.type}</h3>
                        <p className="text-sm text-gray-600">{deadline.description}</p>
                      </div>
                      <Badge variant="outline" className="text-red-600 border-red-200">
                        {deadline.deadline}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Tips for Small Business</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Keep All Receipts</h4>
                      <p className="text-sm text-gray-600">
                        Save receipts for business expenses - they're tax deductible
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Separate Business & Personal</h4>
                      <p className="text-sm text-gray-600">
                        Use separate bank accounts for business and personal expenses
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Track Monthly Income</h4>
                      <p className="text-sm text-gray-600">
                        Monitor if you're approaching VAT registration threshold (R1M)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bee">
          <Card>
            <CardHeader>
              <CardTitle>B-BBEE Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">What is B-BBEE?</h3>
                  <p className="text-sm text-blue-700">
                    Broad-Based Black Economic Empowerment is a policy to advance economic transformation and enhance
                    the economic participation of black people in the South African economy.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">EME Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">Exempted Micro Enterprise</p>
                      <p className="text-xs text-gray-600">Annual turnover ≤ R10 million</p>
                      <Badge className="mt-2">Level 4 Contributor</Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">QSE Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">Qualifying Small Enterprise</p>
                      <p className="text-xs text-gray-600">Annual turnover R10M - R50M</p>
                      <Badge variant="secondary" className="mt-2">
                        Requires Scorecard
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                <Button className="w-full">Get B-BBEE Certificate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist">
          <Card>
            <CardHeader>
              <CardTitle>Business Compliance Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Business name reserved with CIPC",
                  "Company/CC registered with CIPC",
                  "Tax number obtained from SARS",
                  "Bank account opened for business",
                  "Business insurance obtained",
                  "Municipal trading license (if required)",
                  "Industry-specific licenses obtained",
                  "VAT registration (if applicable)",
                  "UIF registration (if hiring employees)",
                  "Workers' compensation registration",
                  "B-BBEE certificate obtained",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 border rounded">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">💡 Pro Tip:</h4>
                <p className="text-sm text-green-700">
                  Don't try to do everything at once! Start with the essentials (business registration, tax number, bank
                  account) and add other requirements as your business grows.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
