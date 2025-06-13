import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-children">
      <div className="absolute inset-0 mandala-pattern opacity-5"></div>
      <div className="container px-4 py-4 md:px-6 flex flex-col md:flex-row items-center md:py-24">
        <div className="flex flex-col gap-6 md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            <span className="text-terracotta">Handcrafted</span> with Love,{" "}
            <span className={cn("text-sage", pacifico.className)}>Sold</span>{" "}
            with Purpose
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
            A marketplace where artisans, local producers, and indie brands come
            together to create a vibrant community of creativity and commerce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              variant="outline"
              className={cn(
                "border-terracotta bg-transparent text-terracotta hover:bg-sage/10 text-lg py-6 px-8 ",
                pacifico.className,
                "relative border-none before:content-[''] before:absolute before:-top-[5px] before:-left-[5px] before:-right-[5px] before:-bottom-[5px] before:border-2 before:border-solid before:border-terracotta before:rounded-[calc(var(--radius)+4px)] before:opacity-70 before:-rotate-[0.5deg] before:pointer-events-none after:content-[''] after:absolute after:-top-[3px] after:-left-[3px] after:-right-[3px] after:-bottom-[3px] after:border-2 after:border-solid after:border-ochre after:rounded-[calc(var(--radius)+2px)] after:opacity-50 after:rotate-[0.5deg] after:pointer-events-none"
              )}
            >
              Explore Marketplace
            </Button>
            <Button
              variant="outline"
              className={cn(
                "border-terracotta bg-transparent text-sage hover:bg-sage/10 text-lg py-6 px-8 ",
                pacifico.className,
                "relative border-none before:content-[''] before:absolute before:-top-[5px] before:-left-[5px] before:-right-[5px] before:-bottom-[5px] before:border-2 before:border-solid before:border-terracotta before:rounded-[calc(var(--radius)+4px)] before:opacity-70 before:-rotate-[0.5deg] before:pointer-events-none after:content-[''] after:absolute after:-top-[3px] after:-left-[3px] after:-right-[3px] after:-bottom-[3px] after:border-2 after:border-solid after:border-ochre after:rounded-[calc(var(--radius)+2px)] after:opacity-50 after:rotate-[0.5deg] after:pointer-events-none"
              )}
            >
              Join as Seller
            </Button>
          </div>
        </div>
        <div className="mt-12 md:mt-0 md:w-1/2 hidden md:flex relative">
          <div
            className="relative w-full aspect-square md:aspect-[4/3] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] overflow-hidden border-4 border-black/30 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <Image
              src="/gift.jpg"
              alt="Artisan crafting handmade products"
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <div
            className="absolute -bottom-6 -left-6 w-40 h-40 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] overflow-hidden border-4 border-black/30 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <Image
              src="/dream.jpg"
              alt="Handmade pottery"
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] overflow-hidden border-4 border-black/30 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <Image
              src="/craft.jpg"
              alt="Organic materials"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-terracotta/60 to-transparent"></div> */}
    </section>
  );
}
