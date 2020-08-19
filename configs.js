let alert = document.getElementById('alert');

function showAlert(){
       alert.style.display = 'block'
    setTimeout(function () {
        alert.style.display = 'none'
    }, 20000)
}

function restoreOptions() {
    chrome.storage.sync.get('mode', function onStorageGet(items) {
        document.getElementById('toggleBtn').innerText = (items.mode === 'enabled' ? 'ON' : 'OFF');
    });
}

function reloadPage(){
    chrome.tabs.reload();
}

document.getElementById('toggleBtn').addEventListener('click', function () {
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
    showAlert();
})

document.getElementById('reloadBtn').addEventListener('click', reloadPage);
document.addEventListener('DOMContentLoaded', restoreOptions);
