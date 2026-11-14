// Dynamically load the correct data files (2024 or standard) based on localStorage setting
(function() {
    var rules2024 = localStorage.getItem('rules2024') === 'true';
    var head = document.getElementsByTagName('head')[0];

    // Helper to inject a script tag for a data file
    function loadScript(src) {
        var script = document.createElement('script');
        script.src = src;
        script.defer = false;
        head.appendChild(script);
    }

    // Load either the 2024 or standard data file for a given base name.
    // Rule data is shared with the new layout in the site root.
    function loadRuleFile(base) {
        if (rules2024) {
            loadScript('../js/2024_' + base + '.js');
        } else {
            loadScript('../js/' + base + '.js');
        }
    }

    // List of all rule data files to load
    var ruleFiles = [
        'data_movement',
        'data_action',
        'data_bonusaction',
        'data_reaction',
        'data_condition',
        'data_environment',
    ];

    ruleFiles.forEach(loadRuleFile);
})();

// Create and append a quick reference item to a section
// Sets up modal open logic for the item
function add_quickref_item(parent, data, type) {
    var icon = data.icon || "perspective-dice-six-faces-one";
    var subtitle = data.subtitle || "";
    var title = data.title || "[no title]";
    var optional = data.optional || "Standard rule";
    var description = data.description || data.subtitle || "";
    var bullets = data.bullets || [];
    var reference = data.reference || "";

    // Shared data stores the rule type only; the classic look marks extra rules in the title.
    if (optional === "Optional Official rule") {
        title += "*";
    } else if (optional === "Homebrew rule") {
        title += " **";
    }

    var item = document.createElement("div");
    item.className = "item itemsize";

    var itemTextContainer = document.createElement("div");
    itemTextContainer.className = "item-text-container text";

    var itemTitle = document.createElement("div");
    itemTitle.className = "item-title";
    itemTitle.textContent = title;
    itemTextContainer.appendChild(itemTitle);

    var itemDesc = document.createElement("div");
    itemDesc.className = "item-desc";
    itemDesc.textContent = subtitle;
    itemTextContainer.appendChild(itemDesc);
    
    var itemHeader = document.createElement("div");
    itemHeader.className = "item-header";
    var itemIcon = document.createElement("div");
    itemIcon.className = "item-icon iconsize";
    var iconUrl = new URL("../img/" + encodeURIComponent(icon) + ".png", document.baseURI);
    itemIcon.style.backgroundImage = 'url("' + iconUrl.href + '")';
    itemHeader.appendChild(itemIcon);
    itemHeader.appendChild(itemTextContainer);
    var chevron = document.createElement("span");
    chevron.className = "chevron";
    itemHeader.appendChild(chevron);

    var bulletsHTML = bullets.map(function (bullet) {
        if (typeof bullet === 'object' && bullet.collapsible) {
            var contentHtml = bullet.content.map(p => `<p>${p}</p>`).join('');
            return `
                <div class="item-collapsible-container">
                    <div class="item-collapsible-title">
                        ${bullet.title}
                    </div>
                    <div class="item-collapsible-content">
                        ${contentHtml}
                    </div>
                </div>`;
        } else {
            return `<p>${bullet}</p>`;
        }
    }).join("\n<hr>\n");

    var itemContent = document.createElement("div");
    itemContent.className = "item-content collapsed";
    itemContent.innerHTML = `
        <p class="item-description">${description}</p>
        <div class="item-bullets">${bulletsHTML}</div>
        <div class="item-reference">${reference}</div>
    `;

    item.appendChild(itemHeader);
    item.appendChild(itemContent);

    // Start with content collapsed
    itemContent.classList.add('collapsed');

    itemHeader.addEventListener('click', () => {
        const chevron = itemHeader.querySelector('.chevron');
        const willBeCollapsed = !itemContent.classList.contains('collapsed');
        chevron.classList.toggle('collapsed');

        if (willBeCollapsed) { // Collapsing
            // Set max-height to current scrollHeight then to 0
            itemContent.style.maxHeight = itemContent.scrollHeight + 'px';
            // force reflow
            void itemContent.offsetHeight;
            itemContent.style.maxHeight = '0px';
            itemContent.style.opacity = '0';
            itemContent.classList.add('collapsed');
        } else { // Expanding
            // Set from 0 to full height then remove max-height
            itemContent.style.maxHeight = '0px';
            itemContent.classList.remove('collapsed');
            // force reflow
            void itemContent.offsetHeight;
            itemContent.style.maxHeight = itemContent.scrollHeight + 'px';
            itemContent.style.opacity = '1';
            // after transition ends, clear the inline max-height
            itemContent.addEventListener('transitionend', function te(ev) {
                if (ev.propertyName === 'max-height') {
                    itemContent.style.maxHeight = '';
                    itemContent.removeEventListener('transitionend', te);
                }
            });
        }
        // After toggling, update the "Collapse all" button state for the parent section
        updateCollapseAllButtonState(item.closest('.section-container'));
    });

    item.setAttribute("title", optional);
    parent.appendChild(item);
}

