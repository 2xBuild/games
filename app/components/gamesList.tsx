import Link from "next/link";

export default function GamesList() {
    const games = [
        {
            id: 1,
            name: "Recall Color",
            description: "Test your color-memory..",
            icon: "🎨",
            href: "/recall-color"
        },
        {
            id: 2,
            name: "IQ Challenge",
            description: "Measure your intelligence across multiple domains",
            icon: "🧠",
            href: "/iq"
        },
        {
            id:3,
            name: "NextWord",
            description: "real-time multiplayer word-chaining game",
            icon: "🔠",
            href: "https://nextword.void.ac"
        }
        // Add more games here in the future
    ];

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-lg font-mono text-white/60">
                        Games I built for fun.
                    </p>
                </div>

                {/* Games List */}
                <div className="space-y-4">
                    {games.map((game) => (
                        <Link
                            key={game.id}
                            href={game.href}
                            className="block group"
                        >
                            <div className="flex items-center gap-6 p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-200 shadow-lg">
                                {/* Serial Number */}
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                    <span className="text-md font-mono font-bold text-white">
                                        {game.id}
                                    </span>
                                </div>



                                {/* Game Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-md font-mono font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                                        {game.name}
                                    </h3>
                                    <p className="text-xs font-mono text-white/60 line-clamp-2">
                                        {game.description}
                                    </p>
                                </div>
                                {/* Game Icon */}
                                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center text-2xl">
                                    {game.icon}
                                </div>

                                {/* Arrow Icon */}
                                <div className="flex-shrink-0 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-200">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Coming Soon Section */}
                <div className="mt-8 p-4 rounded-lg border-2 border-dashed border-white/10 bg-white/5 backdrop-blur-md text-center">
                    <p className="text-md font-mono text-white/40">
                        More games coming soon...
                    </p>
                </div>
            </div>
        </div>
    );
}