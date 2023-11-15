import HookForm from "@/components/hookform"
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HookForm/>
      <Toaster position="top-right" />
    </main>
  )
}
