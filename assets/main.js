const buttonSearch = document.querySelector('.button-search')


const input = document.querySelector('#searchtext')

// screens
const modal = document.querySelector('.modal')
const buttonModal = document.querySelector('.cancel-modal')
const loading = document.querySelector('.loading')
const errorModal = document.querySelector('.modal-error')

let dataSearch;

buttonModal.addEventListener('click', cancelModal)
buttonSearch.addEventListener('click', searchAnime)

async function searchAnime() {
    const animeName = document.getElementById('search').value
    const api = `https://api.jikan.moe/v4/anime?q=${animeName}&sfw`

    loading.classList.toggle('openloading')
    
    const animes = await fetch(api).then(animes => animes.json()).then(({data}) => ({data}))

    const { data } = animes

    dataSearch = [...data]

    if(dataSearch.length == 0) {
        openError()
    }

    loading.classList.toggle('openloading')

    createCards(data)
    modal.classList.toggle('on')


}

function createCards(cards) {
    let i = 0;

    cards.forEach(element => {
        const innerCard = `<div class="card-image">
            <img src="https://cdn.myanimelist.net//images//anime//1171//109222.jpg" alt="anime photo image">
        </div>
        <div class="content">
            <h1>Jujutsu Kaisen</h1>
            <p>Rank: <span class="rank-card">#24</span></p>
            <p>Year: <span class="year-card">2020</span></p>
            <p>Score: <span class="score-card">8.66</span></p>
            <button class="button-add button${i}">Add</button>
        </div>`

        
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = innerCard
        card.querySelector('.year-card').textContent = element.year
        card.querySelector('.score-card').textContent = element.score

        card.querySelector('.rank-card').textContent = `#${element.rank}`
    
        card.querySelector('.card-image img').src = element.images.jpg.image_url

        
        card.querySelector('.card-image img').alt = `${element.title} anime image`

        card.querySelector('.content h1').textContent = `${element.title}`
        
        card.querySelector(`.button${i}`).addEventListener('click', check)
        i++
        

        modal.append(card)
    });
}

function check(event) {
    let numberButton = event.target.classList[1]
    let numberIndex = numberButton.replace(/[^0-9]/g,'')

    let requiredAnime = dataSearch[numberIndex]

    createTr(requiredAnime)
}

function createTr(required) {
    let tbody = document.querySelector('tbody')


    const trInner = `<tr>
    <td class="name-anime">
        <a href="https://myanimelist.net/anime/40748/Jujutsu_Kaisen" target="_blank">
            <img src="https://cdn.myanimelist.net/images/anime/1171/109222t.jpg" alt="">
            <p>Jujutsu Kaisen</p>
        </a>
    </td>
    <td class="rank">24</td>
    <td class="score">8.66</td>
    <td class="year">2020</td>
    <td class="remove">&times;</td>
    </tr>`

    const tr = document.createElement('tr')
    tr.innerHTML = trInner

    tr.querySelector('.name-anime a').href = required.url

    tr.querySelector('.name-anime img').src = required.images.jpg.small_image_url
    tr.querySelector('.name-anime img').alt = `${required.title} anime image`

    tr.querySelector('p').textContent = required.title

    tr.querySelector('.rank').textContent = `#${required.rank}`

    tr.querySelector('.score').textContent = required.score

    tr.querySelector('.year').textContent = required.year

    if(required.year == null) {
        tr.querySelector('.year').textContent = 'Unknown'
    }

    tbody.append(tr)

    modal.classList.toggle('on')
    clearSearchs()
}

function cancelModal() {
    modal.classList.toggle('on')
    clearSearchs()
}

function clearSearchs() {
    const allCards = modal.querySelectorAll('.card')

    allCards.forEach(card => {
        card.remove()
    })
}

function openError() {
    modal.classList.toggle('on')
    errorModal.classList.add('error-open')
    setTimeout(() => {
        errorModal.classList.remove('error-open')
    }, 2000);
}