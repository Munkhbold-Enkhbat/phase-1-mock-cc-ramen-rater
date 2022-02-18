// write your code here
document.addEventListener('DOMContentLoaded', () => {
  getAllRamen()
  addNewRamen()
})

let getAllRamen = () => {
  fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => data.forEach(getEveryRate))
}

const makeEl = el => document.createElement(el)

function getEveryRate(rate) {
  const img = makeEl('img')
  img.src = rate.image
  img.className = 'image'
  document.querySelector('div#ramen-menu').appendChild(img)

  /************** GRAB DOM ELEMENTS TO DISPLAY *******************/
  const ramen = document.querySelector('div#ramen-detail').children
  const rateNum = document.querySelector('span#rating-display')
  const rateComment = document.querySelector('p#comment-display')

  img.addEventListener('click', (e) => {
    document.querySelector('img.detail-image').src = e.target.src
    ramen[1].innerText = rate.name
    ramen[2].innerText = rate.restaurant
    rateNum.innerText = rate.rating
    rateComment.innerText = rate.comment
    // console.log(rate.comment);
  })
}

function addNewRamen() {

  const form = document.querySelector('form#new-ramen')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let input = e.target

    let rateObj = {
      name: input[0].value,
      restaurant: input[1].value,
      image: input[2].value,
      rating: Number(input[3].value),
      comment: input[4].value
    }

    const img = makeEl('img')
    img.src = input[2].value
    img.className = 'image'
    document.querySelector('div#ramen-menu').appendChild(img)

    updateDataBase(rateObj)
    form.reset()
  })
}

function updateDataBase(item) {
  fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}
