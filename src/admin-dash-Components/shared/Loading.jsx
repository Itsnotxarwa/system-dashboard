export default function Loading() {
    return(
        <div className="flex items-center justify-center">
            <svg className="w-[3.25em] origin-center animate-[spin_2s_linear_infinite]" 
            viewBox="25 25 50 50">
                <circle
                className="loading-circle" 
                r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    )
}