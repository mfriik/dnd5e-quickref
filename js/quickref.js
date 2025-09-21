"use strict";

/**
 * @file Main application logic for the D&D 5e Quick Reference web application.
 * @author Principal Code Quality Architect
 */

// JSDoc Type Definitions for Data Structures
/** @typedef {'paragraph' | 'list' | 'table'} BulletItemType */
/** @typedef {{type: BulletItemType, content?: string, items?: string[], headers?: string[], rows?: string[][]}} BulletItem */
/** @typedef {{title: string, tag?: string, subtitle?: string, description?: string, icon?: string, bullets?: BulletItem[], reference?: string, optional?: string}} RuleItem */
/** @typedef {{showOptional: boolean, showHomebrew: boolean, darkMode: boolean, ruleset: string}} Settings */

((window, document) => {
    /**
     * @namespace QuickRefApp
     * @description Main application object for the D&D 5e Quick Reference.
     */
    const QuickRefApp = {
        config: {
            LOCAL_STORAGE_KEYS: {
                SELECTED_RULESET: 'selectedRuleset',
                DARK_MODE: 'darkModeEnabled',
                OPTIONAL_RULES: 'optionalRulesEnabled',
                HOMEBREW_RULES: 'homebrewRulesEnabled',
                COOKIES_ACCEPTED: 'cookiesAccepted'
            },
            RULESETS: { DEFAULT: 'default', Y2024: '2024' },
            DATA_PATH: { DEFAULT: 'js/', Y2024: 'js/2024_' },
            SECTION_CONFIG: [
                { containerId: 'container-movement', dataKey: 'data_movement', category: 'Move' },
                { containerId: 'container-actions', dataKey: 'data_action', category: 'Action' },
                { containerId: 'container-bonus-actions', dataKey: 'data_bonusaction', category: 'Bonus Action' },
                { containerId: 'container-reactions', dataKey: 'data_reaction', category: 'Reaction' },
                { containerId: 'container-conditions', dataKey: 'data_condition', category: 'Condition' },
                { containerId: 'container-environment-obscurance', dataKey: 'data_environment', category: 'Environment', subCategory: 'obscurance' },
                { containerId: 'container-environment-light', dataKey: 'data_environment', category: 'Environment', subCategory: 'light' },
                { containerId: 'container-environment-vision', dataKey: 'data_environment', category: 'Environment', subCategory: 'vision' },
                { containerId: 'container-environment-cover', dataKey: 'data_environment', category: 'Environment', subCategory: 'cover' },
            ],
            RULE_TYPE: { STANDARD: "Standard rule", OPTIONAL: "Optional rule", HOMEBREW: "Homebrew rule" },
            CSS_CLASSES: { MODAL_OPEN: 'modal-open', DARK_MODE: 'dark-mode-active', HIDDEN: 'hidden', LOADING: 'loading', LOADED: 'loaded', LAZY_ICON: 'lazy-load-icon' },
            DEFAULT_ICON: 'perspective-dice-six-faces-one'
        },

        state: { settings: {} },
        elements: {},

        /**
         * @namespace QuickRefApp.Renderer
         * @description A dedicated module for all DOM element creation and manipulation.
         */
        Renderer: {
            /**
             * Renders the structured bullet data into DOM elements.
             * @param {BulletItem[]} [bullets=[]] - The structured bullet data.
             * @returns {DocumentFragment} A fragment containing the rendered elements.
             */
            renderBullets(bullets = []) {
                const fragment = document.createDocumentFragment();
                bullets.forEach((bullet, index) => {
                    if (index > 0) {
                        fragment.appendChild(document.createElement('hr'));
                    }
                    let element;
                    switch (bullet.type) {
                        case 'paragraph':
                            element = document.createElement('p');
                            element.innerHTML = bullet.content || '';
                            break;
                        case 'list':
                            element = document.createElement('ul');
                            (bullet.items || []).forEach(itemText => {
                                const li = document.createElement('li');
                                li.innerHTML = itemText;
                                element.appendChild(li);
                            });
                            break;
                        case 'table':
                            element = document.createElement('table');
                            const thead = element.createTHead();
                            const headerRow = thead.insertRow();
                            (bullet.headers || []).forEach(headerText => {
                                const th = document.createElement('th');
                                th.innerHTML = headerText;
                                headerRow.appendChild(th);
                            });
                            const tbody = element.createTBody();
                            (bullet.rows || []).forEach(rowData => {
                                const row = tbody.insertRow();
                                rowData.forEach(cellData => {
                                    const cell = row.insertCell();
                                    cell.innerHTML = cellData;
                                });
                            });
                            break;
                        default:
                            console.warn(`Unknown bullet type: ${bullet.type}`);
                            return;
                    }
                    fragment.appendChild(element);
                });
                return fragment;
            },

            /**
             * Creates a DOM element for a single quick reference item.
             * @param {RuleItem} itemData - The data for the item.
             * @param {string} category - The category of the item.
             * @param {Function} clickHandler - The callback function to handle clicks.
             * @returns {HTMLDivElement} The created DOM element.
             */
            createQuickRefItemElement(itemData, category, clickHandler) {
                const { icon, subtitle = "", title = "[no title]", optional } = itemData;
                const iconName = icon || QuickRefApp.config.DEFAULT_ICON;
    
                const itemElement = document.createElement("div");
                itemElement.className = "quickref-item";
                itemElement.setAttribute("data-rule-type", optional || QuickRefApp.config.RULE_TYPE.STANDARD);
                itemElement.tabIndex = 0;
                itemElement.setAttribute("role", "button");
                itemElement.setAttribute("aria-label", `${title}. ${subtitle}. Click to view details.`);
    
                const template = `
                    <div class="item-icon ${QuickRefApp.config.CSS_CLASSES.LAZY_ICON}" data-icon-name="${iconName}"></div>
                    <div class="item-text-container">
                        <div class="item-title"></div>
                        <div class="item-desc"></div>
                    </div>`;
                itemElement.innerHTML = template;
                
                itemElement.querySelector('.item-title').textContent = title;
                itemElement.querySelector('.item-desc').textContent = subtitle;
    
                itemElement.addEventListener('click', () => clickHandler(itemElement, itemData, category));
                itemElement.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        clickHandler(itemElement, itemData, category);
                    }
                });
    
                return itemElement;
            }
        },

        async init() {
            this.cacheDOMElements();
            this.activatePreloadedStylesheets();
            this.loadStateFromStorage();
            this.bindSettingListeners();
            this.initModal();
            this.initCookieNotice();

            try {
                const ruleData = await this.loadRuleData();
                this.populateAllSections(ruleData);
                this.filterRuleItems();
                this.initLazyIconObserver();
                this.showPageContent();
            } catch (error) {
                console.error("Failed to initialize application:", error);
            }
        },

        cacheDOMElements() {
            this.elements = {
                body: document.body,
                modal: document.getElementById("modal-dialog"),
                modalBackdrop: document.getElementById("modal-backdrop"),
                cookieNotice: document.getElementById('cookie-notice'),
                switches: {
                    optional: document.getElementById('optional-switch'),
                    homebrew: document.getElementById('homebrew-switch'),
                    darkmode: document.getElementById('darkmode-switch'),
                    rules2024: document.getElementById('rules2024-switch')
                },
                modalContent: {
                    title: document.getElementById("modal-title-text"),
                    category: document.getElementById("modal-category"),
                    subtitle: document.getElementById("modal-subtitle"),
                    reference: document.getElementById("modal-reference"),
                    bullets: document.getElementById("modal-bullets"),
                    container: document.getElementById("modal-container")
                }
            };
        },

        activatePreloadedStylesheets() {
            document.querySelectorAll('link[data-preload-stylesheet]').forEach(link => {
                link.rel = 'stylesheet';
            });
        },

        loadStateFromStorage() {
            const cfg = this.config.LOCAL_STORAGE_KEYS;
            this.state.settings = {
                showOptional: this.getLocalStorageItem(cfg.OPTIONAL_RULES) === 'true',
                showHomebrew: this.getLocalStorageItem(cfg.HOMEBREW_RULES) === 'true',
                darkMode: this.getLocalStorageItem(cfg.DARK_MODE) === 'true',
                ruleset: this.getLocalStorageItem(cfg.SELECTED_RULESET) || this.config.RULESETS.DEFAULT
            };

            this.elements.switches.optional.checked = this.state.settings.showOptional;
            this.elements.switches.homebrew.checked = this.state.settings.showHomebrew;
            this.elements.switches.darkmode.checked = this.state.settings.darkMode;
            this.elements.switches.rules2024.checked = this.state.settings.ruleset === this.config.RULESETS.Y2024;
            this.toggleDarkMode(this.state.settings.darkMode, false);
        },

        async loadRuleData() {
            const rulesetPath = this.state.settings.ruleset === this.config.RULESETS.Y2024
                ? this.config.DATA_PATH.Y2024
                : this.config.DATA_PATH.DEFAULT;

            const uniqueDataKeys = [...new Set(this.config.SECTION_CONFIG.map(s => s.dataKey))];

            const fetchPromises = uniqueDataKeys.map(key => {
                const url = `${rulesetPath}${key}.json`;
                return fetch(url)
                    .then(response => {
                        if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for ${url}`);
                        return response.json();
                    })
                    .then(data => ({ key, data, status: 'fulfilled' }))
                    .catch(error => ({ key, reason: error, status: 'rejected' }));
            });

            const results = await Promise.all(fetchPromises);
            
            const loadedData = {};
            results.forEach(result => {
                if (result.status === 'fulfilled') {
                    loadedData[result.key] = result.data;
                } else {
                    console.error(`Failed to load data for "${result.key}":`, result.reason);
                }
            });
            
            if (Object.keys(loadedData).length === 0) {
                throw new Error("All data files failed to load.");
            }

            return loadedData;
        },

        populateAllSections(ruleData) {
            this.config.SECTION_CONFIG.forEach(section => {
                const sourceData = ruleData[section.dataKey];
                if (!sourceData) return;
                const dataForSection = section.subCategory ? sourceData.filter(item => item.tag === section.subCategory) : sourceData;
                this.populateSection(section.containerId, dataForSection, section.category);
            });
        },

        populateSection(containerId, items, category) {
            const container = document.getElementById(containerId);
            if (!container) return;
            const fragment = document.createDocumentFragment();
            const clickHandler = (el, data, cat) => this.handleItemClick(el, data, cat);
            items.forEach(item => {
                const itemElement = this.Renderer.createQuickRefItemElement(item, category, clickHandler);
                fragment.appendChild(itemElement);
            });
            container.replaceChildren(fragment);
        },
        
        bindSettingListeners() {
            const { switches } = this.elements;
            switches.optional.addEventListener('change', () => this.filterRuleItems());
            switches.homebrew.addEventListener('change', () => this.filterRuleItems());
            switches.darkmode.addEventListener('change', e => this.toggleDarkMode(e.target.checked, true));
            switches.rules2024.addEventListener('change', event => {
                const newRuleset = event.target.checked ? this.config.RULESETS.Y2024 : this.config.RULESETS.DEFAULT;
                this.setLocalStorageItem(this.config.LOCAL_STORAGE_KEYS.SELECTED_RULESET, newRuleset);
                location.reload();
            });
        },

        handleItemClick(itemElement, itemData, category) {
            const section = itemElement.closest('.section-container');
            if (!section) return;
            const color = window.getComputedStyle(section).getPropertyValue('--section-color');
            this.showModal(itemData, category, color);
        },

        showPageContent() {
            this.elements.body.classList.remove(this.config.CSS_CLASSES.LOADING);
            this.elements.body.classList.add(this.config.CSS_CLASSES.LOADED);
        },

        toggleDarkMode(isEnabled, saveSetting) {
            if (saveSetting) {
                this.setLocalStorageItem(this.config.LOCAL_STORAGE_KEYS.DARK_MODE, isEnabled);
            }
            this.elements.body.classList.toggle(this.config.CSS_CLASSES.DARK_MODE, isEnabled);
        },

        initModal() {
            const { modal, modalBackdrop } = this.elements;
            if (!modal || !modalBackdrop) return;
            const dismissModal = () => this.hideModal();
            modal.addEventListener("click", event => {
                if (event.target === modal || event.target === modalBackdrop) dismissModal();
            });
            document.addEventListener('keydown', event => {
                if (event.key === 'Escape' && this.elements.body.classList.contains(this.config.CSS_CLASSES.MODAL_OPEN)) dismissModal();
            });
        },
        
        showModal(itemData, category, color) {
            const { modal, modalContent, body } = this.elements;
            if (!modal) return;
            modalContent.title.textContent = itemData.title || "[no title]";
            modalContent.category.textContent = category || "";
            modalContent.subtitle.textContent = itemData.description || itemData.subtitle || "";
            modalContent.reference.textContent = itemData.reference || "";
            modalContent.bullets.replaceChildren(this.Renderer.renderBullets(itemData.bullets));
            modalContent.container.style.borderColor = color;
            modalContent.container.querySelector('.section-title').style.backgroundColor = color;
            body.classList.add(this.config.CSS_CLASSES.MODAL_OPEN);
            modal.setAttribute('aria-hidden', 'false');
            modalContent.title.focus();
        },

        hideModal() {
            const { modal, body } = this.elements;
            if (!modal) return;
            body.classList.remove(this.config.CSS_CLASSES.MODAL_OPEN);
            modal.setAttribute('aria-hidden', 'true');
        },

        filterRuleItems() {
            const showOptional = this.elements.switches.optional.checked;
            this.setLocalStorageItem(this.config.LOCAL_STORAGE_KEYS.OPTIONAL_RULES, showOptional);
            const showHomebrew = this.elements.switches.homebrew.checked;
            this.setLocalStorageItem(this.config.LOCAL_STORAGE_KEYS.HOMEBREW_RULES, showHomebrew);
            document.querySelectorAll('.quickref-item').forEach(item => {
                const ruleType = item.getAttribute('data-rule-type');
                const isVisible = !(
                    (ruleType === this.config.RULE_TYPE.OPTIONAL && !showOptional) ||
                    (ruleType === this.config.RULE_TYPE.HOMEBREW && !showHomebrew)
                );
                item.classList.toggle(this.config.CSS_CLASSES.HIDDEN, !isVisible);
            });
        },

        initLazyIconObserver() {
            const lazyIcons = document.querySelectorAll(`.${this.config.CSS_CLASSES.LAZY_ICON}`);
            if (!('IntersectionObserver' in window)) {
                lazyIcons.forEach(icon => this.loadIcon(icon));
                return;
            }
            const observer = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadIcon(entry.target);
                        observerInstance.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px 150px 0px' });
            lazyIcons.forEach(icon => observer.observe(icon));
        },

        loadIcon(iconElement) {
            const iconName = iconElement.getAttribute('data-icon-name');
            if (iconName) {
                iconElement.classList.add(`icon-${iconName}`);
                iconElement.classList.remove(this.config.CSS_CLASSES.LAZY_ICON);
            }
        },

        initCookieNotice() {
            const { cookieNotice } = this.elements;
            const acceptButton = document.getElementById('accept-cookies-button');
            if (!cookieNotice || !acceptButton) return;
            if (this.getLocalStorageItem(this.config.LOCAL_STORAGE_KEYS.COOKIES_ACCEPTED) === 'true') {
                cookieNotice.style.display = 'none';
            }
            acceptButton.addEventListener('click', () => {
                this.setLocalStorageItem(this.config.LOCAL_STORAGE_KEYS.COOKIES_ACCEPTED, 'true');
                cookieNotice.style.display = 'none';
            });
        },
        
        getLocalStorageItem(key) {
            try { return window.localStorage.getItem(key); }
            catch (error) { console.warn("Could not access localStorage:", error); return null; }
        },

        setLocalStorageItem(key, value) {
            try { window.localStorage.setItem(key, value); }
            catch (error) { console.warn("Could not access localStorage:", error); }
        },
    };

    document.addEventListener("DOMContentLoaded", () => QuickRefApp.init());

})(window, document);