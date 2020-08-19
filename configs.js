const refreshNotice = document.getElementById('refresh-notice');
const toggleButton = document.getElementById('toggleBtn');
const modes = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
}

function showRefreshNotice(){
        refreshNotice.style.display = 'block'
    setTimeout(function () {
        refreshNotice.style.display = 'none'
    }, 20000)
}

function restoreOptions() {
    chrome.storage.sync.get('mode', function onStorageGet(items) {
        toggleButton.innerText = (items.mode === modes.ENABLED ? 'ON' : 'OFF');
    });
}

function reloadPage(){
    chrome.tabs.reload();
}

toggleButton.addEventListener('click', function () {
    this.innerText = (this.innerText == 'ON' ? 'OFF' : 'ON');
    chrome.storage.sync.set({
        'mode': this.innerText == 'OFF' ? modes.DISABLED : modes.ENABLED
    });
    showRefreshNotice();
})

document.getElementById('reloadBtn').addEventListener('click', reloadPage);
document.addEventListener('DOMContentLoaded', restoreOptions);
