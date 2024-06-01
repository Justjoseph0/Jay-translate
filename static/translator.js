const urlGet =
  "https://deep-translate1.p.rapidapi.com/language/translate/v2/languages";
const urlOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "30f797183emshad18b62b54b344dp1854d3jsn5a67c4ebc9f2",
    "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
  },
};
fetch(urlGet, urlOptions)
  .then((res) => res.json())
  .then((data) => {
    let selectedLang = document.getElementById("selectedLang");
    let selectTargetLang = document.getElementById("selectTargetLang");

    let apiLanguages = data.languages;
    apiLanguages.forEach((element) => {
      let option = document.createElement("option");
      option.textContent = element.name;
      option.value = element.language;

      selectedLang.appendChild(option);

      let targetOption = document.createElement("option");
      targetOption.textContent = element.name;
      targetOption.value = element.language;
      selectTargetLang.appendChild(targetOption);
    });
  })
  .catch((error) => console.log("fetch error", error));

  

let translateBtn = document.getElementById("translateBtn");

translateBtn.addEventListener("click", () => {
  const inputText = document.getElementById("inputText").value;
  const selectedLang = document.getElementById("selectedLang");
  let langValue = selectedLang.value;

  const selectTargetLang = document.getElementById("selectTargetLang");
  let targetLangValue = selectTargetLang.value;

  if (!inputText) {
    alert("Please enter a word to be translated!");
  } else if (!langValue || !targetLangValue) {
    alert("Please select both source and target languages!");
    return;
  }
  const urlDetect =
    "https://deep-translate1.p.rapidapi.com/language/translate/v2";
  const optionsDetect = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "30f797183emshad18b62b54b344dp1854d3jsn5a67c4ebc9f2",
      "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
    },
    body: JSON.stringify({
      q: inputText,
      source: langValue,
      target: targetLangValue,
    }),
  };

  fetch(urlDetect, optionsDetect)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .then((data) => {
      const translateTo = document.querySelector(".translateTo");
      translateTo.textContent = `${data.data.translations.translatedText}`;
    })
    .catch((error) => console.log("fetch error", error));
});
const iconContainer = document.querySelector(".icon-container");
const selectnone = document.querySelector(".none");
const selectshow = document.querySelector(".show");

let isShowing;
iconContainer.addEventListener("click", function () {
  isShowing = !isShowing;
  if (isShowing) {
    selectnone.style.display = "none";
    selectshow.style.display = "block";
  } else {
    selectnone.style.display = "block";
    selectshow.style.display = "none";
  }
  const selectedLang = document.getElementById("selectedLang");
  const selectTargetLang = document.getElementById("selectTargetLang");

  const temp = selectedLang.value;
  selectedLang.value = selectTargetLang.value;
  selectTargetLang.value = temp;
});
