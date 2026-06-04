import Navbar      from "./components/Navbar";
import RateTicker  from "./components/RateTicker";
import Hero        from "./components/Hero";
import MarketStats from "./components/MarketStats";
import MiniCharts  from "./components/MiniCharts";
import RateTable   from "./components/RateTable";
import Features    from "./components/Features";
import CTASection  from "./components/CTASection";
import Footer      from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-obsidian text-offwhite font-body">
      <Navbar />
      <RateTicker />
      <Hero />
      <MarketStats />
      <MiniCharts />
      <RateTable />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
}
