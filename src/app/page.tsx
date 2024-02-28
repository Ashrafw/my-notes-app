import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TypewriterTitle from "@/components/ui/TypewriterTitle";
export default function Home() {
  return (
    <div className="bg-gradient-to-r min-h-screen grainy  from-pink-900 to-fuchsia-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-7xl text-center">
          AI <span className="text-fuchsia-700 font-bold">note taking</span> assistant.
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-slate-700">
          Say goodbye to writers block!!!
        </h2>
        <div className="mt-4"></div>

        <h2 className="font-semibold text-2xl text-center text-slate-700">
          <TypewriterTitle />
        </h2>
        <div className="mt-8"></div>

        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className=" bg-fuchsia-700">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
