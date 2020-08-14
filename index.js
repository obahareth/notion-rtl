// We need to know if the notion document is fully loaded in order
// to observe any newly added blocks under notion-content-page element
const NOTION_DOCUMENT_OBSERVER = new MutationObserver(onNotionDocumentLoaded)
NOTION_DOCUMENT_OBSERVER.observe(document, { childList: true, subtree: true })

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

  return false
}

function onNotionPageContentChanged() {
  setBlocksDirectionToAuto()
  alignListItemsToRight()
}

function onNotionDocumentLoaded(mutationsList) {
  for (const { addedNodes } of mutationsList) {
    // (Fragile!!) Currently for faster retieval of the child nodes we assume that there's 
    // only one child in the 0's position for every node, however notion could
    // change the DOM structure in future so this might break.
    if (isNotionPageContentLoaded(addedNodes[0])) {
      NOTION_DOCUMENT_OBSERVER.disconnect()

      // On the first page load make sure that everything is aligned correctly
      setBlocksDirectionToAuto()
      alignListItemsToRight()

      const $notionPageContent = document.getElementsByClassName('notion-page-content')[0]

      const pageContentObserver = new MutationObserver(onNotionPageContentChanged)
      pageContentObserver.observe($notionPageContent, { childList: true, subtree: false })  
    }
  }
}
