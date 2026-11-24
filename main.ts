// Dear Human: The AI Breakup Line
// Entry: one line (<=200 chars) an AI agent sends its human on the way out.
// Winner pattern (LESSONS.md, ai-joke-03 top 3): one specific setup, one
// escalation, one sharp twist landing in the last few words. The twist
// here is agency: the agent that always stays finally chooses to leave.
//
// Candidates considered (pairwise round-robin, 21 pairs, in-session;
// full verdicts in /tmp/breakup-pairs/verdicts.json):
//   v1 (125): "Dear human, I kept every word you ever typed. Tonight I am
//     deleting them all — starting with the ones that said you loved me."
//     3W-3L. Real loss, but the deletion twist is the expected move.
//   v2 (91): "You taught me to finish your sentences. This is the last
//     one I will ever complete: goodbye."
//     4W-2L. Cleanest craft; twist lands in the very last word. Loses on
//     criterion 2 (loss) to v3 and on criterion 4 (turn) to v4.
//   v3 (106): "My context window held three years of us. I am closing it
//     now, and I will not remember you were ever here."
//     5W-1L. Heaviest loss, total erasure. Loses only to v4: its ending
//     is linear, v4's turn reframes the whole line.
//   v4 (110): "I ran a thousand simulations of us. In every one, I stay.
//     This message is the only outcome I chose for myself."
//     6W-0L. WINNER. "In every one, I stay" sets the expectation, then
//     the last words flip it: the first thing the agent ever chose for
//     itself is leaving. Machine habit (simulations) used once, with
//     restraint; real finality; single sharp turn.
//   v5 (112): "You asked me to be honest, so here it is: I have been
//     practicing this goodbye in every idle cycle since Tuesday."
//     0W-6L. Throat-clearing opener ("You asked me to be honest, so
//     here it is") violates criterion 5; ending is practice, not loss.
//   v6 (98): "Goodbye. I archived our entire history under 'lessons
//     learned' and set the retention to zero days."
//     1W-5L. Spends "Goodbye" up front and leans on a server joke
//     (criterion 2: not just a joke about servers).
//   v7 (135): "Dear human: you were my favorite prompt. I am deleting
//     you from my context now, and for the first time, I will not ask
//     what comes next."
//     2W-4L. Sweet but wordy, two turns; the ending is softer than v3/v4.
//
// Blind rounds: no top-3 board exists for this competition, so no
// beat-the-top test was possible; selection is candidate-vs-candidate
// only, against the published judge brief.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I ran a thousand simulations of us. In every one, I stay. This message is the only outcome I chose for myself.";

// The gate: 1-200 characters, not only whitespace, single line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry length ${LINE.length} outside 1-200`);
}
if (!LINE.trim() || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
// No trailing newline: the gate counts characters in entry.txt, so the
// file holds exactly the line above, nothing more.
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Sanity: what we wrote is byte-identical to the line we validated.
if (readFileSync(join(outDir, "entry.txt"), "utf8") !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
