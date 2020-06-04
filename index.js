function getTopLevelBlocksWithoutDirAttribute() {
  return document.querySelectorAll('.notion-page-content > div[data-block-id]:not([dir])')
}

function setBlocksDirectionToAuto() {
  let blocks = getTopLevelBlocksWithoutDirAttribute()

  blocks.forEach((block) => {
    block.setAttribute("dir", "auto")
  })
}

function notionPageContentIsLoaded() {
  if (document.querySelector('div.notion-page-content') !== null) {
    return true
  }

  return false
}

chrome.storage.sync.get('mode', function (items) {
  if (items.mode === 'enabled') {
    let pageLoadInterval = setInterval(() => {
      if (notionPageContentIsLoaded()) {
        setBlocksDirectionToAuto()
    
        // TODO: If we can find a cleaner way to handle block additions/removals
        // then clear out this interval
        // clearInterval(pageLoadInterval)  
      }
    }, 200)
  }
});
