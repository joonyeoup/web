import type React from "react"
import Link from "next/link"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  variant?: "default" | "outline"
}

export const Button: React.FC<ButtonProps> = ({ children, href, variant = "default", className = "", ...props }) => {
  const baseStyle = "px-4 py-2 rounded font-medium transition-colors"
  const variantStyle =
    variant === "outline"
      ? "border border-gray-500 text-gray-500 hover:bg-gray-100"
      : "bg-gray-500 text-white hover:bg-gray-600"

  const buttonClass = `${baseStyle} ${variantStyle} ${className}`

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    )
  }

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  )
}

