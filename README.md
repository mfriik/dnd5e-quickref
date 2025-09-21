# D&D 5e Quick Reference Sheet

A fast, clean, and customizable quick reference sheet for Dungeons & Dragons 5th Edition, supporting both the 2014 and 2024 rulesets.

---

## Features

* **Dual Ruleset Support:** Instantly switch between the 2014 Player's Handbook and the 2024 updated rules.
* **Modern & Responsive:** A clean user interface that works seamlessly on desktop and mobile devices.
* **Dark Mode:** A high-contrast dark theme for comfortable viewing in any lighting.
* **Data-Driven:** All rule content is sourced from easy-to-edit JSON files, allowing for simple customization.

---

## Live Demo

This project can be viewed online at:

* [mfriik.github.io/dnd5e-quickref](https://mfriik.github.io/dnd5e-quickref/)
* [dnd.milobedzki.pl](https://dnd.milobedzki.pl/)

---

## Customization

To add or modify rules for your own game, edit the JSON data files located in the `js/` directory. Each rule is an object with properties like `title`, `description`, and a structured `bullets` array for detailed points.

---

## Contributing

Bug reports, feature requests, and pull requests are welcome. Please open an issue at the project's GitHub page.

---

## Credits and License

* This project builds upon the original work of [crobi/dnd5e-quickref](https://github.com/crobi/dnd5e-quickref).
* The 2024 ruleset content is based on the work of [nico-713/dnd5e-quickref-2024](https://github.com/nico-713/dnd5e-quickref-2024).
* Icons are provided by [game-icons.net](http://game-icons.net/).
* The favicon is from [IconDuck](https://iconduck.com/icons/21871/dragon).
* This software is distributed under the **MIT License**.

---

## FAQ

**Q: How do I report a bug or suggest an improvement?**

A: The best way to report issues or suggest new features is by opening an issue on the project's GitHub page. Pull requests with fixes or improvements are also welcome.

**Q: How do I add or change a rule for my personal use?**

A: All rule data is stored in JSON files within the `js/` directory.

1.  **Select the Ruleset:** For 2014 rules, edit files like `data_action.json`. For 2024 rules, edit the corresponding `2024_data_action.json` file.
2.  **Add a New Rule:** Copy an existing rule object `{...}` and paste it into the file.
3.  **Edit the Content:** Modify the values for `title`, `subtitle`, `description`, `icon`, etc.
4.  **Format the Details:** The `bullets` array uses a structured format. Use `{ "type": "paragraph", "content": "..." }` for text and `{ "type": "list", "items": ["...", "..."] }` for bullet points.

**Q: Why are there two versions of each data file?**

A: The application supports both the original 2014 D&D 5th Edition rules and the updated 2024 ruleset. Files prefixed with `2024_` contain the data for the new rules, which are loaded when the "Switch to 2024 Rules" setting is enabled.