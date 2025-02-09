import Image from "next/image"
import Link from "next/link"
import React from "react" // Import React

export default function Page() {
  const authors = [
    { name: "Joonyeoup Kim", link: "#" },
    { name: "Yu Yuan", link: "https://yuanyuspace.cn/about/" },
    { name: "Xingguang Zhang", link: "https://xg416.github.io/" },
    { name: "Xijun Wang", link: "#" },
    { name: "Stanley Chan", link: "https://engineering.purdue.edu/ChanGroup/stanleychan.html" },
  ]

  const links = [
    { text: "[Paper]", href: "#" },
    { text: "[Code]", href: "#" },
    { text: "[PlanetSYN]", href: "#" },
    { text: "[TechSYN]", href: "#" },
    { text: "[AstroEV]", href: "#" },
  ]

  const images = [
    {
      src: "/images/ww.png",
      alt: "Overall Workflow",
      width: 800,
      height: 350,
    },
    {
      src: "/images/blf.png",
      alt: "Baseline Comparison",
      width: 800,
      height: 200,
    },
    {
      src: "/images/jupi.png",
      alt: "Real-Image Results",
      width: 800,
      height: 300,
    },
  ]

  const tableData = {
    headers: ["Method", "Low Turb", "Medium Turb", "High Turb"],
    subHeaders: ["PSNR ↑", "LPIPS ↓"],
    rows: [
      {
        method: "DATUM",
        link: "https://github.com/xg416/DATUM",
        values: [
          { psnr: "31.09", lpips: "0.11" },
          { psnr: "32.12", lpips: "0.09" },
          { psnr: "30.44", lpips: "0.12" },
        ],
      },
      {
        method: "TMT",
        link: "https://github.com/xg416/TMT",
        values: [
          { psnr: "29.57", lpips: "0.13" },
          { psnr: "30.03", lpips: "0.13" },
          { psnr: "30.49", lpips: "0.11" },
        ],
      },
      {
        method: "ESTRNN",
        link: "https://github.com/zzh-tech/ESTRNN",
        values: [
          { psnr: "29.02", lpips: "0.18" },
          { psnr: "29.58", lpips: "0.16" },
          { psnr: "28.83", lpips: "0.14" },
        ],
      },
      {
        method: "AstroDiff (ours)",
        values: [
          { psnr: "29.29", lpips: "0.07" },
          { psnr: "30.22", lpips: "0.08" },
          { psnr: "30.86", lpips: "0.07" },
        ],
      },
    ],
  }

  const brisqueData = {
    header: "Method BRISQUE ↓",
    rows: [
      { method: "Original Images", value: "95.64" },
      { method: "Enhanced Images", value: "22.78", highlight: true },
    ],
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        {/* Title */}
        <h1 className="text-3xl font-medium mb-8 text-center max-w-3xl">
          ASTRODIFF: ASTROPHOTOGRAPHY TURBULENCE MITIGATION VIA GENERATIVE MODELS
        </h1>

        {/* Authors */}
        <div className="flex flex-wrap justify-center gap-x-4 text-blue-600 mb-8">
          {authors.map((author, index) => (
            <span key={author.name}>
              <Link href={author.link} className="hover:underline">
                {author.name}
              </Link>
              {index < authors.length - 1 && <span className="text-black ml-1"> </span>}
            </span>
          ))}
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center gap-4 mb-12">
          {links.map((link) => (
            <Link key={link.text} href={link.href} className="text-blue-600 hover:underline">
              {link.text}
            </Link>
          ))}
        </div>

        {/* Abstract - Moved to the top */}
        <div className="w-full max-w-3xl mb-12">
          <h2 className="text-2xl font-medium mb-4 text-center">Abstract</h2>
          <p className="text-center">
            Photography is the cornerstone of modern astronomical and space research. However, most astronomical images
            captured by ground-based telescopes suffer from atmospheric turbulence, resulting in degraded imaging
            quality. While multi-frame strategies like lucky imaging can mitigate some effects, they involve intensive
            data acquisition and complex manual processing. In this paper, we propose AstroDiff, a generative
            restoration method that leverages both the high-quality generative priors and restoration capabilities of
            diffusion models to mitigate atmospheric turbulence. Extensive experiments demonstrate that AstroDiff
            outperforms existing state-of-the-art learning-based methods in astronomical image turbulence mitigation,
            providing higher perceptual quality and better structural fidelity under severe turbulence conditions.
          </p>
        </div>

        {/* Methods - New section */}
        <div className="w-full max-w-3xl mb-12">
          <h2 className="text-2xl font-medium mb-4 text-center">Methods</h2>
          <div className="bg-[#f5f5dc] p-4 rounded-lg mb-4">
            <Image
              src={images[0].src || "/placeholder.svg"}
              alt={images[0].alt}
              width={images[0].width}
              height={images[0].height}
              className="max-w-full h-auto"
            />
          </div>
          <p className="text-center">
            Our training process is divided into two stages. In the first stage, we perform extensive pre-training
            separately for the generative prior branch and the restoration branch. In the second stage, we jointly
            combine these two models through a fusion module using Stochastic Gradient Langevin Dynamics inference.
          </p>
        </div>

        {/* Baseline Comparison */}
        <div className="w-full max-w-3xl mb-12">
          <h2 className="text-2xl font-medium mb-4 text-center">Baseline Comparison</h2>
          <p className="text-center mb-4">
            AstroDiff&apos;s performance comparison against 3 state-of-the-art turbulence mitigation models (ESTRNN,
            TMT, DATUM)
          </p>
          <div className="bg-[#f5f5dc] p-4 rounded-lg mb-8">
            <Image
              src={images[1].src || "/placeholder.svg"}
              alt={images[1].alt}
              width={images[1].width}
              height={images[1].height}
              className="max-w-full h-auto"
            />
          </div>

          {/* Performance Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border p-2 text-left" rowSpan={2}>
                    {tableData.headers[0]}
                  </th>
                  {tableData.headers.slice(1).map((header, idx) => (
                    <th key={idx} className="border p-2 text-center" colSpan={2}>
                      {header}
                    </th>
                  ))}
                </tr>
                <tr>
                  {Array(3)
                    .fill(tableData.subHeaders)
                    .flat()
                    .map((subHeader, idx) => (
                      <th key={idx} className="border p-2 text-center whitespace-nowrap">
                        {subHeader}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {tableData.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">
                      {row.link ? (
                        <Link href={row.link} className="text-blue-600 hover:underline">
                          {row.method}
                        </Link>
                      ) : (
                        row.method
                      )}
                    </td>
                    {row.values.map((value, valueIdx) => (
                      <React.Fragment key={valueIdx}>
                        <td className="border p-2 text-center">
                          {row.method === "AstroDiff (ours)" && (valueIdx === 1 || valueIdx === 2) ? (
                            <strong>{value.psnr}</strong>
                          ) : (
                            value.psnr
                          )}
                        </td>
                        <td className="border p-2 text-center">
                          {row.method === "AstroDiff (ours)" ? <strong>{value.lpips}</strong> : value.lpips}
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-Image Results */}
        <div className="w-full max-w-3xl mb-12">
          <h2 className="text-2xl font-medium mb-4 text-center">Real-Image Results</h2>
          <p className="text-center mb-4">
            AstroDiff&apos;s performance evaluation on real images of Jupiter captured with Celestron NexStar 127 SLT
            telescope and ZWO ASI462MC camera
          </p>
          <div className="bg-[#f5f5dc] p-4 rounded-lg">
            <Image
              src={images[2].src || "/placeholder.svg"}
              alt={images[2].alt}
              width={images[2].width}
              height={images[2].height}
              className="max-w-full h-auto"
            />
          </div>
          <div className="overflow-x-auto mt-8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border p-2 text-center" colSpan={2}>
                    {brisqueData.header}
                  </th>
                </tr>
              </thead>
              <tbody>
                {brisqueData.rows.map((row) => (
                  <tr key={row.method}>
                    <td className="border p-2">{row.method}</td>
                    <td className={`border p-2 text-center ${row.highlight ? "font-bold" : ""}`}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

