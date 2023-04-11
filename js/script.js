const dropArea = document.querySelector('.drop-area');
const text = document.querySelector('.drop-area__text');
const input = document.querySelector('#link');
const label = document.querySelector('#label');
const imgDestination = document.querySelector('.drop-area__loaded-picture');
const closeButton = document.querySelector('.drop-area__close-btn');
let dropClass = /drop-area/;
let supportedExtensions = ['image/jpeg', 'image/jpg', 'image/png']; 


// drag&drop logics

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    text.innerText = 'Release to drop';
    if (dropClass.test(e.target.className)) {
        dropArea.classList.add('active');
    }
});

dropArea.addEventListener('dragleave', (e)  => {
    e.preventDefault();
    text.innerHTML  = 'Drag & Drop or <a href="#" class="drop-area__link">browse</a>'

    if (e.target.classList[0] !== 'drop-area') return;
    dropArea.classList.remove('active');
})

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('active');
    text.innerHTML  = `Drag & Drop or 
    <label for="link">
        <input type="file" id="link">
        browse
    </label>`;

    let file = e.dataTransfer.files[0];
    showFile(file);
})

// input logics

input.addEventListener('change', function() {
    console.log(1);
    let file = this.files[0];
    showFile(file);
})

// file processor

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('imgURL')) {
        imgDestination.classList.remove('d-none');
        closeButton.classList.remove('d-none');
        imgDestination.src = localStorage.getItem('imgURL');
    }
})

closeButton.addEventListener('click', () => {
    localStorage.removeItem('imgURL');
    imgDestination.classList.add('d-none');
    closeButton.classList.add('d-none');
});

function showFile(file) {
    if (supportedExtensions.includes(file.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = () => {
            let res = reader.result;
            localStorage.setItem('imgURL', res);
            imgDestination.src = res;
        }

        imgDestination.classList.remove('d-none');
        closeButton.classList.remove('d-none');
        text.removeAttribute('style');
    } else {
        text.innerHTML = 'This file is not supported!';
        text.setAttribute('style', 'color: red');
    }
}