const refreshNotice = document.getElementById('refresh-notice');
const toggleButton = document.getElementById('toggleBtn');

function showRefreshNotice(){
        refreshNotice.style.display = 'block'
    setTimeout(function () {
        refreshNotice.style.display = 'none'
    }, 20000)
}

function restoreOptions() {
    chrome.storage.sync.get('mode', function onStorageGet(items) {
        toggleButton.innerText = (items.mode === 'enabled' ? 'ON' : 'OFF');
    });
}

function reloadPage(){
    chrome.tabs.reload();
}

toggleButton.addEventListener('click', function () {
    this.innerText = (this.innerText == 'ON' ? 'OFF' : 'ON');
    chrome.storage.sync.set({
        'mode': this.innerText == 'OFF' ? 'disabled' : 'enabled'
    });
    showRefreshNotice();
})

document.getElementById('reloadBtn').addEventListener('click', reloadPage);
document.addEventListener('DOMContentLoaded', restoreOptions);
