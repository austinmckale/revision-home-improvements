# Manager App ideas — October 19, 2026

These ideas are for the Manager App at `app.rhipros.com`, the dashboard. It is a separate codebase from this website repo.

## 1. Desktop app feel and speed

**Problem:** the dashboard feels slow to respond, and editing or interacting with it is clunky. The owner asked whether it could be an .exe instead of a website.

**Recommendation:**
- **Quick win:** make it installable from Chrome or Edge as a desktop app (a PWA: a web app manifest plus icons). It gets its own window and desktop icon. No .exe is needed unless offline use, desktop notifications or file access become requirements; then wrap it with Electron or Tauri.
- **The real fix:** a desktop wrapper loads the same pages from the same server, so it won't make anything faster. Profile the slow screens and actions (slow API or database calls, full page reloads on edit) and fix those. Ask the owner which 2–3 screens or actions feel slowest and start there.

## 2. "Lock and regenerate" for AI-written content

**What the owner wants:** to edit what the AI writes in the dashboard, approve the parts they like with a checkmark, and ask the AI for new versions without losing the approved parts.

**Proposed behavior:**
- AI drafts arrive as separate fields. For a project: name, story, photo captions, town and service. For an estimate: each line item and note.
- Every field is editable in place; you click and type, without going back through the AI.
- Each field has a ✓ approve (lock) toggle.
- "Regenerate" rewrites only unlocked fields. Locked fields are sent to the model as fixed context, so new drafts stay consistent with them, and they are never overwritten.
- Editing a field by hand locks it automatically, so the owner's own words are never lost.
- **Optional:**
  - a per-field note to steer the next draft ("shorter", "mention the epoxy floor")
  - version history with undo
  - "publish or send" enabled once every field is approved

**Data sketch:** each field stores `value`, `locked` (boolean), `source` (ai or human), `updatedAt`, and an optional `history[]`. The regenerate request sends locked fields as constraints and asks the model for the unlocked keys only (structured output); the response is merged into unlocked fields only.

**Questions still to answer with the owner:**
1. Which content uses this: project write-ups, estimates/proposals, customer messages, social posts?
2. Lock size: per field (recommended), per sentence, or the whole item?
3. Should a hand edit lock automatically (recommended)?
4. After everything is approved, does it stay a draft or publish/send with one click?

## Related website context

The public site's copy rules (project names, stories, voices) live in this repo's `CODEX.md`. AI-drafted project content should follow them. The current marketing plan is in `docs/marketing-plan-2026-10-16.md`.
