window.onload = function () {
    hamtaMappar();
}

function hamtaMappar() {
    fetch('getChaptersAndContents.php')
            .then(response => {
                if (!response.ok) {
                    throw response.json();
                }
                return response.json();
            })
            .then(data => {
                for (mapp in data.kapitel) {
                    skapaArtikel(data.kapitel[mapp]);
                }
            })
            .catch(err => {
                console.error(err);
            });
}

function skapaArtikel(text) {
    let artikel = document.createElement("article");
    artikel.setAttribute('id', text);
    let rubrik = document.createElement('h2');
    rubrik.innerText = text;
    artikel.appendChild(rubrik);
    document.getElementById('grid').appendChild(artikel);
    fetch('getChaptersAndContents.php?kapitel=' + text)
            .then(response => {
                if (!response.ok) {
                    throw response.json();
                }
                return response.json();
            })
            .then(data => {
                punktlista = document.createElement('ul');
                for (let fil of data.filer) {
                    skapaInnehall(text, fil);
                }
                document.getElementById(text).appendChild(punktlista);
            })
            .catch(err => {
                console.error(err);
            });
}

function skapaInnehall(box, data) {
    let punkt = skapaPunkt(data.rubrik, box + "/" + data.fil);
    punktlista.appendChild(punkt);
}

function skapaPunkt(text, lank) {
    let punkt = document.createElement('li');
    let link = document.createElement('a');
    link.setAttribute('href', lank);
    link.text = text;
    punkt.appendChild(link);
    return punkt;
}