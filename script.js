// const main = document.getElementById("main")
const buttonSearch = () => {
    const input = document.getElementById("input-value")
    const error = document.getElementById("error")
    const inputValue = parseInt(input.value)

    if (isNaN(inputValue) || inputValue == '') {
        error.innerText = `please enter a number`
        main.textContent = '' // ata ai kane kivabe access pacche
    }
    else if (inputValue <= 0) {
        error.innerText = `please entera positive number`
        main.innerHTML = ''
    }
    else {
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
            .then(res => res.json())
            .then(data => cardsDisplay(data.cards))
        error.innerHTML = ''
    }
    input.value = ''
}

const cardsDisplay = (cards) => {

    main.textContent = ''// number r jonno kaj kortece kinto stringg r jonno kaj kortece na

    for (const card of cards) {
        const div = document.createElement("div")

        div.classList.add("col-lg-4")
        div.classList.add("mb-5")
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
           <img src="${card.image}" class="card-img-top" alt="...">
        <div class="card-body">
           <h5 class="card-title">${card.suit}</h5>
           <p class="card-text">${card.code}</p>
           <button onclick= "cardDetails('${card.code}')" href="#" class="btn btn-primary">See details</button>
        </div>
        </div>
        `
        main.appendChild(div)
    }
}
const cardDetails = (code) => {
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
        .then(res => res.json())
        .then(data => {
            const allCards = data.cards
            // console.log(allCards);
            const singleCard = allCards.find(card => card.code === code)
            // console.log(singleCard);
            const div = document.createElement("div")
            main.innerHTML = ''
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
           <img src="${singleCard.image}" class="card-img-top" alt="...">
        <div class="card-body">
           <h5 class="card-title">${singleCard.suit}</h5>
           <p class="card-text">${singleCard.code}</p>
        </div>
        </div>
            `
            main.appendChild(div)// main kivabe access pacche
        })

}