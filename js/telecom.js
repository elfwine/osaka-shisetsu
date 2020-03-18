// For iOS Caret bug
(function iOS_CaretBug() {
  var ua = navigator.userAgent,
    scrollTopPosition,
    iOS = /iPad|iPhone|iPod/.test(ua),
    iOS11 = /OS 11_0|OS 11_1|OS 11_2/.test(ua);

    // ios 11 bug caret position
    if (iOS && iOS11) {
      $(document.body).on('show.bs.modal', function (e) {
        if ($(e.target).hasClass('inputModal')) {
          // Get scroll position before moving top
          scrollTopPosition = $(document).scrollTop();

          // Add CSS to body "position: fixed"
          $("body").addClass("iosBugFixCaret");
        }
      });

      $(document.body).on('hide.bs.modal', function (e) {
        if ($(e.target).hasClass('inputModal')) {
          // Remove CSS to body "position: fixed"
          $("body").removeClass("iosBugFixCaret");

          //Go back to initial position in document
          $(document).scrollTop(scrollTopPosition);
        }
      });
    }
})();
// Custom Javascript here!
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(prefix) {
        return this.slice(0, prefix.length) == prefix;
    };
}