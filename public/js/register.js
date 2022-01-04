"use strict";

const EMAIL_ERROR = "email already exists in the system"


function validateRegister1(event) {
    event.preventDefault();
    let testEmail = document.getElementById("email").value.trim();
    fetch(`/usersapi/email/${testEmail}`)
        .then(status)
        .then(json)
        .then(function (response) {
            if (response.user == true){
                //email exists!
                document.getElementById("email").nextElementSibling.innerHTML = EMAIL_ERROR;
                document.getElementById("email").classList.add("is-invalid");
            }
            else {
                document.getElementById("register1").submit();
            }
        })
        .catch(function (error) {
            console.log(REQUEST_FAILED, error);//
        })
}

/**
 * part of the fetch function
 * @param response
 * @returns {Promise<never>|Promise<unknown>}
 */
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

/**
 * part of the fetch function
 * @param response
 * @returns json
 */
function json(response) {
    return response.json()
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("register1").addEventListener("submit", validateRegister1);

}, false);