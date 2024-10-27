"use server"
import axios from "axios"
import { MEGAVERSE } from "../../../utils/types"

const candidateId = process.env.CANDIDATE_ID

export const goalMap = async () => {
    try {
        const response = await fetch(`https://challenge.crossmint.io/api/map/${candidateId}/goal`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

const postElement = async (url: string, data: { row: number; column: number; color?: string; direction?: string }) => {
    await axios
        .post(url, { candidateId, ...data })
        .catch((error) => console.error(`Error posting element on row ${data.row} and column ${data.column}: ${error}`))
}

export const submitMap = async (map: string[][]) => {
    if (map.length === 0) {
        return console.error("There is no map to plot")
    }

    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            const element = map[row][column]
            try {
                switch (element) {
                    case MEGAVERSE.SPACE:
                        console.log(`🌌 spaced out at [${row}, ${column}]`)
                        break
                    case MEGAVERSE.POLYANET:
                        await postElement(`https://challenge.crossmint.io/api/polyanets`, { row, column })
                        console.log(`🪐 sighted at [${row}, ${column}]`)
                        break
                    case MEGAVERSE.BLUE_SOLOON:
                        await postElement(`https://challenge.crossmint.io/api/soloons`, { row, column, color: "blue" })
                        console.log(`🔵 feeling blue at [${row}, ${column}]`)
                        break
                    case MEGAVERSE.RED_SOLOON:
                        await postElement(`https://challenge.crossmint.io/api/soloons`, { row, column, color: "red" })
                        console.log(`🔴 reddish at [${row}, ${column}]`)
                        break
                    case MEGAVERSE.PURPLE_SOLOON:
                        await postElement(`https://challenge.crossmint.io/api/soloons`, { row, column, color: "purple" })
                        console.log(`🟣 purpy at [${row}, ${column}]`)
                        break
                    case MEGAVERSE.WHITE_SOLOON:
                        await postElement(`https://challenge.crossmint.io/api/soloons`, { row, column, color: "white" })
                        console.log(`⚪ all-white at [${row}, ${column}]`)
                        break
                    case MEGAVERSE.UP_COMETH:
                        await postElement(`https://challenge.crossmint.io/api/comeths`, { row, column, direction: "up" })
                        console.log(`Up ☄️ plotted at [${row}, ${column}]`)
                        break
                    case MEGAVERSE.RIGHT_COMETH:
                        await postElement(`https://challenge.crossmint.io/api/comeths`, { row, column, direction: "right" })
                        console.log(`Right ☄️ plotted at [${row}, ${column}]`)
                        break
                    case MEGAVERSE.DOWN_COMETH:
                        await postElement(`https://challenge.crossmint.io/api/comeths`, { row, column, direction: "down" })
                        console.log(`Down ☄️ plotted at [${row}, ${column}]`)
                        break
                    case MEGAVERSE.LEFT_COMETH:
                        await postElement(`https://challenge.crossmint.io/api/comeths`, { row, column, direction: "left" })
                        console.log(`Left ☄️ plotted at [${row}, ${column}]`)
                        break
                    default:
                        break
                }
            } catch (error) {
                console.error(`Error plotting element at [${row}, ${column}]: ${error}`)
            }
            await delay(500)
        }
    }
}
