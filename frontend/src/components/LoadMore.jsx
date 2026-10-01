
export default function LoadMore({setPage}) {

    const handleLoadMore = ()=>{
            setPage(prev => prev + 1)
        }
    return (
<button
            onClick={handleLoadMore}
            className="group mt-6 mb-10 flex w-44 items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-white px-5 py-3.5 text-sm font-semibold text-cyan-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer"
        >
            <span>Load more</span>
            <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
            </svg>
        </button>
)
}