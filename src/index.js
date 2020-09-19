// We need to always know if the notion document is fully loaded in order
// to observe any newly added blocks under notion-content-page element
const MUTATIONS_QUEUE = [];
const NOTION_DOCUMENT_MUTATION = new MutationObserver(onNotionDocumentLoaded);
NOTION_DOCUMENT_MUTATION.observe(document, {childList: true, subtree: true});

// A mutation to observe newest added blocks to notion-content-page element
const NOTION_PAGE_CONTENT_MUTATION = new MutationObserver(() => alignPageContentToRight());

function alignListItemsToRight() {
  const items = getListItems();

  items.forEach((item) => {
    item.style['text-align'] = 'start';
  });
}

function getListItems() {
  return document.querySelectorAll("div[placeholder='List']");
}

function setBlocksDirectionToAuto() {
  const blocks = getTopLevelBlocksWithoutDirAttribute();

  blocks.forEach((block) => {
    block.setAttribute('dir', 'auto');
  });
}

function getTopLevelBlocksWithoutDirAttribute() {
  return document.querySelectorAll('.notion-page-content > div[data-block-id]:not([dir]), [placeholder="Untitled"]:not([dir])');
}

function alignPageContentToRight() {
  setBlocksDirectionToAuto();
  alignListItemsToRight();
}

// === Main entry point

function onNotionDocumentLoaded(mutationsList) {
  if (isMutationQueueEmpty()) requestIdleCallback(idleAlginItemsToRight);
  MUTATIONS_QUEUE.push(mutationsList);
}

// Idle observe changes on notion page then align items, reason we're doing that is we shouldn't
// block any process for the main engine also we don't want to risk the performance when applying
// our styles on large documents.
function idleAlginItemsToRight() {
  for (const mutation of MUTATIONS_QUEUE) {
    for (const {addedNodes} of mutation) {
      if (isNotionPageContentLoaded(addedNodes[0])) {
        alignPageContentToRight();
        
        const $notionPageContent = document.getElementsByClassName('notion-page-content')[0] || undefined;
        if ($notionPageContent) {
          NOTION_PAGE_CONTENT_MUTATION.disconnect();
          NOTION_PAGE_CONTENT_MUTATION.observe($notionPageContent, {childList: true, subtree: false});
        }
      }
    }
  }

  // Clean queue
  MUTATIONS_QUEUE.splice(0, MUTATIONS_QUEUE.length);
}

function isMutationQueueEmpty() {
  return !MUTATIONS_QUEUE.length;
}

function isNotionPageContentLoaded(node) {
  if (typeof node !== 'undefined') {
    return node.className === 'notion-page-content';
  }

  return false;
}
