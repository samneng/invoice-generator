"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useInvoice } from "@/components/invoice-provider"

export function SummaryForm() {
  const { invoiceData, updateInvoiceData, language } = useInvoice()
  const { items, firstPaymentPercentage } = invoiceData

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * Number(item.rate), 0)
  }

  const handleFirstPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    updateInvoiceData({ firstPaymentPercentage: value })
  }

  const subtotal = calculateSubtotal()
  const amountPaid = (subtotal * firstPaymentPercentage) / 100
  const remainingBalance = subtotal - amountPaid

  return (
    <div className="space-y-6">
      <div className="rounded-md border-[hsl(var(--border))] p-4">
        <h3 className="mb-2 font-medium">{language === "en" ? "Invoice Summary" : "សេចក្តីសង្ខេបវិក្កយបត្រ"}</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === "en" ? "Subtotal:" : "សរុបរង:"}</span>
            <span>${subtotal.toFixed(2)} USD</span>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="firstPayment" className="text-muted-foreground">
              {language === "en" ? "First Payment (%):" : "ការទូទាត់ដំបូង (%)៖"}
            </Label>
            <Input
              id="firstPayment"
              type="number"
              value={firstPaymentPercentage}
              onChange={handleFirstPaymentChange}
              className="w-20 text-right"
              min="0"
              max="100"
            />
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === "en" ? "Amount Paid:" : "ចំនួនទឹកប្រាក់បានបង់:"}</span>
            <span>${amountPaid.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>{language === "en" ? "Remaining Balance:" : "សមតុល្យនៅសល់:"}</span>
            <span>${remainingBalance.toFixed(2)} USD</span>
          </div>
        </div>
      </div>
    </div>
  )
}

