"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Bot, Lightbulb, Globe } from "lucide-react"

const quickQuestions = [
  "How do I register my business with CIPC?",
  "What is cash flow and why does it matter?",
  "Where can I apply for small business funding?",
  "Help me calculate profit from monthly sales",
  "Create a WhatsApp message to promote my services",
]

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "zu", name: "isiZulu", flag: "🇿🇦" },
  { code: "xh", name: "isiXhosa", flag: "🇿🇦" },
  { code: "af", name: "Afrikaans", flag: "🇿🇦" },
]

// Multilingual responses
const getLocalizedResponse = (question: string, language: string): string => {
  const lowerQuestion = question.toLowerCase()

  // CIPC Registration responses
  if (lowerQuestion.includes("cipc") || lowerQuestion.includes("register")) {
    switch (language) {
      case "zu":
        return `Ukubhalisa ibhizinisi lakho ku-CIPC:

1. Khetha uhlobo lwebhizinisi lakho (Pty Ltd, CC, njll.)
2. Gcina igama lenkampani ku-inthanethi
3. Gcwalisa amafomu okubhalisa
4. Khokha imali yokubhalisa (cishe R175-R500)
5. Thumela amadokhumenti adingekayo

Vakashela ku-www.cipc.co.za noma bashayele ku-086 100 2472.

Ngabe ufuna usizo ngisinyathelo esithile?`

      case "xh":
        return `Ukubhalisa ishishini lakho kwi-CIPC:

1. Khetha uhlobo lweshishini lakho (Pty Ltd, CC, njl.)
2. Gcina igama lenkampani kwi-intanethi
3. Gcwalisa iifom zokubhalisa
4. Hlawula imali yokubhalisa (malunga ne-R175-R500)
5. Thumela amaxwebhu afunekayo

Tyelela ku-www.cipc.co.za okanye ubafowunele ku-086 100 2472.

Ngaba ufuna uncedo kwinyathelo elithile?`

      case "af":
        return `Om jou besigheid by CIPC te registreer:

1. Kies jou besigheidsstruktuur (Pty Ltd, CC, ens.)
2. Reserveer 'n maatskappynaam aanlyn
3. Voltooi die registrasievorms
4. Betaal die registrasiefooi (ongeveer R175-R500)
5. Dien vereiste dokumente in

Besoek www.cipc.co.za of kontak hulle by 086 100 2472.

Wil jy hulp met enige spesifieke stap hê?`

      default:
        return `To register your business with CIPC:

1. Choose your business structure (Pty Ltd, CC, etc.)
2. Reserve a company name online
3. Complete the registration forms
4. Pay the registration fee (around R175-R500)
5. Submit required documents

Visit www.cipc.co.za or contact them at 086 100 2472.

Would you like help with any specific step?`
    }
  }

  // Cash flow responses
  if (lowerQuestion.includes("cash flow")) {
    switch (language) {
      case "zu":
        return `I-cash flow yimali engena naphuma ebhizinisini lakho.

💰 Imali Engena: Ukuthengisa, izinkokhelo ezitholiwe
💸 Imali Ephuma: Izindleko, ama-bili, amaholo

Kungani kubalulekile:
• Kubonisa ukuthi ungakwazi yini ukukhokha ama-bili
• Kusiza ukuhlela izikhathi eziphakeme/eziphansi
• Kuvimbela ukuphela kwemali
• Kubalulekile ukuthola izikweletu

Ithiphu: Landelela ukuthengisa nosizo lwansuku zonke ukuze uhlale phezu kwe-cash flow yakho!`

      case "xh":
        return `I-cash flow yimali engena naphuma kwishishini lakho.

💰 Imali Engena: Ukuthengisa, iintlawulo ezifunyenweyo
💸 Imali Ephuma: Iindleko, iiakhawunti, imivuzo

Kutheni ibalulekile:
• Ibonisa ukuba unokukwazi na ukuhlawula iiakhawunti
• Inceda ukucwangcisa amaxesha aphakamileyo/asezantsi
• Ithintela ukuphelelwa yimali
• Ibalulekile ekufumaneni iimali-mboleko

Icebiso: Landela ukuthengisa neendleko zemihla ngemihla ukuze uhlale phezu kwe-cash flow yakho!`

      case "af":
        return `Kontantvloei is die geld wat in en uit jou besigheid beweeg.

💰 Geld In: Verkope, betalings ontvang
💸 Geld Uit: Uitgawes, rekeninge, salarisse

Hoekom dit belangrik is:
• Wys of jy rekeninge kan betaal
• Help beplan vir besige/stil tydperke
• Voorkom dat jy sonder geld raak
• Noodsaaklik vir lenings

Wenk: Hou rekord van daaglikse verkope en uitgawes om bo-op jou kontantvloei te bly!`

      default:
        return `Cash flow is the money moving in and out of your business.

💰 Cash In: Sales, payments received
💸 Cash Out: Expenses, bills, salaries

Why it matters:
• Shows if you can pay bills
• Helps plan for busy/slow periods  
• Prevents running out of money
• Essential for getting loans

Tip: Track daily sales and expenses to stay on top of your cash flow!`
    }
  }

  // Funding responses
  if (lowerQuestion.includes("funding") || lowerQuestion.includes("loan")) {
    switch (language) {
      case "zu":
        return `Izinketho zoxhaso lwezimali zamabhizinisi amancane eNingizimu Afrika:

🏛️ Uhulumeni:
• I-SEFA (Small Enterprise Finance Agency)
• I-NYDA (National Youth Development Agency)
• I-IDC (Industrial Development Corporation)

🏪 Ezangasese:
• Business Partners Limited
• Khula Credit Guarantee
• Izikhungo zezikweletu ezincane

📋 Okudingayo:
• Uhlelo lwebhizinisi
• Izitatimende zezimali
• Amadokhumenti e-ID
• Ubufakazi bekheli

Qala nge-SEFA - banikeza izikweletu ezisuka ku-R1,000 kuya ku-R5 million!`

      case "xh":
        return `Iindlela zenkxaso-mali yamashishini amancane eMzantsi Afrika:

🏛️ Urhulumente:
• I-SEFA (Small Enterprise Finance Agency)
• I-NYDA (National Youth Development Agency)
• I-IDC (Industrial Development Corporation)

🏪 Zabucala:
• Business Partners Limited
• Khula Credit Guarantee
• Amaziko eemali-mboleko ezincinci

📋 Oko ukudingayo:
• Isicwangciso seshishini
• Iingxelo zemali
• Amaxwebhu e-ID
• Ubungqina bedilesi

Qala nge-SEFA - banikeza iimali-mboleko ukusuka kwi-R1,000 ukuya kwi-R5 million!`

      case "af":
        return `Suid-Afrikaanse befondsingsopsies vir klein besighede:

🏛️ Regering:
• SEFA (Small Enterprise Finance Agency)
• NYDA (National Youth Development Agency)
• IDC (Industrial Development Corporation)

🏪 Privaat:
• Business Partners Limited
• Khula Credit Guarantee
• Mikro-finansiële instellings

📋 Wat jy sal benodig:
• Besigheidsplan
• Finansiële state
• ID dokumente
• Bewys van adres

Begin met SEFA - hulle bied lenings van R1,000 tot R5 miljoen!`

      default:
        return `South African funding options for small businesses:

🏛️ Government:
• SEFA (Small Enterprise Finance Agency)
• NYDA (National Youth Development Agency)
• IDC (Industrial Development Corporation)

🏪 Private:
• Business Partners Limited
• Khula Credit Guarantee
• Micro-finance institutions

📋 What you'll need:
• Business plan
• Financial statements
• ID documents
• Proof of address

Start with SEFA - they offer loans from R1,000 to R5 million!`
    }
  }

  // Default response
  switch (language) {
    case "zu":
      return `Ngiyabonga ngombuzo wakho! Ngilapha ukusiza osomabhizinisi baseNingizimu Afrika baphumelele.

Ngingakusiza nge:
🏢 Ukubhalisa ibhizinisi nokuthobela imithetho
💰 Uxhaso lwezimali nohlelo lwezimali
📱 Ukumaketha nezinkundla zokuxhumana
📊 Ukubala inzuzo ne-cash flow
📋 Uhlelo lwebhizinisi namasu

Yisiphi isigaba osifuna usizo ngaso?`

    case "xh":
      return `Enkosi ngombuzo wakho! Ndikho apha ukunceda oosomashishini baseMzantsi Afrika baphumelele.

Ndingakunceda nge:
🏢 Ukubhalisa ishishini nokuthobela imithetho
💰 Inkxaso-mali nocwangciso lwemali
📱 Ukuthengisa kunye neendlela zonxibelelwano
📊 Ukubala inzuzo ne-cash flow
📋 Isicwangciso seshishini namaqhinga

Leliphi icandelo ofuna uncedo ngalo?`

    case "af":
      return `Dankie vir jou vraag! Ek is hier om Suid-Afrikaanse entrepreneurs te help slaag.

Ek kan help met:
🏢 Besigheidsregistrasie & nakoming
💰 Befondsing en finansiële beplanning
📱 Bemarking en sosiale media
📊 Berekening van wins en kontantvloei
📋 Besigheidsbeplanning en strategieë

Watter spesifieke area wil jy hulp mee hê?`

    default:
      return `Thanks for your question! I'm here to help South African entrepreneurs succeed.

I can assist with:
🏢 Business registration & compliance
💰 Funding and financial planning  
📱 Marketing and social media
📊 Calculating profits and cash flow
📋 Business planning and strategy

What specific area would you like help with?`
  }
}

