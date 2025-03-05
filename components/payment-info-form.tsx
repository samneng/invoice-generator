"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useInvoice } from "@/components/invoice-provider"

export function PaymentInfoForm() {
  const { invoiceData, updateInvoiceData, language } = useInvoice()
  const { paymentInfo } = invoiceData

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    lang?: "en" | "km",
  ) => {
    const value = e.target.value
    if (lang) {
      updateInvoiceData({
        paymentInfo: {
          ...paymentInfo,
          [field]: {
            ...(typeof paymentInfo[field as keyof typeof paymentInfo] === "object"
              ? (paymentInfo[field as keyof typeof paymentInfo] as Record<string, string>)
              : { en: "", km: "" }),
            [lang]: value,
          },
        },
      })
    } else {
      updateInvoiceData({
        paymentInfo: {
          ...paymentInfo,
          [field]: value,
        },
      })
    }
  }


  const renderBilingualTextarea = (field: string, labelEn: string, labelKm: string) => {
    const value = paymentInfo[field as keyof typeof paymentInfo] as { en: string; km: string } | undefined
    return (
      <div className="space-y-2">
        <Label htmlFor={`${field}-${language}`}>{language === "en" ? labelEn : labelKm}</Label>
        {language === "en" ? (
          <Textarea
            id={`${field}-en`}
            name={`${field}-en`}
            value={value?.en || ""}
            onChange={(e) => handleChange(e, field, "en")}
            placeholder={`${labelEn}`}
            rows={3}
            className="mb-2"
          />
        ) : (
          <Textarea
            id={`${field}-km`}
            name={`${field}-km`}
            value={value?.km || ""}
            onChange={(e) => handleChange(e, field, "km")}
            placeholder={`${labelKm}`}
            rows={3}
          />
        )}
      </div>
    )
  }

  const renderBilingualInput = (field: string, labelEn: string, labelKm: string) => {
    const value = paymentInfo[field as keyof typeof paymentInfo] as { en: string; km: string } | undefined
    return (
      <div className="space-y-2">
        <Label htmlFor={`${field}-${language}`}>{language === "en" ? labelEn : labelKm}</Label>
        {language === "en" ? (
          <Input
            id={`${field}-en`}
            name={`${field}-en`}
            value={value?.en || ""}
            onChange={(e) => handleChange(e, field, "en")}
            placeholder={`${labelEn}`}
            className="mb-2"
          />
        ) : (
          <Input
            id={`${field}-km`}
            name={`${field}-km`}
            value={value?.km || ""}
            onChange={(e) => handleChange(e, field, "km")}
            placeholder={`${labelKm}`}
          />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {renderBilingualTextarea("notes", "Additional Notes", "កំណត់ចំណាំបន្ថែម")}
      {renderBilingualTextarea("terms", "Payment Terms", "លក្ខខណ្ឌនៃការទូទាត់")}
      <div className="space-y-4 rounded-md border-[hsl(var(--border))] p-4">
        <h3 className="font-medium">{language === "en" ? "Bank Details" : "ព័ត៌មានធនាគារ"}</h3>
        {renderBilingualInput("bankName", "Bank Name", "ឈ្មោះធនាគារ")}
        {renderBilingualInput("accountName", "Account Name", "ឈ្មោះគណនី")}
        <div className="space-y-2">
          <Label htmlFor="accountNumber">{language === "en" ? "Account Number" : "លេខគណនី"}</Label>
          <Input
            id="accountNumber"
            name="accountNumber"
            value={paymentInfo.accountNumber}
            onChange={(e) => handleChange(e, "accountNumber")}
            placeholder={language === "en" ? "Account number" : "លេខគណនី"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="swiftCode">{language === "en" ? "Swift Code" : "លេខកូដស្វីហ្វ"}</Label>
          <Input
            id="swiftCode"
            name="swiftCode"
            value={paymentInfo.swiftCode}
            onChange={(e) => handleChange(e, "swiftCode")}
            placeholder={language === "en" ? "Swift code" : "លេខកូដស្វីហ្វ"}
          />
        </div>
      </div>
    </div>
  )
}

