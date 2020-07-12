
function alignListItemsToRight() {
  const items = getListItems();

  items.forEach((item) => {
    if (isRTL(item.innerText)) {
      item.style['text-align'] = 'right';
    }
  });
}

function getListItems() {
  return document.querySelectorAll("div[placeholder='List']");
}

function isRTL(s){
  const ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
  const rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
  const rtlDirCheck = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');

  return rtlDirCheck.test(s);
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
