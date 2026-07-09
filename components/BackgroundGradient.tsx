export default function BackgroundGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base vertical wash: warm peach at top fading to near-white */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #ffd2ac 0%, #ffe4c8 28%, #fff2e4 58%, #fffdfa 100%)",
        }}
      />

      {/* Soft drifting cloud / aurora blobs */}
      <div className="absolute -left-40 top-[-10%] h-[55vh] w-[55vh] rounded-full bg-accent-glow/75 blur-[120px] animate-gradient-drift" />
      <div
        className="absolute right-[-15%] top-[5%] h-[50vh] w-[50vh] rounded-full bg-[#ffc48f]/70 blur-[130px] animate-gradient-drift"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute left-1/2 top-[30%] h-[45vh] w-[60vh] -translate-x-1/2 rounded-full bg-[#ffe9d6]/45 blur-[140px] animate-gradient-drift"
        style={{ animationDelay: "-11s" }}
      />

      {/* Cloud silhouette anchored low, as in the reference hero */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh] opacity-70"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 120%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0) 70%)",
        }}
      />
    </div>
  );
}
