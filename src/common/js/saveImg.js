


// 导出图片
export const saveImg = (canvas, fileName) => {
    if (canvas.msToBlob) {
      // IE 9+
      let blob = canvas.msToBlob();
      window.navigator.msToBlob(blob, fileName);
    } else {
      // firefox, chrome
      let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
      save_link.href = canvas.toDataURL("image/png");
      save_link.download = fileName;
      let event = document.createEvent("MouseEvents");
      event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      save_link.dispatchEvent(event);
    }
}