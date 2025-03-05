"use client"

import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useInvoice } from "@/components/invoice-provider"
import { Download, FileText, Printer } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export function InvoicePreview() {
  const { invoiceData, language } = useInvoice()
  const { fromDetails, toDetails, invoiceDetails, items, paymentInfo, firstPaymentPercentage } = invoiceData
  const invoiceRef = useRef<HTMLDivElement>(null)

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * Number(item.rate), 0)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
        .replace(/\//g, "/")
    } catch {
      return ""
    }
  }

  const getText = (text: { en: string; km: string }) => {
    return language === "en" ? text.en : text.km
  }

  const handleGeneratePDF = async () => {
    if (!invoiceRef.current) return

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      logging: false,
      useCORS: true,
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgProps = pdf.getImageProperties(imgData)
    const imgWidth = pdfWidth
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width

    let position = 0
    while (position < imgHeight) {
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      position += pdfHeight
      if (position < imgHeight) {
        pdf.addPage()
      }
    }

    pdf.save("invoice.pdf")
  }

  const handlePrint = () => {
    window.print()
  }

  const subtotal = calculateSubtotal()
  const amountPaid = (subtotal * firstPaymentPercentage) / 100
  const remainingBalance = subtotal - amountPaid

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <CardContent className="print:shadow-none print-section space-y-6" ref={invoiceRef}>
          {/* Header with name */}
          <div className="text-center">
            <h2 className="text-4xl font-bold">{getText(fromDetails.name)}</h2>
            <p className="mt-5">{getText(fromDetails.address)}</p>
            {fromDetails.phone && (
              <p>
                {language === "en" ? "Phone Number:" : "លេខទូរស័ព្ទ:"} {fromDetails.phone}
              </p>
            )}
          </div>

          {/* Invoice title */}
          <div className="text-center my-6">
            <h1 className="text-3xl font-bold">{language === "en" ? "Invoice" : "វិក្កយបត្រ"}</h1>
          </div>

          {/* Two-column layout for customer details */}
          <div className="flex justify-between">
            <div>
              {(toDetails.name.en || toDetails.name.km) && (
                <div className="flex flex-row gap-2">
                  <p className="font-medium w-[200px]">{language === "en" ? "Company name" : "ឈ្មោះក្រុមហ៊ុន"}</p>
                  <p>:</p>
                  <p className="text-left">{getText(toDetails.name)}</p>
                </div>
              )}
              {toDetails.phone && (
                <div className="flex flex-row gap-2">
                  <p className="font-medium w-[200px]">{language === "en" ? "Phone" : "ទូរស័ព្ទ"}</p>
                  <p>:</p>
                  <p className="text-left">{toDetails.phone}</p>
                </div>
              )}
              {(toDetails.address.en || toDetails.address.km) && (
                <div className="flex flex-row gap-2">
                  <p className="font-medium w-[200px]">{language === "en" ? "Address" : "អាសយដ្ឋាន"}</p>
                  <p>:</p>
                  <p className="text-left" style={{ whiteSpace: "pre-wrap" }}>{getText(toDetails.address)}</p>
                </div>
              )}
              {fromDetails.vattin && (
                <div className="flex flex-row gap-2">
                  <p className="font-medium w-[200px]">{language === "en" ? "VATTIN" : "លេខអត្តសញ្ញាណកម្មសារពើពន្ធ"}</p>
                  <p>:</p>
                  <p className="text-left" style={{ whiteSpace: "pre-wrap" }}>{fromDetails.vattin}</p>
                </div>
              )}
            </div>
            <div>
              {invoiceDetails.invoiceNumber && (
                <div className="flex flex-row gap-2">
                  <p className="font-medium w-[200px]">{language === "en" ? "Invoice Number" : "លេខវិក្កយបត្រ"}</p>
                  <p>:</p>
                  <p className="text-left">{invoiceDetails.invoiceNumber}</p>
                </div>
              )}

              {invoiceDetails.invoiceDate && (
                <div className="flex flex-row gap-2">
                  <p className="font-medium w-[200px]">{language === "en" ? "Invoice Date" : "កាលបរិច្ឆេទវិក្កយបត្រ"}</p>
                  <p>:</p>
                  <p>{formatDate(invoiceDetails.invoiceDate)}</p>
                </div>
              )}

              {invoiceDetails.dueDate && (
                <div className="flex flex-row gap-2">
                  <p className="font-medium w-[200px]">{language === "en" ? "Due Date" : "កាលបរិច្ឆេទបង់ប្រាក់"}</p>
                  <p>:</p>
                  <p>{formatDate(invoiceDetails.dueDate)}</p>
                </div>
              )}

              {toDetails.quotationNumber && (
                <div className="flex flex-row gap-2">
                  <p className="font-medium w-[200px]">{language === "en" ? "Quotation Number" : "លេខសម្រង់តម្លៃ"}</p>
                  <p>:</p>
                  <p>{toDetails.quotationNumber}</p>
                </div>
              )}

              {toDetails.poNumber && (
                <div className="flex flex-row gap-2">
                  <p className="font-medium w-[200px]">{language === "en" ? "PO Number" : "លេខបញ្ជាទិញ"}</p>
                  <p>:</p>
                  <p>{toDetails.poNumber}</p>
                </div>
              )}
            </div>
          </div>

          {/* Items table */}
          <Table className="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] py-4">{language === "en" ? "No" : "ល.រ"}</TableHead>
                <TableHead className="w-[50%] py-4">
                  {language === "en" ? "Description of goods or service" : "បរិយាយទំនិញឬសេវាកម្ម"}
                </TableHead>
                <TableHead className="py-4">{language === "en" ? "Quantity" : "បរិមាណ"}</TableHead>
                <TableHead className="py-4">{language === "en" ? "Unit price" : "តម្លៃឯកតា"}</TableHead>
                <TableHead className="text-right py-4">{language === "en" ? "Amounts" : "ចំនួនទឹកប្រាក់"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="align-middle py-4">{index + 1}</TableCell>
                  <TableCell className="align-middle py-4">{getText(item.description)}</TableCell>
                  <TableCell className="align-middle py-4">{item.quantity}</TableCell>
                  <TableCell className="align-middle py-4">$ {Number(item.rate).toFixed(2)}</TableCell>
                  <TableCell className="text-right align-middle py-4">$ {(item.quantity * Number(item.rate)).toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} className="text-right font-medium py-4">
                  {language === "en" ? "Subtotal:" : "សរុបរង:"}
                </TableCell>
                <TableCell className="text-right font-medium py-4">$ {subtotal.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} className="text-right py-4">
                  {language === "en" ? "First Payment:" : "ការទូទាត់ដំបូង:"}
                </TableCell>
                <TableCell className="text-right py-4">$ {amountPaid.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} className="text-right font-medium py-4">
                  {language === "en" ? "Remaining Balance:" : "សមតុល្យនៅសល់:"}
                </TableCell>
                <TableCell className="text-right font-medium py-4">$ {remainingBalance.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Notes section */}
          <div className="flex justify-between">
            <div className="note-term">
              {paymentInfo.notes.en || paymentInfo.notes.km && (
                <div>
                  <p className="font-medium">{language === "en" ? "Note:" : "ចំណាំ:"}</p>
                  <p className="text-md">{getText(paymentInfo.notes)}</p>
                </div>
              )}
              {paymentInfo.terms.en || paymentInfo.terms.km && (
                <div className="mt-6">
                  <p className="font-medium">{language === "en" ? "Payment Terms:" : "លក្ខ័ណបង់ប្រាក់:"}</p>
                  <p className="text-md">{getText(paymentInfo.terms)}</p>
                </div>
              )}
            </div>
            <div>
              <p className="font-medium">{language === "en" ? "Signature:" : "ហត្ថលេខា:"}</p>
              <div className="mt-28 border-t border-dashed w-48"></div>
            </div>
          </div>

          {/* Signature and bank details in two columns */}
          {paymentInfo.bankName.en || paymentInfo.bankName.km && (
            <div className="flex justify-end mt-8">
              <div>
                <p className="font-medium mb-2">{language === "en" ? "Bank Details:" : "ព័ត៌មានធនាគារ:"}</p>
                <div className="text-md space-y-1">
                  <p>
                    {language === "en" ? "Bank Name:" : "ឈ្មោះធនាគារ:"} {getText(paymentInfo.bankName)}
                  </p>
                  <p>
                    {language === "en" ? "Bank Number:" : "លេខគណនីធនាគារ:"} {paymentInfo.accountNumber}
                  </p>
                  <p>
                    {language === "en" ? "Account Name:" : "ឈ្មោះគណនី:"} {getText(paymentInfo.accountName)}
                  </p>
                  <p>
                    {language === "en" ? "Swift Code:" : "លេខកូដស្វីហ្វ:"} {paymentInfo.swiftCode}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Custom fields */}
          {fromDetails.customFields.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <p className="font-medium mb-2">{language === "en" ? "Additional Information:" : "ព័ត៌មានបន្ថែម:"}</p>
              <div className="grid grid-cols-2 gap-2">
                {fromDetails.customFields.map((field, index) => (
                  <div key={index} className="flex">
                    <span className="font-medium mr-2">{getText(field.key)}:</span>
                    <span>{getText(field.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generate PDF button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" disabled className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          {language === "en" ? "Save as Draft" : "រក្សាទុកជាសេចក្តីព្រាង"}
        </Button>
        <Button variant="outline" className="flex items-center" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          {language === "en" ? "Print Invoice" : "បោះពុម្ពវិក្កយបត្រ"}
        </Button>
        <Button onClick={handleGeneratePDF} className="bg-slate-900 dark:bg-slate-300 text-white dark:text-slate-900 dark:hover:bg-slate-50">
          <Download className="mr-2 h-4 w-4" />
          {language === "en" ? "Generate PDF" : "បង្កើត PDF"}
        </Button>
      </div>
    </div>
  )
}

