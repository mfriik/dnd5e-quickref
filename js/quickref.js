// Data files remain separate so both editions use the same presentation.
const ruleFiles = [
    'data_movement', 'data_action', 'data_bonusaction',
    'data_reaction', 'data_condition', 'data_environment'
];
const dataReady = Promise.all(ruleFiles.map(function(base) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        const prefix = localStorage.getItem('rules2024') === 'true' ? '2024_' : '';
        script.src = 'js/' + prefix + base + '.js';
        script.onload = resolve;
        script.onerror = function() {
            reject(new Error('Could not load ' + script.src));
        };
        document.head.appendChild(script);
    });
}));

let itemSequence = 0;
let domainModalReturnFocus = null;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

function setExpanded(button, content, expanded) {
    if (!expanded && content.contains(document.activeElement)) {
        button.focus();
    }
    button.setAttribute('aria-expanded', String(expanded));
    content.hidden = !expanded;
    content.classList.toggle('collapsed', !expanded);
}

function add_quickref_item(parent, data, type) {
    const item = document.createElement('div');
    item.className = 'item itemsize';
    item.setAttribute('title', data.optional || 'Standard rule');

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
    icon.className = 'item-icon iconsize icon-' + (data.icon || 'perspective-dice-six-faces-one');
    const iconUrl = new URL('img/' + encodeURIComponent(data.icon || 'perspective-dice-six-faces-one') + '.png', document.baseURI);
    icon.style.setProperty('--icon-image', 'url("' + iconUrl.href + '")');
    icon.setAttribute('aria-hidden', 'true');
    const text = document.createElement('span');
    text.className = 'item-text-container text';
    const title = document.createElement('span');
    title.className = 'item-title';
    title.textContent = data.title || '[no title]';
    const subtitle = document.createElement('span');
    subtitle.className = 'item-desc';
    subtitle.textContent = data.subtitle || '';
    text.append(title, subtitle);
    const chevron = document.createElement('span');
    chevron.className = 'chevron';
    chevron.setAttribute('aria-hidden', 'true');
    button.append(icon, text, chevron);
    heading.appendChild(button);

    const bulletsHTML = (data.bullets || []).map(function(bullet) {
        if (typeof bullet === 'object' && bullet.collapsible) {
            return '<div class="item-collapsible-container">' +
                '<div class="item-collapsible-title">' + bullet.title + '</div>' +
                '<div class="item-collapsible-content">' +
                bullet.content.map(p => '<p>' + p + '</p>').join('') +
                '</div></div>';
        }
        return '<p>' + bullet + '</p>';
    }).join('\n<hr>\n');

    const content = document.createElement('div');
    content.id = contentId;
    content.className = 'item-content collapsed';
    content.hidden = true;
    content.innerHTML = '<p class="item-description">' + (data.description || data.subtitle || '') +
        '</p><div class="item-bullets">' + bulletsHTML +
        '</div><div class="item-reference">' + (data.reference || '') + '</div>';
    if (data.optional === 'Optional rule' || data.optional === 'Homebrew rule') {
        const badge = document.createElement('span');
        badge.className = 'rule-type';
        badge.textContent = data.optional;
        content.prepend(badge);
    }

    button.addEventListener('click', function() {
        setExpanded(button, content, content.hidden);
        updateCollapseAllButtonState(item.closest('.section-container'));
    });
    item.append(heading, content);
    parent.appendChild(item);
}

function fill_section(data, parentname, type) {
    const parent = document.getElementById(parentname);
    parent.classList.add('items-grid-container');
    data.forEach(item => add_quickref_item(parent, item, type));
}

function init() {
    fill_section(data_movement, 'basic-movement', 'Move');
    fill_section(data_action, 'basic-actions', 'Action');
    fill_section(data_bonusaction, 'basic-bonus-actions', 'Bonus action');
    fill_section(data_reaction, 'basic-reactions', 'Reaction');
    fill_section(data_condition, 'basic-conditions', 'Condition');
    fill_section(data_environment_obscurance, 'environment-obscurance', 'Environment');
    fill_section(data_environment_light, 'environment-light', 'Environment');
    fill_section(data_environment_vision, 'environment-vision', 'Environment');
    fill_section(data_environment_cover, 'environment-cover', 'Environment');
    handleRulesToggle();
}

