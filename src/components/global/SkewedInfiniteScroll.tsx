
const SkewedInfiniteScroll = () => {
    const items = [
        { id: 1, text: 'Automate repetitive tasks' },
        { id: 2, text: 'Integrate with your favorite tools' },
        { id: 3, text: 'Build custom workflows' },
        { id: 4, text: 'Streamline your workflows' },
        { id: 5, text: 'Save time and reduce errors' },
        { id: 6, text: 'Increase productivity' },
        { id: 7, text: 'Focus on what matters most' },
        { id: 8, text: 'Unlock your full potential' },

    ]
    return (

        <div>
            <div className="w-full flex items-center justify-center">
                <div className="relative w-full max-w-screen-lg overflow-hidden">
                    <div className="pointer-events-none absolute -top-1 z-10 h-20 w-full"></div>
                    <div className="pointer-events-none absolute -bottom-1 z-10 h-20 w-full"></div>
                    <div className="pointer-events-none absolute -left-1 z-10 h-full w-20 "></div>
                    <div className="pointer-events-none absolute -right-1 z-10 h-full w-20 "></div>

                    <div className="animate-skew-scroll mx-auto grid h-[300px] w-full grid-cols-1 gap-5 sm:w-full sm:grid-cols-2 ">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex cursor-pointer items-center space-x-2 rounded-md border border-gray-100 px-5 shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6 flex-none text-cyan-500"
                                >
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                                <p className="text-gray-600">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SkewedInfiniteScroll

