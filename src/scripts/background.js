import ext from "./utils/ext";

ext.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.action === "perform-save") {
      console.log("Extension Type: ", "/* @echo extension */");
      console.log("PERFORM AJAX", request.data);

      sendResponse({ action: "saved" });
    }
  }
);

function downloader(params) {
  const url = params.pageUrl
  const reg = url.match(/https:\/\/chrome\.google\.com\/webstore\/detail\/[^\/]+\/([^\?]+)\?/)
  if (reg && reg.length === 2) {
    const id = reg[1]
    window.open(`https://chrome.google.com/webstore/download/${id}/package/main/crx/3`)
  }
}

chrome.contextMenus.create({
  title: "下載crx文件",
  onclick: downloader,
  "documentUrlPatterns": ["*://chrome.google.com/webstore/detail/*"]
});