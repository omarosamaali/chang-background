// Start Set Color
let color = localStorage.getItem('color');
if (color !== null) {
    document.documentElement.style.setProperty("--main-color", color);
    var colorList = Array.from(document.querySelectorAll(".colors-list li"));

    colorList.forEach(e => {
        e.classList.remove('active');
    })

    colorList.forEach(e => {
        if (e.dataset.color === color) {
            e.classList.add('active');
        }
    })
}
// End Set Color
let backgroundOption = true;

// Start Set Random Background
let backgroundOptionLocalStorage = localStorage.getItem('backgroundOption_');
if (backgroundOptionLocalStorage !== null) {
    if (backgroundOptionLocalStorage === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    let randomBackground = document.querySelectorAll('.random-background span');

    randomBackground.forEach(span => {
        span.classList.remove('active');

        if (backgroundOption === true) {
            document.querySelector('.yes').classList.add('active');
        } else {
            document.querySelector('.no').classList.add('active');
        }
    })
}
// End Set Random Background

// Start Setting Box

// 1- Start Open Setting Box
document.querySelector(".container-icon i").onclick = () => {
    document.querySelector('.setting-box').classList.toggle('open');
    document.getElementById("icon").classList.toggle('fa-spin');
}
// End Open Setting Box

// 2- Start Change Color
var colorList = Array.from(document.querySelectorAll(".colors-list li"));
colorList.forEach(li => {
    li.addEventListener("click", (e) => {

        let color = (e.target.dataset.color);

        handleActive(li);
        document.documentElement.style.setProperty("--main-color", color);

        localStorage.setItem('color', color);
    })
})
// End Change Color

// ==============================
// ==============================
// ==============================

let backgroundInterval;

// Start Change Background
let landing = document.querySelector('.landing-page');
let array = ['https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-72292.jpg?w=996&t=st=1725363604~exp=1725364204~hmac=f8a3d3c38a46d65ce7e6e8f994825d40fd164e27789ca03fb420157b5e803e08',
    'https://img.freepik.com/premium-photo/abstract-luxury-gradient-blue_1258-22082.jpg',
    'https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-72443.jpg?t=st=1725365008~exp=1725368608~hmac=7256403d3ebd9f5f6b4e8d973729ace3f6980fb92411678374b4be96fb1fde26',
    'https://img.freepik.com/free-vector/wave-gradient-background-luxury-dark-modern-design_343694-3088.jpg?t=st=1725365183~exp=1725368783~hmac=1c74eefe4fed8c9166b75f6c760a8c8f509008b1eaf910eb5bd2bc5ea3ae1680&w=826',
    'https://img.freepik.com/free-vector/luxury-background-abstract-designs-modern_343694-1939.jpg?t=st=1725365200~exp=1725368800~hmac=37976e043ba48c3875091b7570098226311f0386d324c26d12444ca450c2af3b&w=826'
];


function RandomizeBack() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNum = Math.floor(Math.random() * array.length);
            landing.style.backgroundImage = `url(${array[randomNum]})`;
        }, 1000);
    }
}
RandomizeBack()
// End Change Background

// 3- Start Change Random Background
let randomBackground = document.querySelectorAll('.random-background span');
randomBackground.forEach(span => {
    span.addEventListener('click', (e) => {
        handleActive(e.target);

        if (e.target.dataset.event === 'yes') {
            backgroundOption = true;
            RandomizeBack();
            localStorage.setItem('backgroundOption_', true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('backgroundOption_', false);
        }
    });
});


let showBullets = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletsLocalItem = localStorage.getItem('bullets');

if (bulletsLocalItem !== null) {
    showBullets.forEach(span => {
        span.classList.remove('active');
    })

    if (bulletsLocalItem === 'block') {
        document.querySelector('.bullets-option .yes').classList.add('active');
        bulletsContainer.style.display = "block";
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector('.bullets-option .no').classList.add('active');
    }
}


showBullets.forEach(span => {
    span.addEventListener('click', (e) => {
        handleActive(span); // This will now correctly update the active state.


        if (span.dataset.eventBullets === 'show') {
            bulletsContainer.style.display = "block";
            localStorage.setItem('bullets', "block");
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem('bullets', "none");
        }
    })
});



// End Change Random Background

// Select Skills Selector
let ourSkills = document.querySelector('.skills');

window.onscroll = function () {
    // المكان فوق السيكشن
    let skillsOfSetTop = ourSkills.offsetTop;
    // إرتفاع السكرين الحالي
    let skillsOuterHeight = ourSkills.offsetHeight;
    // إرتفاع الشاشة المعروضة
    let windowHeight = this.innerHeight;
    // المكان الحالي لو أكبر من 
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOfSetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll('.skills-box .skill-prg span');
        allSkills.forEach(span => {
            span.style.width = span.dataset.progress;
        })
    }
}

// End Select Skills Selector

// Start Open Image

let imageBox = document.querySelectorAll('.images-box img');

imageBox.forEach(img => {

    img.addEventListener('click', (e) => {

        let overlay = document.createElement('div');
        overlay.className = 'popup-overlay';

        document.body.appendChild(overlay);

        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';

        if (img.alt !== null) {
            var boxAlt = document.createElement('h3');
            var altText = document.createTextNode(img.alt);
            boxAlt.appendChild(altText);
            popupBox.appendChild(boxAlt);
        } else {
            boxAlt.appendChild('The Image did not have a alt attribute');
            popupBox.appendChild(boxAlt);
        }

        var popupImage = document.createElement('img');

        popupImage.src = img.src;

        popupBox.appendChild(popupImage);

        document.body.appendChild(popupBox);

        // Create Close Span
        var closeSpan = document.createElement("span");
        let closeText = document.createTextNode("X");
        closeSpan.className = 'close-popup';
        closeSpan.appendChild(closeText);
        popupBox.appendChild(closeSpan);

    })

})

document.addEventListener('click', (e) => {

    if (e.target.className == 'close-popup') {
        e.target.parentNode.remove();
        let overlay = document.querySelector('.popup-overlay');
        overlay.remove();
    }

})

const allBullets = document.querySelectorAll('.nav-bullets .bullets');
const allLinks = document.querySelectorAll('.links a');

function scrollToSomeWhere(element) {
    element.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth',
            })
        })
    })
}

function handleActive(event) {
    event.parentNode.querySelectorAll('.active').forEach(e => {
        e.classList.remove('active');
    })
    event.classList.add('active');
}

document.querySelector('.reset-option').onclick = () => {
    localStorage.clear();
    window.location.reload();
}

document.querySelector(".btn-menu").onclick = () => {
    document.querySelector(".links-container").classList.toggle("open");
}



document.addEventListener('click', (e) => {
    
    let btnMenu = document.querySelector('.btn-menu');
    let linksContainer = document.querySelector(".links-container");

    if (!btnMenu.contains(e.target) && !linksContainer.contains(e.target)) {
        linksContainer.classList.remove('open');
    }

})






scrollToSomeWhere(allLinks);
scrollToSomeWhere(allBullets);