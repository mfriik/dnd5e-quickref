const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const classicHtml = fs.readFileSync(path.join(root, 'classic', 'index.html'), 'utf8');
const pages = [[html, root], [classicHtml, path.join(root, 'classic')]];
const categories = ['movement', 'action', 'bonusaction', 'reaction', 'condition', 'environment'];
const datasets = [
    'movement', 'action', 'bonusaction', 'reaction', 'condition',
    'environment_obscurance', 'environment_light', 'environment_vision', 'environment_cover'
];
const ruleTypes = new Set(['Standard rule', 'Optional Official rule', 'Homebrew rule']);

for (const [edition, prefix] of [['2014', ''], ['2024', '2024_']]) {
    test(edition + ' datasets retain the renderer input format and valid icons', () => {
        const context = vm.createContext({});
        for (const category of categories) {
            const filename = path.join(root, 'js', prefix + 'data_' + category + '.js');
            vm.runInContext(fs.readFileSync(filename, 'utf8'), context, {filename});
        }
        assert.deepEqual(Object.keys(context).sort(), datasets.map(name => 'data_' + name).sort());
        for (const name of datasets) {
            const entries = context['data_' + name];
            assert.ok(Array.isArray(entries) && entries.length > 0, name);
            for (const entry of entries) {
                const label = edition + ': ' + name + ': ' + entry.title;
                for (const field of ['title', 'subtitle', 'description', 'icon']) {
                    assert.equal(typeof entry[field], 'string', label + ': ' + field);
                    assert.ok(entry[field].length > 0, label + ': empty ' + field);
                }
                if (entry.reference !== undefined) {
                    assert.equal(typeof entry.reference, 'string', label + ': reference');
                }
                assert.ok(ruleTypes.has(entry.optional), label + ': unknown rule type');
                assert.ok(Array.isArray(entry.bullets), label + ': bullets');
                assert.ok(entry.bullets.every(bullet => typeof bullet === 'string'), label + ': HTML bullet strings');
                assert.ok(fs.existsSync(path.join(root, 'img', entry.icon + '.png')), label + ': missing icon');
            }
        }
    });
}

test('all application scripts and inline scripts have valid syntax', () => {
    for (const directory of [path.join(root, 'js'), path.join(root, 'classic', 'js')]) {
        for (const name of fs.readdirSync(directory).filter(name => name.endsWith('.js'))) {
            const filename = path.join(directory, name);
            new vm.Script(fs.readFileSync(filename, 'utf8'), {filename});
        }
    }
    for (const [page, directory] of pages) {
        for (const match of page.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
            new vm.Script(match[1], {filename: path.join(directory, 'index.html') + ' inline script'});
        }
    }
});

