// Data files remain separate so both editions use the same presentation.
const ruleFiles = [
    'data_movement', 'data_action', 'data_bonusaction',
    'data_reaction', 'data_condition', 'data_environment'
];
const rulesetPrefix = localStorage.getItem('rules2024') === 'true' ? '2024_' : '';
const dataReady = Promise.all(ruleFiles.map(function(base) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.src = 'js/' + rulesetPrefix + base + '.js';
        script.onload = resolve;
        script.onerror = function() {
            reject(new Error('Could not load ' + script.src));
        };
        document.head.appendChild(script);
    });
}));

let itemSequence = 0;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const rulesetTransitionKey = 'rulesetTransition';
const pendingRuleset = sessionStorage.getItem(rulesetTransitionKey);
const restoringRuleset = pendingRuleset !== null && pendingRuleset === localStorage.getItem('rules2024');
const restoreRulesetFocus = sessionStorage.getItem('rulesetKeyboardFocus') === 'true';
const rulesetStatus = document.createElement('div');
rulesetStatus.className = 'ruleset-status';
rulesetStatus.setAttribute('role', 'status');
rulesetStatus.setAttribute('aria-live', 'polite');
rulesetStatus.hidden = true;
document.body.appendChild(rulesetStatus);
document.body.classList.add('ruleset-entering');
document.getElementById('main-content').setAttribute('aria-busy', 'true');

function finishRulesetTransition(error) {
    sessionStorage.removeItem(rulesetTransitionKey);
    sessionStorage.removeItem('rulesetKeyboardFocus');
    document.body.classList.remove('ruleset-entering');
    document.getElementById('main-content').removeAttribute('aria-busy');
    if (restoringRuleset) {
        rulesetStatus.hidden = false;
        rulesetStatus.textContent = error ? 'Could not switch rulesets. Please reload to try again.'
            : 'Now showing ' + document.getElementById('ruleset-trigger').textContent +
                (localStorage.getItem('rules2024') === 'true' ? ' (2024)' : ' (2014)') + ' rules.';
        if (restoreRulesetFocus) {
            document.getElementById('ruleset-trigger').focus({preventScroll: true});
        }
    }
    if (!error) {
        document.body.classList.add('ruleset-arriving');
        setTimeout(function() {
            document.body.classList.remove('ruleset-arriving');
            rulesetStatus.hidden = true;
        }, 3000);
    }
    document.documentElement.classList.remove('rules-loading');
}

const expansionAnimations = new WeakMap();
let scrollAnchorSuspensions = 0;

// Browser scroll anchoring can pick an element below the card and shift the page up as it grows.
function suspendScrollAnchoring() {
    if (scrollAnchorSuspensions++ === 0) document.documentElement.style.overflowAnchor = 'none';
    let released = false;
    return function() {
        if (released) return;
        released = true;
        requestAnimationFrame(function() {
            if (--scrollAnchorSuspensions === 0) document.documentElement.style.removeProperty('overflow-anchor');
        });
    };
}

function revealCoveredHeader(button) {
    if (button.getBoundingClientRect().top < document.querySelector('.top-menu').getBoundingClientRect().bottom) {
        button.scrollIntoView({
            block: 'start',
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
        });
    }
}

