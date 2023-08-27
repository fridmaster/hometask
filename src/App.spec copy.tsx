// Imports
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, waitFor } from "./tests/setup";
import mockData from "./tests/mockData.json";
// Mock fetch
global.fetch = (url, options) => fetch(url, options);
// To Test
import App from "./App";

// We will cover the app with integration test, because it's valuable for the functionality.
describe("Renders main page correctly", async () => {
    afterEach(async () => {
        vi.restoreAllMocks();
    });

    it("Should render the page correctly", async () => {
        const spy = vi.spyOn(global, "fetch").mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            }) as Promise<Response>;
        });
        const { user, ...screen } = render(<App />);
        expect(screen.getByText(`Let’s set up your site`)).toBeTruthy();
        expect(screen.getByTitle(/loading/i)).toBeTruthy();
        await waitFor(() => expect(spy).toHaveBeenCalled());
        for (let i = 0; i < 4; i++) {
            const input = screen.getByLabelText(mockData[i].label);
            expect(screen.getByText(mockData[i].label)).toBeTruthy();
            expect(input).toHaveProperty("checked", false);
        }
        await user.click(screen.getByText(mockData[0].label));
        expect(screen.getByLabelText(mockData[0].label)).toHaveProperty("checked", true);
    });
    it("Should switch page forward correctly", async () => {
        const spy = vi.spyOn(global, "fetch").mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            }) as Promise<Response>;
        });
        const { user, ...screen } = render(<App />);
        const nonExistentElement = screen.queryByText(mockData[6].label);
        expect(nonExistentElement).toBeNull();
        await waitFor(() => expect(spy).toHaveBeenCalled());
        for (let i = 0; i <= 4; i++) {
            await user.click(screen.getByText(mockData[i].label));
        }
        expect(screen.getByText(mockData[6].label)).toBeTruthy();
    })
    it("Should switch have proper buttons", async () => {
        const spy = vi.spyOn(global, "fetch").mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            }) as Promise<Response>;
        });
        const { ...screen } = render(<App />);
        await waitFor(() => expect(spy).toHaveBeenCalled());
        expect(screen.getByText("Prev")).toBeTruthy();
        expect(screen.getByText("Next")).toBeTruthy();
        expect(screen.getByText("Reset")).toBeTruthy();
    });   

});
