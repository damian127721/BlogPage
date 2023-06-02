const signButton = document.querySelector(".header__signup__button")
const logForm = document.getElementById("register-form")
const logFormCross = document.querySelector(".register-form__cross") 

signButton.addEventListener("click", function() {
    logForm.style.display = "block"
})

logFormCross.addEventListener("click", function() {
    logForm.style.display = "none"
})