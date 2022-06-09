function setCookie(cookieName, cookieValue, minutes) {
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = `${cookieName}=${cookieValue}${expires}; path=/`;
}

function getCookieValue(cookieName) {
    const user = document.cookie;

    const cookieNameString = cookieName + "="

    const cookieArray = user.split("; ")

    const cookieValue = cookieArray.filter(item => item.includes(cookieNameString))

    if (cookieValue.length) {
        return cookieValue[0].substring(cookieNameString.length, cookieValue[0].length)
    } else {
        return ''
    }
}

function checkUser() {
    let username = getCookieValue("userId");
    let previousPoint = getCookieValue("point");
    if (username != "") {
        let response = prompt(`Welcome again ${username}! You have ${previousPoint} points

Do you want to guess my secret Number?

Enter "yes" to proceed OR "no" to quit

NB: Your Game information expires soon`).toLowerCase()
        while (response != 'no') {
            if (response === 'yes') {
                startGuessGame(username);
                break
            } else if (response === 'no') {
                stop;
            }
            response = prompt(`Invalid response!

Do you want to guess my secret Number?

Enter "yes" to proceed OR "no" to quit`).toLowerCase()
        }
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("userId", username, minutes);
            setCookie("point", point, minutes);
            alert(`${username}, Welcome to my GAME WORLD! You have ${point} points

NB: Your Game information expires after 5mins.`)
            startGuessGame()
        }
    }
}

function secretNumber(min, max) {
    return ((Math.random() * (max - min) + min).toFixed(1))  // returns random number to  1 decimal place
}

function startGuessGame() {
    let userGuess = prompt(`All you need to do is:

TAKE A GUESS BETWEEN 1 and 2 || Enter 'q' to quit

Hint: Your guess should be to 1 decimal place`);

    checkUserGuess(userGuess, mySecretNumber);
}

function checkUserGuess(userGuess, mySecretNumber) {
    while (userGuess != 'q') {
        if (parseFloat(userGuess) == mySecretNumber) {
            moveToNextStage()
            break
        } else if (parseFloat(userGuess) > mySecretNumber) {
            userGuess = prompt(`Your guess is too high, Try again. Take a guess between 1 and ${max} || Enter "q" to quit `)
        } else if (parseFloat(userGuess) < mySecretNumber) {
            userGuess = prompt(`Your guess is too low, Try again. Take a guess between 1 and ${max} || Enter "q" to quit`)
        } else {
            userGuess = prompt(`Invalid response, Take a guess between 1 and ${max}. || Enter "q" to quit `)
        }
    }
}

function moveToNextStage() {
    previousPoint = getCookieValue('point')
    setCookie('point', parseInt(previousPoint) + 5);
    newPoint = parseInt(getCookieValue('point'));
    max = max + 1;
    alert(`Correct!!

Congratulations on to the next stage. You just gained ${newPoint} points!`
    );
    let userGuess = prompt(`Take a guess between 1 and ${max} or Enter "q" to quit`);
    let myNewSecretNumber = secretNumber(min, max);
    console.log(`My New Secret Number = ${myNewSecretNumber}`)
    checkUserGuess(userGuess, myNewSecretNumber);
}

let min = 1;
let max = 2;
let minutes = 5;
let point = 0;

const mySecretNumber = secretNumber(min, max)
console.log(`My Secret Number = ${mySecretNumber}`)

checkUser()