// Fill a section with quickref items from a data array
function fill_section(data, parentname, type) {
    var parent = document.getElementById(parentname);
    if (parent && data && data.length > 0) {
        parent.classList.add('items-grid-container');
    }
    data.forEach(function (item) {
        add_quickref_item(parent, item, type);
    });
}

// Initialize all quickref sections and apply initial filtering
function init() {
    fill_section(data_movement, "basic-movement", "Move");
    fill_section(data_action, "basic-actions", "Action");
    fill_section(data_bonusaction, "basic-bonus-actions", "Bonus action");
    fill_section(data_reaction, "basic-reactions", "Reaction");
    fill_section(data_condition, "basic-conditions", "Condition");
    fill_section(data_environment_obscurance, "environment-obscurance", "Environment");
    fill_section(data_environment_light, "environment-light", "Environment");
    fill_section(data_environment_vision, "environment-vision", "Environment");
    fill_section(data_environment_cover, "environment-cover", "Environment");

    // Apply initial filtering after items are created
    if (typeof window.handleRulesToggle === 'function') {
        window.handleRulesToggle();
    }
    // Set initial state for all "Collapse all" buttons
    document.querySelectorAll('.section-container').forEach(section => {
        updateCollapseAllButtonState(section);
    });
}

// Wait for all data scripts to be loaded before initializing and filtering
window.onload = function() {
    function waitForDataAndInit() {
        // Check if all required data variables are defined
        if (
            typeof data_movement !== 'undefined' &&
            typeof data_action !== 'undefined' &&
            typeof data_bonusaction !== 'undefined' &&
            typeof data_reaction !== 'undefined' &&
            typeof data_condition !== 'undefined' &&
            typeof data_environment_obscurance !== 'undefined' &&
            typeof data_environment_light !== 'undefined' &&
            typeof data_environment_vision !== 'undefined' &&
            typeof data_environment_cover !== 'undefined'
        ) {
            init();
        } else {
            // Try again in 50ms
            setTimeout(waitForDataAndInit, 50);
        }
    }
    waitForDataAndInit();
}

