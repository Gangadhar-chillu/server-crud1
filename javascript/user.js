const URL = 'http://localhost:5000'
let users = []

//create logic
const form = document.getElementById('myForm');
const user = document.getElementById('user');
const email = document.getElementById('email');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault() // to avoid page refresh

    let newuser = {
        username : user.value,
        email: email.value
    }
    console.log('newuser =', newuser);
    let extUser = users.find((item) => item.email === newuser.email)
    console.log('extUser =', extUser);
    if(extUser) {
        alert('user already registered');
    } else {
        await fetch(`${URL}/users` , {
            method: 'POST',
            body:JSON.stringify(newuser),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json()).then(out => {
            alert('new user create successfully')
            window.location.reload();
        }).catch(err => console.log(err.message))
    }
});

// to read the data on page load
(function(){
    fetch(`${URL}/users` , {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(res => res.json())
      .then(out => {
        console.log('users =', out);
        users = out
        printData(out)
      }).catch(err => console.log(err.message))
})();

// print the data
function printData(data) {
    data.forEach(item => {
        result.innerHTML +=`<tr>
        <td>${item.id}</td>
        <td>${item.username}</td>
        <td>${item.email}</td>
        <td>
        <a href="update.html?id=${item.id}" class="btn btn-success">Edit</a>
        <button onClick="deleteUser(${item.id})" class="btn btn-warning">Delete</button>
        </td>
        </tr>`
    });
}

// delete user
function deleteUser(id){
    if(window.confirm(`are you sure to delete an id = ${id}?`)){
        fetch(`${URL}/users/${id}` , {
            method:'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(out => out.json())
          .then(res => {
            alert('user deleted successfully')
            window.location.reload()
        }).catch(err => console.log(err.message));
    } else {
        alert('delete terminated');
    }
}