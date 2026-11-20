// Deployment links shared by both layouts. Each deployment repository has its own CNAME;
// its domain selects the entry below. Repository paths are fixed, so a new deployment
// domain only needs a new entry here.
(function() {
    const sites = {
        'dnd.misiek.win': {
            name: 'Main D&D Site',
            repository: 'https://github.com/mfriik/dnd5e-quickref'
        },
        'dndtest.misiek.win': {
            name: 'D&D Test Site',
            repository: 'https://github.com/mfriik/DnD-Quick-Ref-Experimental'
        }
    };
    const unknownSite = {name: 'D&D Quick Reference', repository: 'https://github.com/mfriik/dnd5e-quickref'};
    const siteRoot = new URL('../', document.currentScript.src);

    function isKnown(domain) {
        return Object.prototype.hasOwnProperty.call(sites, domain);
    }

    // GitHub Pages serves the site from its CNAME domain but does not publish the CNAME file
    // itself, so the file is only read when the site runs elsewhere, such as a local preview.
    function readDomain() {
        if (isKnown(location.hostname)) return Promise.resolve(location.hostname);
        return fetch(new URL('CNAME', siteRoot), {cache: 'no-cache'})
            .then(function(response) { return response.ok ? response.text() : ''; })
            .then(function(text) { return text.trim().split(/\s+/)[0].toLowerCase() || location.hostname; })
            .catch(function() { return location.hostname; });
    }

    function siteContext(domain) {
        const site = isKnown(domain) ? sites[domain] : unknownSite;
        return {
            domain: domain || siteRoot.host,
            name: site.name,
            site: isKnown(domain) ? 'https://' + domain + '/' : siteRoot.href,
            repository: site.repository,
            issues: site.repository + '/issues'
        };
    }

    function applySiteContext(context) {
        document.querySelectorAll('[data-site-href]').forEach(function(link) {
            link.href = context[link.dataset.siteHref];
        });
        document.querySelectorAll('[data-site-text]').forEach(function(element) {
            element.textContent = context[element.dataset.siteText];
        });
    }

    window.dndQuickRefSite = readDomain().then(siteContext);
    window.dndQuickRefSite.then(function(context) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() { applySiteContext(context); }, {once: true});
        } else {
            applySiteContext(context);
        }
    });
})();
