import { create } from "zustand"

interface LessonState {
    content: string
    setContent: (content: string) => void
    clearContent: () => void
}

export const useLessonStore = create<LessonState>((set) => ({
    content: "",
    setContent: (content) => set({ content }),
    clearContent: () => set({ content: "" }),
}))

