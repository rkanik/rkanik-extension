export const loadExtensions = () => new Promise((resolve, reject) => {
    if (!chrome.management) {
        return reject({ message: 'Outside of chrome extension.' })
    }
    chrome.management.getAll(exts => {
        resolve(exts
            .filter(e => e.type === 'extension')
            .sort((a, b) => a.name > b.name ? 1 : -1)
        );
    });
});
