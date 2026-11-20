# D&D Quick Reference

> **💡 Important:**
>
> If the page looks off, sections don’t load, or you’re not seeing the newest features —
>
> **hard-refresh your browser** (`Ctrl + Shift + R` or `Ctrl + F5`).
> This should be purely optional as the page has logic to automatically refresh if a new version is detected and you have an older version cached, but it never hurts to try 😉
>
> GitHub Pages and browsers aggressively cache static files,
>
> so a full reload ensures you’re running the latest version with **all recent improvements, fixes, and UI updates**.
>
> Think of it as your *long rest* for the app — refresh to recharge and unlock new abilities!

A browser-based Dungeons & Dragons 5e reference for players and Dungeon Masters.
Look up common actions, movement, conditions and environmental rules during play,
with separate **2014** and **2024** rulesets.

The site offers two looks built on the same rule data: the new layout and the
classic layout of the 2.x site. It is a quick reminder of the rules, not a
replacement for the rulebooks.

- **[Open the site](https://dnd.misiek.win/)**
- [Test deployment](https://dndtest.misiek.win/) - previews changes before they reach the main site
- [Source repository](https://github.com/mfriik/dnd5e-quickref)
- [Test repository](https://github.com/mfriik/DnD-Quick-Ref-Experimental)

## What it covers

| Section | Contents |
| --- | --- |
| Movement | Movement costs, climbing, swimming, jumping and difficult terrain |
| Actions | Attacking, spellcasting, defensive actions, helping and interacting |
| Bonus actions | Offhand attacks, spells and features that use a bonus action |
| Reactions | Opportunity attacks, readied actions and reaction spells |
| Conditions | Effects such as blinded, grappled, poisoned and exhaustion |
| Environmental effects | Obscured vision, lighting, special senses and cover |

Available entries and details depend on the selected ruleset. Cards include
short summaries, expanded explanations and source references.

## Using the reference

- **Choose a layout.** In the new layout, turn on **Classic layout** in the
  Settings menu. In the classic layout, turn off **Classic Layout** in the
  Settings section. The page reloads in the chosen look and keeps the current
  section address. The choice is remembered. Visitors returning from the 2.x
  site start in the classic layout; new visitors start in the new layout.
  The classic layout lives at `classic/`, but both addresses follow the saved
  choice, so a shared link opens in each reader's preferred look.
  The descriptions below cover the new layout. The classic layout has no search,
  help guide or theme button; it marks optional rules with `*` and homebrew
  rules with `**` after the title.
- **Search rules.** The search box in the sticky menu filters the current edition
  as you type. It searches titles, subtitles, descriptions and bullet details
  as readable text, ignoring letter case. Every word must occur somewhere in a
  card; words can match different fields. Source references are not searched.
  Search includes optional and homebrew rules even when their Settings switches
  are off, without changing those switches. Empty sections, environmental groups
  and their section-navigation icons disappear; sections with results open
  temporarily, but individual cards keep their open/closed state.
  Use the X inside the box to clear it and restore your section state and current
  Settings filters. Empty or whitespace-only searches also restore that view.
  Searches are not saved across reloads or edition changes.
  Opening Help temporarily shows the full page; closing it restores your search
  and view.
- **Choose an edition.** The D&D 5e / D&D 5.5e button switches between the 2014
  and 2024 rulesets respectively; its tooltip includes the edition year. It
  reloads the page with the selected data. The initial default is 2014.
  A short fade and status message make the change visible; reduced-motion
  preferences disable the animation and its added delay.
  Sections and cards also fade in when the page first loads or is refreshed.
- **Jump to a section.** The sticky navigation stays available while scrolling.
  Selecting a section opens it if it was collapsed. The up arrow returns to
  the top and clears the section fragment from the address.
- **Open only what you need.** Select a card to reveal its details, or a section
  heading to collapse that section. The return-arrow button in each section
  closes all its open cards; it is disabled when none are open.
- **Switch the theme.** Use the sun/moon button beside the edition selector.
  On your first visit, the appearance follows your system theme.
  Colors transition smoothly without hiding text; reduced-motion preferences
  make theme changes immediate. Both layouts opt out of automatic color changes
  by Dark Reader so their own themes are not transformed a second time. This cannot
  prevent other extensions or browser settings from forcing a dark theme.
- **Include extra rules.** Settings provides separate switches for optional
  official rules and homebrew rules, both hidden by default. A tiny gold star
  marks optional rules; a gold beer stein marks homebrew rules. These icons
  appear before the card title. Expanded cards retain
  their written rule-type labels.
  Homebrew entries are available in both editions; optional official entries
  are currently present in the 2014 dataset.
  The 2014 homebrew entries include Exhaustion (2024), an alternative to the
  original Exhaustion condition, not an additional set of penalties.
  Other 2014 homebrew entries include Bleeding, Intercept Attack, Take Aim and
  Throw a Potion.
  Both editions include Delay and the 3.5e-inspired Flanked condition (+2 to
  melee attacks against the flanked target). The 2024 homebrew entries also
  include Switch Mastery, Duck and Cover, and Dazed.
  Cards show standard rules first, then optional rules, then homebrew.
  Shove Aside and Exhaustion (2024) stay beside their standard counterparts.
- **Give feedback or open the site address.** Both links are in Settings. They
  point to the issue tracker and address of the deployment you are using.
- **Get interface help.** The question-mark button after Settings opens a
  read-only guide over a dimmed page. Descriptions appear beside visible controls
  on larger screens, without a side list. Rounded gold arrows connect each
  description to its control without crossing or overlapping other arrows.
  The same descriptions identify each control's location and explain its action
  on every screen size. Multi-part explanations use bullet lists with bold
  labels.
  When the large-screen annotations do not fit, an intermediate layout keeps
  all ten bubbles anchored in columns on the page, with only the Help heading
  and X always visible. Scroll the page and annotations together using the wheel,
  a swipe, arrow keys, Page Up/Down or Home/End. Arrows are drawn once for
  specific controls, including offscreen controls, and do not reroute on scroll.
  The top menu also scrolls with the page in this mode so its arrows stay aligned.
  Arrows without a clear, noncrossing route are not drawn.
  The large-screen layout still pauses scrolling. On phones, short viewports or
  when the fixed bubbles cannot fit legibly, a scrollable guide covers all topics.
  Ten separate topics cover navigation, Jump to Top, preferences, ruleset,
  theme, Settings, sections, cards, Collapse All and rule markers. Repeated
  controls can be highlighted in a later section when an earlier one has no
  room for its description.
  Controls underneath are blocked until you close help
  with X or Escape. While help is open, optional and homebrew cards are shown
  temporarily so their markers can be explained. Closing help restores your
  filters and scroll position without changing saved preferences or open cards.
- **Print what you need.** Open the sections and cards you want, then use your
  browser's Print or Save as PDF option. Print styling removes navigation and
  notices; collapsed or filtered-out content remains hidden.

The layout adapts to narrow screens. Controls support keyboard navigation,
visible focus and explanatory tooltips, and animations respect your system's
reduced-motion preference.
Hovering over a rule card shows its description in a native browser tooltip.

### Saved preferences

The site remembers your layout, edition, theme choice, optional/homebrew
filters, collapsed sections and dismissed notices in your browser's local
storage. Both layouts share these preferences.
Individual cards start closed after a reload.
On a first visit, the site follows your system theme until you choose one; that
choice is remembered on later visits.

Preferences are specific to the browser and site address: the main site, test
deployment and local preview do not share them. No account is required.
The cookie notice can be dismissed with **Accept**. To show it again locally,
run `localStorage.removeItem('cookiesAccepted'); location.reload();` in your
browser's developer console on the local preview. Other preferences are preserved.

## Run locally

The application is a static HTML, CSS and JavaScript site. It needs no package
installation, build step or application server.
The help overlay also runs entirely in the browser and works with static
GitHub Pages hosting, including repository subpaths; no backend is required.

With Python installed, run this from the repository root:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open [http://127.0.0.1:8765/](http://127.0.0.1:8765/). Refresh after editing files;
if older assets persist, use `Ctrl + Shift + R`.
The local preview opens the layout saved in your browser; use the Settings
switch to change it.

The page loads fonts from Google Fonts, with fallback fonts available.

## Deployment and site address

The site is published by GitHub Pages directly from the repository files.
[CNAME](./CNAME) holds the custom domain of the repository's deployment. Adjust this if you want to use a different domain.

To use another domain, change CNAME and add the domain to `sites` in
[js/site.js](./js/site.js). The pages contain no deployment domains of their own.

Both layouts set the version in their inline head script
(`CURRENT_APP_VERSION`). Keep the two values equal; a changed version makes
returning browsers reload the page without cached files.

## Repository and customization

| Location | Purpose |
| --- | --- |
| [index.html](./index.html) | New layout: page structure, section containers, menu and Settings |
| [js/quickref.js](./js/quickref.js) | New layout: loads the chosen edition, renders cards and handles interaction and preferences |
| [css/quickref.css](./css/quickref.css) | New layout: themes, responsive and print styles |
| [classic/](./classic/) | Classic layout: its own [index.html](./classic/index.html), [quickref.js](./classic/js/quickref.js) and [quickref.css](./classic/css/quickref.css) |
| [js/](./js/) | Rule datasets shared by both layouts: `data_*.js` for 2014 and `2024_data_*.js` for 2024 |
| [js/site.js](./js/site.js) | Shared deployment links resolved from the site domain |
| [CNAME](./CNAME) | Custom domain of the GitHub Pages deployment |
| [img/](./img/) | Rule pictograms and the full icon library for future entries |
| [favicon.ico](./favicon.ico) | Site icon |
| [tests/quickref.test.cjs](./tests/quickref.test.cjs) | Dependency-free checks for datasets, script syntax, asset references, layout switching and site links |

Each layout loads one set of rule files for the selected edition and turns
their entries into cards. Both editions share the same renderer and interface
within a layout. The layouts have separate styles and scripts; only the rule
data, images and [js/site.js](./js/site.js) are shared.
Environmental data is grouped into obscurance, lighting, vision and cover.

### Editing rules

Edit the relevant file in [js/](./js/) for the edition you intend to change.
For example, [data_action.js](./js/data_action.js) contains 2014 actions, while
[2024_data_action.js](./js/2024_data_action.js) contains their 2024 counterparts.
The files are maintained JavaScript data, not an in-page rule editor.

Follow the existing entry structure:

- `title` and `subtitle` provide the card's heading and summary.
- `description` and `bullets` provide the expanded explanation; `bullets` is an
  array of HTML strings.
- Write `title`, `subtitle` and `description` in Title Case, preserving acronyms
  such as HP and D20. Detailed `bullets` keep normal sentence capitalization.
- `reference` identifies the rule source.
- `icon` names a PNG in [img/](./img/), without its extension.
- `optional` classifies the entry as `Standard rule`, `Optional Official rule` or
  `Homebrew rule`, which determines whether the Settings filters hide it and
  which marker each layout shows.

Detailed content supports HTML, so use trusted content and preserve the existing
formatting conventions. Changes to one edition do not automatically update the
other; check both when a correction applies to both rulesets.

For interface changes, edit [css/quickref.css](./css/quickref.css) for the new
layout or [classic/css/quickref.css](./classic/css/quickref.css) for the classic
layout. Both take image paths directly from each entry's `icon` value: the new
layout as CSS masks, the classic layout as background images. No separate
icon-class stylesheet is needed. The full image library is kept so new entries
can use additional icons.

## Contributing

[Report a problem or suggest an improvement](https://github.com/mfriik/dnd5e-quickref/issues).
For a rule correction, include the edition and source reference. For interface
problems, include your browser, steps to reproduce and a screenshot if useful.

Pull requests should be focused and explain the intended behavior. Run the site
locally and check the affected ruleset and layout, both themes and a narrow screen.
For interaction changes, also check keyboard use and the relevant saved settings.
With Node.js 18 or later installed, run the dependency-free automated checks:

```powershell
node --test
```

These check both editions' dataset formats and icons, JavaScript syntax and
local asset references in both layouts, search-word matching, layout selection
and the site address taken from CNAME. They do not replace the browser
interaction checks above.
There is no build step.

## Credits and license

- [crobi/dnd5e-quickref](https://github.com/crobi/dnd5e-quickref) - original project.
- [nico-713/dnd5e-quickref-2024](https://github.com/nico-713/dnd5e-quickref-2024) - source for the 2024 rules adaptation.
- [natsumeaoii/dnd5e-quickref](https://github.com/natsumeaoii/dnd5e-quickref) - inspiration for features and design.
- [game-icons.net](https://game-icons.net/) - rule icons.
- [Iconduck dragon icon](https://www.magnific.com/icon/dragon_7641529#fromView=search&page=2&position=0&uuid=10a4567f-e3c9-4e35-9b65-c98ee5dc56ab) - favicon.

The repository includes an [MIT license](./LICENSE).
