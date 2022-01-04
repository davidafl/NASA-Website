"use strict";

const LENGTH_ERROR = "password length must be at least 8 characters"
const MATCH_ERROR = "passwords must match"

function validateInputLength8(element, errorMsg) {
    if (element.value.trim().length < 8) {
        element.nextElementSibling.innerHTML = errorMsg;
        element.classList.add("is-invalid")
        return false;
    }
    return true;
}

function validateRegister2(event) {
    let isValid = true;
    let pass1 = document.getElementById("password");
    let pass2 = document.getElementById("password2");

    let v1 = validateInputLength8(pass1, LENGTH_ERROR);
    let v2 = validateInputLength8(pass2, LENGTH_ERROR);

    isValid = v1 && v2;

    if (isValid){
        if (pass1.value.trim() !== pass2.value.trim()){
            isValid = false;
            pass1.nextElementSibling.innerHTML = MATCH_ERROR;
            pass2.nextElementSibling.innerHTML = MATCH_ERROR;
            pass1.classList.add("is-invalid");
            pass2.classList.add("is-invalid");
        }
    }
    if (!isValid) {
        event.preventDefault();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("register2").addEventListener("submit", validateRegister2);

}, false);


