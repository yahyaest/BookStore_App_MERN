const loginDiv = document.querySelector("#login");
const loginButton = document.querySelector("#login-button");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

const authUrl = document.querySelector("#login-button").className;

loginButton.addEventListener("click", () => {
  fetch(`${authUrl}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value,
    }),
  })
    .then((res) => {
      if (res.status === 400) {
        res.text().then((data) => alert(data));
        if (
          document
            .getElementById("login")
            .contains(document.getElementById("token_display"))
        ) {
          loginDiv.removeChild(loginDiv.lastChild);
        }
      } else {
        res.text().then((data) => {
          const token = data;
          const tokenDisplay = document.createElement("div");
          const tokenDisplayLabel = document.createElement("label");
          const tokenDisplayText = document.createElement("textarea");

          tokenDisplay.id = "token_display";
          tokenDisplayLabel.id = "token_label";
          tokenDisplayText.id = "token_text";

          if (
            document
              .getElementById("login")
              .contains(document.getElementById("token_display"))
          ) {
            loginDiv.removeChild(loginDiv.lastChild);
          }

          tokenDisplayLabel.innerText = "Token : ";

          tokenDisplayText.cols = 80;
          tokenDisplayText.rows = 4;
          tokenDisplayText.innerText = token;

          tokenDisplay.appendChild(tokenDisplayLabel);
          tokenDisplay.appendChild(tokenDisplayText);

          loginDiv.appendChild(tokenDisplay);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