export default function ChatInterface() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [demoMessages, setDemoMessages] = useState<Array<{ id: string; text: string; sender: "user" | "bot" }>>([])
  const [showChat, setShowChat] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [showQuickQuestions, setShowQuickQuestions] = useState(false)

  const getWelcomeMessage = (language: string): string => {
    switch (language) {
      case "zu":
        return "Sawubona! 👋 Siyakwamukela ku-Mzansi Business Buddy!\n\nNgilapha ukusiza ukuze ukhulise ibhizinisi lakho laseNingizimu Afrika. Ngingakusiza nge:\n\n🏢 Ukubhalisa ku-CIPC\n💰 Ukuthola uxhaso lwezimali\n📱 Amasu okumaketha\n📊 Uhlelo lwezimali\n\nNgingakusiza kanjani namuhla?"

      case "xh":
        return "Molo! 👋 Wamkelekile kwi-Mzansi Business Buddy!\n\nNdikho apha ukunceda ukhulise ishishini lakho laseMzantsi Afrika. Ndingakunceda nge:\n\n🏢 Ukubhalisa kwi-CIPC\n💰 Ukufumana inkxaso-mali\n📱 Amaqhinga okuthengisa\n📊 Ucwangciso lwemali\n\nNdingakunceda njani namhlanje?"

      case "af":
        return "Hallo! 👋 Welkom by Mzansi Business Buddy!\n\nEk is hier om jou te help om jou Suid-Afrikaanse besigheid te laat groei. Ek kan help met:\n\n🏢 CIPC registrasie\n💰 Befondsing vind\n📱 Bemarkingstrategieë\n📊 Finansiële beplanning\n\nHoe kan ek jou vandag help?"

      default:
        return "Sawubona! 👋 Welcome to Mzansi Business Buddy!\n\nI'm here to help you grow your South African business. I can assist with:\n\n🏢 CIPC registration\n💰 Finding funding\n📱 Marketing strategies\n📊 Financial planning\n\nHow can I help you today?"
    }
  }

  const startChat = () => {
    setShowChat(true)
    if (demoMessages.length === 0) {
      setDemoMessages([
        {
          id: "1",
          text: getWelcomeMessage(selectedLanguage),
          sender: "bot",
        },
      ])
    }
  }

  const sendQuickQuestion = (question: string) => {
    setShowChat(true)
    const userMessage = { id: Date.now().toString(), text: question, sender: "user" as const }
    const botResponse = {
      id: (Date.now() + 1).toString(),
      text: getLocalizedResponse(question, selectedLanguage),
      sender: "bot" as const,
    }

    setDemoMessages((prev) => [...prev, userMessage, botResponse])
    setShowQuickQuestions(false)
  }

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = { id: Date.now().toString(), text: inputValue, sender: "user" as const }
    const botResponse = {
      id: (Date.now() + 1).toString(),
      text: getLocalizedResponse(inputValue, selectedLanguage),
      sender: "bot" as const,
    }

    setDemoMessages((prev) => [...prev, userMessage, botResponse])
    setInputValue("")
  }

  // Update welcome message when language changes
  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage)
    if (showChat && demoMessages.length > 0) {
      // Update the welcome message
      const updatedMessages = [...demoMessages]
      updatedMessages[0] = {
        ...updatedMessages[0],
        text: getWelcomeMessage(newLanguage),
      }
      setDemoMessages(updatedMessages)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-green-500" />
            Mzansi Business Buddy
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">DEMO</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {!showChat ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Bot className="h-10 w-10 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedLanguage === "zu" && "Sawubona! 👋 Siyakwamukela"}
                      {selectedLanguage === "xh" && "Molo! 👋 Wamkelekile"}
                      {selectedLanguage === "af" && "Hallo! 👋 Welkom"}
                      {selectedLanguage === "en" && "Sawubona! 👋 Welcome to your Business Buddy"}
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      {selectedLanguage === "zu" &&
                        "Ngilapha ukusiza ukuze ukhulise ibhizinisi lakho laseNingizimu Afrika. Buza noma yini mayelana nokubhalisa, uxhaso lwezimali, ukumaketha, noma ukuthobela imithetho!"}
                      {selectedLanguage === "xh" &&
                        "Ndikho apha ukunceda ukhulise ishishini lakho laseMzantsi Afrika. Buza nantoni na malunga nokubhalisa, inkxaso-mali, ukuthengisa, okanye ukuthobela imithetho!"}
                      {selectedLanguage === "af" &&
                        "Ek is hier om jou te help om jou Suid-Afrikaanse besigheid te laat groei. Vra my enigiets oor registrasie, befondsing, bemarking, of nakoming!"}
                      {selectedLanguage === "en" &&
                        "I'm here to help you grow your South African business. Ask me anything about registration, funding, marketing, or compliance!"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={startChat}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    {selectedLanguage === "zu" && "Qala Ukuxoxa"}
                    {selectedLanguage === "xh" && "Qala Ukuncokola"}
                    {selectedLanguage === "af" && "Begin Gesels"}
                    {selectedLanguage === "en" && "Start Chatting"}
                  </Button>

                  <Button onClick={() => setShowQuickQuestions(!showQuickQuestions)} variant="outline" size="sm">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {selectedLanguage === "zu" && "Imibuzo Esheshayo"}
                    {selectedLanguage === "xh" && "Imibuzo Ekhawulezayo"}
                    {selectedLanguage === "af" && "Vinnige Vrae"}
                    {selectedLanguage === "en" && "Quick Questions"}
                  </Button>

                  {showQuickQuestions && (
                    <div className="space-y-2 max-w-md mx-auto">
                      {quickQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full text-left h-auto p-3 text-sm bg-transparent hover:bg-green-50"
                          onClick={() => sendQuickQuestion(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Lightbulb className="h-4 w-4" />
                    <span>
                      {selectedLanguage === "zu" && "Umsizi Webhizinisi Onesiphiwo se-AI • Uyatholakala 24/7"}
                      {selectedLanguage === "xh" && "Umncedisi Weshishini One-AI • Uyafumaneka 24/7"}
                      {selectedLanguage === "af" && "AI-Aangedrewe Besigheidsassistent • Beskikbaar 24/7"}
                      {selectedLanguage === "en" && "AI-Powered Business Assistant • Available 24/7"}
                    </span>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-8">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-1">🏢</div>
                    <div className="text-xs font-medium">
                      {selectedLanguage === "zu" && "Ukubhalisa Ibhizinisi"}
                      {selectedLanguage === "xh" && "Ukubhalisa Ishishini"}
                      {selectedLanguage === "af" && "Besigheidsregistrasie"}
                      {selectedLanguage === "en" && "Business Registration"}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-1">💰</div>
                    <div className="text-xs font-medium">
                      {selectedLanguage === "zu" && "Izinketho Zoxhaso"}
                      {selectedLanguage === "xh" && "Iindlela Zenkxaso"}
                      {selectedLanguage === "af" && "Befondsingsopsies"}
                      {selectedLanguage === "en" && "Funding Options"}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-1">📊</div>
                    <div className="text-xs font-medium">
                      {selectedLanguage === "zu" && "Uhlelo Lwezimali"}
                      {selectedLanguage === "xh" && "Ucwangciso Lwemali"}
                      {selectedLanguage === "af" && "Finansiële Beplanning"}
                      {selectedLanguage === "en" && "Financial Planning"}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl mb-1">📱</div>
                    <div className="text-xs font-medium">
                      {selectedLanguage === "zu" && "Usizo Lokumaketha"}
                      {selectedLanguage === "xh" && "Uncedo Lokuthengisa"}
                      {selectedLanguage === "af" && "Bemarkingshulp"}
                      {selectedLanguage === "en" && "Marketing Help"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Chat Interface
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4">
                {demoMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={
                      selectedLanguage === "zu"
                        ? "Buza ngibhizinisi lakho..."
                        : selectedLanguage === "xh"
                          ? "Buza ngeshishini lakho..."
                          : selectedLanguage === "af"
                            ? "Vra my oor jou besigheid..."
                            : "Ask me about your business..."
                    }
                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        sendMessage()
                      }
                    }}
                  />
                  <Button onClick={sendMessage} disabled={!inputValue.trim()}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
