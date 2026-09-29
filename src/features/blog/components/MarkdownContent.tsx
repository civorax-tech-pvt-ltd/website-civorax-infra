import React from "react";
import LocaleLink from "@/shared/ui/LocaleLink";

/**
 * Parses inline formatting:
 * - **bold text**
 * - *italic text*
 * - [link text](url)
 */
function renderInline(text: string): React.ReactNode[] {
  // Regex to match **bold**, *italic*, or [text](url)
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={idx} className="font-bold text-[#1c1c19]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("*") && part.endsWith("*") && part.length > 2 && !part.startsWith("**")) {
      return (
        <em key={idx} className="italic text-[#1c1c19]">
          {part.slice(1, -1)}
        </em>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, href] = linkMatch;
      return (
        <LocaleLink
          key={idx}
          href={href}
          className="font-semibold text-[#006c4e] underline decoration-[#006c4e]/30 underline-offset-4 transition-colors hover:text-[#00543c] hover:decoration-[#00543c]"
        >
          {linkText}
        </LocaleLink>
      );
    }

    return part;
  });
}

type ParsedNode =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: { num?: string; text: string; subItems?: string[] }[] }
  | { type: "p"; text: string };

/**
 * Line-by-line Markdown parser handling nested lists, headers, quotes, and paragraphs.
 */
function parseMarkdown(rawContent: string): ParsedNode[] {
  const lines = rawContent.split("\n");
  const nodes: ParsedNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // Heading 2 (## or ###)
    if (trimmed.startsWith("### ")) {
      nodes.push({ type: "h2", text: trimmed.replace(/^###\s+/, "") });
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      nodes.push({ type: "h2", text: trimmed.replace(/^##\s+/, "") });
      i++;
      continue;
    }

    // Heading 3 (####)
    if (trimmed.startsWith("#### ")) {
      nodes.push({ type: "h3", text: trimmed.replace(/^####\s+/, "") });
      i++;
      continue;
    }

    // Blockquote (> ...)
    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ""));
        i++;
      }
      nodes.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    // Ordered list item (e.g., 1. ...)
    if (/^\d+\.\s+/.test(trimmed)) {
      const olItems: { num?: string; text: string; subItems?: string[] }[] = [];
      while (i < lines.length) {
        const curTrimmed = lines[i].trim();
        const numMatch = curTrimmed.match(/^(\d+)\.\s+(.*)$/);

        if (numMatch) {
          const itemText = numMatch[2];
          const subItems: string[] = [];
          i++;

          // Look ahead for sub-bullet points indented under this item
          while (i < lines.length) {
            const nextTrim = lines[i].trim();
            if (/^(\*|-)\s+/.test(nextTrim)) {
              subItems.push(nextTrim.replace(/^(\*|-)\s+/, ""));
              i++;
            } else if (!nextTrim) {
              // peek if next non-empty is a sub-bullet
              let peek = i + 1;
              while (peek < lines.length && !lines[peek].trim()) peek++;
              if (peek < lines.length && /^(\*|-)\s+/.test(lines[peek].trim())) {
                i = peek;
              } else {
                break;
              }
            } else {
              break;
            }
          }

          olItems.push({ num: numMatch[1], text: itemText, subItems });
        } else if (!curTrimmed) {
          // peek if next is another numbered list item
          let peek = i + 1;
          while (peek < lines.length && !lines[peek].trim()) peek++;
          if (peek < lines.length && /^\d+\.\s+/.test(lines[peek].trim())) {
            i = peek;
          } else {
            break;
          }
        } else {
          break;
        }
      }
      nodes.push({ type: "ol", items: olItems });
      continue;
    }

    // Unordered bullet list (* or -)
    if (/^(\*|-)\s+/.test(trimmed)) {
      const ulItems: string[] = [];
      while (i < lines.length) {
        const curTrim = lines[i].trim();
        if (/^(\*|-)\s+/.test(curTrim)) {
          ulItems.push(curTrim.replace(/^(\*|-)\s+/, ""));
          i++;
        } else if (!curTrim) {
          let peek = i + 1;
          while (peek < lines.length && !lines[peek].trim()) peek++;
          if (peek < lines.length && /^(\*|-)\s+/.test(lines[peek].trim())) {
            i = peek;
          } else {
            break;
          }
        } else {
          break;
        }
      }
      nodes.push({ type: "ul", items: ulItems });
      continue;
    }

    // Regular paragraph
    const pLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith(">") &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^(\*|-)\s+/.test(lines[i].trim())
    ) {
      pLines.push(lines[i].trim());
      i++;
    }
    if (pLines.length > 0) {
      nodes.push({ type: "p", text: pLines.join(" ") });
    }
  }

  return nodes;
}

export function MarkdownContent({ content }: { content: string }) {
  const nodes = parseMarkdown(content);

  return (
    <div className="space-y-6 text-base leading-8 text-[#3d4a43]">
      {nodes.map((node, idx) => {
        switch (node.type) {
          case "h2":
            return (
              <h2
                key={idx}
                className="font-sora mt-10 pt-2 text-2xl font-bold tracking-tight text-[#1c1c19] sm:text-3xl"
              >
                {renderInline(node.text)}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={idx}
                className="font-sora mt-8 text-xl font-bold tracking-tight text-[#1c1c19] sm:text-2xl"
              >
                {renderInline(node.text)}
              </h3>
            );

          case "h4":
            return (
              <h4
                key={idx}
                className="font-sora mt-6 text-lg font-bold tracking-tight text-[#1c1c19]"
              >
                {renderInline(node.text)}
              </h4>
            );

          case "blockquote":
            return (
              <blockquote
                key={idx}
                className="my-6 rounded-2xl border-l-4 border-[#006c4e] bg-[#eef7f2] p-5 italic text-[#003f2c] shadow-sm"
              >
                {renderInline(node.text)}
              </blockquote>
            );

          case "ul":
            return (
              <ul
                key={idx}
                className="my-5 list-disc space-y-2.5 pl-6 text-[#3d4a43] marker:text-[#006c4e]"
              >
                {node.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-7">
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol
                key={idx}
                className="my-6 list-decimal space-y-4 pl-6 text-[#3d4a43] marker:font-bold marker:text-[#006c4e]"
              >
                {node.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-7">
                    <div>{renderInline(item.text)}</div>
                    {item.subItems && item.subItems.length > 0 && (
                      <ul className="mt-2 list-disc space-y-2 pl-6 text-[#4a5550] marker:text-[#006c4e]">
                        {item.subItems.map((sub, subIdx) => (
                          <li key={subIdx} className="leading-6">
                            {renderInline(sub)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            );

          case "p":
            return (
              <p key={idx} className="leading-8 text-[#3d4a43]">
                {renderInline(node.text)}
              </p>
            );
        }
      })}
    </div>
  );
}