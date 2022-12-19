
fetch('http://192.168.1.15:3000/profile.html')
.then (response => response.json())


.catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
})



function analyse() {

    tbl = document.getElementById('tabAnalyse')
    tblBody = document.getElementById('tabAnalyse')

    // creating all cells
    for (var i = 0; i < 2; i++) {
        // creates an ligne de tableau
        var row = document.createElement("tr");

        for (var j = 0; j < 6; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            var cellText = document.createTextNode("cell in row " + i + ", column " + j);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }
}