function setExpanded(button, content, expanded, animate = false) {
    const height = content.hidden ? 0 : content.getBoundingClientRect().height;
    const currentStyles = getComputedStyle(content);
    const startFrame = {
        height: height + 'px', overflow: 'hidden', minHeight: '0',
        paddingTop: height === 0 ? '0px' : currentStyles.paddingTop,
        paddingBottom: height === 0 ? '0px' : currentStyles.paddingBottom,
        borderTopWidth: height === 0 ? '0px' : currentStyles.borderTopWidth,
        borderBottomWidth: height === 0 ? '0px' : currentStyles.borderBottomWidth
    };
    const previousAnimation = expansionAnimations.get(content);
    if (previousAnimation) {
        previousAnimation.cancel();
        expansionAnimations.delete(content);
    }
    if (!expanded && content.contains(document.activeElement)) {
        button.focus();
    }
    button.setAttribute('aria-expanded', String(expanded));
    content.inert = !expanded;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!animate) {
        content.hidden = !expanded;
        return;
    }
    const releaseScrollAnchoring = suspendScrollAnchoring();
    if (reducedMotion.matches) {
        content.hidden = !expanded;
        releaseScrollAnchoring();
        return;
    }
    content.hidden = false;
    const targetHeight = expanded ? content.getBoundingClientRect().height : 0;
    const styles = getComputedStyle(content);
    const openFrame = {
        overflow: 'hidden', minHeight: '0',
        paddingTop: styles.paddingTop, paddingBottom: styles.paddingBottom,
        borderTopWidth: styles.borderTopWidth, borderBottomWidth: styles.borderBottomWidth
    };
    const closedFrame = {
        overflow: 'hidden', minHeight: '0',
        paddingTop: '0', paddingBottom: '0', borderTopWidth: '0', borderBottomWidth: '0'
    };
    const animation = content.animate([
        startFrame,
        {...(expanded ? openFrame : closedFrame), height: targetHeight + 'px'}
    ], {duration: 220, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', fill: 'both'});
    expansionAnimations.set(content, animation);
    function finish() {
        content.hidden = !expanded;
        expansionAnimations.delete(content);
        reducedMotion.removeEventListener('change', motionChanged);
        animation.cancel();
        releaseScrollAnchoring();
    }
    function motionChanged(event) {
        if (event.matches) animation.finish();
    }
    animation.onfinish = finish;
    animation.oncancel = function() {
        reducedMotion.removeEventListener('change', motionChanged);
        releaseScrollAnchoring();
    };
    reducedMotion.addEventListener('change', motionChanged);
}

const searchableRules = new Map();
let searchTerms = [];
let searchSectionState = null;
let rulesLoaded = false;
let helpPreview = false;

function readableText(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    template.content.querySelectorAll('br, p, div, li, hr').forEach(function(element) {
        element.before(document.createTextNode(' '));
        element.after(document.createTextNode(' '));
    });
    return template.content.textContent.replace(/\s+/g, ' ').trim();
}

function getSearchTerms(query) {
    return query.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

function matchesSearch(text, terms) {
    return terms.every(term => text.includes(term));
}

function ruleSearchText(data) {
    return [data.title || '', data.subtitle || '', readableText(data.description || ''),
        ...(data.bullets || []).map(readableText)].join(' ').replace(/\s+/g, ' ').trim().toLowerCase();
}

function getSectionState() {
    return Array.from(document.querySelectorAll('.section-container'), section => ({
        section,
        expanded: section.querySelector('.section-toggle').getAttribute('aria-expanded') === 'true'
    }));
}

function restoreSectionState(state) {
    state.forEach(function({section, expanded}) {
        setExpanded(section.querySelector('.section-toggle'), section.querySelector('.section-content'), expanded);
    });
}

function updateSearch() {
    const input = document.getElementById('rule-search');
    document.getElementById('search-clear').hidden = input.value.length === 0;
    const terms = getSearchTerms(input.value);
    if (terms.length && !searchSectionState) searchSectionState = getSectionState();
    searchTerms = terms;
    if (rulesLoaded) handleRulesToggle(true);
    if (!terms.length && searchSectionState) {
        const previous = searchSectionState;
        searchSectionState = null;
        restoreSectionState(previous);
    }
}

function initSearch() {
    const input = document.getElementById('rule-search');
    input.value = '';
    input.closest('form').addEventListener('submit', event => event.preventDefault());
    input.addEventListener('input', updateSearch);
    document.getElementById('search-clear').addEventListener('click', function() {
        input.focus({preventScroll: true});
        input.value = '';
        updateSearch();
    });
}

function add_quickref_item(parent, data) {
    const item = document.createElement('div');
    item.className = 'item';
    const ruleType = data.optional || 'Standard rule';
    const extraRule = ruleType === 'Optional Official rule' || ruleType === 'Homebrew rule';
    item.dataset.ruleType = ruleType;
    searchableRules.set(item, ruleSearchText(data));
    if (data.description) {
        const tooltip = readableText(data.description);
        if (tooltip) item.title = tooltip;
    }

    const heading = document.createElement('h3');
    heading.className = 'item-heading';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'item-header';
    button.id = 'rule-toggle-' + ++itemSequence;
    button.setAttribute('aria-expanded', 'false');
    const contentId = 'rule-content-' + itemSequence;
    button.setAttribute('aria-controls', contentId);

    const icon = document.createElement('span');
    icon.className = 'item-icon';
    const iconUrl = new URL('img/' + encodeURIComponent(data.icon || 'perspective-dice-six-faces-one') + '.png', document.baseURI);
    icon.style.setProperty('--icon-image', 'url("' + iconUrl.href + '")');
    icon.setAttribute('aria-hidden', 'true');
    const text = document.createElement('span');
    text.className = 'item-text-container';
    const title = document.createElement('span');
    title.className = 'item-title';
    title.textContent = data.title || '[no title]';
    if (extraRule) {
        const marker = document.createElement('span');
        marker.className = 'rule-marker ' +
            (ruleType === 'Optional Official rule' ? 'rule-marker-optional' : 'rule-marker-homebrew');
        marker.setAttribute('aria-hidden', 'true');
        title.prepend(marker);
    }
    const subtitle = document.createElement('span');
    subtitle.className = 'item-desc';
    subtitle.textContent = data.subtitle || '';
    text.append(title, subtitle);
    if (extraRule) {
        const classification = document.createElement('span');
        classification.className = 'sr-only';
        classification.textContent = ruleType;
        text.appendChild(classification);
    }
    const chevron = document.createElement('span');
    chevron.className = 'chevron';
    chevron.setAttribute('aria-hidden', 'true');
    button.append(icon, text, chevron);
    heading.appendChild(button);

    const bulletsHTML = (data.bullets || []).map(bullet => '<p>' + bullet + '</p>').join('\n<hr>\n');

    const content = document.createElement('div');
    content.id = contentId;
    content.className = 'item-content';
    content.hidden = true;
    content.innerHTML = '<p class="item-description">' + (data.description || data.subtitle || '') +
        '</p><div class="item-bullets">' + bulletsHTML +
        '</div><div class="item-reference">' + (data.reference || '') + '</div>';
    if (extraRule) {
        const badge = document.createElement('span');
        badge.className = 'rule-type';
        badge.textContent = ruleType;
        content.prepend(badge);
    }

    button.addEventListener('click', function() {
        setExpanded(button, content, button.getAttribute('aria-expanded') !== 'true', true);
        revealCoveredHeader(button);
        updateCollapseAllButtonState(item.closest('.section-container'));
    });
    item.append(heading, content);
    parent.appendChild(item);
}

function fill_section(data, parentname) {
    const parent = document.getElementById(parentname);
    parent.classList.add('items-grid-container');
    data.forEach(item => add_quickref_item(parent, item));
}

function init() {
    fill_section(data_movement, 'basic-movement');
    fill_section(data_action, 'basic-actions');
    fill_section(data_bonusaction, 'basic-bonus-actions');
    fill_section(data_reaction, 'basic-reactions');
    fill_section(data_condition, 'basic-conditions');
    fill_section(data_environment_obscurance, 'environment-obscurance');
    fill_section(data_environment_light, 'environment-light');
    fill_section(data_environment_vision, 'environment-vision');
    fill_section(data_environment_cover, 'environment-cover');
    rulesLoaded = true;
    updateSearch();
    finishRulesetTransition(false);
}

function updateCollapseAllButtonState(section) {
    const button = section.querySelector('.collapse-all-btn');
    if (button) {
        button.disabled = !section.querySelector('.item:not(.item-hidden) .item-header[aria-expanded="true"]');
    }
}

function initCollapsibleSections() {
    const navigation = document.querySelector('.category-nav');
    const sectionIcons = {
        'section-movement': 'run',
        'section-action': 'crossed-swords',
        'section-bonus-action': 'embrassed-energy',
        'section-reaction': 'stopwatch',
        'section-condition': 'deathcab',
        'section-environment': 'broken-shield'
    };
    document.querySelectorAll('.section-container').forEach(function(section) {
        const title = section.querySelector('.section-title');
        const text = title.querySelector('.section-title-text');
        const name = text.firstChild.textContent.trim();
        const link = navigation.querySelector('a[href="#' + section.id + '"]') || document.createElement('a');
        link.href = '#' + section.id;
        const label = section.id === 'section-environment' ? 'Environmental effects'
            : section.id === 'section-condition' ? 'Conditions' : name;
        link.setAttribute('aria-label', label);
        link.title = label;
        const iconName = sectionIcons[section.id];
        if (iconName) {
            const icon = document.createElement('span');
            icon.className = 'menu-icon';
            icon.setAttribute('aria-hidden', 'true');
            const iconUrl = new URL('img/' + iconName + '.png', document.baseURI);
            icon.style.setProperty('--icon-image', 'url("' + iconUrl.href + '")');
            link.replaceChildren(icon);
        } else {
            link.textContent = name;
        }
        navigation.insertBefore(link, document.getElementById('back-to-top'));
        const content = section.querySelector('.section-content');
        content.id = section.id + '-content';
        const heading = document.createElement('h2');
        heading.className = 'section-heading';
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'section-toggle';
        toggle.id = section.id + '-toggle';
        toggle.setAttribute('aria-controls', content.id);
        const chevron = document.createElement('span');
        chevron.className = 'chevron';
        chevron.setAttribute('aria-hidden', 'true');
        toggle.append(chevron, document.createTextNode(name));
        heading.appendChild(toggle);
        const collapseAll = title.querySelector('.collapse-all-btn');
        const limit = title.querySelector('.float-right');
        title.replaceChildren(heading);
        if (limit) {
            limit.className = 'section-limit';
            title.appendChild(limit);
        }
        if (collapseAll) {
            collapseAll.type = 'button';
            collapseAll.setAttribute('aria-label', 'Collapse all items in ' + name);
            collapseAll.dataset.tooltip = 'Collapse all open cards';
            const icon = document.createElement('span');
            icon.className = 'collapse-all-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = '\u21a9';
            collapseAll.replaceChildren(icon);
            title.appendChild(collapseAll);
            collapseAll.addEventListener('click', function() {
                section.querySelectorAll('.item-header[aria-expanded="true"]').forEach(function(button) {
                    setExpanded(button, document.getElementById(button.getAttribute('aria-controls')), false, true);
                });
                updateCollapseAllButtonState(section);
            });
        }
        setExpanded(toggle, content, localStorage.getItem(section.id + '-collapsed') !== 'true');
        toggle.addEventListener('click', function() {
            const expanded = toggle.getAttribute('aria-expanded') !== 'true';
            setExpanded(toggle, content, expanded, true);
            revealCoveredHeader(toggle);
            if (!searchTerms.length && !helpPreview) {
                localStorage.setItem(section.id + '-collapsed', String(!expanded));
            }
        });
    });
    const topMenu = navigation.closest('.top-menu');
    const updateMenuSpace = function() {
        document.documentElement.style.setProperty('--top-menu-height', topMenu.offsetHeight + 'px');
    };
    new ResizeObserver(updateMenuSpace).observe(topMenu);
    updateMenuSpace();

    document.querySelectorAll('a[href^="#section-"]').forEach(function(link) {
        link.addEventListener('click', function(event) {
            if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            const section = document.getElementById(link.hash.slice(1));
            const toggle = section.querySelector('.section-toggle');
            setExpanded(toggle, section.querySelector('.section-content'), true);
            if (!searchTerms.length && !helpPreview) {
                localStorage.setItem(section.id + '-collapsed', 'false');
            }
            history.pushState(null, '', link.hash);
            toggle.focus({preventScroll: true});
            section.scrollIntoView({
                block: 'start',
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
            });
        });
    });
}

function handleRulesToggle(expandResults = false) {
    const optional = document.getElementById('optional-switch').checked;
    const homebrew = document.getElementById('homebrew-switch').checked;
    const searching = searchTerms.length > 0 && !helpPreview;
    let count = 0;
    searchableRules.forEach(function(text, item) {
        const ruleType = item.dataset.ruleType;
        const hide = helpPreview ? false : searching ? !matchesSearch(text, searchTerms) :
            (ruleType === 'Optional Official rule' && !optional) ||
            (ruleType === 'Homebrew rule' && !homebrew);
        if (hide && item.contains(document.activeElement)) {
            document.getElementById(searching || searchSectionState ? 'rule-search' :
                ruleType === 'Optional Official rule' ? 'optional-switch' : 'homebrew-switch').focus({preventScroll: true});
        }
        item.classList.toggle('item-hidden', hide);
        if (!hide) count++;
    });
    document.querySelectorAll('.section-container').forEach(function(section) {
        const hidden = searching && !section.querySelector('.item:not(.item-hidden)');
        const link = document.querySelector('.category-nav a[href="#' + section.id + '"]');
        if (hidden && (section.contains(document.activeElement) || link === document.activeElement)) {
            document.getElementById('rule-search').focus({preventScroll: true});
        }
        section.hidden = hidden;
        link.hidden = hidden;
        section.querySelectorAll('.items-grid-container').forEach(function(group) {
            group.hidden = searching && !group.querySelector('.item:not(.item-hidden)');
            const subtitle = group.previousElementSibling;
            if (subtitle?.classList.contains('section-subtitle')) subtitle.hidden = group.hidden;
        });
        if (!hidden && (helpPreview || searching && expandResults)) {
            setExpanded(section.querySelector('.section-toggle'), section.querySelector('.section-content'), true);
        }
        updateCollapseAllButtonState(section);
    });
    document.getElementById('search-empty').hidden = !searching || count > 0;
    document.getElementById('search-status').textContent = searching ?
        count + (count === 1 ? ' matching rule.' : ' matching rules.') +
        ' Searching includes optional and homebrew rules.' : '';
}

let themeTransitionTimer;

function applyTheme(dark, animate = false) {
    clearTimeout(themeTransitionTimer);
    const root = document.documentElement;
    const transitioning = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.classList.toggle('theme-transitioning', transitioning);
    if (transitioning) {
        getComputedStyle(document.body).backgroundColor;
        themeTransitionTimer = setTimeout(function() {
            root.classList.remove('theme-transitioning');
        }, 500);
    }
    document.documentElement.classList.toggle('dark-mode-active', dark);
    document.getElementById('theme-trigger').setAttribute('aria-label',
        dark ? 'Switch to light mode' : 'Switch to dark mode');
}

function initSettings() {
    const dropdown = document.querySelector('.settings-dropdown');
    const panel = document.getElementById('settings-panel');
    const trigger = document.getElementById('settings-trigger');
    dropdown.appendChild(panel);
    function updateSettingsSpace() {
        if (!panel.hidden) {
            const menuBottom = dropdown.closest('.top-menu').getBoundingClientRect().bottom;
            panel.style.setProperty('--settings-top', (menuBottom + 12) + 'px');
        }
    }
    window.addEventListener('scroll', updateSettingsSpace, {passive: true});
    new ResizeObserver(updateSettingsSpace).observe(dropdown.closest('.top-menu'));
    document.getElementById('app-version-display').textContent = 'v' + window.dndQuickRefAppVersion;
    document.getElementById('header-version').textContent = 'v' + window.dndQuickRefAppVersion;
    function closeSettings(restoreFocus) {
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        if (restoreFocus) trigger.focus();
    }
    trigger.addEventListener('click', function() {
        const opening = panel.hidden;
        panel.hidden = !opening;
        trigger.setAttribute('aria-expanded', String(opening));
        updateSettingsSpace();
    });
    document.addEventListener('click', function(event) {
        if (!panel.hidden && !dropdown.contains(event.target)) {
            closeSettings(panel.contains(document.activeElement));
        }
    });
    dropdown.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !panel.hidden) {
            event.preventDefault();
            closeSettings(true);
        }
    });
    dropdown.addEventListener('focusout', function(event) {
        if (event.relatedTarget && !dropdown.contains(event.relatedTarget)) closeSettings(false);
    });
    const controls = [
        ['optional', 'optional-toggle-item', 'optional-switch'],
        ['homebrew', 'homebrew-toggle-item', 'homebrew-switch'],
        [null, 'classic-layout-toggle-item', 'classic-layout-switch']
    ];
    controls.forEach(function([key, labelId, inputId]) {
        const label = document.getElementById(labelId);
        const input = document.getElementById(inputId);
        const title = label.querySelector('.item-title');
        const description = label.querySelector('.item-desc');
        title.id = inputId + '-label';
        description.id = inputId + '-description';
        input.setAttribute('aria-labelledby', title.id);
        input.setAttribute('aria-describedby', description.id);
        if (!key) return;
        input.checked = localStorage.getItem(key) === 'true';
        input.addEventListener('change', function() {
            localStorage.setItem(key, String(input.checked));
            handleRulesToggle();
        });
    });
    initLayoutSwitch();
    const savedTheme = localStorage.getItem('darkmode');
    applyTheme(savedTheme === null ? systemTheme.matches : savedTheme === 'true');
    document.getElementById('theme-trigger').addEventListener('click', function() {
        const dark = !document.documentElement.classList.contains('dark-mode-active');
        localStorage.setItem('darkmode', String(dark));
        applyTheme(dark, true);
    });
    systemTheme.addEventListener('change', function(event) {
        if (localStorage.getItem('darkmode') === null) applyTheme(event.matches, true);
    });
    updateRulesToggleLabel();
    document.getElementById('ruleset-trigger').addEventListener('click', function(event) {
        const button = document.getElementById('ruleset-trigger');
        if (button.getAttribute('aria-disabled') === 'true') return;
        sessionStorage.setItem('rulesetKeyboardFocus', String(event.detail === 0));
        const next2024 = localStorage.getItem('rules2024') !== 'true';
        button.setAttribute('aria-disabled', 'true');
        rulesetStatus.textContent = next2024 ? 'Switching to D&D 5.5e (2024)...' : 'Switching to D&D 5e (2014)...';
        rulesetStatus.hidden = false;
        const main = document.getElementById('main-content');
        main.setAttribute('aria-busy', 'true');
        main.inert = true;
        document.body.classList.remove('ruleset-arriving');
        document.body.classList.add('ruleset-leaving');
        localStorage.setItem('rules2024', String(next2024));
        sessionStorage.setItem(rulesetTransitionKey, String(next2024));
        setTimeout(function() {
            location.reload();
        }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200);
    });
}

