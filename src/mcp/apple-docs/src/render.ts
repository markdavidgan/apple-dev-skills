// Pure distillation of Apple's DocC render JSON into compact, token-efficient
// markdown. The render JSON is large and noisy; we extract only what an agent
// needs: title, kind, availability, abstract, declaration, a short discussion,
// and topic links.

type Refs = Record<string, any>;

/** Flatten DocC inline content (text, codeVoice, reference, emphasis…) to text. */
function inline(content: any[] | undefined, refs: Refs): string {
  if (!Array.isArray(content)) return "";
  let out = "";
  for (const c of content) {
    switch (c?.type) {
      case "text":
        out += c.text ?? "";
        break;
      case "codeVoice":
        out += `\`${c.code ?? ""}\``;
        break;
      case "reference": {
        const ref = refs[c.identifier];
        out += ref?.title ?? c.identifier ?? "";
        break;
      }
      case "emphasis":
      case "strong":
        out += inline(c.inlineContent, refs);
        break;
      default:
        if (Array.isArray(c?.inlineContent)) out += inline(c.inlineContent, refs);
    }
  }
  return out;
}

/** First paragraph(s) of a content-section block list, capped at `max` chars. */
function blocksToText(blocks: any[] | undefined, refs: Refs, max = 600): string {
  if (!Array.isArray(blocks)) return "";
  const parts: string[] = [];
  for (const b of blocks) {
    if (b?.type === "paragraph") {
      const t = inline(b.inlineContent, refs).trim();
      if (t) parts.push(t);
    }
    if (parts.join(" ").length >= max) break;
  }
  const joined = parts.join("\n\n");
  return joined.length > max ? joined.slice(0, max).trimEnd() + "…" : joined;
}

/** "iOS 13.0+, macOS 10.15+ (deprecated)" — empty string if no platform data. */
export function extractAvailability(json: any): string {
  const platforms: any[] = json?.metadata?.platforms ?? [];
  const parts = platforms.map((p) => {
    let s = p.name ?? "?";
    if (p.introducedAt) s += ` ${p.introducedAt}+`;
    if (p.deprecatedAt) s += ` (deprecated ${p.deprecatedAt})`;
    else if (p.deprecated) s += " (deprecated)";
    if (p.beta) s += " beta";
    return s;
  });
  return parts.join(", ");
}

function declaration(json: any): string {
  const sections: any[] = json?.primaryContentSections ?? [];
  const decl = sections.find((s) => s?.kind === "declarations");
  if (!decl?.declarations?.length) return "";
  // Prefer a swift declaration if the languages are tagged.
  const swift =
    decl.declarations.find((d: any) => (d.languages ?? []).includes("swift")) ??
    decl.declarations[0];
  const tokens: any[] = swift?.tokens ?? [];
  return tokens.map((t) => t.text ?? "").join("");
}

function discussion(json: any, refs: Refs): string {
  const sections: any[] = json?.primaryContentSections ?? [];
  const content = sections.find((s) => s?.kind === "content");
  return blocksToText(content?.content, refs);
}

function topics(json: any, refs: Refs, max = 12): string {
  const sections: any[] = json?.topicSections ?? [];
  const lines: string[] = [];
  for (const sec of sections) {
    const ids: string[] = sec?.identifiers ?? [];
    for (const id of ids) {
      const ref = refs[id];
      if (!ref?.title) continue;
      const path = (ref.url ?? "").replace(/^https?:\/\/[^/]+/, "");
      lines.push(`- ${ref.title}${path ? ` — ${path}` : ""}`);
      if (lines.length >= max) return lines.join("\n");
    }
  }
  return lines.join("\n");
}

/** Distill a render JSON into compact markdown. */
export function distillSymbol(json: any): string {
  const refs: Refs = json?.references ?? {};
  const meta = json?.metadata ?? {};
  const title = meta.title ?? "(untitled)";
  const kind = meta.symbolKind ?? meta.roleHeading ?? meta.role ?? "symbol";

  const out: string[] = [`# ${title}`, `**Kind:** ${kind}`];

  const avail = extractAvailability(json);
  if (avail) out.push(`**Availability:** ${avail}`);

  const abstract = inline(json.abstract, refs).trim();
  if (abstract) out.push(`\n${abstract}`);

  const decl = declaration(json);
  if (decl) out.push(`\n\`\`\`swift\n${decl}\n\`\`\``);

  const disc = discussion(json, refs);
  if (disc) out.push(`\n## Discussion\n${disc}`);

  const tops = topics(json, refs);
  if (tops) out.push(`\n## Topics\n${tops}`);

  return out.join("\n");
}
