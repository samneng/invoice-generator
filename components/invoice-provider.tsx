"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export type Language = "en" | "km"

export type BilingualText = {
  en: string
  km: string
}

export type InvoiceItem = {
  id: string
  description: BilingualText
  quantity: number
  rate: number
  unit: BilingualText
}

export type InvoiceData = {
  fromDetails: {
    name: BilingualText
    address: BilingualText
    email: string
    phone: string
    vattin: string
    customFields: { key: BilingualText; value: BilingualText }[]
  }
  toDetails: {
    name: BilingualText
    address: BilingualText
    email: string
    phone: string
    poNumber: string
    quotationNumber: string
    customFields: { key: BilingualText; value: BilingualText }[]
  }
  invoiceDetails: {
    invoiceNumber: string
    invoiceDate: string
    dueDate: string
  }
  items: InvoiceItem[]
  paymentInfo: {
    notes: BilingualText
    terms: BilingualText
    bankName: BilingualText
    accountName: BilingualText
    accountNumber: string
    swiftCode: string
  }
  firstPaymentPercentage: number
}

type InvoiceContextType = {
  invoiceData: InvoiceData
  updateInvoiceData: (data: Partial<InvoiceData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  addItem: () => void
  updateItem: (id: string, item: Partial<InvoiceItem>) => void
  removeItem: (id: string) => void
  addCustomField: (section: "fromDetails" | "toDetails") => void
  removeCustomField: (section: "fromDetails" | "toDetails", index: number) => void
  updateCustomField: (
    section: "fromDetails" | "toDetails",
    index: number,
    field: { key: BilingualText; value: BilingualText },
  ) => void
  language: Language
  setLanguage: (lang: Language) => void
}

const defaultInvoiceData: InvoiceData = {
  fromDetails: {
    name: { en: "", km: "" },
    address: { en: "", km: "" },
    email: "",
    phone: "",
    vattin: "",
    customFields: [],
  },
  toDetails: {
    name: { en: "", km: "" },
    address: { en: "", km: "" },
    email: "",
    phone: "",
    poNumber: "",
    quotationNumber: "",
    customFields: [],
  },
  invoiceDetails: {
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
  },
  items: [
    {
      id: "1",
      description: { en: "", km: "" },
      quantity: 0,
      rate: 0,
      unit: { en: "", km: "" },
    },
  ],
  paymentInfo: {
    notes: { en: "", km: "" },
    terms: { en: "", km: "" },
    bankName: { en: "", km: "" },
    accountName: { en: "", km: "" },
    accountNumber: "",
    swiftCode: "",
  },
  firstPaymentPercentage: 0,
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined)

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData)
  const [currentStep, setCurrentStep] = useState(1)
  const [language, setLanguage] = useState<Language>("en")

  const updateInvoiceData = (data: Partial<InvoiceData>) => {
    setInvoiceData((prev) => ({
      ...prev,
      ...data,
      firstPaymentPercentage:
        data.firstPaymentPercentage !== undefined
          ? Math.max(0, Math.min(100, data.firstPaymentPercentage))
          : prev.firstPaymentPercentage,
    }))
  }

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Math.random().toString(36).substring(2, 9),
          description: { en: "", km: "" },
          quantity: 0,
          rate: 0,
          unit: { en: "", km: "" },
        },
      ],
    }))
  }

  const updateItem = (id: string, item: Partial<InvoiceItem>) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === id ? { ...i, ...item } : i)),
    }))
  }

  const removeItem = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== id),
    }))
  }

  const addCustomField = (section: "fromDetails" | "toDetails") => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        customFields: [...prev[section].customFields, { key: { en: "", km: "" }, value: { en: "", km: "" } }],
      },
    }))
  }

  const removeCustomField = (section: "fromDetails" | "toDetails", index: number) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        customFields: prev[section].customFields.filter((_, i) => i !== index),
      },
    }))
  }

  const updateCustomField = (
    section: "fromDetails" | "toDetails",
    index: number,
    field: { key: BilingualText; value: BilingualText },
  ) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        customFields: prev[section].customFields.map((f, i) => (i === index ? field : f)),
      },
    }))
  }

  return (
    <InvoiceContext.Provider
      value={{
        invoiceData,
        updateInvoiceData,
        currentStep,
        setCurrentStep,
        addItem,
        updateItem,
        removeItem,
        addCustomField,
        removeCustomField,
        updateCustomField,
        language,
        setLanguage,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  )
}

export function useInvoice() {
  const context = useContext(InvoiceContext)
  if (context === undefined) {
    throw new Error("useInvoice must be used within an InvoiceProvider")
  }
  return context
}

