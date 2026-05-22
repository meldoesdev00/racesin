import Footer from "@/components/Footer"

export const metadata = {
  title: "Racesin Market — Motorsport Marketplace",
  description: "Buy and sell motorsport equipment, simulators, safety gear and more.",
}

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen bg-neutral-50">
        {children}
      </div>
      <Footer />
    </>
  )
}