// Handle section collapse/expand
function initCollapsibleSections() {
    const sections = document.querySelectorAll('.section-container');
    sections.forEach(section => {
        // if (section.id === 'section-settings') return; // This line was preventing the settings section from being collapsible.

        const title = section.querySelector('.section-title');
        const content = section.querySelector('.section-content');
        const chevron = section.querySelector('.chevron');
        const collapseAllBtn = section.querySelector('.collapse-all-btn');
        updateCollapseAllButtonState(section); // Set initial state

        // Get saved state from localStorage, default to expanded
        const isCollapsed = localStorage.getItem(section.id + '-collapsed') === 'true';
        if (isCollapsed) {
            content.classList.add('collapsed');
            chevron.classList.add('collapsed');
        }

        // Helper to animate collapse/expand using max-height
        function animateContent(collapsed) {
            // Ensure we have an explicit maxHeight to animate from/to
            const fullHeight = content.scrollHeight + 'px';
            if (!collapsed) {
                // expanding: set from 0 to full height then remove max-height so it can grow naturally
                content.style.maxHeight = '0px';
                content.classList.remove('collapsed');
                // force reflow
                void content.offsetHeight;
                content.style.maxHeight = fullHeight;
                content.style.opacity = '1';
                // after transition ends, clear the inline max-height
                content.addEventListener('transitionend', function te(ev) {
                    if (ev.propertyName === 'max-height') {
                        content.style.maxHeight = '';
                        content.removeEventListener('transitionend', te);
                    }
                });
            } else {
                // collapsing: set max-height to current scrollHeight then to 0
                content.style.maxHeight = fullHeight;
                // force reflow
                void content.offsetHeight;
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                content.classList.add('collapsed');
            }
        }

        title.addEventListener('click', () => {
            const willBeCollapsed = !content.classList.contains('collapsed');
            // toggle chevron immediately for snappy UI
            chevron.classList.toggle('collapsed');
            animateContent(willBeCollapsed);
            // Save state to localStorage
            localStorage.setItem(section.id + '-collapsed', willBeCollapsed);
        });

        if (collapseAllBtn) {
            collapseAllBtn.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent section from collapsing/expanding
                const expandedItems = section.querySelectorAll('.item:not(:has(.item-content.collapsed)) .item-header');
                expandedItems.forEach(header => {
                    header.click();
                });
            });
        }
    });
}

// Checks a section for any expanded items and sets the disabled state of the "Collapse all" button.
function updateCollapseAllButtonState(section) {
    if (!section) return;
    const collapseAllBtn = section.querySelector('.collapse-all-btn');
    if (!collapseAllBtn) return;

    // Find items that are both visible (not filtered out) and expanded
    const expandedVisibleItems = section.querySelectorAll('.item:not(.item-hidden):not(:has(.item-content.collapsed))');

    if (expandedVisibleItems.length === 0) {
        collapseAllBtn.disabled = true;
    } else {
        collapseAllBtn.disabled = false;
    }
}

// DOMContentLoaded: Set up settings toggles, state, and filtering logic
// This block runs as soon as the DOM is ready
// Handles all settings toggles and their event listeners
// Also defines the filtering logic for quickref items

