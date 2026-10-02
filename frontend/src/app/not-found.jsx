import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
    return (
        <main className="flex min-h-[80vh] items-center justify-center px-6 py-10">
            <div className="flex w-full max-w-2xl flex-col items-center text-center">
                <div className="relative mb-8 h-64 w-full max-w-md sm:h-80">
                    <Image
                        src="/not-found.png"
                        alt="Page not found"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>

                <span className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">
                    404 Error
                </span>

                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Looks like this page was exchanged away
                </h1>

                <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
                    The page you’re looking for doesn’t exist or may have been
                    removed. Let’s get you back to finding something worth exchanging.
                </p>

                <Link
                    href="/"
                    className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-cyan-600 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 hover:shadow-md"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    )
}