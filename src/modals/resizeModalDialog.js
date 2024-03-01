/**
 * @name $SP().resizeModalDialog
 * @function
 * @category modals
 * @description Resize a ModalDialog and recenter it
 * @param  {Object} options
 *   @param {Number} width
 *   @param {Number} height
 *   @param {String} [id] The id of the modal to resize, or the last opened dialog will be used
 * @return {Boolean} FALSE if something went wrong
 *
 * @example
 * // to have a form opened faster we define a minimal width and height, and then once it's loaded we want to have the correct size
 * $SP().showModalDialog({
 *   id:"inmodal",
 *   url:url,
 *   width:200,
 *   height:100,
 *   allowMaximize:true,
 *   onurlload:function() {
 *     // resize the frame by checking the size of the loaded page
 *     var iframe=window.top.document.getElementById('sp_frame_inmodal').nextSibling.querySelector('iframe');
 *     // define the max size based on the page size
 *     var size = $SP().getPageSize();
 *     var maxWidth = 2*size.vw.width/3; // 2/3 of the viewport width
 *     var maxHeight = 90*size.vw.height/100 // 90% of the viewport height
 *     // find the size we want based on the modal
 *     var e=$(iframe.contentDocument.getElementById('onetIDListForm')); // this element gives the size of our form from the modal
 *     var width=e.outerWidth(true)+100;
 *     var height=e.outerHeight(true)+iframe.contentDocument.getElementById('ms-designer-ribbon').offsetHeight+100;
 *     if (width>maxWidth) width=maxWidth;
 *     if (height>maxHeight) height=maxHeight;
 *     $SP().resizeModalDialog({id:"inmodal",width:width,height:height});
 *     // bind the iframe resize, to make sure an external event won't resize it to 200x100
 *     $(iframe.contentWindow).on('resize', function() {
 *       var $this=$(this);
 *       if ($this.width() === 200 && $this.height() === 100) { // if it gets the original size, then resize to the new ones
 *         $SP().resizeModalDialog({id:"inmodal",width:width,height:height});
 *       }
 *     })
 *   }
 * });
 */
export default function resizeModalDialog(options) {
  // Find modal element by ID or default to the last modal
  const dlg = this._findModalDialog(options.id);
  if (!dlg) return; // Cannot find the modal

  // Get or set width and height with default values
  const { width = parseInt(dlg.style.width, 10), height = parseInt(dlg.style.height, 10) } = options;

  // Select relevant dialog elements
  const elements = this._getDialogElements(dlg);

  // Calculate delta values for width and height
  const deltaWidth = width - elements.border.offsetWidth;
  const deltaHeight = height - elements.border.offsetHeight;

  // Update individual element styles
  this._updateElementSizes(elements, deltaWidth, deltaHeight);

  // Recenter the modal
  this._centerDialog(dlg);
}

// Helper functions

_findModalDialog(id) {
  const topWindow = window.top;
  if (id) {
    return topWindow.document.getElementById(`sp_frame_${id}`);
  } else if (topWindow._SP_MODALDIALOG.length > 0) {
    return topWindow.document.getElementById(`sp_frame_${topWindow._SP_MODALDIALOG[topWindow._SP_MODALDIALOG.length - 1].id.replace(/sp_frame_/, "")}`);
  }
  return null;
}

_getDialogElements(dlg) {
  return {
    border: dlg.querySelector('.ms-dlgBorder'),
    titleText: dlg.querySelector('.ms-dlgTitleText'),
    content: dlg,
    frame: dlg.querySelector('.ms-dlgFrame'),
  };
}

_updateElementSizes(elements, deltaWidth, deltaHeight) {
  for (const key in elements) {
    if (elements.hasOwnProperty(key)) {
      elements[key].style.width = `${elements[key].offsetWidth + deltaWidth}px`;
      if (key !== "titleText") {
        elements[key].style.height = `${elements[key].offsetHeight + deltaHeight}px`;
      }
    }
  }
}

_centerDialog(dlg) {
  const pageSize = this.getPageSize(window.top);
  dlg.style.top = `${(pageSize.vw.height / 2) - (dlg.offsetHeight / 2)}px`;
  dlg.style.left = `${(pageSize.vw.width / 2) - (dlg.offsetWidth / 2)}px`;
}
