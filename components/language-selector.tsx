"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useInvoice } from "@/components/invoice-provider"
import { ChevronDown } from "lucide-react"

export function LanguageSelector() {
  const { language, setLanguage } = useInvoice()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1">
          {language === "en" ? "English" : "ខ្មែរ"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("km")}>ខ្មែរ</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

