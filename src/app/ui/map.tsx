"use client"
import React, { useEffect, useState } from "react"
import { MapResponse, MEGAVERSE } from "../../../utils/types"

type Props = {
    fetchedMap: MapResponse
}

const Map: React.FC<Props> = (props) => {
    const { fetchedMap } = props
    const [rows, setRows] = useState(0)
    const [columns, setColumns] = useState(0)

    useEffect(() => {
        if (fetchedMap && fetchedMap.length > 0) {
            setRows(fetchedMap.length)
            setColumns(fetchedMap[0]!.length)
        }
    }, [fetchedMap])

    const parseEmoji = (element: string) => {
        switch (element) {
            case MEGAVERSE.SPACE:
                return "🌌"
                break
            case MEGAVERSE.POLYANET:
                return "🪐"
                break
            case MEGAVERSE.BLUE_SOLOON:
                return <div className="blue-soloon">🌕</div>
                break
            case MEGAVERSE.RED_SOLOON:
                return <div className="red-soloon">🌕</div>
                break
            case MEGAVERSE.PURPLE_SOLOON:
                return <div className="purple-soloon">🌕</div>
                break
            case MEGAVERSE.WHITE_SOLOON:
                return <div className="white-soloon">🌕</div>
                break
            case MEGAVERSE.UP_COMETH:
                return <div className="face-up">☄️</div>
                break
            case MEGAVERSE.RIGHT_COMETH:
                return <div className="face-right">☄️</div>
                break
            case MEGAVERSE.DOWN_COMETH:
                return <div className="face-down">☄️</div>
                break
            case MEGAVERSE.LEFT_COMETH:
                return <div className="face-left">☄️</div>
                break
            default:
                break
        }
    }

    return (
        <main className="w-[100vw] h-[100vh] flex items-center justify-center">
            <div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${columns}, 25px)`,
                        gridTemplateRows: `repeat(${rows}, 25px)`,
                    }}
                >
                    {fetchedMap.length > 0 ? (
                        fetchedMap.map((row, rowIndex: number) => {
                            return row.map((_column, columnIndex: number) => {
                                return (
                                    <div key={`${rowIndex}-${columnIndex}`}>
                                        {parseEmoji(fetchedMap[rowIndex][columnIndex])}
                                    </div>
                                )
                            })
                        })
                    ) : (
                        <div className="text-white text-center">
                            <div>
                                <div>
                                    Press the <strong>Fetch Goal Map</strong> below to see a preview of your Megaverse!
                                </div>
                                <div className="text-[28px] mt-2 animate">⬇️</div>
                            </div>
                        </div>
                    )}
                </div>
                {fetchedMap.length > 0 && (
                    <div className="text-white text-center mt-2">
                        Looking good?! Create your Megaverse by pressing <strong>Submit Map</strong> below 🚀
                    </div>
                )}
            </div>
        </main>
    )
}

export default Map
