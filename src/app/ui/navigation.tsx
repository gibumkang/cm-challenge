"use client"
import React, { useState } from "react"
import { goalMap, submitMap } from "../actions/mapActions"
import { MapResponse } from "../../../utils/types"

type Props = {
    fetchedMap: MapResponse
    setFetchedMap: (map: []) => void
}

const Navigation: React.FC<Props> = (props) => {
    const { fetchedMap, setFetchedMap } = props

    const [loading, setLoading] = useState<boolean>(false)

    const fetchGoalMap = async () => {
        setLoading(true)
        try {
            const response = await goalMap()
            setFetchedMap(response.goal)
            alert("Goal map fetched successfully")
        } catch (error) {
            console.error(error)
            alert("There was an error fetching the goal map")
        } finally {
            setLoading(false)
        }
    }

    const initSubmitMap = async (map: MapResponse) => {
        setLoading(true)
        try {
            await submitMap(map)
        } catch (error) {
            console.error(error)
            alert("There was an error submitting the map")
        } finally {
            setLoading(false)
        }
    }

    return (
        <nav className="absolute bottom-0 left-0 w-full bg-slate-700 p-2 flex gap-5 items-center justify-center">
            <div>
                <button
                    className="bg-slate-800 py-2 text-white px-3 rounded-lg hover:bg-slate-900 disabled:bg-[#333] disabled:text-[#ccc] disabled:cursor-not-allowed"
                    onClick={() => fetchGoalMap()}
                    disabled={loading || fetchedMap.length > 0}
                >
                    {loading ? "Loading ⌛" : "Fetch Goal Map"}
                </button>
            </div>
            <div>
                <button
                    className="bg-slate-800 py-2 px-3 rounded-lg text-white hover:bg-slate-900 disabled:bg-[#333] disabled:text-[#ccc] disabled:cursor-not-allowed"
                    onClick={() => initSubmitMap(fetchedMap)}
                    disabled={loading || fetchedMap.length === 0}
                >
                    {loading ? "Loading ⌛" : "Submit Map"}
                </button>
            </div>
        </nav>
    )
}

export default Navigation
