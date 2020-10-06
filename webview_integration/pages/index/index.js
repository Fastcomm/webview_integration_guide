const app = getApp();

Page({
  onLoad(query) {
    // Page loading
    this.webViewContext = my.createWebViewContext('web-view-1');
  },
  toBrowserMessage() {
    this.webViewContext.postMessage({
      'name': this.name,
      'height': this.height
    });
  },
  fromBrowserMessage(e) {
    console.log(e);
    if (e.detail.type == 'cart') {
      var cost = e.detail.cost;
      console.log("Cart received");
    }
    else if (e.detail.type === 'orderComplete') {
      var confirmation = e.detail.confirmation;
      console.log("Confirmation received");
    }
  },
})