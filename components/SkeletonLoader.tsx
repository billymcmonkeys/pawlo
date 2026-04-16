interface Props {
  variant?: "text" | "circle" | "rect" | "card";
  width?: string;
  height?: string;
  className?: string;
}

export default function SkeletonLoader({
  variant = "rect",
  width = "100%",
  height = "20px",
  className = "",
}: Props) {
  const baseClasses = "bg-neutral-100 animate-pulse";

  const variantClasses = {
    text: "rounded h-4",
    circle: "rounded-full",
    rect: "rounded-lg",
    card: "rounded-2xl h-48",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width: variant === "circle" ? height : width,
        height,
        backgroundImage:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite, pulse 2s infinite",
      }}
      aria-hidden="true"
    />
  );
}

// Grid skeleton for pet cards
export function PetCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-mobile border border-neutral-100">
      <SkeletonLoader variant="card" height="200px" />
      <div className="p-4 space-y-2">
        <SkeletonLoader width="60%" height="24px" />
        <SkeletonLoader width="80%" height="16px" />
        <SkeletonLoader width="40%" height="14px" />
      </div>
    </div>
  );
}

// List skeleton for pet listings
export function PetListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <PetCardSkeleton key={i} />
      ))}
    </div>
  );
}
