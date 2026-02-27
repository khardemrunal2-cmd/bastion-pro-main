import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ImpactSection from "@/components/ImpactSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import SecurityReport from "@/components/scanner/SecurityReport";
import ScanDashboard from "@/components/scanner/ScanDashboard";
import { useScan } from "@/hooks/useScan";
import { useEffect, useRef } from "react";

const Index = () => {
  const { phase, currentStep, domain, error, result, history, startScan, reset } = useScan();
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "complete" && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [phase]);

  const handleRescan = (d?: string) => {
    reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (d) setTimeout(() => startScan(d), 400);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection
        scanPhase={phase}
        currentStep={currentStep}
        domain={domain}
        error={error}
        onScan={startScan}
      />

      {phase === "complete" && result && (
        <section ref={reportRef} className="py-16 px-6">
          <SecurityReport result={result} onRescan={() => handleRescan(domain)} />
          <ScanDashboard history={history} onRescan={(d) => handleRescan(d)} />
        </section>
      )}

      {phase === "idle" && (
        <>
          <ProblemSection onScanIndustry={(d) => { window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => startScan(d), 400); }} />
          <SolutionSection />
          <FeaturesSection />
          <ArchitectureSection />
          <ImpactSection />
          <CTASection />
        </>
      )}

      <FooterSection />
    </div>
  );
};

export default Index;
