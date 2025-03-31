import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="bg-background sticky top-0 z-10 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <Link href="/" className="text-xl font-bold">
            Healthy Breads
          </Link>
        </div>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/" className="hover:opacity-75">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/order" className="hover:opacity-75">
                Ordenar
              </Link>
            </li>
            <li>
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 
