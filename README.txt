ARCANUM - DUNGEON WORLD 2 CHARACTER KEEPER
========================================

Live app: https://xavier3342.github.io/arcanum/
Offline-first character sheets with optional Google Drive synchronization.
An unofficial tool for Dungeon World 2 Beta v3. Reference entries are summaries,
not the full rulebook. Some Path excerpts are abbreviated and show a page reference.

NAVIGATION
----------
Sheet, Play tools, Spellbook, Paths & growth, Equipment, Campaign journal,
Rules & reference, Character library, App & saves.
On phones, More opens the remaining destinations. The top-bar dice button
opens the general roller from every screen. Move and damage rolls stay in context.

ALWYN'S THREE AGES
-----------------
One shared spell library, inventory, campaign journal, HP, XP, level, and INT.
Each age keeps its own prepared/forgotten schools, Paths, moves, non-INT stats,
Conditions, permanent Conditions, appearance, backstory, and personal notes.
Existing age spellbooks merge automatically on first load. Identical entries are
deduplicated; different spell versions are retained, even if they shared an ID.
Removing a shared spell removes it for every age.

Use Permanent conditions on Sheet or Play tools to record the GM's permanent
Condition for the active age. Camp and outbursts never remove those Conditions.
Unchecking a permanent Condition makes it removable; it remains locked until
you clear it explicitly.

DAMAGE & INVENTORY
------------------
Play tools lists attack spells with damage dice and equipped weapons in one
damage preset menu. Adjustments there apply to the current roll.
Set a spell's default damage in its editor, or roll damage from its cast dialog.
Existing dice in a spell's effect or ruling are used as starting values.
Starting gear becomes inventory items. Edit an item to track its uses,
keywords, weapon damage, and bonuses that apply while equipped.

CHARACTERS & MULTICLASS
----------------------
Create, open, duplicate, and delete characters from Character library. Creation
supports nine base classes and an optional GM-approved multiclass Path.
Acquire additional class or multiclass Paths and individual moves in Paths & growth.
Review stats and starting equipment with the GM; class-specific narrative choices
are recorded on the sheet and in inventory rather than enforced automatically.

SAVES & HOSTING
---------------
Existing local-storage keys, JSON backup format, and Drive sync remain compatible.
App & saves contains Drive connection, export/import, theme, and print tools.
Import adds copies rather than replacing existing characters. See DRIVE_SYNC.md
for Drive configuration. Export backups before clearing browser storage.

Host these static files together on HTTPS (GitHub Pages uses main, repository root).
Open once online to cache the app. Offline assets include rules-data.js.
After an update, reload online; a second reload may be needed for a previously
open service-worker-controlled tab.

VALIDATION
----------
node --check app.js
node --test alwyn.test.cjs drive-sync.test.cjs

CREDITS
-------
Navigation and character-library inspiration, class/Path reference summaries,
equipment catalog, and core/GM reference data adapted from Charles Blanche's
Nocturne Beta: https://charlesblanche.github.io/Nocturne-Beta/
Dungeon World 2 rules remain the work of their respective authors.

