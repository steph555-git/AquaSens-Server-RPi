

function analyse() {

    fetch('http://192.168.1.15:3000/api/sensors')
        .then((response) => {
            response.json()
                .then((data) => {
                    console.log("Donnée capteurs (JSON) : ", data)
                    // RESET DU TABLEAU
                    tblBody = document.getElementById('tabBody')
                    tblBody.innerHTML = ""
                    //------------------Integration des données des capteurs dans tableau HTML
                    tbl = document.getElementById('tabAnalyse')
                    tblBody = document.getElementById('tabBody')

                    // creating all cells
                    for (var i = 0; i < data.length; i++) {
                        // creates une ligne de tableau
                        var row = document.createElement("tr");

                        let objCapteur = data[i]

                        //transformation objet en tableau
                        //var tableau = Object.keys(resul).map(function (cle) {
                        //    return [(cle), resul[cle]]
                        //})

                        var cell = document.createElement("td")
                        var cellDate = document.createTextNode(objCapteur.date)
                        cell.appendChild(cellDate)
                        row.appendChild(cell)
                        var cell = document.createElement("td")
                        var cellId = document.createTextNode(objCapteur.id)
                        cell.appendChild(cellId)
                        row.appendChild(cell)
                        var cell = document.createElement("td")
                        var cellName = document.createTextNode(objCapteur.name)
                        cell.appendChild(cellName)
                        row.appendChild(cell)
                        var cell = document.createElement("td")
                        var cellDesciption = document.createTextNode(objCapteur.description)
                        cell.appendChild(cellDesciption)
                        row.appendChild(cell)

                        // Ajout de la cellule "status" et "bouton d'edition"
                        var cell = document.createElement("td")
                        var cellStatus = document.createTextNode("")
                        cell.appendChild(cellStatus)
                        row.appendChild(cell)
                        var cell = document.createElement("td")
                        var cellButton = document.createTextNode("")
                        cell.appendChild(cellButton)
                        row.appendChild(cell)

                        // add the row to the end of the table body
                        tblBody.appendChild(row)
                    }
                    // Insertion du tag de status et du bouton d'edition
                    var arrayLignes = document.getElementById("tabAnalyse").rows // recup des lignes
                    console.log(arrayLignes)
                    for (var k = 1; k <= arrayLignes.length; k++) {
                        var arrayColonnes = arrayLignes[k].cells
                        // recup de la cellule de la bonne ligne
                    arrayColonnes[4].innerHTML =  '<span class="label label-danger label-mini">Non enregistré</span>'
                    arrayColonnes[5].innerHTML = '<button class="btn btn-primary btn-xs" data-toggle="modal" data-target="#myModal"><i class="fa fa-pencil"></i></button>'
                    }
                    
                })
        })

        .catch(function (error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        })
}