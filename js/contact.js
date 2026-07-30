const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const button = form.querySelector(".contact-btn");

    const originalText = button.innerHTML;

    button.disabled = true;
    button.innerHTML = "Sending...";

    emailjs
      .sendForm(
        "service_izabk9u",
        "template_mu34mrp",
        form
      )
      .then(() => {
        button.innerHTML = "Message Sent ✓";

        form.reset();

        setTimeout(() => {
          button.disabled = false;
          button.innerHTML = originalText;
        }, 2500);
      })
      .catch((error) => {
    console.error("EmailJS Error:", error);

    alert(
        `Status: ${error.status}\n\nText: ${error.text}`
    );

    button.disabled = false;
    button.innerHTML = originalText;
});
  });
}