function sendOrderCompleteMessageToMiniApp() {
  console.log("sendOrderCompleteMessageToMiniApp triggered");
  my.postMessage({
    type: "orderComplete",
    cost: "5",
  });
}

function sendCartMessageToMiniApp() {
  console.log("sendCartMessageToMiniApp triggered");
  my.postMessage({
    type: "cart",
    cost: "5",
  });
}

// Did receive message from Mini Program.
if (typeof my !== "undefined") {
  my.onMessage = function (e) {
    console.log(e);
    my.postMessage({
      type: "alert",
      event: e,
    });
  };
}
