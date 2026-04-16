"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Scan, Search, CheckCircle2 } from "lucide-react";
import {
  seedDemoData,
  getPets,
  computeMatches,
  saveFoundReport,
  generateId,
  type FoundReport,
} from "@/lib/store";

const FOUND_KEY = "pawlo_found_draft";

const STEPS = [
  { icon: Scan, label: "Scanning facial features…", duration: 900 },
  { icon: Search, label: "Searching 2,400+ registered pets…", duration: 900 },
  { icon: CheckCircle2, label: "Ranking matches…", duration: 700 },
];

export default function FoundProcessingPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    // Animate scan progress bar
    const prog = setInterval(() => {
      setScanProgress((p) => Math.min(p + 2, 100));
    }, 50);

    // Step sequencing
    let step = 0;
    let elapsed = 0;

    function advance() {
      if (step >= STEPS.length) {
        clearInterval(prog);
        // Compute matches and save report before navigating
        try {
          seedDemoData();
          const raw = localStorage.getItem(FOUND_KEY);
          const draft = raw ? JSON.parse(raw) : {};
          const reportId = generateId();
          const description = [draft.species !== "Unknown" ? draft.species : "", draft.description]
            .filter(Boolean)
            .join(" ");
          const neighborhood = draft.neighborhood || "";
          const tempReport = {
            id: reportId,
            description: description || "pet found",
            neighborhood,
            photoDataUrl: draft.photoDataUrl ?? null,
            createdAt: new Date().toISOString(),
          };
          const matchScores = computeMatches(tempReport, getPets());
          const report: FoundReport = { ...tempReport, matchScores };
          saveFoundReport(report);
          localStorage.removeItem(FOUND_KEY);
          router.push(`/found/results?reportId=${reportId}`);
        } catch {
          router.push("/found/results");
        }
        return;
      }
      setActiveStep(step);
      const duration = STEPS[step].duration;
      setTimeout(() => {
        setDoneSteps((d) => [...d, step]);
        step++;
        elapsed += duration;
        advance();
      }, duration);
    }

    const start = setTimeout(advance, 300);

    return () => {
      clearTimeout(start);
      clearInterval(prog);
    };
  }, [router]);

  return (
    <div className="page-container pt-20 pb-16 flex flex-col items-center text-center">
      {/* Animated scanner */}
      <div className="relative w-48 h-48 mb-10">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-secondary-200" />
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-secondary-500 animate-spin-slow" />
        {/* Inner content */}
        <div className="absolute inset-4 rounded-full bg-secondary-50 flex items-center justify-center">
          <span className="text-5xl">🔍</span>
        </div>

        {/* Progress indicator */}
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="46"
            fill="none"
            stroke="#00A896"
            strokeWidth="4"
            strokeDasharray={`${scanProgress * 2.89} ${289}`}
            strokeLinecap="round"
            className="transition-all duration-100"
          />
        </svg>
      </div>

      <h1
        className="text-h2 text-neutral-800 mb-2"
        style={{ fontFamily: "Nunito, sans-serif" }}
      >
        Analyzing possible matches…
      </h1>
      <p className="text-body text-neutral-500 mb-10 max-w-xs">
        Our AI is comparing your photo with every registered pet in the area.
      </p>

      {/* Steps */}
      <div className="w-full max-w-xs space-y-3 stagger">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const done = doneSteps.includes(i);
          const active = activeStep === i;

          return (
            <div
              key={step.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-normal ${
                done
                  ? "bg-success-100"
                  : active
                  ? "bg-secondary-50 shadow-sm"
                  : "bg-neutral-50"
              }`}
            >
              <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                done
                  ? "bg-success-500"
                  : active
                  ? "bg-secondary-500"
                  : "bg-neutral-200"
              }`}>
                {done ? (
                  <CheckCircle2 size={14} className="text-white" />
                ) : active ? (
                  <span className="w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin-slow inline-block" />
                ) : (
                  <Icon size={14} className="text-neutral-400" />
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                done ? "text-green-700" : active ? "text-secondary-700" : "text-neutral-400"
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-body-sm text-neutral-400 mt-8">
        This usually takes 2–3 seconds
      </p>
    </div>
  );
}
