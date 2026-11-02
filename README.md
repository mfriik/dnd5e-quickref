# 🎲 mfriik/dnd5e-quickref v2.0

> **💡 Important:**  
> If the page looks off, sections don’t load, or you’re not seeing the newest features —  
> **hard-refresh your browser** (`Ctrl + Shift + R` or `Ctrl + F5`).
> This Should be purely optional as the page has logic to automatically refresh if a new version is detected and you have older version cached, but it never hurts to try 😉 
>
> GitHub Pages and browsers aggressively cache static files,  
> so a full reload ensures you’re running the latest version with **all recent improvements, fixes, and UI updates**.  
>
> Think of it as your *long rest* for the app — refresh to recharge and unlock new abilities!

---

## Local UI preview

From the repository root, with Python installed:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open [localhost:8765](http://127.0.0.1:8765). No install or build step is needed.
After editing HTML, CSS or JavaScript, refresh the page; use `Ctrl + Shift + R`
if the browser retains old assets.

The interface uses a compact field-guide style, with category-colored icon backgrounds
and light and dark surfaces. Pictograms use a contrasting color for each theme.
On a first visit, the theme follows the operating system.
Category navigation is generated from rule sections and fills the available width.
New sections following the existing `.section-container` structure are included
automatically; Settings lives in its separate header dropdown. The fixed arrow button
returns to the page heading and respects reduced-motion preferences.
The current ruleset stays visible in a fixed rectangular badge in the top-right
corner, with its right edge aligned with the return-to-top button.
Settings, rule cards, sections and the domain dialog open with a short 180 ms
slide, without fading text. Reduced-motion preferences disable these animations;
closing remains immediate so hidden content never retains keyboard focus.
Open Settings with the gear next to the ruleset indicator; the dropdown closes
with Escape or a click outside. Changing **Dark theme** saves an explicit preference. Existing saved
theme choices are preserved. To test system-theme behavior again, remove only
the `darkmode` key in DevTools > Application > Local Storage.

### Previewing the domain notification

The notification opens automatically on every domain, including localhost,
until dismissed for that origin in the current browser.
To preview it again after dismissal, open DevTools > Console and run:

```javascript
showDomainModal();
```

The close button, Escape and **Got it, thanks!** all dismiss it and save
`domainChangeNotificationDismissed = 'true'`. App-version updates do not reset
this choice. To test a fresh visit, remove only that key in Local Storage.
Do not clear all storage unless you also want to reset your rules and theme choices.

### UI regression checklist

- Check light/dark themes, system theme on first visit, and saved preferences.
- Check 2014/2024 rules, Optional/Homebrew filters, section persistence, individual
  rule expansion, and **Collapse all items**.
- Use only the keyboard: skip link, category links, Enter/Space on toggles,
  Tab/Shift+Tab inside the notification, and Escape to dismiss.
- Check narrow screens from 320 CSS pixels, 200% text size and 400% browser zoom;
  no information or controls should be clipped.
- Check reduced-motion mode, visible focus, contrast and print/PDF.
- Check the cookie notice and domain dialog together; after dismissal, reload
  and confirm the notification stays dismissed.

The accessibility target is WCAG 2.2 AA for the updated UI. Automated checks
do not replace manual keyboard and screen-reader testing.

---

## 🌐 Live View

- [**mfriik.github.io/dnd5e-quickref**](https://mfriik.github.io/dnd5e-quickref/)  
- [**dnd.milobedzki.pl**](https://dnd.milobedzki.pl/)
- [**dnd.misiek.win**](https://dnd.misiek.win) - NEW DOMAIN - it was cheaper :P

---

## 🧾 What This Is

A **compact, printable, browser-friendly quick reference sheet** for *Dungeons & Dragons 5e* —  
supporting both the classic **2014** and the updated **2024** rulesets.

It’s built for players and DMs who want the essentials at their fingertips —  
**no scrolling through PDFs, no rules hunting mid-combat.**

---

<details>
<summary>🧰 <strong>Core Features</strong></summary>

- ⚡ **Fast** – Lightweight static HTML/CSS/JS.
- 🗂️ **Collapsible Sections & Items** – Expand only what you need and see everything at a glance.  
- 🧙 **Optional & Homebrew Toggles** – Show or hide extra content on demand.  
- 🌗 **Dark Mode** – Eye-friendly for late-night sessions.  
- 🔄 **2014 ↔ 2024 Rules Switch** – Instantly swap between editions.  
</details>

---

<details>
<summary>🛠️ <strong>Editing the Sheet</strong></summary>

The magic lives inside the **`js/`** folder — each data file defines a rules section.

You can:

- ✏️ Add or modify **actions**, **conditions**, or **environmental effects**  
- 🧩 Insert **custom notes** or **house rules**  

Changes appear instantly — **no build pipeline, no bundlers, no nonsense.**

</details>

---

<details>
<summary>📂 <strong>Repository Layout</strong></summary>
index.html ← main page
css/ ← stylesheets
js/ ← JavaScript + data files
img/ ← icons and images

</details>

---

<details>
<summary>🤝 <strong>Contributing</strong></summary>

- Found a bug or have an idea? → [Open an Issue](https://github.com/mfriik/dnd5e-quickref/issues)  
- Want to add a rule or feature? → Fork → Commit → PR  

When editing, keep changes **focused and well-described**.  
For personal tweaks (like adding your own class actions), edit the `js/data` files directly — and host it for yourself.

</details>

---

<details>
<summary>📜 <strong>Credits & Acknowledgements</strong></summary>

- 🧩 Original project: [**crobi/dnd5e-quickref**](https://github.com/crobi/dnd5e-quickref) - DEPRECATED 
- 🪄 2024 rules update source: [**nico-713/dnd5e-quickref-2024**](https://github.com/nico-713/dnd5e-quickref-2024) - Rules for 2024 were "Copied with pride" :P
- ❤️ Source of certain improvement ideas and a great variant of this cheatsheet with different design choices. [**natsumeaoii/dnd5e-quickref**](https://github.com/natsumeaoii/dnd5e-quickref)
- 🎨 Icons: [**game-icons.net**](http://game-icons.net/)  
- 🐉 Favicon: [**iconduck.com/icons/21871/dragon**](https://iconduck.com/icons/21871/dragon)

</details>

---

<details>
<summary>⚖️ <strong>License</strong></summary>

Check the `LICENSE` file in this repository.  

</details>

---

<details>
<summary>🧭 <strong>Contact</strong></summary>

- 📮 Issues → [GitHub Issues Page](https://github.com/mfriik/dnd5e-quickref/issues)  

</details>

---

> **Thanks for using and improving this quick reference!**  
> May the dice be forever in your favour!
