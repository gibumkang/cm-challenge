"use client"
import Map from "./ui/map"
import { useState } from "react"
import Navigation from "./ui/navigation"
import { MapResponse } from "../../utils/types"

export default function Home() {
    const [fetchedMap, setFetchedMap] = useState<MapResponse>([])

    return (
        <div className="font-[family-name:var(--font-geist-sans)] bg-black w-full h-[100vh]">
            <Map fetchedMap={fetchedMap} />
            <Navigation fetchedMap={fetchedMap} setFetchedMap={setFetchedMap} />
        </div>
    )
}
