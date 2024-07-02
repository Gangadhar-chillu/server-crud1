const URL = 'http://localhost:5000'
let users = []

// reading id from router parameter
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
});

console.log('params id =', params.id)

const form = document.getElementById('updateForm');
const user = document.getElementById('user');
const email = document.getElementById('email');

(function() {
    fetch(`${URL}/users` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
       .then(out => {
        console.log('users =', out);
        users = out
        // separating single user
        let single = out.find((item) => item.id == params.id)
        console.log('single =', single)
        // update to form inputs
        user.value = single.username;
        email.value = single.email;
       }).catch(err => console.log(err.message))
})();

// update
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const data = {
        id:params.id,
        username:user.value,
        email:email.value
    }
    console.log('update user =', data);
    await fetch(`${URL}/users/${params.id}` , {
        method:'PATCH',
        body:JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(res => res.json()).then(out => {
        alert('user updated successfully')
    }).catch(err => console.log(err.message))
});