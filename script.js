function generatePassword() {
    const uppercase = document.getElementById("uppercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;
    const length = document.getElementById("length").value;

    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}<>?/";

    let allChars = lowerChars;

    if (uppercase) allChars += upperChars;
    if (numbers) allChars += numberChars;
    if (symbols) allChars += symbolChars;

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    document.getElementById("password").value = password;
    updateStrength(password);
}

function copyPassword() {
    const passwordField = document.getElementById("password");
    passwordField.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
}

function updateStrength(password) {
    const strengthBar = document.querySelector(".strength-bar");
    if (!strengthBar) {
        const strengthDiv = document.getElementById("strength");
        strengthDiv.innerHTML = '<div class="strength-bar"></div>';
    }
    const bar = document.querySelector(".strength-bar");

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const percentage = (strength / 4) * 100;
    bar.style.width = percentage + "%";

    if (strength <= 1) bar.style.background = "red";
    else if (strength <= 2) bar.style.background = "orange";
    else if (strength <= 3) bar.style.background = "yellow";
    else bar.style.background = "green";
}