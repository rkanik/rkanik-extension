export const loadExtensions = () => new Promise(resolve => {
   chrome.management.getAll(exts => {
      let i, extList = [];
      for (i = 0; i < exts.length; ++i) {
         if (exts[i].type !== 'extension')
            continue;
         var icons = exts[i].icons || [];
         if (icons.length == 0)
            icons[0] = { url: chrome.runtime.getURL('../images/no-logo.png') };
         else {
            icons.sort((a, b) => {
               return a.size > b.size ? -1 : 1;
            });
         }
         extList.push({
            icon: icons[0].url,
            id: exts[i].id,
            type: exts[i].type,
            name: exts[i].name,
            version: exts[i].version,
            enabled: exts[i].enabled ? '1' : '0',
            checked: exts[i].enabled ? 'checked' : '',
            install_type: exts[i].installType
         });
      }
      extList = extList.sort((a, b) => a.name > b.name ? 1 : -1)
      resolve(extList);
   });
});
