// We need to always know if the notion document is fully loaded in order
// to observe any newly added blocks under notion-content-page element
const MUTATIONS_QUEUE = []
const NOTION_DOCUMENT_MUTATION = new MutationObserver(onNotionDocumentLoaded)
NOTION_DOCUMENT_MUTATION.observe(document, {childList: true, subtree: true})

// A mutation to observe newest added blocks to notion-content-page element
const NOTION_PAGE_CONTENT_MUTATION = new MutationObserver(() => alignPageContentToRight())

// Used for detecting if the Notion page is loaded
const ROOT_LEVEL_CLASS_NAMES = ["notion-page-content", "notion-table-view", "notion-board-view", "notion-gallery-view"]

function alignListItemsToRight() {
  const items = getListItems()

  if (!items.length) return null;

  items.forEach((item) => {
    item.style["text-align"] = "start"
  })
}

function getListItems() {
  return document.querySelectorAll(
    `div[placeholder="List"],
    div[placeholder = "To-do"],
    div[placeholder = "Toggle"]`
  )
}

function setBlocksDirectionToAuto() {
  const blocks = getTopLevelBlocksWithoutDirAttribute()

  if (!blocks.length) return null;

  blocks.forEach((block) => {
    block.setAttribute("dir", "auto")
  })
}

function getTopLevelBlocksWithoutDirAttribute() {
  return document.querySelectorAll(
    `.notion-page-content > div[data-block-id]:not([dir]):not(.notion-column_list-block):not(.notion-collection_view_page-block),
    [placeholder="Untitled"]:not([dir]),
    .notion-column-block > div[data-block-id]:not([dir]),
    notion-collection_view-block:not([dir]),
    .notion-table-view:not([dir]),
    .notion-board-view:not([dir]),
    .notion-gallery-view:not([dir])`
  )
}

function alignPageContentToRight() {
  setBlocksDirectionToAuto()
  alignListItemsToRight()
}

// === Main entry point

function onNotionDocumentLoaded(mutationsList) {
  if (isMutationQueueEmpty()) requestIdleCallback(idleAlginItemsToRight)
  MUTATIONS_QUEUE.push(mutationsList)
}

function getNotionPageElem(node) {
  if (typeof node !== 'object') return null
  if (!(node instanceof HTMLElement)) return null

  let $notionPageElem
  for (const rootLevelClassName of ROOT_LEVEL_CLASS_NAMES) {
    $notionPageElem = node.getElementsByClassName(rootLevelClassName)
    
    if ($notionPageElem) {
      break
    }
  }

  return $notionPageElem ? $notionPageElem[0] : null
}

function idleAlginItemsToRight() {
  for (const mutation of MUTATIONS_QUEUE) {
    for (const {addedNodes} of mutation) {
      if (typeof addedNodes[0] !== "undefined") {
        const $notionPageElem = getNotionPageElem(addedNodes[0])

        if ($notionPageElem) {
          alignPageContentToRight()

          NOTION_PAGE_CONTENT_MUTATION.disconnect()
          NOTION_PAGE_CONTENT_MUTATION.observe($notionPageElem, {childList: true, subtree: false})
        }
      }
    }
  }

  // Clean queue
  MUTATIONS_QUEUE.splice(0, MUTATIONS_QUEUE.length)
}

function isMutationQueueEmpty() {
  return !MUTATIONS_QUEUE.length
}
