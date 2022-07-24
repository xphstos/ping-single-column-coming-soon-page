import { object, string } from "yup";
import debounce from "lodash/debounce";

const form = document.querySelector(".form");
const emailInput = form.querySelector(".form__input");
const submitButton = form.querySelector(".form__submit");
const formMessage = form.querySelector(".form__message");
const formErrorMessage = form.querySelector(".form__label-error");
const formSchema = object().shape({
  email: string()
    .email("Please provide a valid email address")
    .required("This field is required"),
});

// Validate the form data after submition
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    await formSchema.validate({
      email: formData.get("email"),
    });
    form.classList.add("success");
    formMessage.textContent = "Thank you! You'll get notified soon!";
  } catch ({ message }) {
    form.classList.add("has-errors");
    formErrorMessage.textContent = message;
  }
});