// The classic layout is a separate page in classic/; switching saves the choice and loads that page.
function initLayoutSwitch() {
    const input = document.getElementById('classic-layout-switch');
    input.checked = false;
    input.addEventListener('change', function() {
        if (!input.checked) return;
        input.disabled = true;
        localStorage.setItem('pageLayout', 'classic');
        rulesetStatus.textContent = 'Switching to the classic layout...';
        rulesetStatus.hidden = false;
        const main = document.getElementById('main-content');
        main.setAttribute('aria-busy', 'true');
        main.inert = true;
        document.body.classList.remove('ruleset-arriving');
        document.body.classList.add('ruleset-leaving');
        setTimeout(function() {
            location.replace('classic/' + location.search + location.hash);
        }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200);
    });
}

function updateRulesToggleLabel() {
    const current2024 = localStorage.getItem('rules2024') === 'true';
    const button = document.getElementById('ruleset-trigger');
    button.textContent = current2024 ? 'D&D 5.5e' : 'D&D 5e';
    const current = 'Current ruleset: ' + button.textContent + (current2024 ? ' (2024).' : ' (2014).');
    const action = 'Click to switch to ' + (current2024 ? 'D&D 5e (2014)' : 'D&D 5.5e (2024)') + ' rules.';
    button.dataset.tooltipHeading = current;
    button.dataset.tooltip = action;
    const label = current + ' ' + action;
    button.setAttribute('aria-label', label);
    button.title = label;
}

