import ext from "./utils/ext";
import { t } from "./utils/lang";

ext.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.action === "perform-save") {
      console.log("Extension Type: ", "/* @echo extension */");
      console.log("PERFORM AJAX", request.data);

      sendResponse({ action: "saved" });
    }
  }
);

function down(url, name) {
  chrome.downloads.download({url: url, filename: name + '.crx'},
    function(id) {
      console.log(id);
    });
}

function downloader(params) {
  const url = params.pageUrl
  const reg = url.match(/https:\/\/chrome\.google\.com\/webstore\/detail\/([^\/]+)\/([^\?]+).*/)
  if (reg && reg.length === 3) {
    const name = reg[1].replace(/-/g, '_')
    const id = reg[2]
    var chromeVersion = /Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1];
    var downurl = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=${chromeVersion}&acceptformat=crx3&x=id%3D${id}%26installsource%3Dondemand%26uc`
    //var downurl = `https://chrome.google.com/webstore/download/${id}/package/main/crx/3`
    // window.open(`https://chrome.google.com/webstore/download/${id}/package/main/crx/3`)
    down(downurl, name)
  }
}

chrome.contextMenus.create({
  title: t("downloadFile"),
  onclick: downloader,
  "documentUrlPatterns": ["*://chrome.google.com/webstore/detail/*"]
});