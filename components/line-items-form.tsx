"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useInvoice } from "@/components/invoice-provider"
import { Plus, Trash2 } from "lucide-react"

export function LineItemsForm() {
  const { invoiceData, addItem, updateItem, removeItem, language } = useInvoice()
  const { items } = invoiceData

  const handleItemChange = (id: string, field: string, value: string | number, lang?: "en" | "km") => {
    const item = items.find((item) => item.id === id)
    if (lang) {
      updateItem(id, {
        [field]: {
          ...(typeof item?.[field as keyof typeof item] === "object"
            ? (item[field as keyof typeof item] as Record<string, string>)
            : { en: "", km: "" }),
          [lang]: value,
        },
      })
    } else if (field === "quantity" || field === "rate") {
      updateItem(id, { [field]: Number(value) || 0 })
    } else {
      updateItem(id, { [field]: value })
    }
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">{language === "en" ? "No" : "ល.រ"}</TableHead>
            <TableHead className="w-[50%]">
              {language === "en" ? "Description of goods or service" : "បរិយាយទំនិញឬសេវាកម្ម"}
            </TableHead>
            <TableHead>{language === "en" ? "Quantity" : "បរិមាណ"}</TableHead>
            <TableHead>{language === "en" ? "Unit price" : "តម្លៃឯកតា"}</TableHead>
            <TableHead>{language === "en" ? "Amounts" : "ចំនួនទឹកប្រាក់"}</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {language === "en" ? (
                  <Input
                    value={item.description.en}
                    onChange={(e) => handleItemChange(item.id, "description", e.target.value, "en")}
                    placeholder="Item description"
                    className="mb-2"
                  />
                ) : (
                  <Input
                    value={item.description.km}
                    onChange={(e) => handleItemChange(item.id, "description", e.target.value, "km")}
                    placeholder="បរិយាយទំនិញ"
                  />
                )}
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.rate}
                  onChange={(e) => handleItemChange(item.id, "rate", e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </TableCell>
              <TableCell className="text-right">${(item.quantity * item.rate).toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} disabled={items.length === 1}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="outline" size="sm" className="flex items-center" onClick={addItem}>
        <Plus className="mr-2 h-4 w-4" /> {language === "en" ? "Add Item" : "បន្ថែមទំនិញ"}
      </Button>
    </div>
  )
}

