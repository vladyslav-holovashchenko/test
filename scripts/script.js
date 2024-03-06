let currentMelody
let audio

const playMelody = (melody, country) => {
  if (audio) {
    audio.pause()
  }

  currentMelody = { melody, country }
  audio = new Audio(melody)
  audio.play()
}

const guessCountry = (expectedCountry) => {
  if (!currentMelody) {
    showPopup('Please listen to a melody first.')
    return
  }

  const lowerExpectedCountry = expectedCountry.toLowerCase()
  if (currentMelody.country.toLowerCase() === lowerExpectedCountry) {
    showPopup('🎉Correct! You guessed the country. 🎉')
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      currentMelody = null
    }
    disableElement(`img[alt="${lowerExpectedCountry}"]`)
    disableElement(`button[name="${lowerExpectedCountry}"]`)
  } else {
    showPopup('Incorrect. Try again! 😔')
    if (audio) {
      audio.pause()
    }
  }
}

const showPopup = (message) => {
  const popup = document.getElementById('customPopup')
  const popupContent = document.getElementById('popupContent')
  popupContent.innerText = message
  popup.style.display = 'block'
  createOverlay()
}

const createOverlay = () => {
  const overlay = document.createElement('div')
  overlay.id = 'overlay'
  overlay.style.position = 'fixed'
  overlay.style.top = '0'
  overlay.style.left = '0'
  overlay.style.width = '100%'
  overlay.style.height = '100%'
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  overlay.style.zIndex = '999'
  document.body.appendChild(overlay)
}

const closePopup = () => {
  const popup = document.getElementById('customPopup')
  const overlay = document.getElementById('overlay')

  popup.style.display = 'none'
  if (overlay) {
    document.body.removeChild(overlay)
  }
  if (currentMelody) {
    audio.play()
  }
}

const disableElement = (selector) => {
  document.querySelector(selector).style.pointerEvents = 'none'
}

let currentImgType = 'jpg'
const changePics = document.getElementById('changePics')
changePics.addEventListener('click', () => {
  currentImgType = currentImgType === 'jpg' ? 'svg' : 'jpg'
  const pics = document.getElementsByClassName('flag')
  const countries = ['ua', 'pl', 'gb', 'fr', 'de']
  for (let i = 0; i < pics.length; i++) {
    pics[i].src = `../images/${countries[i]}.${currentImgType}`
  }
})
