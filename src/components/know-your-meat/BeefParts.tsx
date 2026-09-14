"use client";

import { useEffect, useState } from "react";

export default function GoatParts() {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch("/Product/GoatBeef/buffalo-parts.svg")
      .then((res) => res.text())
      .then((data) => setSvgContent(data));
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}