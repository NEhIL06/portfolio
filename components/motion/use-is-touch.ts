"use client"
import { useState, useEffect } from "react"

export function useIsTouch() {
    const [isTouch, setIsTouch] = useState(false)

    useEffect(() => {
        setIsTouch(window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window)

        const mediaQuery = window.matchMedia("(pointer: coarse)")
        const handler = (e: MediaQueryListEvent) => {
            setIsTouch(e.matches || "ontouchstart" in window)
        }
        mediaQuery.addEventListener("change", handler)
        return () => mediaQuery.removeEventListener("change", handler)
    }, [])

    return isTouch
}
