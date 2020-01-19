const username = document.getElementById("username");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
    e.preventDefault();
    let userLogedIn = false;
    users.forEach((user) => {
        if (user.name == username.value && user.password == password.value) {
            document.location = "game.html";
            userLogedIn = true;
            setCookie("username", username.value);
        }
    })
    if (!userLogedIn) {
        let display = document.getElementsByClassName("d-none")[0];
        display.className = "d-block";
        setTimeout(() => {
            display.className = "d-none";
        }, 3000);
    }

    function setCookie(cname, cvalue) {
        document.cookie = cname + "=" + cvalue;
    }

})