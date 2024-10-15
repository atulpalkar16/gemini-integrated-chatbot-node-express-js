"use strict";

const message = document.querySelector(".message");
const sendBtn = document.querySelector(".send-btn");
const userInput = document.getElementById("user-input");

// <---------------------------------------------------------------------------->
// renders the data from api
const renderInfo = async function () {
  try {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: userInput.value }),
    });

    if (!res.ok) throw new Error("Failed to get response");

    const data = await res.json();

    const userHtml = `<p class="request">${userInput.value}</p>`;
    const formattedText = data.candidates[0].content.parts[0].text.replace(
      /\n/g,
      "<br>"
    );
    const html = `<p class="response">${formattedText}</p>`;

    message.insertAdjacentHTML("beforeend", userHtml);
    message.insertAdjacentHTML("beforeend", html);
    userInput.value = "";
  } catch (error) {
    console.error(error);
  }
};

sendBtn.addEventListener("click", renderInfo);

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    renderInfo();
  }
});
