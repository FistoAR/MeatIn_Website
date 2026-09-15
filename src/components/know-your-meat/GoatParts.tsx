"use client";

import { useEffect, useState } from "react";

interface GoatPartsProps {
  partsDx?: number;
  partsDy?: number;
}

export default function GoatParts({ partsDx = 0, partsDy = 0 }: GoatPartsProps) {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch("/Product/GoatBeef/goat-parts.svg")
      .then((res) => res.text())
      .then((data) => {
        if (data) {
          let cleaned = data.replace(/<image[^>]*\/>/g, "");
          const imageTag = `<image href="/Product/GoatBeef/goat-img.webp" x="0" y="0" width="900" height="555" preserveAspectRatio="none" style="pointer-events: none;" />`;
          const transformAttr = partsDx !== 0 || partsDy !== 0 ? ` transform="translate(${partsDx}, ${partsDy})"` : "";
          const updated = cleaned
            .replace(/<svg\b([^>]*)>/, '<svg $1 style="overflow: visible;">')
            .replace(
              '<g id="goat-parts">',
              `${imageTag}<g id="goat-parts"${transformAttr}>`
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