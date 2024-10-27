import { render, screen, fireEvent, act } from "@testing-library/react"
import Navigation from "./navigation"

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ goal: [[]] }),
        headers: new Headers(),
    } as Response)
)

describe("Navigation component", () => {
    test("...has a navigation role", async () => {
        render(<Navigation fetchedMap={[]} setFetchedMap={jest.fn} />)
        expect(screen.getByRole("navigation")).toBeInTheDocument()
    })

    test("...has a button to fetch map", async () => {
        const setFetchedMap = jest.fn()
        window.alert = jest.fn()
        render(<Navigation fetchedMap={[]} setFetchedMap={setFetchedMap} />)
        const fetchButton = screen.getByRole("button", { name: /Fetch Goal Map/i })
        expect(fetchButton).toBeInTheDocument()
    })

    test("...Fetch Goal Map prompts window.alert if successful", async () => {
        const setFetchedMap = jest.fn()
        window.alert = jest.fn()
        render(<Navigation fetchedMap={[]} setFetchedMap={setFetchedMap} />)
        const fetchButton = screen.getByRole("button", { name: /Fetch Goal Map/i })
        await act(() => fireEvent.click(fetchButton))
        expect(fetchButton).not.toBeDisabled()
        expect(window.alert).toHaveBeenCalledWith("Goal map fetched successfully")
    })
})
