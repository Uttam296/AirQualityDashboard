const loginBtn =
document.getElementById(
    "loginBtn"
);

loginBtn.addEventListener(

    "click",

    async()=>{

        try{

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

                "http://localhost:3000/api/auth/login",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"

                    },

                    body:JSON.stringify({

                        email,

                        password

                    })

                }

            );

            const data =
            await response.json();

            localStorage.setItem(

                "token",

                data.token

            );

            localStorage.setItem(

                "userId",

                data.userId

            );

            alert(

                "Login Successful"

            );

            window.location.href =
            "index.html";

        }

        catch(error){

            console.log(error);

        }

    }

);