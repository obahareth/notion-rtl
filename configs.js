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
    if (this.innerText == 'ON') {
        this.innerText = 'OFF';
        chrome.storage.sync.set({
            'mode': 'disabled'
        })
    } else {
        this.innerText = 'ON';
        chrome.storage.sync.set({
            'mode': 'enabled'
        })
    }
    showRefreshNotice();
})

document.getElementById('reloadBtn').addEventListener('click', reloadPage);
document.addEventListener('DOMContentLoaded', restoreOptions);
