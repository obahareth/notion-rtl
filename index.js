
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
    block.setAttribute("dir", "auto")
  })
}

function getTopLevelBlocksWithoutDirAttribute() {
  return document.querySelectorAll('.notion-page-content > div[data-block-id]:not([dir])')
}

function notionPageContentIsLoaded() {
  return (document.querySelector('div.notion-page-content') !== null);
}

const pageLoadInterval = setInterval(() => {
  if (notionPageContentIsLoaded()) {
    setBlocksDirectionToAuto();
    alignListItemsToRight();

    // TODO: If we can find a cleaner way to handle block additions/removals
    // then clear out this interval
    // clearInterval(pageLoadInterval)
  }
}, 200);
