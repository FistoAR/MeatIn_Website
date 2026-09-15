"use client";

import { useEffect, useState } from "react";

interface BuffaloPartsProps {
  partsDx?: number;
  partsDy?: number;
}

export default function BuffaloParts({ partsDx = 0, partsDy = 0 }: BuffaloPartsProps) {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch("/Product/GoatBeef/buffalo-parts.svg")
      .then((res) => res.text())
      .then((data) => {
        if (data) {
          // Remove any previously inserted image tag if re-processing
          let cleaned = data.replace(/<image[^>]*\/>/g, "");
          const imageTag = `<image href="/Product/GoatBeef/buffalo-img.webp" x="0" y="0" width="971" height="517" preserveAspectRatio="xMidYMid meet" style="pointer-events: none;" />`;
          const transformAttr = partsDx !== 0 || partsDy !== 0 ? ` transform="translate(${partsDx}, ${partsDy})"` : "";
          const updated = cleaned
            .replace(/<svg\b([^>]*)>/, '<svg $1 style="overflow: visible;">')
            .replace(
              '<g id="buffalo-parts">',
              `${imageTag}<g id="buffalo-parts"${transformAttr}>`
            );
          setSvgContent(updated);
        }
      });
  }, [partsDx, partsDy]);

  return (
    <div
      className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-full [&>svg]:object-contain [&>svg]:overflow-visible overflow-visible filter drop-shadow-2xl"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}