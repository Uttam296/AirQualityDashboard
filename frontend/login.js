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
            console.log(data);

sessionStorage.setItem("token", data.token);
sessionStorage.setItem("userId", data.userId);

console.log("Stored Token:", sessionStorage.getItem("token"));
console.log("Stored UserId:", sessionStorage.getItem("userId"));

            sessionStorage.setItem(

                "token",

                data.token

            );

            sessionStorage.setItem(

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