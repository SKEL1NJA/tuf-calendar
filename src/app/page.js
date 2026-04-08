import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 50%, #fce7f3 100%)"
      }}
    >
      <Calendar />
    </main>
  );
}