function initMenuTooltips() {
    const tooltip = document.createElement('div');
    tooltip.id = 'menu-tooltip';
    tooltip.className = 'menu-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.hidden = true;
    document.body.appendChild(tooltip);
    let activeControl = null;
    let hideTimer;

    function hide() {
        clearTimeout(hideTimer);
        tooltip.hidden = true;
        if (activeControl) activeControl.removeAttribute('aria-describedby');
        activeControl = null;
    }

    function show(control) {
        hide();
        activeControl = control;
        const label = control.getAttribute('aria-label');
        tooltip.textContent = control.dataset.tooltip ||
            (control.matches('.category-nav > a') ? 'Jump to ' + label : label);
        if (control.dataset.tooltipHeading) {
            const heading = document.createElement('strong');
            heading.textContent = control.dataset.tooltipHeading;
            tooltip.prepend(heading, document.createElement('br'));
        }
        tooltip.hidden = false;
        control.setAttribute('aria-describedby', tooltip.id);
        const rect = control.getBoundingClientRect();
        const left = Math.max(12, Math.min(rect.left + (rect.width - tooltip.offsetWidth) / 2,
            window.innerWidth - tooltip.offsetWidth - 12));
        tooltip.style.left = left + 'px';
        tooltip.style.top = Math.max(12, Math.min(rect.bottom + 8,
            window.innerHeight - tooltip.offsetHeight - 12)) + 'px';
    }

    function scheduleHide() {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(hide, 120);
    }

    document.querySelectorAll('.category-nav > a, .top-menu .menu-control, .settings-trigger, .collapse-all-btn').forEach(function(control) {
        control.removeAttribute('title');
        control.addEventListener('pointerenter', function(event) {
            if (event.pointerType !== 'touch') show(control);
        });
        control.addEventListener('pointerleave', scheduleHide);
        control.addEventListener('focus', function() { show(control); });
        control.addEventListener('blur', scheduleHide);
        control.addEventListener('click', hide);
    });
    tooltip.addEventListener('pointerenter', function() { clearTimeout(hideTimer); });
    tooltip.addEventListener('pointerleave', scheduleHide);
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') hide();
    });
    window.addEventListener('scroll', hide, {passive: true});
    window.addEventListener('resize', hide);
}

