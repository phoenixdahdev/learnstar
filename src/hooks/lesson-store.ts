import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface LessonState {
    content: string
    setContent: (content: string) => void
    clearContent: () => void
}

export const useLessonStore = create<LessonState>()(
    persist(
        (set) => ({
            content: "",
            setContent: (content) => set({ content }),
            clearContent: () => set({ content: "" }),
        }),
        {
            name: "lesson-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                content: state.content,
            }),
        },
    ),
)

