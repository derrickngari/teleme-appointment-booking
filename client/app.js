document.getElementById('registration-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const dob = document.getElementById('dob').value
    const phone = document.getElementById('phone').value
    const gender = document.querySelector('input[name="gender"]:checked')?.value
    const address = document.getElementById('address').value

    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname, lastname, email, password, dob, phone, gender, address }) 
    })

    const data = await response.json()

    if(response.ok) {
        alert("Patient registration successful")
    } else{
        alert(data.message)
    }
})

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const response = await fetch('auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if(response.ok){
        alert("Login successful")
    } else{
        alert(data.message)
    }
})