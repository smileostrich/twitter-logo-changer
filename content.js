function updateLogo(path, svg) {
    path.setAttribute('d', "M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429");
    path.setAttribute('fill', "#1da1f2")
    svg.setAttribute("viewBox", "0 0 48 48");
    svg.style.height = `${parseInt(svg.clientHeight) * 1.5}px`;
}

function changeLogo() {
    const oldSVGPath = 'M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0';
    const newSVGPath = 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z';

    const svgs = document.querySelectorAll('svg');
    const matchedSVGs = Array.from(svgs).filter(svg => {
        const path = svg.querySelector('path');
        return path && [oldSVGPath, newSVGPath].includes(path.getAttribute('d'));
    });

    if (matchedSVGs.length >= 1) {
        matchedSVGs.forEach(svg => {
            const path = svg.querySelector('path');
            if (path) {
                updateLogo(path, svg);
            }
        });
        return true;
    }
    return false;
}

changeLogo();

const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList' && changeLogo()) {
            observer.disconnect();
            break;
        }
    }
});
observer.observe(document.body, { childList: true, subtree: true });

function changeFavicon(link) {
    let favicon = document.querySelector('link[rel="shortcut icon"]');
    if (favicon) {
        favicon.href = link;
    } else {
        favicon = document.createElement('link');
        favicon.rel = 'shortcut icon';
        favicon.href = link;
        document.head.appendChild(favicon);
    }
}

changeFavicon('//abs.twimg.com/favicons/twitter.2.ico');

const changeTitle = () => {
    const titleElement = document.querySelector('title');
    if (!titleElement) {
        return;
    }

    const originalTitle = titleElement.innerText;
    if (originalTitle.endsWith('/ X')) {
        titleElement.innerText = originalTitle.replace('/ X', `/ Twitter`);
    } else if (originalTitle === 'X') {
        titleElement.innerText = 'Twitter';
    }
};

changeTitle();

const headObserver = new MutationObserver(changeTitle);
headObserver.observe(document.head, { subtree: true, characterData: true, childList: true });

function changeTwitButtonText() {
    // Query for the button by its data-testid which seems to be unique for that button
    const twitButtonNestedSpan = document.querySelector('[data-testid="SideNav_NewTweet_Button"] .css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0 span.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0');

    // If the span exists and its innerText isn't 'Twit', change it
    if (twitButtonNestedSpan && twitButtonNestedSpan.innerText !== 'Twits') {
        twitButtonNestedSpan.innerText = 'Twit';
    }
}

changeTwitButtonText();

const buttonObserver = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            if (changeLogo() || changeTwitButtonText()) {
                buttonObserver.disconnect();
                break;
            }
        }
    }
});
buttonObserver.observe(document.body, { childList: true, subtree: true });