document.addEventListener("DOMContentLoaded", function () {
    // Trigger fade-in on page load
    document.body.classList.add('fade-in');

    // Initialize collapsible sections
    initCollapsibleSections();
    // Ensure default values for toggles in localStorage

    // Update settings section to show app version instead of "collapse all" button
    const versionDisplay = document.getElementById('app-version-display');
    if (versionDisplay && window.dndQuickRefAppVersion) {
        versionDisplay.textContent = 'v' + window.dndQuickRefAppVersion;
        // Make it look like a label rather than a disabled button
        versionDisplay.style.cursor = 'default';
        versionDisplay.style.pointerEvents = 'none';
    }
    if (localStorage.getItem('optional') === null) {
        localStorage.setItem('optional', 'false');
    }
    if (localStorage.getItem('homebrew') === null) {
        localStorage.setItem('homebrew', 'false');
    }

    // Get references to all settings checkboxes
    var optionalCheckbox = document.getElementById('optional-switch');
    var homebrewCheckbox = document.getElementById('homebrew-switch');
    var darkModeCheckbox = document.getElementById('darkmode-switch');
    var rules2024Checkbox = document.getElementById('rules2024-switch');
    var classicLayoutCheckbox = document.getElementById('classic-layout-switch');
    classicLayoutCheckbox.checked = true;

    // Set initial toggle state from localStorage
    var rules2024 = localStorage.getItem('rules2024') === 'true';
    rules2024Checkbox.checked = rules2024;

    // Update the label on load to indicate which ruleset the toggle will switch to
    function updateRulesToggleLabel() {
        var labelItem = document.getElementById('2024rules-toggle-item');
        if (!labelItem) return;
        var titleEl = labelItem.querySelector('.item-title');
        var descEl = labelItem.querySelector('.item-desc');

        var activeLabel = document.getElementById('active-ruleset-label');

        if (rules2024Checkbox.checked) {
            if (titleEl) titleEl.textContent = 'Switch to 2014 Rules';
            if (descEl) descEl.textContent = 'Switches to the D&D 2014 (legacy) ruleset.';
            if (activeLabel) activeLabel.textContent = 'Current Ruleset: D&D 2024';
        } else {
            if (titleEl) titleEl.textContent = 'Switch to 2024 Rules';
            if (descEl) descEl.textContent = 'Switches to the D&D 2024 ruleset.';
            if (activeLabel) activeLabel.textContent = 'Current Ruleset: D&D 2014 (legacy)';
        }
    }
    updateRulesToggleLabel();

    var darkmode = localStorage.getItem('darkmode') === 'true';
    darkModeCheckbox.checked = darkmode;

    var optional = localStorage.getItem('optional') === 'true';
    optionalCheckbox.checked = optional;

    var homebrew = localStorage.getItem('homebrew') === 'true';
    homebrewCheckbox.checked = homebrew;

    // Apply dark mode state on load
    handleDarkModeToggle();

    // Filtering logic for quickref items based on toggles
    function handleRulesToggle() {
        var items = document.getElementsByClassName('item itemsize');
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var ruleType = item.getAttribute('title');
            // Only filter items that are actual quickref rules
            if (ruleType === 'Optional Official rule' || ruleType === 'Homebrew rule' || ruleType === 'Standard rule') {
                var isOptional = ruleType === 'Optional Official rule';
                var isHomebrew = ruleType === 'Homebrew rule';
                // Show item if:
                // - It's an optional rule and the optional toggle is ON
                // - It's a homebrew rule and the homebrew toggle is ON
                // - It's a standard rule (always show)
                if ((isOptional && optionalCheckbox.checked) ||
                    (isHomebrew && homebrewCheckbox.checked) ||
                    (!isOptional && !isHomebrew)) {
                    // Show item: remove both classes
                    item.classList.remove('item-hidden');
                    item.classList.remove('item-removed');
                } else {
                    // Hide item: add hidden class for fade, then add removed class after delay
                    item.classList.add('item-hidden');

                    // Use a timeout that matches the CSS transition duration
                    setTimeout(() => {
                        // Only set display:none if the item is still supposed to be hidden
                        if (item.classList.contains('item-hidden')) {
                            item.classList.add('item-removed');
                        }
                    }, 300); // Must match the transition duration in CSS
                }
            } else {
                // Always show settings toggles and other non-rule items
                item.classList.remove('item-hidden');
                item.classList.remove('item-removed');
            }
        }
        // After filtering, update all "Collapse all" buttons as item visibility has changed
        document.querySelectorAll('.section-container').forEach(section => {
            updateCollapseAllButtonState(section);
        });
    }
    // Expose filtering function globally so init() can call it
    window.handleRulesToggle = handleRulesToggle;

    // Event listeners for toggles: update localStorage and re-filter on change
    optionalCheckbox.addEventListener('change', function() {
        localStorage.setItem('optional', optionalCheckbox.checked ? 'true' : 'false');
        handleRulesToggle();
    });
    homebrewCheckbox.addEventListener('change', function() {
        localStorage.setItem('homebrew', homebrewCheckbox.checked ? 'true' : 'false');
        handleRulesToggle();
    });
    darkModeCheckbox.addEventListener('change', function() {
        localStorage.setItem('darkmode', darkModeCheckbox.checked ? 'true' : 'false');
        handleDarkModeToggle();
    });
    // When the rules toggle changes, update the label immediately then perform the switch (which reloads)
    rules2024Checkbox.addEventListener('change', function() {
        updateRulesToggleLabel();
        handle2024RulesToggle();
    });
    classicLayoutCheckbox.addEventListener('change', handleLayoutToggle);

    // Toggle dark mode classes on the page. The choice is saved only when it changes,
    // so the new layout can keep following the system theme until one is chosen.
    function handleDarkModeToggle() {
        const darkModeElements = document.querySelectorAll('.dark-mode, .page-background');
        darkModeElements.forEach(element => {
            if (darkModeCheckbox.checked) {
                element.classList.add('dark-mode-active');
            } else {
                element.classList.remove('dark-mode-active');
            }
        });
    }

    // Handle switching between 2024 and standard rules
    function handle2024RulesToggle() {
        localStorage.setItem('rules2024', rules2024Checkbox.checked ? 'true' : 'false');
        // Fade out the body, then reload the page
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        setTimeout(() => {
            location.reload();
        }, 650); // This should match the transition duration in quickref.css
    }

    // The new layout is the page in the site root; switching saves the choice and loads that page.
    function handleLayoutToggle() {
        if (classicLayoutCheckbox.checked) return;
        classicLayoutCheckbox.disabled = true;
        localStorage.setItem('pageLayout', 'modern');
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        setTimeout(() => {
            location.replace('../' + location.search + location.hash);
        }, 650); // This should match the transition duration in quickref.css
    }

    // Set up click handlers for the settings toggle items (for better UX)
    var optionalToggleItem = document.getElementById('optional-toggle-item');
    var homebrewToggleItem = document.getElementById('homebrew-toggle-item');
    var darkModeToggleItem = document.getElementById('darkmode-toggle-item');
    var rules2024ToggleItem = document.getElementById('2024rules-toggle-item');
    var classicLayoutToggleItem = document.getElementById('classic-layout-toggle-item');

    function handleToggleClick(checkbox) {
        return function() {
            if (checkbox.disabled) return;
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        };
    }

    optionalToggleItem.addEventListener('click', handleToggleClick(optionalCheckbox));
    homebrewToggleItem.addEventListener('click', handleToggleClick(homebrewCheckbox));
    darkModeToggleItem.addEventListener('click', handleToggleClick(darkModeCheckbox));
    rules2024ToggleItem.addEventListener('click', handleToggleClick(rules2024Checkbox));
    classicLayoutToggleItem.addEventListener('click', handleToggleClick(classicLayoutCheckbox));
});

