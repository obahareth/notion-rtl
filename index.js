const OBSERVER_CONFIG = { childList: true, subtree: true }

// We need to know if the notion document is fully loaded in order
// to observe any newly added blocks under notion-content-page element
const NOTION_DOCUMENT_OBSERVER = new MutationObserver(onNotionDocumentLoaded)
NOTION_DOCUMENT_OBSERVER.observe(document, OBSERVER_CONFIG)

function alignListItemsToRight() {
  const items = getListItems()

  items.forEach((item) => {
    item.style['text-align'] = 'start'
  })
}

function getListItems() {
  return document.querySelectorAll("div[placeholder='List']")
}

function setBlocksDirectionToAuto() {
  const blocks = getTopLevelBlocksWithoutDirAttribute()

  blocks.forEach((block) => {
    block.setAttribute("dir", "auto")
  })
}

function getTopLevelBlocksWithoutDirAttribute() {
  return document.querySelectorAll('.notion-page-content > div[data-block-id]:not([dir])')
}

function isNotionPageContentLoaded(node) {
  if (typeof node !== "undefined") {
    return node.className === 'notion-page-content'
  }

  return false;
}

function onNotionPageContentChanged() {
  setBlocksDirectionToAuto()
  alignListItemsToRight()
}

function onNotionDocumentLoaded(mutationsList) {
  for (const mutation of mutationsList) {
    if (isNotionPageContentLoaded(mutation.addedNodes[0])) {
      NOTION_DOCUMENT_OBSERVER.disconnect()

      const $notionPageContent = document.querySelector(`.notion-page-content`)

      const pageContentObserver = new MutationObserver(onNotionPageContentChanged)
      pageContentObserver.observe($notionPageContent, OBSERVER_CONFIG)
    }
  }
}
