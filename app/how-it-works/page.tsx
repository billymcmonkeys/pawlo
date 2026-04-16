import Link from "next/link";
import { Camera, Bell, Users, Heart, PawPrint, Search, CheckCircle2, Zap, Shield } from "lucide-react";

const STEPS = [
  {
    number: 1,
    icon: Camera,
    color: "primary",
    title: "Register your pet",
    desc: "Create a pet profile with multiple photos, breed, color, size, and your contact info. Takes less than 2 minutes.",
    detail: "Your pet is added to the neighborhood registry. If they ever go missing, neighbors can search and find them.",
  },
  {
    number: 2,
    icon: Bell,
    color: "warning",
    title: "Alert your neighborhood",
    desc: "If your pet goes missing, mark them as Lost. Neighbors in your area get instantly notified.",
    detail: "The alert includes your pet's photo, description, and last known location — so neighbors know exactly who to look for.",
  },
  {
    number: 3,
    icon: Search,
    color: "secondary",
    title: "AI photo matching",
    desc: "A neighbor finds a pet and uploads a photo. Our AI instantly compares it to every registered pet.",
    detail: "Pawlo analyzes coat patterns, color, size, breed features, and facial markings to find the best matches.",
  },
  {
    number: 4,
    icon: Users,
    color: "info",
    title: "Community connects",
    desc: "The finder gets ranked match results and can contact the owner directly via WhatsApp, phone, or email.",
    detail: "No middlemen. No waiting. The finder and owner connect in seconds.",
  },
  {
    number: 5,
    icon: Heart,
    color: "success",
    title: "Reunited 🎉",
    desc: "Pick up your pet and mark them as Reunited. The community celebrates.",
    detail: "Reunited pets appear on the homepage, inspiring neighbors to keep helping.",
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: "AI in seconds",
    desc: "Photo analysis completes in under 3 seconds using computer vision.",
  },
  {
    icon: Shield,
    title: "Privacy first",
    desc: "Your contact info is only shared when there's a match. No spam.",
  },
  {
    icon: CheckCircle2,
    title: "100% free",
    desc: "Pawlo is free for pet owners and finders. Always.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="bg-neutral-50 px-4 md:px-6 pt-12 pb-16 text-center">
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <PawPrint size={14} />
            How Pawlo works
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-neutral-800 leading-tight mb-4"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Bringing pets home,{" "}
            <span className="text-primary-500">one neighborhood at a time</span>
          </h1>
          <p className="text-body-lg text-neutral-600 max-w-lg mx-auto">
            Pawlo combines community networks with AI photo matching to reunite lost pets faster than ever.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white section-gap px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8 stagger">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const colorMap: Record<string, string> = {
                primary: "bg-primary-100 text-primary-700",
                warning: "bg-warning-100 text-amber-700",
                secondary: "bg-secondary-100 text-secondary-700",
                info: "bg-info-100 text-blue-700",
                success: "bg-success-100 text-green-700",
              };
              return (
                <div key={step.number} className="flex gap-5">
                  {/* Left column: number + icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[step.color]}`}
                    >
                      <Icon size={20} />
                    </div>
                    {step.number < STEPS.length && (
                      <div className="w-0.5 flex-1 mt-3 bg-neutral-200 rounded-full min-h-[32px]" />
                    )}
                  </div>

                  {/* Right column: content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                        Step {step.number}
                      </span>
                    </div>
                    <h2
                      className="text-h3 text-neutral-800 mb-2"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {step.title}
                    </h2>
                    <p className="text-body-lg text-neutral-700 mb-2">{step.desc}</p>
                    <p className="text-body text-neutral-500">{step.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-neutral-50 section-gap px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-h2 text-neutral-800 text-center mb-8"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Why Pawlo?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card text-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} className="text-primary-600" />
                  </div>
                  <h3
                    className="text-h3 text-neutral-800 mb-1"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-body text-neutral-600">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary-50 section-gap px-4 md:px-6">
        <div className="max-w-lg mx-auto text-center">
          <h2
            className="text-h2 text-neutral-800 mb-4"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Ready to get started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register/step-1" className="btn-primary">
              <PawPrint size={18} />
              Register your pet
            </Link>
            <Link href="/found/upload" className="btn-secondary">
              <Search size={18} />
              I found a pet
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