function updateCollapseAllButtonState(section) {
    const button = section.querySelector('.collapse-all-btn');
    if (button) {
        button.disabled = !section.querySelector('.item:not(.item-hidden) .item-header[aria-expanded="true"]');
    }
}

function initCollapsibleSections() {
    const navigation = document.querySelector('.category-nav');
    navigation.replaceChildren();
    document.querySelectorAll('.section-container').forEach(function(section) {
        const title = section.querySelector('.section-title');
        const text = title.querySelector('.section-title-text');
        const name = text.firstChild.textContent.trim();
        if (section.id !== 'section-settings') {
            const link = document.createElement('a');
            link.href = '#' + section.id;
            link.textContent = name;
            navigation.appendChild(link);
        }
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
        const collapseAll = title.querySelector('.collapse-all-btn:not(#app-version-display)');
        const limit = title.querySelector('.float-right');
        const version = title.querySelector('#app-version-display');
        title.replaceChildren(heading);
        if (limit) {
            limit.className = 'section-limit';
            title.appendChild(limit);
        }
        if (collapseAll) {
            collapseAll.type = 'button';
            collapseAll.setAttribute('aria-label', 'Collapse all items in ' + name);
            title.appendChild(collapseAll);
            collapseAll.addEventListener('click', function() {
                section.querySelectorAll('.item-header[aria-expanded="true"]').forEach(function(button) {
                    setExpanded(button, document.getElementById(button.getAttribute('aria-controls')), false);
                });
                updateCollapseAllButtonState(section);
            });
        }
        if (version) {
            const badge = document.createElement('span');
            badge.id = 'app-version-display';
            badge.className = 'app-version';
            badge.textContent = 'v' + window.dndQuickRefAppVersion;
            title.appendChild(badge);
        }
        setExpanded(toggle, content, localStorage.getItem(section.id + '-collapsed') !== 'true');
        toggle.addEventListener('click', function() {
            setExpanded(toggle, content, content.hidden);
            localStorage.setItem(section.id + '-collapsed', String(content.hidden));
        });
    });

    document.querySelectorAll('a[href^="#section-"]').forEach(function(link) {
        link.addEventListener('click', function(event) {
            if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            const section = document.getElementById(link.hash.slice(1));
            const toggle = section.querySelector('.section-toggle');
            setExpanded(toggle, section.querySelector('.section-content'), true);
            localStorage.setItem(section.id + '-collapsed', 'false');
            history.pushState(null, '', link.hash);
            toggle.focus({preventScroll: true});
            section.scrollIntoView({
                block: 'start',
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
            });
        });
    });
}

function handleRulesToggle() {
    const optional = document.getElementById('optional-switch').checked;
    const homebrew = document.getElementById('homebrew-switch').checked;
    document.querySelectorAll('.item[title]').forEach(function(item) {
        const ruleType = item.getAttribute('title');
        const hide = (ruleType === 'Optional rule' && !optional) ||
            (ruleType === 'Homebrew rule' && !homebrew);
        if (hide && item.contains(document.activeElement)) {
            document.getElementById(ruleType === 'Optional rule' ? 'optional-switch' : 'homebrew-switch').focus();
        }
        item.classList.toggle('item-hidden', hide);
    });
    document.querySelectorAll('.section-container').forEach(updateCollapseAllButtonState);
}

function applyTheme(dark) {
    document.documentElement.classList.toggle('dark-mode-active', dark);
    document.getElementById('darkmode-switch').checked = dark;
}