function drawHelpConnections(container, connections, sheet, intermediate = false) {
    const origin = intermediate ? container.getBoundingClientRect() : {left: 0, top: 0};
    const canvasHeight = intermediate ? container.offsetHeight : window.innerHeight;
    const canvasRect = rect => ({
        left: rect.left - origin.left, right: rect.right - origin.left,
        top: rect.top - origin.top, bottom: rect.bottom - origin.top,
        width: rect.width, height: rect.height
    });
    sheet = canvasRect(sheet);
    const namespace = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(namespace, 'svg');
    svg.classList.add('help-connectors');
    svg.setAttribute('viewBox', '0 0 ' + window.innerWidth + ' ' + canvasHeight);
    const defs = document.createElementNS(namespace, 'defs');
    const marker = document.createElementNS(namespace, 'marker');
    marker.id = 'help-arrow';
    marker.setAttribute('viewBox', '0 0 8 8');
    marker.setAttribute('refX', '7');
    marker.setAttribute('refY', '4');
    marker.setAttribute('markerWidth', '8');
    marker.setAttribute('markerHeight', '8');
    marker.setAttribute('markerUnits', 'userSpaceOnUse');
    marker.setAttribute('orient', 'auto');
    const arrow = document.createElementNS(namespace, 'path');
    arrow.setAttribute('d', 'M 1 1 L 7 4 L 1 7');
    marker.appendChild(arrow);
    defs.appendChild(marker);
    svg.appendChild(defs);
    const labels = Array.from(container.querySelectorAll('.help-callout'));
    const obstacles = [sheet, ...labels.map(label => canvasRect(label.getBoundingClientRect()))];
    const horizontalLanes = [...new Set(obstacles.flatMap(rect => [rect.top - 12, rect.bottom + 12]))];
    const verticalLanes = [...new Set(obstacles.flatMap(rect => [rect.left - 12, rect.right + 12]))];
    const used = new Map();
    const step = 8;
    function nearUsed(p) {
        const x = Math.floor(p.x / step), y = Math.floor(p.y / step);
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (used.get((x + dx) + ',' + (y + dy))?.some(other =>
                    Math.hypot(p.x - other.x, p.y - other.y) < step)) return true;
            }
        }
        return false;
    }
    function reserve(p) {
        const key = Math.floor(p.x / step) + ',' + Math.floor(p.y / step);
        if (!used.has(key)) used.set(key, []);
        used.get(key).push(p);
    }
    function ports(rect, other) {
        const x = Math.max(rect.left + 6, Math.min(rect.right - 6, other.left + other.width / 2));
        const y = Math.max(rect.top + 6, Math.min(rect.bottom - 6, other.top + other.height / 2));
        return [
            [{x, y: rect.top}, {x: 0, y: -16}],
            [{x: rect.right, y}, {x: 16, y: 0}],
            [{x, y: rect.bottom}, {x: 0, y: 16}],
            [{x: rect.left, y}, {x: -16, y: 0}],
            [{x: rect.left + rect.width / 2, y: rect.top}, {x: 0, y: -16}],
            [{x: rect.right, y: rect.top + rect.height / 2}, {x: 16, y: 0}],
            [{x: rect.left + rect.width / 2, y: rect.bottom}, {x: 0, y: 16}],
            [{x: rect.left, y: rect.top + rect.height / 2}, {x: -16, y: 0}]
        ].map(([edge, offset]) => ({edge, outer: {x: edge.x + offset.x, y: edge.y + offset.y}}));
    }
    function roundedPath(points) {
        points = points.filter((p, index) => !index || p.x !== points[index - 1].x || p.y !== points[index - 1].y);
        const corners = points.filter((p, index) => {
            if (!index || index === points.length - 1) return true;
            const a = points[index - 1], b = points[index + 1];
            return (p.x - a.x) * (b.y - p.y) !== (p.y - a.y) * (b.x - p.x);
        });
        let d = 'M ' + corners[0].x + ' ' + corners[0].y;
        for (let i = 1; i < corners.length - 1; i++) {
            const a = corners[i - 1], b = corners[i], c = corners[i + 1];
            const before = Math.hypot(b.x - a.x, b.y - a.y);
            const after = Math.hypot(c.x - b.x, c.y - b.y);
            const radius = Math.min(6, before / 2, after / 2);
            const x1 = b.x + (a.x - b.x) * radius / before;
            const y1 = b.y + (a.y - b.y) * radius / before;
            const x2 = b.x + (c.x - b.x) * radius / after;
            const y2 = b.y + (c.y - b.y) * radius / after;
            d += ' L ' + x1 + ' ' + y1 + ' Q ' + b.x + ' ' + b.y + ' ' + x2 + ' ' + y2;
        }
        const last = corners[corners.length - 1];
        return d + ' L ' + last.x + ' ' + last.y;
    }
    // Keep menu leaders in separate lanes, with the enclosing preferences group last.
    const order = [1, 2, 4, 5, 6, 3, 7, 8, 9, 10];
    for (const connection of connections.slice().sort((a, b) => order.indexOf(a.number) - order.indexOf(b.number))) {
        const labelRect = canvasRect(connection.label.getBoundingClientRect());
        const targetRect = canvasRect(connection.target);
        let targetPorts = ports(targetRect, labelRect);
        if (connection.number === 2 || connection.number === 6) {
            const edge = {x: targetRect.left + targetRect.width / 2, y: targetRect.bottom};
            targetPorts = [{edge, outer: {x: edge.x, y: edge.y + 16}}];
        }
        if (connection.number === 7 && !intermediate) {
            targetPorts = targetPorts.filter(port => port.edge.x === targetRect.left);
        }
        let pairs = ports(labelRect, targetRect).flatMap(start =>
            targetPorts.map(end => ({start, end})))
            .sort((a, b) => Math.hypot(a.start.edge.x - a.end.edge.x, a.start.edge.y - a.end.edge.y) -
                Math.hypot(b.start.edge.x - b.end.edge.x, b.start.edge.y - b.end.edge.y));
        if (connection.number <= 6) {
            const rank = order.indexOf(connection.number);
            const start = {x: labelRect.left + labelRect.width / 2, y: labelRect.top};
            const target = targetRect;
            const end = {x: target.left + target.width / 2, y: target.bottom};
            if (connection.number === 1 || connection.number === 3) {
                end.x = connection.number === 1 ? target.left : target.right;
                end.y = target.top + target.height / 2;
            }
            const lane = canvasRect(document.querySelector('.top-menu').getBoundingClientRect()).bottom +
                16 + rank * 12;
            const approach = connection.number === 1 ? end.x - 16 :
                connection.number === 3 ? end.x + 16 : end.x;
            const route = [start];
            let x = start.x;
            if (intermediate && connection.number === 3) {
                route.push({x: start.x, y: labelRect.top - 12},
                    {x: window.innerWidth - 4, y: labelRect.top - 12},
                    {x: window.innerWidth - 4, y: end.y});
            } else {
                const offset = intermediate ? rank * 12 : 0;
                if (x < sheet.right + 4) {
                    route.push({x, y: sheet.bottom + 12 + offset});
                    x = sheet.right + 4 + offset;
                    route.push({x, y: sheet.bottom + 12 + offset});
                }
                route.push({x, y: lane}, {x: approach, y: lane});
                if (connection.number === 1 || connection.number === 3) route.push({x: approach, y: end.y});
            }
            route.push(end);
            pairs = intermediate ? [{points: route}, ...pairs] : [{points: route}];
        }
        if (intermediate && connection.number === 3 && window.innerWidth < 1136) {
            const start = {x: labelRect.left, y: labelRect.top + labelRect.height / 2};
            const end = {x: targetRect.left, y: targetRect.top + targetRect.height / 2};
            const x = labelRect.left - 12;
            pairs.unshift({points: [start, {x, y: start.y}, {x, y: end.y}, end]});
        }
        let accepted = false;
        const routes = pairs.flatMap(function(pair) {
            if (pair.points) return [pair.points];
            const {start, end} = pair;
            const direct = Math.hypot(start.edge.x - end.edge.x, start.edge.y - end.edge.y) <= 24 ?
                [[start.edge, end.edge]] : [];
            const routes = direct.concat([
                [start.edge, start.outer, {x: end.outer.x, y: start.outer.y}, end.outer, end.edge],
                [start.edge, start.outer, {x: start.outer.x, y: end.outer.y}, end.outer, end.edge]
            ]);
            if (intermediate) {
                for (const x of verticalLanes) {
                    routes.push([start.edge, start.outer, {x, y: start.outer.y},
                        {x, y: end.outer.y}, end.outer, end.edge]);
                }
                for (const y of horizontalLanes) {
                    routes.push([start.edge, start.outer, {x: start.outer.x, y},
                        {x: end.outer.x, y}, end.outer, end.edge]);
                }
            }
            return routes;
        });
        if (intermediate && connection.number === 10) {
            const start = {x: labelRect.left, y: labelRect.top + labelRect.height / 2};
            for (const x of verticalLanes) {
                for (const end of targetPorts) {
                    for (const y of horizontalLanes) {
                        routes.push([start, {x: x, y: start.y}, {x, y},
                            {x: end.outer.x, y}, end.outer, end.edge]);
                    }
                }
            }
        }
        for (const points of routes) {
            const ownBox = obstacles[labels.indexOf(connection.label) + 1];
            if (intermediate && points.slice(1).some((end, index) => {
                const start = points[index];
                if (end.x < 2 || end.y < 2 || end.x > window.innerWidth - 2 || end.y > canvasHeight - 2) return true;
                if (obstacles.some(rect => rect !== ownBox &&
                    Math.min(start.x, end.x) < rect.right + 2 && Math.max(start.x, end.x) > rect.left - 2 &&
                    Math.min(start.y, end.y) < rect.bottom + 2 && Math.max(start.y, end.y) > rect.top - 2)) return true;
                const steps = Math.max(1, Math.ceil(Math.hypot(end.x - start.x, end.y - start.y) / 6));
                for (let i = 0; i <= steps; i++) {
                    if (nearUsed({x: start.x + (end.x - start.x) * i / steps,
                        y: start.y + (end.y - start.y) * i / steps})) return true;
                }
                return false;
            })) continue;
            const path = document.createElementNS(namespace, 'path');
            path.setAttribute('d', roundedPath(points));
            path.dataset.helpTopic = String(connection.number);
            svg.appendChild(path);
            const length = path.getTotalLength();
            const samples = [];
            let clear = true;
            for (let offset = 0; offset <= length; offset += 2) {
                const p = path.getPointAtLength(offset);
                if (p.x < 2 || p.y < 2 || p.x > window.innerWidth - 2 || p.y > canvasHeight - 2 || nearUsed(p) ||
                    obstacles.some(rect => rect !== ownBox &&
                        p.x > rect.left - 2 && p.x < rect.right + 2 && p.y > rect.top - 2 && p.y < rect.bottom + 2)) {
                    clear = false;
                    break;
                }
                samples.push({x: p.x, y: p.y});
            }
            if (!clear) {
                path.remove();
                continue;
            }
            path.setAttribute('marker-end', 'url(#help-arrow)');
            samples.forEach(reserve);
            accepted = true;
            break;
        }
        if (!accepted && !intermediate) return false;
    }
    container.prepend(svg);
    return true;
}