test('both pages and their linked stylesheets reference existing local assets', () => {
    for (const [page, directory] of pages) {
        const stylesheets = [];
        for (const match of page.matchAll(/\s(?:src|href)="([^"]+)"/g)) {
            const reference = match[1];
            if (/^(?:[a-z]+:|#|\/\/)/i.test(reference)) continue;
            const filename = path.resolve(directory, reference);
            assert.ok(fs.existsSync(filename), 'Missing page asset: ' + reference);
            if (filename.endsWith('.css')) stylesheets.push(filename);
        }
        assert.ok(stylesheets.length > 0);
        for (const filename of stylesheets) {
            const css = fs.readFileSync(filename, 'utf8');
            for (const match of css.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) {
                assert.ok(fs.existsSync(path.resolve(path.dirname(filename), match[1])),
                    'Missing stylesheet asset: ' + match[1]);
            }
        }
    }
});

function runHeadScript(page, stored) {
    const script = Array.from(page.matchAll(/<script>([\s\S]*?)<\/script>/g), match => match[1])
        .find(source => source.includes('CURRENT_APP_VERSION'));
    const storage = new Map(Object.entries(stored));
    const result = {replacedWith: null, reloaded: false};
    const context = vm.createContext({
        localStorage: {
            getItem: key => storage.has(key) ? storage.get(key) : null,
            setItem: (key, value) => storage.set(key, String(value)),
            removeItem: key => storage.delete(key)
        },
        location: {
            search: '?q=1',
            hash: '#section-action',
            replace: url => { result.replacedWith = url; },
            reload: () => { result.reloaded = true; }
        },
        document: {documentElement: {style: {}, classList: {add() {}, toggle() {}}}},
        window: {matchMedia: () => ({matches: false})}
    });
    vm.runInContext(script, context);
    return {...result, storage: Object.fromEntries(storage), version: context.window.dndQuickRefAppVersion};
}

test('both layouts use the same app version', () => {
    const modern = runHeadScript(html, {pageLayout: 'modern'});
    const classic = runHeadScript(classicHtml, {pageLayout: 'classic'});
    assert.match(modern.version, /^3\.\d+\.\d+$/);
    assert.equal(classic.version, modern.version);
    assert.match(html, /<p class="eyebrow">[^<]*<span class="header-version" id="header-version"><\/span><\/p>/);
    assert.match(fs.readFileSync(path.join(root, 'js', 'quickref.js'), 'utf8'),
        /getElementById\('header-version'\)\.textContent = 'v' \+ window\.dndQuickRefAppVersion/);
});

test('new visitors get the new layout and 2.x visitors keep the classic layout', () => {
    const newVisitor = runHeadScript(html, {});
    assert.equal(newVisitor.replacedWith, null);
    assert.equal(newVisitor.storage.pageLayout, 'modern');
    assert.equal(newVisitor.storage.appVersion, newVisitor.version);

    const returning = runHeadScript(html, {appVersion: '2.1.7'});
    assert.equal(returning.replacedWith, 'classic/?q=1#section-action');
    assert.equal(returning.storage.pageLayout, 'classic');
    // The classic page performs the version update after the redirect.
    assert.equal(returning.storage.appVersion, '2.1.7');
    assert.equal(returning.reloaded, false);

    const classic = runHeadScript(classicHtml, returning.storage);
    assert.equal(classic.replacedWith, null);
    assert.equal(classic.storage.appVersion, classic.version);
    assert.equal(classic.reloaded, true);

    assert.equal(runHeadScript(html, {appVersion: '3.0.0'}).storage.pageLayout, 'modern');
});

test('each page sends a saved choice of the other layout to that page with the same address', () => {
    assert.equal(runHeadScript(html, {pageLayout: 'classic'}).replacedWith, 'classic/?q=1#section-action');
    assert.equal(runHeadScript(classicHtml, {pageLayout: 'modern'}).replacedWith, '../?q=1#section-action');
    assert.equal(runHeadScript(html, {pageLayout: 'modern', appVersion: '2.1.7'}).replacedWith, null);
    assert.equal(runHeadScript(classicHtml, {pageLayout: 'classic'}).replacedWith, null);
});

async function runSiteScript(hostname, scriptOrigin) {
    const elements = ['site', 'repository', 'issues'].map(key => ({dataset: {siteHref: key}, href: ''}))
        .concat(['name', 'domain'].map(key => ({dataset: {siteText: key}, textContent: ''})));
    const requests = [];
    const context = vm.createContext({
        URL,
        location: {hostname},
        document: {
            currentScript: {src: scriptOrigin + '/js/site.js'},
            readyState: 'complete',
            querySelectorAll: selector => elements.filter(element =>
                selector === '[data-site-href]' ? element.dataset.siteHref : element.dataset.siteText)
        },
        fetch: async url => {
            requests.push(String(url));
            const text = fs.readFileSync(path.join(root, 'CNAME'), 'utf8');
            return {ok: true, text: async () => text};
        },
        window: {}
    });
    vm.runInContext(fs.readFileSync(path.join(root, 'js', 'site.js'), 'utf8'), context);
    const site = await context.window.dndQuickRefSite;
    await new Promise(resolve => setImmediate(resolve));
    return {site, requests, elements};
}

test('away from its domain the site reads CNAME and links to that deployment', async () => {
    const cname = fs.readFileSync(path.join(root, 'CNAME'), 'utf8').trim();
    const {site, requests, elements} = await runSiteScript('127.0.0.1', 'http://127.0.0.1:8765/preview');
    assert.deepEqual(requests, ['http://127.0.0.1:8765/preview/CNAME']);
    assert.equal(site.domain, cname);
    assert.equal(site.site, 'https://' + cname + '/');
    assert.notEqual(site.name, 'D&D Quick Reference', 'CNAME domain is missing from js/site.js');
    assert.equal(site.issues, site.repository + '/issues');
    assert.deepEqual(elements.map(element => element.href || element.textContent),
        [site.site, site.repository, site.issues, site.name, cname]);
});

test('on a deployment domain the site links to that deployment without reading CNAME', async () => {
    const {site, requests} = await runSiteScript('dndtest.misiek.win', 'https://dndtest.misiek.win');
    assert.deepEqual(requests, []);
    assert.equal(site.site, 'https://dndtest.misiek.win/');
    assert.equal(site.repository, 'https://github.com/mfriik/DnD-Quick-Ref-Experimental');
});

test('pages and layout scripts leave deployment domains to js/site.js', () => {
    for (const file of ['index.html', 'js/quickref.js', 'classic/index.html', 'classic/js/quickref.js']) {
        assert.doesNotMatch(fs.readFileSync(path.join(root, file), 'utf8'), /misiek\.win/i, file);
    }
});

function searchContext() {
    const element = () => ({setAttribute() {}});
    const context = vm.createContext({
        document: {
            createElement: element,
            head: {appendChild() {}},
            body: {appendChild() {}, classList: {add() {}}},
            getElementById: element,
            addEventListener() {}
        },
        window: {matchMedia: () => ({matches: false})},
        localStorage: {getItem: () => null},
        sessionStorage: {getItem: () => null}
    });
    vm.runInContext(fs.readFileSync(path.join(root, 'js', 'quickref.js'), 'utf8'), context);
    return context;
}

test('search normalizes words and requires every word without treating input as regex', () => {
    const {getSearchTerms, matchesSearch} = searchContext();
    assert.deepEqual(Array.from(getSearchTerms('  AtTaCk \n ADVANTAGE\t')), ['attack', 'advantage']);
    assert.deepEqual(Array.from(getSearchTerms(' \t\n')), []);
    assert.ok(matchesSearch('attack with advantage', getSearchTerms('ADVANTAGE attack')));
    assert.ok(!matchesSearch('attack with disadvantage', getSearchTerms('attack missing')));
    assert.ok(matchesSearch('attack', getSearchTerms('')));
    for (const literal of ['[', '.*', '(', '+', '?', '\\']) {
        assert.ok(matchesSearch('literal ' + literal, getSearchTerms(literal)));
        assert.ok(!matchesSearch('plain text', getSearchTerms(literal)));
    }
});

test('search indexes only the four supported fields and matches across fields', () => {
    const context = searchContext();
    context.readableText = text => text;
    const {ruleSearchText, getSearchTerms, matchesSearch} = context;
    const text = ruleSearchText({
        title: 'Attack',
        subtitle: 'One Action',
        description: 'Choose a Target',
        bullets: ['Roll a D20.', 'Apply damage.'],
        reference: 'Secret source',
        icon: 'hidden-icon',
        optional: 'Homebrew rule'
    });
    for (const query of ['ATTACK', 'action', 'target', 'D20', 'damage', 'attack damage target']) {
        assert.ok(matchesSearch(text, getSearchTerms(query)), query);
    }
    for (const query of ['secret', 'source', 'hidden-icon', 'homebrew', 'missing']) {
        assert.ok(!matchesSearch(text, getSearchTerms(query)), query);
    }
    assert.equal(ruleSearchText({}), '');
});
