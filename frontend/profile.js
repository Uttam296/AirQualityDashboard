const token = sessionStorage.getItem("token");

const userId = sessionStorage.getItem("userId");

// If user is not logged in
if (!token || !userId) {

    window.location.href = "login.html";

}

// Load profile information
async function loadProfile() {

    try {

        const response = await fetch(

            `http://localhost:3000/api/profile/${userId}`,

            {

                headers: {

                    "Authorization": token

                }

            }

        );

        const data = await response.json();

        document.getElementById("username").innerText =
        data.username;

        document.getElementById("email").innerText =
        data.email;

        document.getElementById("favorites").innerText =
        data.favorites;

        document.getElementById("searches").innerText =
        data.searches;

    }

    catch (error) {

        console.log(error);

        alert("Unable to load profile.");

    }

}

loadProfile();


// Dashboard button

document.getElementById(

    "dashboardBtn"

).addEventListener(

    "click",

    ()=>{

        window.location.href="index.html";

    }

);


// Logout button

document.getElementById(

    "logoutBtn"

).addEventListener(

    "click",

    ()=>{

        sessionStorage.clear();

        window.location.href="login.html";

    }

);