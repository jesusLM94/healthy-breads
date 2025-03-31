import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container px-4 py-8 mx-auto space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Repostería Saludable</h1>
          <p className="text-lg text-muted-foreground">
            Descubre nuestros panes artesanales elaborados pensando en tu salud.                Sin Azúcar, sin harina. Reducidos en calorías sin comprometer el sabor.
          </p>
          <Button asChild size="lg">
            <Link href="/order">Ordenar Ahora</Link>
          </Button>
        </div>
        <div className="flex-1">
          <Image
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80"
            alt="Pan artesanal"
            width={800}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>
      </section>

      {/* Products Preview */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Nuestros Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Image
              src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=80"
              alt="Pan de Plátano"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-64"
            />
            <h3 className="text-xl font-semibold">Pan de Plátano</h3>
            <p className="text-muted-foreground">Elaborado con plátanos reales para un dulzor natural</p>
          </div>
          <div className="space-y-4">
            <Image
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80"
              alt="Pan de Dátil"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-64"
            />
            <h3 className="text-xl font-semibold">Pan de Dátil</h3>
            <p className="text-muted-foreground">Enriquecido con dátiles para un impulso de energía natural</p>
          </div>
          <div className="space-y-4">
            <Image
              src="https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400&q=80"
              alt="Pan de Zanahoria"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-64"
            />
            <h3 className="text-xl font-semibold">Pan de Zanahoria</h3>
            <p className="text-muted-foreground">Repleto de zanahorias para una nutrición adicional</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">¿Por qué elegir Healthy Breads?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Bajo en Calorías</h3>
            <p className="text-muted-foreground">Perfecto para quienes cuidan su salud</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Recién Horneado</h3>
            <p className="text-muted-foreground">Elaborado fresco tres veces por semana</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Ingredientes Naturales</h3>
            <p className="text-muted-foreground">Sin aditivos ni conservadores artificiales</p>
          </div>
        </div>
      </section>
    </div>
  );
}