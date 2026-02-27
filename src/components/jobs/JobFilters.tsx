"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEPARTMENTS } from "@/lib/utils";
import type { ContractType } from "@/types";

const CONTRACTS: ContractType[] = ["CDI", "CDD", "Stage", "Alternance", "Freelance"];

export default function JobFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.delete("page"); // reset pagination
      return params.toString();
    },
    [searchParams]
  );

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
  }

  function handleContract(value: string) {
    router.push(`${pathname}?${createQueryString("contract", value === "all" ? "" : value)}`);
  }

  function handleDepartment(value: string) {
    router.push(`${pathname}?${createQueryString("department", value === "all" ? "" : value)}`);
  }

  function handleReset() {
    router.push(pathname);
  }

  const hasFilters =
    searchParams.has("search") ||
    searchParams.has("contract") ||
    searchParams.has("department");

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Recherche texte */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un poste..."
            className="pl-9"
            defaultValue={searchParams.get("search") ?? ""}
            onChange={handleSearch}
          />
        </div>

        {/* Filtre contrat */}
        <Select
          value={searchParams.get("contract") ?? "all"}
          onValueChange={handleContract}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Type de contrat" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les contrats</SelectItem>
            {CONTRACTS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtre département */}
        <Select
          value={searchParams.get("department") ?? "all"}
          onValueChange={handleDepartment}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Département" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les départements</SelectItem>
            {DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="gap-1 text-muted-foreground"
          >
            <X className="h-4 w-4" />
            Réinitialiser
          </Button>
        )}
      </div>
    </div>
  );
}
