import { describe, it, expect, vi, afterEach } from "vitest";
import {
    prepareTaskList,
    calculateTotalPages,
    getCurrentPageRange,
    getCompletedTasksCount,
} from "./taskList";
import mockData from "../tests/mockData.json";

describe("Tasks Utility Functions", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should prepare task list with isCompleted set to false", () => {
        const preparedTaskList = prepareTaskList(mockData);
        preparedTaskList.forEach((task) => {
            expect(task.isCompleted).toBe(false);
        });
    });

    it("should calculate the correct range for the last page", () => {
        const currentPage = 5;
        const sizeOfPage = 5;
        const totalTasks = 23;
        const range = getCurrentPageRange(currentPage, sizeOfPage, totalTasks);
        expect(range.start).toEqual(20);
        expect(range.end).toEqual(23);
    });

    it("should calculate total pages correctly", () => {
        const sizeOfPage = 2;
        const preparedTaskList = prepareTaskList(mockData);
        const totalPages = calculateTotalPages(preparedTaskList, sizeOfPage);
        expect(totalPages).toBe(5);
    });
    
    it("should return the correct number of completed tasks", () => {
        const mockTaskList = [
            { id: 1, label: "Task 1", isCompleted: true },
            { id: 2, label: "Task 2", isCompleted: false },
            { id: 3, label: "Task 3", isCompleted: true },
        ];
        const completedCount = getCompletedTasksCount(mockTaskList);
        expect(completedCount).toBe(2);
    });
});
