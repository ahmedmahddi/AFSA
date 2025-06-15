"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export interface Variant {
  id?: string | null; // Match payload-types.ts
  name: string;
  price: number;
  stock: number;
  sku?: string | null; // Add sku
}

interface VariantSelectorProps {
  variants: Variant[];
  onSelect: (variant: Variant) => void;
}

export function VariantSelector({ variants, onSelect }: VariantSelectorProps) {
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? "");

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const selected = variants.find(v => v.id === id);
    if (selected) {
      onSelect(selected);
    }
  };

  if (!variants.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Options</h3>
      <RadioGroup
        value={selectedId}
        onValueChange={handleSelect}
        className="flex flex-wrap gap-3"
      >
        {variants.map(variant => (
          <div key={variant.id ?? variant.name} className="flex items-center">
            <RadioGroupItem
              value={variant.id ?? variant.name} // Fallback to name if id is null
              id={variant.id ?? variant.name}
              className="peer sr-only"
              disabled={variant.stock === 0}
            />
            <Label
              htmlFor={variant.id ?? variant.name}
              className={`flex cursor-pointer items-center justify-center rounded-md border border-muted bg-popover px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer-data-[state=checked]:border-terracotta peer-data-[state=checked]:text-terracotta ${
                variant.stock === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {variant.name}
              {variant.stock === 0 && " (Sold out)"}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
