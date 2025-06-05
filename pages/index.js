
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-12">
      <h1 className="text-5xl font-bold mb-4 text-center">Welcome to CauseMap</h1>
      <p className="text-lg text-center text-neutral-600 max-w-2xl mb-8">
        Explore the beta version of our interactive event network.
      </p>
      <Link href="/beta">
        <a className="px-6 py-3 bg-black text-white font-semibold rounded-2xl shadow hover:bg-neutral-800">
          Try Beta
        </a>
      </Link>
    </div>
  )
}
