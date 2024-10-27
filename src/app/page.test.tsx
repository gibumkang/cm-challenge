import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import Navigation from "./ui/navigation"
import Map from "./ui/map"

describe("Main Page", () => {
    test("...has navigation component rendered", async () => {
        const fetchedMap = [[]]
        const setFetchedMap = jest.fn
        render(<Navigation fetchedMap={fetchedMap} setFetchedMap={setFetchedMap} />)
        expect(screen.getByRole("navigation")).toBeInTheDocument()
    })

    test("...has map component rendered", async () => {
        const fetchedMap = [[]]
        render(<Map fetchedMap={fetchedMap} />)
        expect(screen.getByRole("main")).toBeInTheDocument()
    })
})
