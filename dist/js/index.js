"use strict";

(async () => {
  console.log("js loaded");

  const root = document.querySelector("#root");
  const input = root.children[0];
  const sound = root.children[1].children[0];
  const screen = root.children[1].children[1];
  const out = root.children[2];

  const legend = await fetch("./js/legend.json").then(res => res.json());
  let morseCode = [];
  let playing = false;

  const typeChar = () => {
    morseCode = [];

    Array.from(input.value).forEach(letter => {
      Array.from(legend[letter.toLocaleLowerCase()]).forEach(signal => {
        morseCode.push(signal);
      });
      morseCode.push("PAUSE");
    });

    out.innerText = Array(
      String(morseCode.join("")).replace(/PAUSE/g, " ")
    ).join(" ");

    input.className = morseCode.length !== 0 ? "filled" : "";
  };

  typeChar();
  input.addEventListener("input", typeChar);
  input.addEventListener("keydown", ({ key }) => {
    if (key === "Enter") return playSound();
  });

  const playSound = () => {
    const playSignal = (i = 0) => {
      let signalBreak = 500;
      let sound;
      // console.log(morseCode[i]);

      switch (morseCode[i]) {
        case ".":
          sound = new Audio("./../sounds/short.mp3");
          sound.play();
          signalBreak = 170;
          break;
        case "-":
          sound = new Audio("./../sounds/long.mp3");
          sound.play();
          signalBreak = 430;
          break;
      }

      if (morseCode.length <= ++i) return (playing = false);
      setTimeout(() => playSignal(i), signalBreak);
    };

    if (!playing) {
      playSignal();
      playing = true;
    }
  };

  sound.addEventListener("click", playSound);
})();
