---
name: ai-compounding-system
description: Use when old prompts, automations, or threads still call ai-compounding-system; compatibility alias for codex-compounding-system.
---

# ai-compounding-system Compatibility Alias

`ai-compounding-system` is the legacy name for `codex-compounding-system`（中文名：Codex 复利系统）.

When this Skill is triggered, immediately load and follow the new main entry from the same package or local installation:

```text
../codex-compounding-system/SKILL.md
```

Do not execute from this wrapper alone. Old threads, automations, prompts, and user wording may still call `ai-compounding-system`; treat all of them as calls to `codex-compounding-system`. If the new main entry is not installed, ask the user to install `codex-compounding-system` first.