function initHelp() {
    const trigger = document.getElementById('help-trigger');
    const dialog = document.getElementById('help-dialog');
    const close = document.getElementById('help-close');
    const body = dialog.querySelector('.help-body');
    const annotations = dialog.querySelector('.help-annotations');
    const topics = [
        {
            title: 'Section Navigation', target: '.category-nav',
            details: [
                ['Section icons', 'The icon group in the top menu links to rule sections. Each icon opens its section if collapsed, scrolls to it and updates the address fragment (#section-...). This makes sharing specific sections easier.'],
                ['Sticky navigation', 'This Feature keeps this menu always available while scrolling down the page.'],
                ['Search rules', 'The search box before the section icons filters this edition by title, subtitle, description and details. Every word must match somewhere in a card. Search includes optional and homebrew rules even when their Settings switches are off. Use the X inside the box to clear the filter and restore your sections and Settings filters.']
            ]
        },
        {
            title: 'Jump to Top', target: '#back-to-top',
            text: 'The upward arrow after the section icons in the top menu returns to the page title and also clears the section fragment (#section-...) from the address bar.'
        },
        {
            title: 'Preferences Menu', target: '.preferences-menu',
            details: [
                ['Preferences group', 'The other top-menu group contains the D&D edition button, sun/moon, gear and question mark.'],
                ['Help (?)', 'The question mark after the gear opens this guide without changing saved preferences.']
            ]
        },
        {
            title: 'Ruleset', target: '#ruleset-trigger',
            details: [
                ['D&D edition button', 'The labelled button in the top-menu preferences group switches between D&D 5e (2014) and 5.5e (2024) and saves the choice.']
            ]
        },
        {
            title: 'Light / Dark Mode', target: '#theme-trigger',
            details: [
                ['Sun / moon button', 'Next to the D&D edition button in the top menu, switches and saves the theme without reloading the page.'],
                ['First visit', 'The theme follows your system setting until you choose one.']
            ]
        },
        {
            title: 'Settings', target: '#settings-trigger',
            details: [
                ['Gear button', 'Next to the sun/moon button in the top menu, it opens the Settings panel.'],
                ['Optional / homebrew switches', 'Inside that panel, each switch controls and saves visibility for its extra rules.'],
                ['Classic layout switch', 'Below them, it switches to the original look of this page and saves the choice. The page reloads.'],
                ['Feedback / site links', 'At the bottom of the panel, each link opens in a new tab.']
            ]
        },
        {
            title: 'Section Chevron', target: '.section-toggle',
            text: 'The small chevron before each section heading expands or collapses the whole section when tapped or clicked. The heading does the same. The page remembers this choice separately from open cards.'
        },
        {
            title: 'Item Card', target: '#section-action .item-header',
            details: [
                ['Card header / chevron', 'Each rule tile inside a section has a header with a chevron on the right. Tapping or clicking the header shows or hides details and the source. Open cards reset on reload.'],
                ['Mouse hover', 'Resting the pointer over a card shows its description in a tooltip; touch-only screens do not have hover.']
            ]
        },
        {
            title: 'Collapse All Open Cards', target: '.collapse-all-btn',
            details: [
                ['Curved-arrow button', 'On the right of each section heading, it closes all open cards in that section, not the section itself.'],
                ['Availability', 'The button becomes enabled when at least one visible card in its section is expanded. Otherwise, it stays dimmed and disabled.']
            ]
        },
        {
            title: 'Extra Rule Markers', target: '.rule-marker',
            details: [
                ['Gold star', 'At the beginning of a card title, it marks an optional official D&D rule. It is separate from the main card icon.'],
                ['Gold beer mug', 'In the same position before a card title, it marks a homebrew rule.'],
                ['Visibility', 'The gear in the top menu opens Settings, where dedicated switches show or hide these rules. Expanded cards also show the written type.']
            ]
        }
    ];
    function appendExplanation(parent, topic) {
        if (topic.details) {
            const list = document.createElement('ul');
            topic.details.forEach(function([name, description]) {
                const item = document.createElement('li');
                const label = document.createElement('strong');
                label.textContent = name + ': ';
                item.append(label, document.createTextNode(description));
                list.appendChild(item);
            });
            parent.appendChild(list);
        } else {
            const text = document.createElement('p');
            text.textContent = topic.text;
            parent.appendChild(text);
        }
    }
    const list = document.getElementById('help-topics');
    topics.forEach(function(topic) {
        const entry = document.createElement('li');
        const heading = document.createElement('h3');
        heading.textContent = topic.title;
        entry.appendChild(heading);
        appendExplanation(entry, topic);
        list.appendChild(entry);
    });

    let frame = 0;
    let previousPadding;
    let wasLocked;
    let previousFilters;
    let previousScroll;
    let previousSections;
    let trackingFrame = 0;
    let touchY = null;
    const intro = document.getElementById('help-intro');
    const originalIntro = intro.textContent;
    const intermediateIntro = 'Scroll with the wheel, swipe or use the arrow keys. Explanations and their arrows stay anchored to the page, including controls outside the screen. Only this heading stays visible. Controls remain paused. Close with X or Escape.';
    function createCallout(topic, index) {
        const label = document.createElement('div');
        label.className = 'help-callout';
        label.dataset.helpTopic = String(index + 1);
        const title = document.createElement('h3');
        const number = document.createElement('span');
        number.className = 'help-callout-number';
        number.textContent = (index + 1) + '.';
        title.append(number, document.createTextNode(' ' + topic.title));
        label.appendChild(title);
        appendExplanation(label, topic);
        return label;
    }
    function layoutIntermediate() {
        annotations.replaceChildren();
        dialog.classList.remove('help-contextual');
        dialog.classList.add('help-intermediate');
        document.body.classList.add('help-page-scroll');
        annotations.style.transform = 'translateY(' + (-window.scrollY) + 'px)';
        annotations.style.height = document.documentElement.scrollHeight + 'px';
        intro.textContent = intermediateIntro;
        const sheet = dialog.querySelector('.help-sheet').getBoundingClientRect();
        const menu = document.querySelector('.top-menu').getBoundingClientRect();
        const columns = 5;
        const gap = 24;
        const width = (window.innerWidth - 32 - gap * (columns - 1)) / columns;
        const labels = topics.map(createCallout);
        labels.forEach(label => {
            label.style.width = width + 'px';
            annotations.appendChild(label);
        });
        const ordered = [0, 1, 3, 4, 5, 6, 7, 2, 9, 8].map(index => labels[index]);
        let top = Math.max(sheet.height + 64, menu.bottom + window.scrollY + 100);
        for (let row = 0; row * columns < ordered.length; row++) {
            const items = ordered.slice(row * columns, (row + 1) * columns);
            const height = Math.max(...items.map(label => label.offsetHeight));
            items.forEach((label, column) => {
                label.style.left = (16 + column * (width + gap)) + 'px';
                label.style.top = top + 'px';
            });
            top += height + gap;
        }
        const grapple = Array.from(document.querySelectorAll('#section-reaction .item-header'))
            .find(header => header.querySelector('.item-title').textContent.trim() === 'Grapple')
            ?.querySelector('.rule-marker-homebrew');
        if (grapple) {
            const rect = grapple.getBoundingClientRect();
            const cardHelp = labels[7].getBoundingClientRect();
            if (rect.left < cardHelp.right && rect.right > cardHelp.left &&
                rect.top < cardHelp.bottom && rect.bottom > cardHelp.top) {
                labels[7].style.left = labels[9].style.left;
            }
        }
        labels[9].style.left = labels[8].style.left;
        const collapseButton = document.querySelector('#section-bonus-action .collapse-all-btn').getBoundingClientRect();
        labels[9].style.top = Math.max(labels[8].offsetTop + labels[8].offsetHeight + gap,
            collapseButton.bottom + window.scrollY + gap) + 'px';
        close.focus({preventScroll: true});
        refreshIntermediateConnections();
    }
    function refreshIntermediateConnections() {
        if (!dialog.open || !dialog.classList.contains('help-intermediate')) return;
        annotations.querySelectorAll('.help-connectors, .help-highlight').forEach(element => element.remove());
        const sheet = dialog.querySelector('.help-sheet').getBoundingClientRect();
        const labels = Array.from(annotations.querySelectorAll('.help-callout'));
        const boxes = [sheet, ...labels.map(label => label.getBoundingClientRect())];
        const overlaps = (a, b) => a.left < b.right + 4 && a.right + 4 > b.left &&
            a.top < b.bottom + 4 && a.bottom + 4 > b.top;
        const connections = [];
        topics.forEach((topic, index) => {
            const selector = index === 6 ? '.section-toggle .chevron' :
                index === 8 ? '#section-bonus-action .collapse-all-btn' :
                index === 9 ? '.rule-marker-homebrew' : topic.target;
            const targets = Array.from(document.querySelectorAll(selector));
            if (index === 9) {
                targets.sort((a, b) => Number(b.closest('.item-header').querySelector('.item-title').textContent.trim() === 'Grapple') -
                    Number(a.closest('.item-header').querySelector('.item-title').textContent.trim() === 'Grapple'));
            }
            const element = targets.find(target => {
                const rect = target.getBoundingClientRect();
                return target.getClientRects().length && rect.width && rect.height &&
                    rect.left >= 8 && rect.right <= window.innerWidth - 8 &&
                    rect.top + window.scrollY >= 8 && !boxes.some(box => overlaps(rect, box));
            });
            if (!element) return;
            const rect = element.getBoundingClientRect();
            connections.push({label: labels[index], target: rect, number: index + 1});
        });
        drawHelpConnections(annotations, connections, sheet, true);
        connections.forEach(connection => {
            const highlight = document.createElement('div');
            highlight.className = 'help-highlight';
            if (connection.number === 3) highlight.classList.add('help-highlight-preferences');
            highlight.dataset.helpTopic = String(connection.number);
            const rect = connection.target;
            Object.assign(highlight.style, {
                left: rect.left + 'px', top: (rect.top + window.scrollY) + 'px',
                width: rect.width + 'px', height: rect.height + 'px'
            });
            const number = document.createElement('span');
            number.className = 'help-target-number';
            number.textContent = String(connection.number);
            highlight.appendChild(number);
            annotations.appendChild(highlight);
        });
    }
    function trackScroll() {
        if (!dialog.classList.contains('help-intermediate') || trackingFrame) return;
        trackingFrame = requestAnimationFrame(() => {
            trackingFrame = 0;
            annotations.style.transform = 'translateY(' + (-window.scrollY) + 'px)';
        });
    }
    function scrollPage(delta) {
        window.scrollBy({top: delta, behavior: 'instant'});
    }
    dialog.addEventListener('wheel', function(event) {
        if (!dialog.classList.contains('help-intermediate') || event.ctrlKey) return;
        event.preventDefault();
        scrollPage(event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1));
    }, {passive: false});
    dialog.addEventListener('touchstart', function(event) {
        touchY = event.touches.length === 1 ? event.touches[0].clientY : null;
    }, {passive: true});
    dialog.addEventListener('touchmove', function(event) {
        if (!dialog.classList.contains('help-intermediate') || touchY === null || event.touches.length !== 1) return;
        event.preventDefault();
        const y = event.touches[0].clientY;
        scrollPage(touchY - y);
        touchY = y;
    }, {passive: false});
    dialog.addEventListener('touchend', function() { touchY = null; });
    dialog.addEventListener('touchcancel', function() { touchY = null; });
    dialog.addEventListener('keydown', function(event) {
        if (!dialog.classList.contains('help-intermediate') || event.ctrlKey || event.altKey || event.metaKey) return;
        const deltas = {
            ArrowDown: 48, ArrowUp: -48,
            PageDown: window.innerHeight * .8, PageUp: -window.innerHeight * .8,
            Home: -document.documentElement.scrollHeight, End: document.documentElement.scrollHeight
        };
        if (Object.hasOwn(deltas, event.key)) {
            event.preventDefault();
            scrollPage(deltas[event.key]);
        }
    });
    const observer = new ResizeObserver(scheduleLayout);
    function scheduleLayout() {
        if (!dialog.open || frame) return;
        frame = requestAnimationFrame(function() {
            frame = 0;
            layoutAnnotations();
        });
    }
    function layoutAnnotations() {
        annotations.replaceChildren();
        annotations.style.transform = '';
        annotations.style.height = '';
        document.body.classList.remove('help-page-scroll');
        dialog.classList.remove('help-contextual', 'help-intermediate');
        intro.textContent = originalIntro;
        if (window.innerWidth < 1000 || window.innerHeight < 560) return;
        dialog.classList.add('help-contextual');
        if (document.activeElement === body) close.focus({preventScroll: true});
        const heading = dialog.querySelector('.help-sheet').getBoundingClientRect();
        const menuBottom = document.querySelector('.top-menu').getBoundingClientRect().bottom;
        const occupied = [heading];
        const menu = document.querySelector('.top-menu').getBoundingClientRect();
        const highlights = [];
        const connections = [];
        const menuRoutes = [];
        function touchesRoute(box) {
            return menuRoutes.some(p => p.x > box.left - 8 && p.x < box.right + 8 &&
                p.y > box.top - 8 && p.y < box.bottom + 8);
        }
        function overlaps(a, b) {
            return a.left < b.right + 4 && a.right + 4 > b.left &&
                a.top < b.bottom + 4 && a.bottom + 4 > b.top;
        }
        topics.forEach(function(topic, index) {
            const label = createCallout(topic, index);
            annotations.appendChild(label);
            const width = label.offsetWidth;
            const height = label.offsetHeight;
            let placement;
            if (index < 6) {
                const left = window.innerWidth >= 1800 ? heading.right + 24 : 8;
                const menuWidth = Math.min(240, Math.floor((window.innerWidth - left - 8 - 5 * 16) / 6));
                label.style.width = menuWidth + 'px';
                const column = [0, 1, 5, 2, 3, 4][index];
                const top = window.innerWidth >= 1800 ? menuBottom + 100 : Math.max(menuBottom + 100, heading.bottom + 24);
                placement = {
                    left: left + column * (menuWidth + 16), top,
                    right: left + column * (menuWidth + 16) + menuWidth,
                    bottom: top + label.offsetHeight
                };
                const rect = document.querySelector(topic.target).getBoundingClientRect();
                if (placement.bottom <= window.innerHeight - 8 && !occupied.some(other => overlaps(placement, other))) {
                    placeLabel(rect);
                } else {
                    label.remove();
                }
                return;
            }
            const target = Array.from(document.querySelectorAll(topic.target)).find(function(element) {
                const rect = element.getBoundingClientRect();
                const visible = element.getClientRects().length && rect.width && rect.height &&
                    rect.left >= 8 && rect.right <= window.innerWidth - 8 &&
                    rect.top >= (element.closest('.top-menu') ? 8 : Math.max(8, menuBottom + 8)) &&
                    rect.bottom <= window.innerHeight - 8;
                if (!visible || touchesRoute(rect) || occupied.some(other => overlaps(rect, other))) return false;
                const offsets = [rect.left, rect.right - width, rect.left - width / 2];
                placement = offsets.flatMap(function(left) {
                    left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
                    return [rect.bottom + 10, rect.top - height - 10].map(top =>
                        ({left, top, right: left + width, bottom: top + height}));
                }).find(box => box.top >= 8 && box.bottom <= window.innerHeight - 8 &&
                    !overlaps(box, menu) && !occupied.some(other => overlaps(box, other)) &&
                    !highlights.some(other => overlaps(box, other)) && !touchesRoute(box));
                return !!placement;
            });
            if (!target) {
                label.remove();
                return;
            }
            const rect = target.getBoundingClientRect();
            placeLabel(rect);
            function placeLabel(rect) {
                label.style.left = placement.left + 'px';
                label.style.top = placement.top + 'px';
                const highlight = document.createElement('div');
                highlight.className = 'help-highlight';
                highlight.dataset.helpTopic = String(index + 1);
                if (topic.target === '.preferences-menu') highlight.classList.add('help-highlight-preferences');
                Object.assign(highlight.style, {
                    left: rect.left + 'px', top: rect.top + 'px',
                    width: rect.width + 'px', height: rect.height + 'px'
                });
                const number = document.createElement('span');
                number.className = 'help-target-number';
                number.textContent = String(index + 1);
                highlight.appendChild(number);
                annotations.appendChild(highlight);
                connections.push({label, target: rect, number: index + 1});
                occupied.push(placement);
                highlights.push(rect);
                if (index === 5 && connections.length === 6 && drawHelpConnections(annotations, connections, heading)) {
                    annotations.querySelectorAll('.help-connectors > path').forEach(function(path) {
                        for (let distance = 0; distance <= path.getTotalLength(); distance += 2) {
                            menuRoutes.push(path.getPointAtLength(distance));
                        }
                    });
                }
            }
        });
        annotations.querySelector('.help-connectors')?.remove();
        if (annotations.querySelectorAll('.help-callout').length !== topics.length ||
            !drawHelpConnections(annotations, connections, heading)) {
            layoutIntermediate();
        }
    }
    trigger.addEventListener('click', function() {
        if (dialog.open) return;
        const settings = document.getElementById('settings-panel');
        settings.hidden = true;
        document.getElementById('settings-trigger').setAttribute('aria-expanded', 'false');
        previousScroll = {left: window.scrollX, top: window.scrollY};
        previousSections = getSectionState();
        helpPreview = true;
        previousFilters = ['optional-switch', 'homebrew-switch'].map(function(id) {
            const input = document.getElementById(id);
            const checked = input.checked;
            input.checked = true;
            return {input, checked};
        });
        handleRulesToggle();
        previousPadding = document.body.style.paddingRight;
        wasLocked = document.body.classList.contains('dialog-open');
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = (parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar) + 'px';
        document.body.classList.add('dialog-open');
        dialog.showModal();
        body.scrollTop = 0;
        close.focus({preventScroll: true});
        observer.observe(document.querySelector('.top-menu'));
        observer.observe(document.getElementById('main-content'));
        window.addEventListener('resize', scheduleLayout);
        window.addEventListener('scroll', trackScroll, {passive: true});
        scheduleLayout();
    });
    close.addEventListener('click', function() { dialog.close(); });
    dialog.addEventListener('cancel', function(event) {
        event.preventDefault();
        dialog.close();
    });
    dialog.addEventListener('keydown', function(event) {
        if (event.key !== 'Tab') return;
        event.preventDefault();
        (dialog.classList.contains('help-contextual') || dialog.classList.contains('help-intermediate') ? close :
            document.activeElement === close ? body : close).focus({preventScroll: true});
    });
    dialog.addEventListener('close', function() {
        observer.disconnect();
        window.removeEventListener('resize', scheduleLayout);
        window.removeEventListener('scroll', trackScroll);
        cancelAnimationFrame(frame);
        cancelAnimationFrame(trackingFrame);
        trackingFrame = 0;
        touchY = null;
        frame = 0;
        annotations.replaceChildren();
        annotations.style.transform = '';
        annotations.style.height = '';
        document.body.classList.remove('help-page-scroll');
        dialog.classList.remove('help-intermediate');
        intro.textContent = originalIntro;
        previousFilters.forEach(function(saved) { saved.input.checked = saved.checked; });
        helpPreview = false;
        handleRulesToggle();
        restoreSectionState(previousSections);
        document.body.style.paddingRight = previousPadding;
        if (!wasLocked) document.body.classList.remove('dialog-open');
        window.scrollTo({...previousScroll, behavior: 'instant'});
        trigger.focus({preventScroll: true});
    });
}

