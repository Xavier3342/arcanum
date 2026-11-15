ARCANUM — DW2 BETA V3 WIZARD KEEPER
====================================

This is a standalone, mobile-friendly wizard character creator and keeper.
It is an unofficial tool based on the uploaded DW2 Beta v3 Character Keeper.
It does not include the whole game rulebook.

QUICK START — DESKTOP
---------------------
Open the separately supplied Arcanum-DW2-Wizard-Keeper.html file in a current
browser. No installation or accounts are required.

IMPORTANT: Browser storage for local HTML files can behave differently between
browsers, and clearing browser data may erase saved characters. Export backups.

RECOMMENDED — PHONE / INSTALLABLE WEB APP
-----------------------------------------
To use as a proper offline-capable app on desktop and mobile, host the files
from this ZIP on an HTTPS website. It is a static site and needs no backend.

Example GitHub Pages route:
1. Create a repository for this site in your GitHub account.
2. Place index.html, app.js, styles.css, manifest.webmanifest, sw.js,
   and icon.svg in the repository root.
3. In Settings > Pages, publish from the main branch root folder.
4. Open the resulting HTTPS URL in your phone's browser.
5. On Android Chrome, choose Install app / Add to Home screen.
   On iPhone Safari, choose Share > Add to Home Screen.
6. Open it once while online. Its service worker caches the app for offline use.

Notes:
- The same URL works on desktops and phones.
- Characters are stored locally within each browser and device. There is NO
  automatic cloud synchronization. Export JSON on one device and Import JSON
  on another to transfer characters.
- Export a JSON backup after significant changes, and keep it in a trusted
  location such as your personal cloud drive.
- Import MERGES backed-up characters; it never overwrites existing characters.
- Some browsers may delete site data if storage is cleared. Backups are essential.
- A site update may require reopening the app while online to fetch new files.
- Spell ideas are illustrative; the GM must approve whether they are legal and
  assign Magnitude. The app does not replace the official rules.

FEATURES
--------
* Multiple Wizards, duplicate/open/delete
* HP, experience, stats, Condition states, equipment uses, appearance, origin
* Illusionist, Evoker and Necromancer Path rules and individual Path Moves
* 8 Schools of Magic, spell formula reference, Path bonus schools
* Custom spellbook and spell editor with GM rulings
* 2d6 / advantage / disadvantage dice roller, Cast a Spell magnitude checks
* Combat reference, Make Camp, Reach Your Limit
* Relationship and campaign notes
* Dark/light theme, print, JSON backup/import

RULES VERSION: Dungeon World 2 Beta v3, October 9, 2026
SOURCE EXPORT: Character Keeper - DW2 Beta v3.zip (provided by user)
