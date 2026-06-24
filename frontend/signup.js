const signupBtn =
document.getElementById(
    "signupBtn"
);

signupBtn.addEventListener(

    "click",

    async()=>{

        try{

            const username =
            document.getElementById(
                "username"
            ).value;

            const email =
            document.getElementById(
                "email"
            ).value;

            const password =
            document.getElementById(
                "password"
            ).value;

            const response =
            await fetch(

                "http://localhost:3000/api/auth/signup",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"

                    },

                    body:JSON.stringify({

                        username,

                        email,

                        password

                    })

                }

            );

            const data =
            await response.json();

            alert("Account Created Successfully");

window.location.href =
"login.html";

        }

        catch(error){

            console.log(error);

        }

    }

);