function initSettings() {
    const dropdown = document.querySelector('.settings-dropdown');
    const panel = document.getElementById('settings-panel');
    const trigger = document.getElementById('settings-trigger');
    dropdown.appendChild(panel);
    document.getElementById('app-version-display').textContent = 'v' + window.dndQuickRefAppVersion;
    function closeSettings(restoreFocus) {
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        if (restoreFocus) trigger.focus();
    }
    trigger.addEventListener('click', function() {
        const opening = panel.hidden;
        panel.hidden = !opening;
        trigger.setAttribute('aria-expanded', String(opening));
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
        ['darkmode', 'darkmode-toggle-item', 'darkmode-switch'],
        ['rules2024', '2024rules-toggle-item', 'rules2024-switch']
    ];
    controls.forEach(function([key, labelId, inputId]) {
        const oldLabel = document.getElementById(labelId);
        const label = document.createElement('label');
        label.id = labelId;
        label.className = oldLabel.className;
        label.htmlFor = inputId;
        while (oldLabel.firstChild) {
            const oldText = oldLabel.firstChild;
            if (oldText.nodeType === Node.ELEMENT_NODE) {
                const span = document.createElement('span');
                span.className = oldText.className;
                span.textContent = oldText.textContent;
                label.appendChild(span);
                oldText.remove();
            } else {
                label.appendChild(oldText);
            }
        }
        oldLabel.replaceWith(label);
        const input = document.getElementById(inputId);
        const title = label.querySelector('.item-title');
        const description = label.querySelector('.item-desc');
        title.id = inputId + '-label';
        description.id = inputId + '-description';
        input.setAttribute('aria-labelledby', title.id);
        input.setAttribute('aria-describedby', description.id);
        input.checked = localStorage.getItem(key) === 'true';
        input.addEventListener('change', function() {
            localStorage.setItem(key, String(input.checked));
            if (key === 'darkmode') {
                applyTheme(input.checked);
            } else if (key === 'rules2024') {
                updateRulesToggleLabel();
                location.reload();
            } else {
                handleRulesToggle();
            }
        });
    });
    const savedTheme = localStorage.getItem('darkmode');
    applyTheme(savedTheme === null ? systemTheme.matches : savedTheme === 'true');
    systemTheme.addEventListener('change', function(event) {
        if (localStorage.getItem('darkmode') === null) applyTheme(event.matches);
    });
    updateRulesToggleLabel();
}

function updateRulesToggleLabel() {
    const current2024 = document.getElementById('rules2024-switch').checked;
    const label = document.getElementById('2024rules-toggle-item');
    label.querySelector('.item-title').textContent = current2024 ? 'Switch to 2014 Rules' : 'Switch to 2024 Rules';
    label.querySelector('.item-desc').textContent = current2024
        ? 'Switches to the D&D 2014 (legacy) ruleset.'
        : 'Switches to the D&D 2024 ruleset.';
    document.getElementById('active-ruleset-label').textContent = 'Current Ruleset: D&D ' + (current2024 ? '2024' : '2014 (legacy)');
    document.getElementById('header-ruleset-label').textContent = 'D&D ' + (current2024 ? '2024' : '2014');
}

function showDomainModal() {
    const modal = document.getElementById('domain-change-modal');
    if (!modal.open) {
        domainModalReturnFocus = document.activeElement;
        modal.showModal();
        document.body.classList.add('dialog-open');
    }
}

function closeDomainModal() {
    localStorage.setItem('domainChangeNotificationDismissed', 'true');
    document.getElementById('domain-change-modal').close();
}

function initNotices() {
    const modal = document.getElementById('domain-change-modal');
    modal.addEventListener('keydown', function(event) {
        if (event.key !== 'Tab') return;
        const buttons = modal.querySelectorAll('button');
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });
    modal.addEventListener('cancel', function(event) {
        event.preventDefault();
        closeDomainModal();
    });
    modal.addEventListener('close', function() {
        document.body.classList.remove('dialog-open');
        const target = domainModalReturnFocus && domainModalReturnFocus !== document.body && domainModalReturnFocus.isConnected
            ? domainModalReturnFocus : document.getElementById('main-content');
        target.focus({preventScroll: true});
    });
    const dismissed = localStorage.getItem('domainChangeNotificationDismissed') === 'true';
    if (!dismissed) showDomainModal();

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
        if (!notice.hidden && !notice.contains(event.target) && !modal.open && event.target.id !== 'back-to-top') {
            const bottom = event.target.getBoundingClientRect().bottom;
            const noticeTop = notice.getBoundingClientRect().top;
            if (bottom > noticeTop - 12) window.scrollBy(0, bottom - noticeTop + 16);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initCollapsibleSections();
    initSettings();
    initNotices();
    document.getElementById('back-to-top').addEventListener('click', function() {
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
    const message = document.createElement('p');
    message.className = 'load-error';
    message.setAttribute('role', 'alert');
    message.textContent = 'The rules could not be loaded. Please reload the page to try again.';
    document.getElementById('main-content').prepend(message);
});
