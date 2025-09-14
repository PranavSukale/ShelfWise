"use client"

import type React from "react"
import { useState } from "react"
import { db } from "@/firebase/firebaseConfig"
import { collection, addDoc, Timestamp } from "firebase/firestore"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function StockLogForm() {
  const [fileInfo, setFileInfo] = useState<string | null>(null)
  const [form, setForm] = useState({
    brand: "",
    product: "",
    unitPrice: "",
    quantity: "",
    date: "",
  })

  const onCSV = async (file: File | null) => {
    if (!file) return
    const text = await file.text()
    const lines = text.split(/\r?\n/).filter(Boolean).length
    setFileInfo(`${file.name} • ${lines} rows`)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, "inventory"), {
        brand: form.brand,
        product: form.product,
        unitPrice: parseFloat(form.unitPrice),
        qty: parseInt(form.quantity),
        date: form.date ? Timestamp.fromDate(new Date(form.date)) : Timestamp.now(),
        createdAt: Timestamp.now(),
      })

      alert("✅ Stock log saved to Firestore!")
      setForm({ brand: "", product: "", unitPrice: "", quantity: "", date: "" })
    } catch (err) {
      console.error("Error saving stock log:", err)
      alert("❌ Failed to save log. Check console.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">Manual Stock Logging</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label>Brand Name</Label>
            <Input name="brand" value={form.brand} onChange={onChange} placeholder="Acme" />
          </div>
          <div className="grid gap-2">
            <Label>Product Name</Label>
            <Input name="product" value={form.product} onChange={onChange} placeholder="Detergent 1L" />
          </div>
          <div className="grid gap-2">
            <Label>Unit Price</Label>
            <Input
              type="number"
              name="unitPrice"
              value={form.unitPrice}
              onChange={onChange}
              min="0"
              step="0.01"
              placeholder="5.99"
            />
          </div>
          <div className="grid gap-2">
            <Label>Quantity</Label>
            <Input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={onChange}
              min="0"
              placeholder="100"
            />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label>Date</Label>
            <Input type="date" name="date" value={form.date} onChange={onChange} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit">Save Log</Button>
          </div>
        </form>

        <Separator />

        <div className="grid gap-3">
          <div className="text-sm font-medium">Bulk Upload (CSV)</div>
          <Input
            type="file"
            accept=".csv"
            onChange={(e) => onCSV(e.target.files?.[0] ?? null)}
            aria-label="Upload CSV"
          />
          {fileInfo && <div className="text-xs text-muted-foreground">{fileInfo}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
