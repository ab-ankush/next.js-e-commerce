"use client";

import { addProduct } from "@/app/admin/_actions/Product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";

export default function ProductForm() {
  const [price, setPrice] = useState<number>();

  return (
    <form className="space-y-8" action={addProduct}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          required
          value={price}
          onChange={(e) => setPrice(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground text-sm">
          {formatCurrency(price || 0)}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required />
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
}
