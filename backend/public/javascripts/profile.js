
const generalButton = document.getElementById('generalButton')
const installationButton = document.getElementById('installationButton')

generalButton.addEventListener('click', (e) => {
    e.preventDefault()

    const form = document.getElementById('formGeneral')
    const inputs = form.querySelectorAll('input')

    const inputName = inputs[0].value
    const inputFirstName = inputs[1].value
    const inputAddress = inputs[3].value
    const inputZipCode = inputs[4].value
    const inputCity = inputs[5].value
    const inputCountry = inputs[6].value
    const inputPhone = inputs[7].value

    const dataProfileGeneral = {
        "general": {
            "name": inputName,
            "firstname": inputFirstName,
            "address": inputAddress,
            "zipcode": inputZipCode,
            "city": inputCity,
            "country": inputCountry,
            "phone": inputPhone
        }
    }

    const parameters = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataProfileGeneral),
    };

    fetch('profile/general', parameters)
        .then(res => {
            if (res.ok) {
                console.log('Data updated !')
                localStorage.setItem('successMessage', 'Profile general updated successfuly')
                location.reload()
            } else {
                console.log('Problem with updated process')
                toastr.error('Error update profile')
                throw Error(res.status)
            }
        })
        .catch((error) => {
            console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
        });
})

installationButton.addEventListener('click', (e) => {
    e.preventDefault()

    const form = document.getElementById('formInstallation')
    const inputs = form.querySelectorAll('input')

    const tankLength = inputs[0].value
    const tankWidth = inputs[1].value
    const tankDepth = inputs[2].value
    const bioFilterLength = inputs[3].value
    const bioFilterWidth = inputs[4].value
    const bioFilterDepth = inputs[5].value
    const waterPump = inputs[6].value
    const pressureFilter = inputs[7].value
    const airPump = inputs[8].value

    const dataProfileInstallation = {
        "installation": {
            "tank": {
                "tankLength": tankLength,
                "tankWidth": tankWidth,
                "tankDepth": tankDepth
            },
            "bioFilter": {
                "bioFilterLength": bioFilterLength,
                "bioFilterWidth": bioFilterWidth,
                "bioFilterDepth": bioFilterDepth
            },
            "material": {
                "waterPump": waterPump,
                "pressureFilter": pressureFilter,
                "airPump": airPump
            }
        }
    }
console.log(dataProfileInstallation)
    const parameters = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataProfileInstallation),
    };

    fetch('profile/installation', parameters)
        .then(res => {
            console.log(res)
            if (res.ok) {
                console.log('Data updated !')
                localStorage.setItem('successMessage', 'Profile updated successfuly')
                location.reload()
            } else {
                console.log('Problem with updated process')
                toastr.error('Error update profile')
                throw Error(res.status)
            }
        })
        .catch((error) => {
            console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
        });
})


window.onload = () => {
    const successMessage = localStorage.getItem('successMessage')
    if (successMessage) {
        toastr.success(successMessage)
        localStorage.removeItem('successMessage')
    }
}