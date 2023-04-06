const dropArea = document.querySelector('.drop-area');
const text = document.querySelector('.drop-area__text');
const input = document.querySelector('#link');
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
    let file = this.files[0];
    showFile(file);
})

// file processor

function showFile(file) {
    console.log(file);
    if (supportedExtensions.includes(file.type)) {
        
    } else {
        alert('This file extention is not supported!');
    }
}