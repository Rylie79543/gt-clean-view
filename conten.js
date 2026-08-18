(() => {
    const STORAGE_KEY = 'gt-sfw-enabled';

    function isSfwEnabled() {
        return localStorage.getItem(STORAGE_KEY) !== 'false';
    }

    function setSfwEnabled(enabled) {
        localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');

        document.documentElement.classList.toggle('gt-sfw-enabled', enabled);

        updateToggleButton();
    }

    function applySfw() {
        const enabled = isSfwEnabled();

        document.documentElement.classList.toggle(
            'gt-sfw-enabled',
            enabled
        );
    }

    function createToggle() {
        // Bereits vorhanden?
        if (document.getElementById('gt-sfw-toggle')) {
            return;
        }

        // Navbar-Container finden
        const navbar = document.querySelector('.container-xxl');

        if (!navbar) {
            return;
        }

        // Unser eigenes Container-Div
        const wrapper = document.createElement('div');

        wrapper.id = 'gt-sfw-toggle';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.marginLeft = '10px';

        // Button
        const button = document.createElement('button');

        button.type = 'button';
        button.title = 'Toggle SFW Mode';

        button.style.border = '1px solid rgba(255,255,255,0.25)';
        button.style.borderRadius = '4px';
        button.style.padding = '4px 8px';
        button.style.background = 'transparent';
        button.style.color = 'inherit';
        button.style.cursor = 'pointer';
        button.style.fontSize = '13px';
        button.style.whiteSpace = 'nowrap';

        button.addEventListener('click', () => {
            setSfwEnabled(!isSfwEnabled());
        });

        wrapper.appendChild(button);

        // An das Ende der Navbar setzen
        navbar.appendChild(wrapper);

        updateToggleButton();
    }

    function updateToggleButton() {
        const button = document.querySelector('#gt-sfw-toggle button');

        if (!button) {
            return;
        }

        if (isSfwEnabled()) {
            button.textContent = 'SFW: ON';
            button.style.opacity = '1';
        } else {
            button.textContent = 'SFW: OFF';
            button.style.opacity = '0.6';
        }
    }

    function hideGameSprites() {
        if (!isSfwEnabled()) {
            return;
        }

        document.querySelectorAll('use').forEach(use => {
            const href =
                use.getAttribute('href') ||
                use.getAttribute('xlink:href');

            if (href && /\/sprite-[^#]+\.svg#/i.test(href)) {
                const svg = use.closest('svg');

                if (svg) {
                    svg.style.display = 'none';
                }
            }
        });
    }

    function init() {
        applySfw();
        createToggle();
        hideGameSprites();
    }

    // Initialisierung
    init();

    // Das Spiel baut Teile der UI dynamisch auf.
    const observer = new MutationObserver(() => {
        createToggle();
        hideGameSprites();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();