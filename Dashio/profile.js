

fetch('http://192.168.1.15:3000/profile.html')
        .then ()
        
        .catch((error) => {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        })
