const loginform = document.querySelector('#login');
const registerform = document.querySelector('#register');

loginform.addEventListener('submit', async (e) => 
{ e.preventDefault();
    // console.log(e.target.elements[0].value);
    // console.log(e.target.elements[1].value);

    // fetch("https://testapi.io/api/rksmrks/resource/Logins", {
    //     method: 'GET',
    //     body: JSON.stringify({
    //         username:username, 
    //         password:password
    //     }),
    //     headers:{
    //         'Content-Type':'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     return data
    // })
    // .catch(err => console.log(err)) 
    fetch("https://testapi.io/api/rksmrks/resource/Logins")
    .then(response => response.json())
    .then(data => {
        // return console.log(data)
        const convert = JSON.stringify(data)
        const tikslas = data.find(item => item.username)

        console.log




        // console.log(convert)
        // console.log(convert.username, convert.password)
    })
    .catch(err => console.log(err))

});

registerform.addEventListener('submit', async (e) => 
{ e.preventDefault();
    console.log(e.target.elements[0].value);
    console.log(e.target.elements[1].value);
    console.log(e.target.elements[2].value);

    const username = e.target.elements[0].value
    const password = e.target.elements[1].value
    const repeatPassword = e.target.elements[2].value

    if(password === repeatPassword) {
        fetch("https://testapi.io/api/rksmrks/resource/Logins", {
            method: 'POST',
            body: JSON.stringify({
                username:username, 
                password:password
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(err => console.log(err)) 
    }


      
});