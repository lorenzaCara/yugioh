const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?level=4&attribute=water&sort=atk';

const imgsDiv = document.querySelector('#photos');
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');

const createDiv = (pic) => {
    const div = document.createElement('div');
    div.classList.add('col');

    // Immagine della carta
    const img = document.createElement('img');
    img.src = pic.card_images[0].image_url;
    div.appendChild(img);

    // Nome della carta
    const pName = document.createElement('p');
    pName.textContent = pic.name;
    div.appendChild(pName);

    const pType = document.createElement('p');
    pType.className = 'type';
    pType.textContent = pic.typeline;
    div.appendChild(pType);

    const pDesc = document.createElement('p');
    pDesc.className = 'desc';
    pDesc.textContent = pic.desc;
    div.appendChild(pDesc);

    return div;
}

const picManager = () => {
    let state = [];

    return {
        set: function(newState) {
            state = newState;
            this.filter(); // Esegui il filtro inizialmente per mostrare tutte le carte
        },
        filter: function() {
            imgsDiv.innerHTML = '';  // Svuota la sezione per aggiornare le immagini
            const card = searchInput.value.toLowerCase();

            if (card === '') {
                return;
            }

            // Filtra
            const filteredCards = state.filter(pic => 
                pic.name.toLowerCase().includes(card) //per vedere se il pic.name corrisponde all'input inserito 'card'
            );

            // Fa vedere carte filtrate
            filteredCards.forEach(el => {
                imgsDiv.appendChild(createDiv(el));
            });
        }
    }
}

const picFirst = picManager();

fetch(url)
    .then(response => response.json())
    .then(pic => {
        picFirst.set(pic.data);
    })
    .catch(error => {
        console.log('Errore:', error);
    });

searchInput.addEventListener('input', () => {
    picFirst.filter(); 
});

searchButton.addEventListener('click', () => {
    picFirst.filter(); 
});


