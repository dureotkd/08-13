function makeWarning(target, text) {
  target.next().remove();
  target.next().remove();

  target.after('<i class="fa-solid fa-ban warning"></i>');
  target.after(`<span class = "error-text">${text}</span>`);

  target.addClass("warning-input");
}

function removeWarning(target) {
  target.next().remove();
  target.next().remove();
  target.removeClass("warning-input");
}
