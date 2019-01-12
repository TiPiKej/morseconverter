"use strict";

(async () => {
  console.log("js loaded");

  const root = document.querySelector("#root");
  const input = root.children[0];
  const sound = root.children[1];
  const out = root.children[2];

  const legend = await fetch("./js/legend.json").then(res => res.json());
  let morseCode = [];

  const typeChar = () => {
    morseCode = [];

    Array.from(input.value).forEach(letter => {
      morseCode.push(legend[letter.toLocaleLowerCase()]);
    });

    out.innerText = morseCode.join(" ");

    input.className = morseCode.length !== 0 ? "filled" : "";
  };

  typeChar();
  input.addEventListener("input", typeChar);

  const playSound = () => {
    console.log("play sound");
  };

  sound.addEventListener("click", playSound);
})();
