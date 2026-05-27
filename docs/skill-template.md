# Skill Template

Use this template when creating a new skill.

---

## File Structure

```
src/skills/<skill-name>/
├── SKILL.md              # Required entrypoint
└── (subdirs/*.md)        # Optional supporting files
```

---

## SKILL.md Template

```markdown
---
name: skill-name
description: Brief description for discovery. Keep it under 150 characters.
invoke: "/command [args] — Short usage hint"
---

# Skill Name

> **Purpose:** One-sentence summary of what this skill does.
> **Trigger:** When to use this skill (keywords, contexts, user intents).

## When to Use

- **Do use** when ...
- **Don't use** when ...

## Command Reference

```
/command [arg]        # Description
/command --flag       # Description with flag
```

## Workflow

### Step 1: Title

Instructions for the AI agent.

### Step 2: Title

More instructions.

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| `ErrorType` | Why it happens | How to resolve |

## Cross-References

- Related skill: `other-skill-name`
- Reference: `ios26-api-reference/essentials/swift6.md`

## Kimi Adaptation (if skill dispatches subagents)

Since Kimi Code does not support subagent dispatch, use this sequential approach:

1. **Manual step 1** — Instructions...
2. **Manual step 2** — Instructions...
```

---

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique skill identifier (matches directory name) |
| `description` | Yes | Discovery text for marketplaces and auto-loading |
| `invoke` | No | Example command invocation |

---

## Content Guidelines

1. **Self-contained** — A skill should make sense when loaded alone.
2. **Severity framework** — Use P0 (Critical), P1 (High), P2 (Medium), P3 (Low) for issues.
3. **Platform-neutral** — Avoid "Claude Code will..." unless in agent definitions.
4. **Concrete examples** — Show real Swift code, not pseudocode.
5. **File:line references** — When citing issues, use `File.swift:42` format.

---

## Validation

After creating the skill:

```bash
node scripts/validate.js
node scripts/build.js
```

Both must pass before committing.
