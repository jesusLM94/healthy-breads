"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Heading as Bread } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed flex justify-center top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-16 justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Bread className="h-6 w-6" />
          <span className="font-bold">Healthy Breads</span>
        </Link>
        <div className="flex items-center justify-end flex-1 space-x-4">
          <Link
            href="/"
            className={cn(
              "text-sm transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Inicio
          </Link>
          <Link
            href="/order"
            className={cn(
              "text-sm transition-colors hover:text-primary",
              pathname === "/order" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Ordenar
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-sm transition-colors hover:text-primary",
              pathname === "/contact" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}