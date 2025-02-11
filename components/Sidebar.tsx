"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

const sections = [
  { id: "abstract", title: "Abstract" },
  { id: "methods", title: "Methods" },
  { id: "baseline-comparison", title: "Baseline Comparison" },
  { id: "real-image-results", title: "Real-Image Results" },
]

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="w-64 h-screen sticky top-0 overflow-y-auto p-4 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">Contents</h2>
      <ul>
        {sections.map((section) => (
          <li key={section.id} className="mb-2">
            <Link
              href={`#${section.id}`}
              className={`block p-2 rounded transition-colors ${
                activeSection === section.id ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-200"
              }`}
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

