"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useInvoice } from "@/components/invoice-provider"
import { Plus, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function FromToForm() {
  const { invoiceData, updateInvoiceData, addCustomField, removeCustomField, updateCustomField, language } =
    useInvoice()
  const { fromDetails, toDetails } = invoiceData

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string, lang?: "en" | "km") => {
    const value = e.target.value
    if (lang) {
      updateInvoiceData({
        fromDetails: {
          ...fromDetails,
          [field]: {
            ...(typeof fromDetails[field as keyof typeof fromDetails] === "object"
              ? (fromDetails[field as keyof typeof fromDetails] as Record<string, string>)
              : { en: "", km: "" }),
            [lang]: value,
          },
        },
      })
    } else {
      updateInvoiceData({
        fromDetails: {
          ...fromDetails,
          [field]: value,
        },
      })
    }
  }

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string, lang?: "en" | "km") => {
    const value = e.target.value
    if (lang) {
      updateInvoiceData({
        toDetails: {
          ...toDetails,
          [field]: {
            ...(typeof toDetails[field as keyof typeof toDetails] === "object"
              ? (toDetails[field as keyof typeof toDetails] as Record<string, string>)
              : { en: "", km: "" }),
            [lang]: value,
          },
        },
      })
    } else {
      updateInvoiceData({
        toDetails: {
          ...toDetails,
          [field]: value,
        },
      })
    }
  }

  const renderBilingualInput = (section: "from" | "to", field: string, labelEn: string, labelKm: string) => {
    const details = section === "from" ? fromDetails : toDetails
    const handleChange = section === "from" ? handleFromChange : handleToChange
    const value = details[field as keyof typeof details] as { en: string; km: string } | undefined
    return (
      <div className="space-y-2">
        <Label htmlFor={`${section}-${field}-${language}`}>{language === "en" ? labelEn : labelKm}:</Label>
        {language === "en" ? (
          <Input
            id={`${section}-${field}-en`}
            name={`${field}-en`}
            value={value?.en || ""}
            onChange={(e) => handleChange(e, field, "en")}
            placeholder={`${labelEn}`}
            className="mb-2"
          />
        ) : (
          <Input
            id={`${section}-${field}-km`}
            name={`${field}-km`}
            value={value?.km || ""}
            onChange={(e) => handleChange(e, field, "km")}
            placeholder={`${labelKm}`}
          />
        )}
      </div>
    )
  }

  const renderBilingualTextarea = (section: "from" | "to", field: string, labelEn: string, labelKm: string) => {
    const details = section === "from" ? fromDetails : toDetails
    const handleChange = section === "from" ? handleFromChange : handleToChange
    const value = details[field as keyof typeof details] as { en: string; km: string } | undefined
    return (
      <div className="space-y-2">
        <Label htmlFor={`${section}-${field}-${language}`}>{language === "en" ? labelEn : labelKm}:</Label>
        {language === "en" ? (
          <Textarea
            id={`${section}-${field}-en`}
            name={`${field}-en`}
            value={value?.en || ""}
            onChange={(e) => handleChange(e, field, "en")}
            placeholder={`${labelEn}`}
            className="mb-2"
            rows={3}
          />
        ) : (
          <Textarea
            id={`${section}-${field}-km`}
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

  const handleInvoiceDetailsChange = (field: string, value: string) => {
    updateInvoiceData({
      invoiceDetails: {
        ...invoiceData.invoiceDetails,
        [field]: value,
      },
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h3 className="mb-4 text-lg font-medium">{language === "en" ? "Bill From:" : "វិក្កយបត្រពី៖"}</h3>
        <div className="space-y-4">
          {renderBilingualInput("from", "name", "Name", "ឈ្មោះ")}
          <div className="space-y-2">
            <Label htmlFor="from-phone">{language === "en" ? "Phone:" : "ទូរស័ព្ទ៖"}</Label>
            <Input
              id="from-phone"
              name="phone"
              value={fromDetails.phone}
              onChange={(e) => handleFromChange(e, "phone")}
              placeholder={language === "en" ? "Your phone number" : "លេខទូរស័ព្ទរបស់អ្នក"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from-email">{language === "en" ? "Email:" : "អ៊ីមែល៖"}</Label>
            <Input
              id="from-email"
              name="email"
              value={fromDetails.email}
              onChange={(e) => handleFromChange(e, "email")}
              placeholder={language === "en" ? "Your email" : "អ៊ីមែលរបស់អ្នក"}
            />
          </div>
          {renderBilingualTextarea("from", "address", "Address", "អាសយដ្ឋាន")}
          <div className="space-y-2">
            <Label htmlFor="invoiceNumber">{language === "en" ? "Invoice Number:" : "លេខវិក្កយបត្រ៖"}</Label>
            <Input
              id="invoiceNumber"
              value={invoiceData.invoiceDetails.invoiceNumber}
              onChange={(e) => handleInvoiceDetailsChange("invoiceNumber", e.target.value)}
              placeholder={language === "en" ? "Enter invoice number" : "បញ្ចូលលេខវិក្កយបត្រ"}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">{language === "en" ? "Invoice Date:" : "កាលបរិច្ឆេទវិក្កយបត្រ៖"}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !invoiceData.invoiceDetails.invoiceDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {invoiceData.invoiceDetails.invoiceDate ? (
                      format(new Date(invoiceData.invoiceDetails.invoiceDate), "PPP")
                    ) : (
                      <span>{language === "en" ? "Pick a date" : "ជ្រើសរើសកាលបរិច្ឆេទ"}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      invoiceData.invoiceDetails.invoiceDate
                        ? new Date(invoiceData.invoiceDetails.invoiceDate)
                        : undefined
                    }
                    onSelect={(date) => handleInvoiceDetailsChange("invoiceDate", date ? date.toISOString() : "")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">{language === "en" ? "Due Date:" : "កាលបរិច្ឆេទបង់ប្រាក់៖"}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !invoiceData.invoiceDetails.dueDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {invoiceData.invoiceDetails.dueDate ? (
                      format(new Date(invoiceData.invoiceDetails.dueDate), "PPP")
                    ) : (
                      <span>{language === "en" ? "Pick a date" : "ជ្រើសរើសកាលបរិច្ឆេទ"}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      invoiceData.invoiceDetails.dueDate ? new Date(invoiceData.invoiceDetails.dueDate) : undefined
                    }
                    onSelect={(date) => handleInvoiceDetailsChange("dueDate", date ? date.toISOString() : "")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {fromDetails.customFields.map((field, index) => (
            <div key={index} className="space-y-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder={language === "en" ? "Field name (English)" : "ឈ្មោះវាល (ភាសាអង់គ្លេស)"}
                    value={field.key.en}
                    onChange={(e) =>
                      updateCustomField("fromDetails", index, {
                        key: { ...field.key, en: e.target.value },
                        value: field.value,
                      })
                    }
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder={language === "en" ? "Value (English)" : "តម្លៃ (ភាសាអង់គ្លេស)"}
                    value={field.value.en}
                    onChange={(e) =>
                      updateCustomField("fromDetails", index, {
                        key: field.key,
                        value: { ...field.value, en: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder={language === "en" ? "Field name (Khmer)" : "ឈ្មោះវាល (ភាសាខ្មែរ)"}
                    value={field.key.km}
                    onChange={(e) =>
                      updateCustomField("fromDetails", index, {
                        key: { ...field.key, km: e.target.value },
                        value: field.value,
                      })
                    }
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder={language === "en" ? "Value (Khmer)" : "តម្លៃ (ភាសាខ្មែរ)"}
                    value={field.value.km}
                    onChange={(e) =>
                      updateCustomField("fromDetails", index, {
                        key: field.key,
                        value: { ...field.value, km: e.target.value },
                      })
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCustomField("fromDetails", index)}
                  className="h-10 w-10 shrink-0 border-[hsl(var(--border))]"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="mt-2 flex items-center"
            onClick={() => addCustomField("fromDetails")}
          >
            <Plus className="mr-2 h-4 w-4" /> {language === "en" ? "Add Custom Input" : "បន្ថែមការបញ្ចូលផ្ទាល់ខ្លួន"}
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-medium">{language === "en" ? "Bill To:" : "វិក្កយបត្រទៅ៖"}</h3>
        <div className="space-y-4">
          {renderBilingualInput("to", "name", "Receiver Name", "ឈ្មោះរបស់អ្នកទទួល")}
          <div className="space-y-2">
            <Label htmlFor="to-phone">{language === "en" ? "Receiver Phone:" : "លេខទូរស័ព្ទរបស់អ្នកទទួល៖"}</Label>
            <Input
              id="to-phone"
              name="phone"
              value={toDetails.phone}
              onChange={(e) => handleToChange(e, "phone")}
              placeholder={language === "en" ? "Receiver phone number" : "លេខទូរស័ព្ទរបស់អ្នកទទួល"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to-email">{language === "en" ? "Receiver Email:" : "អ៊ីមែលរបស់អ្នកទទួល៖"}</Label>
            <Input
              id="to-email"
              name="email"
              value={toDetails.email}
              onChange={(e) => handleToChange(e, "email")}
              placeholder={language === "en" ? "Receiver email" : "អ៊ីមែលរបស់អ្នកទទួល"}
            />
          </div>
          {renderBilingualTextarea("to", "address", "Receiver Address", "អាសយដ្ឋានរបស់អ្នកទទួល")}
          <div className="space-y-2">
            <Label htmlFor="from-vattin">{language === "en" ? "VATTIN:" : "លេខអត្តសញ្ញាណកម្មសារពើពន្ធ៖"}</Label>
            <Input
              id="from-vattin"
              name="vattin"
              value={fromDetails.vattin}
              onChange={(e) => handleFromChange(e, "vattin")}
              placeholder={language === "en" ? "Your VAT/TIN number" : "លេខអត្តសញ្ញាណកម្មសារពើពន្ធរបស់អ្នក"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to-poNumber">{language === "en" ? "PO Number:" : "លេខបញ្ជាទិញ៖"}</Label>
            <Input
              id="to-poNumber"
              name="poNumber"
              value={toDetails.poNumber}
              onChange={(e) => handleToChange(e, "poNumber")}
              placeholder={language === "en" ? "Purchase Order Number" : "លេខបញ្ជាទិញ"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to-quotationNumber">{language === "en" ? "Quotation Number:" : "លេខសម្រង់តម្លៃ៖"}</Label>
            <Input
              id="to-quotationNumber"
              name="quotationNumber"
              value={toDetails.quotationNumber}
              onChange={(e) => handleToChange(e, "quotationNumber")}
              placeholder={language === "en" ? "Quotation Number" : "លេខសម្រង់តម្លៃ"}
            />
          </div>
          {toDetails.customFields.map((field, index) => (
            <div key={index} className="space-y-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder={language === "en" ? "Field name (English)" : "ឈ្មោះវាល (ភាសាអង់គ្លេស)"}
                    value={field.key.en}
                    onChange={(e) =>
                      updateCustomField("toDetails", index, {
                        key: { ...field.key, en: e.target.value },
                        value: field.value,
                      })
                    }
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder={language === "en" ? "Value (English)" : "តម្លៃ (ភាសាអង់គ្លេស)"}
                    value={field.value.en}
                    onChange={(e) =>
                      updateCustomField("toDetails", index, {
                        key: field.key,
                        value: { ...field.value, en: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder={language === "en" ? "Field name (Khmer)" : "ឈ្មោះវាល (ភាសាខ្មែរ)"}
                    value={field.key.km}
                    onChange={(e) =>
                      updateCustomField("toDetails", index, {
                        key: { ...field.key, km: e.target.value },
                        value: field.value,
                      })
                    }
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder={language === "en" ? "Value (Khmer)" : "តម្លៃ (ភាសាខ្មែរ)"}
                    value={field.value.km}
                    onChange={(e) =>
                      updateCustomField("toDetails", index, {
                        key: field.key,
                        value: { ...field.value, km: e.target.value },
                      })
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCustomField("toDetails", index)}
                  className="h-10 w-10 shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

