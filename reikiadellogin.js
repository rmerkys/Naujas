const form = document.querySelector('form');
form.addEventListener('submit', async (e) => 
{ e.preventDefault();
    //if register    
    console.log(e.target.elements[0].value);
    console.log(e.target.elements[1].value);
    console.log(e.target.elements[2].value); 
    //check if both passwords match    
    //if yes then send it to backend with POST method    
    //and move person to login screen    
    //there input email and password    
    //after login fetch all users already created and check if data was correct    
    //if correct move user to blog screen and add his email to localStorage    
    //after every blog created add email to request with the blog body    
    //and save it in the database    
    //and get all the blogs from the database and display them on the screen    
    const users = await fetch('https://testapi.io/api/converse/resource/users');
    const usersJson = await users.json(); 
    localStorage.setItem('identification', e.target.elements[0].value);
});