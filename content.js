(() => {
    const STORAGE_KEY = 'gt-sfw-enabled';

    function isSfwEnabled() {
        return localStorage.getItem(STORAGE_KEY) !== 'false';
    }

    function setSfwEnabled(enabled) {
        localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');

        document.documentElement.classList.toggle(
            'gt-sfw-enabled',
            enabled
        );

        updateToggleButton();
    }

    function injectStyles() {
        if (document.getElementById('gt-sfw-styles')) {
            return;
        }

        const style = document.createElement('style');

        style.id = 'gt-sfw-styles';

        style.textContent = `
            html.gt-sfw-enabled use[href*="/sprite-"][href*="#"],
            html.gt-sfw-enabled use[xlink\\:href*="/sprite-"][xlink\\:href*="#"] {
                display: none !important;
            }

            #gt-sfw-toggle {
                display: flex;
                align-items: center;
                margin-left: 10px;
            }

            #gt-sfw-toggle button {
                border: 1px solid rgba(255,255,255,0.25);
                border-radius: 4px;
                padding: 4px 8px;
                background: transparent;
                color: inherit;
                cursor: pointer;
                font-size: 13px;
                white-space: nowrap;
            }

            #gt-sfw-toggle button:hover {
                background: rgba(255,255,255,0.1);
            }
        `;

        document.head.appendChild(style);
    }

    function createToggle() {
        if (document.getElementById('gt-sfw-toggle')) {
            return;
        }

        const navbar = document.querySelector('.container-xxl');

        if (!navbar) {
            return;
        }

        const wrapper = document.createElement('div');

        wrapper.id = 'gt-sfw-toggle';

        const button = document.createElement('button');

        button.type = 'button';
        button.title = 'Toggle SFW Mode';

        button.addEventListener('click', () => {
            setSfwEnabled(!isSfwEnabled());
        });

        wrapper.appendChild(button);
        navbar.appendChild(wrapper);

        updateToggleButton();
    }

    function updateToggleButton() {
        const button = document.querySelector('#gt-sfw-toggle button');

        if (!button) {
            return;
        }

        button.textContent = isSfwEnabled()
            ? 'SFW: ON'
            : 'SFW: OFF';
    }

    function init() {
        injectStyles();

        document.documentElement.classList.toggle(
            'gt-sfw-enabled',
            isSfwEnabled()
        );

        createToggle();
    }

    init();

    const observer = new MutationObserver(() => {
        createToggle();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
