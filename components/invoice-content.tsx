"use client"

import { InvoiceForm } from "@/components/invoice-form"
import { InvoicePreview } from "@/components/invoice-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useInvoice } from "@/components/invoice-provider"

export function InvoiceContent() {
  const { language } = useInvoice()

  return (
    <Tabs defaultValue="edit" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="edit">{language === "en" ? "Edit Invoice" : "កែសម្រួលវិក្កយបត្រ"}</TabsTrigger>
        <TabsTrigger value="preview">{language === "en" ? "Preview Invoice" : "មើលវិក្កយបត្រជាមុន"}</TabsTrigger>
      </TabsList>
      <TabsContent value="edit" className="space-y-4">
        <InvoiceForm />
      </TabsContent>
      <TabsContent value="preview" className="space-y-4">
        <InvoicePreview />
      </TabsContent>
    </Tabs>
  )
}

