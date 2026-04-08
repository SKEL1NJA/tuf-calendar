import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 50%, #fce7f3 100%)"
      }}
    >
      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.3
        }}
      />

      <Calendar />
    </main>
  );
}