// === Smooth Fade + Grid Reflow ===
function hideItem(item) {
  if (item.classList.contains('item-hidden')) return;
  item.classList.add('item-hiding');
  setTimeout(() => {
    item.classList.remove('item-hiding');
    item.classList.add('item-hidden');
  }, 250);
}

function showItem(item) {
  if (!item.classList.contains('item-hidden')) return;
  item.classList.remove('item-hidden');
  item.classList.add('item-showing');
  setTimeout(() => {
    item.classList.remove('item-showing');
  }, 250);
}
// Replace toggle logic:
// if (shouldHide) hideItem(item); else showItem(item);

// Cookie notice, same behavior as in the new layout: the page keeps room below the content
// for the notice and scrolls focused controls out from under it.
function initCookieNotice() {
    var notice = document.getElementById('cookie-notice');
    notice.hidden = localStorage.getItem('cookiesAccepted') === 'true';
    function updateNoticeSpace() {
        document.body.classList.toggle('has-cookie-notice', !notice.hidden);
        document.documentElement.style.setProperty('--cookie-space', notice.hidden ? '0px' : (notice.offsetHeight + 40) + 'px');
    }
    new ResizeObserver(updateNoticeSpace).observe(notice);
    updateNoticeSpace();
    document.getElementById('accept-cookies').addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        notice.hidden = true;
        updateNoticeSpace();
    });
    document.addEventListener('focusin', function(event) {
        if (!notice.hidden && !notice.contains(event.target)) {
            var bottom = event.target.getBoundingClientRect().bottom;
            var noticeTop = notice.getBoundingClientRect().top;
            if (bottom > noticeTop - 12) window.scrollBy(0, bottom - noticeTop + 16);
        }
    });
}
document.addEventListener('DOMContentLoaded', initCookieNotice);