function initNotices() {
    const notice = document.getElementById('cookie-notice');
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
        document.getElementById('main-content').focus({preventScroll: true});
    });
    document.addEventListener('focusin', function(event) {
        if (event.target.closest('#help-dialog')) return;
        if (!notice.hidden && !notice.contains(event.target) && event.target.id !== 'back-to-top') {
            const bottom = event.target.getBoundingClientRect().bottom;
            const noticeTop = notice.getBoundingClientRect().top;
            if (bottom > noticeTop - 12) window.scrollBy(0, bottom - noticeTop + 16);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initCollapsibleSections();
    initSettings();
    initSearch();
    initHelp();
    initMenuTooltips();
    initNotices();
    document.getElementById('back-to-top').addEventListener('click', function() {
        history.replaceState(history.state, '', window.location.pathname + window.location.search);
        document.getElementById('page-title').focus({preventScroll: true});
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
        });
    });
});

dataReady.then(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, {once: true});
    } else {
        init();
    }
}).catch(function(error) {
    console.error('Quick reference data failed to load:', error);
    finishRulesetTransition(true);
    const message = document.createElement('p');
    message.className = 'load-error';
    message.setAttribute('role', 'alert');
    message.textContent = 'The rules could not be loaded. Please reload the page to try again.';
    document.getElementById('main-content').prepend(message);
});
