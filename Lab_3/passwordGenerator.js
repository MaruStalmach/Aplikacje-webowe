// Get elements outside the event listener
const input1 = document.getElementById("minLength");
const input2 = document.getElementById("maxLength");
const button = document.getElementById("button");

button.addEventListener("click", (event) => {
    // Prevent form submission
    event.preventDefault();

    const minLength = parseInt(input1.value);
    const maxLength = parseInt(input2.value);
    const hasCapital = document.getElementById("capital").checked;
    const hasSpecialChar = document.getElementById("specialChar").checked;

    const generatedPassword = generatePassword(minLength, maxLength, hasCapital, hasSpecialChar);
    console.log("Wygenerowane hasło:", generatedPassword);
});

function generatePassword(min, max, hasCapital, hasSpecialChar) {
    const lowercaseAlphabet = "abcdefghijklmnopqrstuvwxyz";
    const capitalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialCharacters = "!@#$%^&*(){}<>?";

    //range hasla
    let length = Math.floor(Math.random() * (max - min + 1)) + min;

  
    let usedCharacters = lowercaseAlphabet;
    if (hasCapital === true) {
        usedCharacters += capitalAlphabet;
    }

    if (hasSpecialChar === true) {
        usedCharacters += specialCharacters;
    }

 
    usedCharacters = usedCharacters.split("");

    
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomCharacter = Math.floor(Math.random() * usedCharacters.length);
        password += usedCharacters[randomCharacter];
    }

    return password;  // Return the generated password
}
