const handelSignup = async () => {
    // read all the form information
    const formValue = {
        email: document.getElementById('emailId').value,
        password: document.getElementById('passId').value,
    }

    // validate user input
    const formDataValidated = validateSignup(formValue)

    if(formDataValidated) {
        // make a request call to our server to save user information
        const response = await fetch('/signup', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: formValue.password,
                email: formValue.email,
            }) 
        });
        console.log(response)
        if(response.status !== 200) {
            const responseBody = await response.json()
            console.log(responseBody)
            showError(responseBody.error)
        }  else {
            window.location = '/'
        }
    }
}

const validateSignup = (formValue) => {
    // confirm nothings empty
    if( (!formValue.email || formValue.email === "") ) {
        showError('Please provide an email')
        return false;
    }

    if( (!formValue.password || formValue.password === "")) {
        showError('Please provide a password')
        return false;
    }

    // confirm email
    if(!formValue.email.includes('@')){
        showError('Please provide a valid email')
        return false;
    }

    return true;
}


const showError = (errorMessage) => {
    const body = document.getElementsByTagName('body')[0]
    const randomNumber = Math.random()
    const id = `toast-${randomNumber}`
    body.insertAdjacentHTML('beforeend', `    
    <div id="${id}" class="toast errorToast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                ${errorMessage}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                aria-label="Close" onClick="closeError('${id}')"></button>
        </div>
    </div>`)
}

const closeError = (id) => {
    const toast = document.getElementById(id)
    console.log(toast)
    toast.style.display = 'none'
}

const signupButton = document.getElementById("signupBtn")
signupButton.addEventListener('click', handelSignup)