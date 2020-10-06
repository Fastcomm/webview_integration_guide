const app = getApp();

Page({
  onLoad(query) {
    // Page loading
    this.webViewContext = my.createWebViewContext('web-view-1');
  },
  onReady(){

    this.toBrowserMessage();
  },
  onTitleClick() {

    this.toBrowserMessage();
  },
  toBrowserMessage() {
    this.webViewContext.postMessage({
      'name': "name",
      'isfromMiniApp': "true"
    });
  },
  fromBrowserMessage(e) {
    console.log(e);
    if (e.detail.type == 'cart') {
      var cost = e.detail.cost;
      console.log("Cart received with cost " + cost);
    }
    else if (e.detail.type === 'orderComplete') {
      var cost = e.detail.cost;
      console.log("Confirmation received with payment of " + cost);
    }
  },
})