"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useInvoice } from "@/components/invoice-provider"
import { FromToForm } from "./from-to-form"
import { LineItemsForm } from "./line-items-form"
import { PaymentInfoForm } from "./payment-info-form"
import { SummaryForm } from "./summary-form"

export function InvoiceForm() {
  const { currentStep, setCurrentStep, language } = useInvoice()

  const handleTabChange = (value: string) => {
    setCurrentStep(Number.parseInt(value))
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs value={currentStep.toString()} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="1" className="text-xs sm:text-sm">
              {language === "en" ? "Bill Info" : "ព័ត៌មានវិក្កយបត្រ"}
            </TabsTrigger>
            <TabsTrigger value="2" className="text-xs sm:text-sm">
              {language === "en" ? "Items" : "ទំនិញ"}
            </TabsTrigger>
            <TabsTrigger value="3" className="text-xs sm:text-sm">
              {language === "en" ? "Payment Info" : "ព័ត៌មានការទូទាត់"}
            </TabsTrigger>
            <TabsTrigger value="4" className="text-xs sm:text-sm">
              {language === "en" ? "Summary" : "សង្ខេប"}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="1">
            <FromToForm />
          </TabsContent>
          <TabsContent value="2">
            <LineItemsForm />
          </TabsContent>
          <TabsContent value="3">
            <PaymentInfoForm />
          </TabsContent>
          <TabsContent value="4">
            <SummaryForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

