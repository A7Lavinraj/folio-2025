import App from "@scripts/app";

window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loader").classList.add("hidden");

    setTimeout(() => {
      document.querySelector(".main").classList.add("visible");
    }, 500);
  }, 3500);

  new App();
});
