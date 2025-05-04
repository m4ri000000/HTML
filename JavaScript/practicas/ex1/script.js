let bgButton = document.querySelector('#bgChanger');
bgButton.addEventListener('click', () => {
    let randomColor = `rgb(${Math.floor(Math.random() * 256)},
                        ${Math.floor(Math.random() * 256)},
                        ${Math.floor(Math.random() * 256)})`;
    document.body.style.backgroundColor = randomColor;
});

let p = document.querySelector('.text p');
let originalText = p.textContent;
let changeTextButton = document.querySelector('.text #changeText');
changeTextButton.addEventListener('click', () => {
    p.textContent = "text has changed! isn't this cool?";
});
let resetTextButton = document.querySelector('.text #reset');
resetTextButton.addEventListener('click', () => {
    p.textContent = originalText;
});


let hideText = document.querySelector('.text2 #hideText');
hideText.addEventListener('click', () => {
    let p = document.querySelector('.text2 p');
    p.style.display = 'none';
})

let showText = document.querySelector('.text2 #showText');
showText.addEventListener('click', () => {
    let p = document.querySelector('.text2 p');
    p.style.display = 'block';
})

let numberBox = document.querySelector('#numberBox');
let increaseBtn = document.querySelector('#increase');
let decreaseBtn = document.querySelector('#decrease');

let count = 0;

increaseBtn.addEventListener('click', () => {
    count++;
    numberBox.textContent = count;
})

decreaseBtn.addEventListener('click', () => {
    count--;
    numberBox.textContent = count;
})

const imgs = ['img/img1.jpg', 'img/img2.jpg', 'img/img3.jpg'];
let currentIndex = 0;

let galleryContainer = document.querySelector('.gallery-container');
let previousButton = document.getElementById('previous');
let nextButton = document.getElementById('next');

function showImage(index) {
    galleryContainer.innerHTML = `<img src="${imgs[index]}" alt = "Imagen ${imgs[index + 1]}" style="width: 40%">`;
}

showImage(currentIndex);

previousButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    showImage(currentIndex);
})

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imgs.length;
    showImage(currentIndex);
})

let textarea = document.querySelector('#myTextarea');
let charCount = document.querySelector('#charCount');
textarea.addEventListener('input', () => {
    charCount.textContent = textarea.value.length;
});

let darkModebtn = document.querySelector('#toggleDark');
darkModebtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
})

document.querySelector('#submitBtn').addEventListener('click', () => {
    let input = document.querySelector('#nameInput');
    if (input.value.trim() === '') {
        alert("please enter your name!");
    } else {
        alert(`hey there, ${input.value}!`)
    }
});

const quotes = ["keep going!", "you got this!", "i love you!", "believe in yourself!"];
document.querySelector('#quoteBtn').addEventListener('click', () => {
    let quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.querySelector('#quoteDisplay').textContent = quote;
})

document.addEventListener('keydown', (e) => {
    document.querySelector('#keyDisplay').textContent = `You pressed: ${e.key}`;
});