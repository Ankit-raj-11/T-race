import React from "react";
import { Github, Code, ExternalLink } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-auto border-t border-gray-800 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    <div className="flex items-center gap-2 text-gray-300">
                        <div className="flex items-center gap-2 font-semibold text-white">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                T-race
                            </span>
                        </div>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-400">© {year}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/Ankit-raj-11/T-race"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                        >
                            <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            <span className="text-sm font-medium">GitHub</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>
        </footer>
    );
}