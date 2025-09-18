function changeText() {
  const text = document.querySelector("body > div");
  const oldText = text.textContent;
  text.textContent = "Congrats! You clicked the button!";
  setTimeout(() => {
    text.textContent = oldText;
  }, 2500);
}
