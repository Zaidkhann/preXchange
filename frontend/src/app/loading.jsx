export default function Loading() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="relative h-10 w-10">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-cyan-100/20 border-t-cyan-400" />
                <div className="absolute inset-1 animate-pulse rounded-full bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.35)]" />
            </div>
        </div>
    )
}