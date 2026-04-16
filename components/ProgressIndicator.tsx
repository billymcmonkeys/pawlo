interface Props {
  currentStep: number; // 1-4
  totalSteps?: number;
  labels?: string[];
}

const DEFAULT_LABELS = ["Photos", "Pet info", "Contact", "Review"];

export default function ProgressIndicator({
  currentStep,
  totalSteps = 4,
  labels = DEFAULT_LABELS,
}: Props) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      {/* Animated progress bar */}
      <div className="mb-4 h-1 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step dots with connector lines */}
      <div className="flex items-center gap-0">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const done = step < currentStep;
          const active = step === currentStep;

          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              {/* Circle */}
              <div
                className={`relative flex-shrink-0 w-8 h-8 md:w-7 md:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  done
                    ? "bg-primary-500 text-white scale-100"
                    : active
                    ? "bg-primary-100 text-primary-700 ring-2 ring-primary-500 scale-110"
                    : "bg-neutral-100 text-neutral-400 scale-90"
                }`}
                aria-label={`Step ${step}: ${labels[i]}`}
              >
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 7l3.5 3.5 5.5-6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>

              {/* Connector */}
              {step < totalSteps && (
                <div className="flex-1 h-0.5 mx-1">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      done ? "bg-primary-500" : "bg-neutral-200"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex mt-2" style={{ gap: 0 }}>
        {labels.map((label, i) => {
          const step = i + 1;
          const done = step < currentStep;
          const active = step === currentStep;
          return (
            <div
              key={label}
              className={`flex-1 last:flex-none text-center text-[11px] md:text-xs transition-all duration-300 ${
                active
                  ? "text-primary-700 font-bold scale-105"
                  : done
                  ? "text-primary-500 font-medium"
                  : "text-neutral-400 font-normal scale-95"
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
