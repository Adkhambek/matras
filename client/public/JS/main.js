const elBody = document.querySelector('body')
const elUserPhoneForm = document.querySelector('.communication-inner__form');
const elUserPhoneNumber = document.querySelector('#telNumber');
const elCommunicationSuccessful = document.querySelector('.communication-successful');
const elModalCloseBtn = document.querySelector('.modal__close');
const elModalSuccesfuledBtn = document.querySelector('.modal__succesfuled-close')
const elModal = document.querySelector('.modal');
const elOrderBtn = document.querySelector('.order-btn');
const elBurgerBtn = document.querySelector('.burger-btn');
const elBurgerMenu = document.querySelector('.burger-menu')
const elBurgerMenuOrderBtn = document.querySelector('.burger-menu__order-btn');
const elBurgerMenuCloseBtn = document.querySelector('.burger-menu__close-btn');
const elOverlay = document.querySelector('.overlay');
const elModalForm = document.querySelector('.modal__form');
const elModalPhoneInput = document.querySelector('.modal__tel-input');
const elModalSuccesfuled = document.querySelector('.modal-succesfuled');
const modalCountInput = document.querySelector('.modal__count-input');
const modalIncBtn = document.querySelector('.count-increment');
const modalDecBtn = document.querySelector('.count-decrement');
var RGEX = /[\d]{9}/;

 function testInfo(phoneInput, succesModal){
    var OK = RGEX.exec(Number(phoneInput.value));
    if (!OK){
        window.alert(phoneInput.value + " isn't a phone number with area code!");
    }else{
        
        console.log(phoneInput.value);
        succesModal.classList.add('successfuled')
    }
  };

elModalForm.addEventListener('submit', async function(e){
    e.preventDefault()
    let newOrder = {
        productName : document.querySelector('#selectProduct').value,
        count : modalCountInput.value,
        number:elModalPhoneInput.value,
        name:document.querySelector('.modal__name-input').value,
      }
      let response = await request('http://10.10.118.40:1200/api/orders', 'POST', newOrder)  
    testInfo(elModalPhoneInput, elModalSuccesfuled)
});

elUserPhoneForm.addEventListener('submit', async function(e){
    e.preventDefault()
    testInfo(elUserPhoneNumber, elCommunicationSuccessful)
    let interest = {
        number : elUserPhoneNumber.value
      }
    let response = await request('http://10.10.118.40:1200/api/contact', 'POST', interest)
});


elOverlay.addEventListener('click', function(){
    elModal.classList.remove('notActive')
    elOverlay.classList.remove('notActive')
    elBody.classList.add('noScroll')

})
elOrderBtn.addEventListener('click', function(){
    elModal.classList.remove('notActive')
    elOverlay.classList.remove('notActive')
    elBody.classList.add('noScroll')
})

elModalCloseBtn.addEventListener('click', function(){
    elModal.classList.add('notActive')
    elOverlay.classList.add('notActive')
    elBody.classList.remove('noScroll')
});

elModalSuccesfuledBtn.addEventListener('click', function(){
    elModal.classList.add('notActive')
    elOverlay.classList.add('notActive')
    elBody.classList.remove('noScroll')
});

elBurgerBtn.addEventListener('click', function(){
    elBurgerMenu.classList.remove('show')
    elBody.classList.add('noScroll')
})
elBurgerMenuOrderBtn.addEventListener('click', function(){
    elModal.classList.remove('notActive')
    elOverlay.classList.remove('notActive')
    elBody.classList.add('noScroll')
})

elBurgerMenuCloseBtn.addEventListener('click', function(){
    elBurgerMenu.classList.add('show')
    elBody.classList.remove('noScroll')
});

elBurgerMenu.addEventListener('click', function(){
    elBody.classList.remove('noScroll')
    elBurgerMenu.classList.add('show')
})







let count = 1;
modalCountInput.value = count;


modalIncBtn.addEventListener('click', function(){
    count = count + 1;
    modalCountInput.value = count;
});


modalDecBtn.addEventListener('click', function(){
    if(count == 1){
        modalDecBtn.getAttribute('disabled')
    }else{
        modalDecBtn.removeAttribute('disabled')
        count = count - 1 ;
        modalCountInput.value = count;
    }
})

// carousel section 
let elMyCarousel = document.querySelector('.my-carousel')
let elMyCarouselTemp = document.querySelector('.my-carousel-temp').content

async function myCarousel(){
    let response = await request('/api/banners' , 'GET')
    response.data.forEach((item, index) => {
        console.log(item);
        let newTemp = elMyCarouselTemp.cloneNode(true)
       
        newTemp.querySelector('.hero-inner__title').textContent = item.title
        newTemp.querySelector('.my-carousel__img').src = "/images/" + item.image       
        elMyCarousel.querySelector('.slick-track').append(newTemp)
    })
    
}

myCarousel()


// address section
let elAddressInner = document.querySelector('.address-inner')
let elAddressTemp = document.querySelector('.address-left-template').content;

async function address(){
    let response = await request('http://10.10.118.40:1200/api/address' , 'GET')
    response.forEach((item, index) => {
      
        let newTemp = elAddressTemp.cloneNode(true)
       
        newTemp.querySelector('.address-inner__address').textContent = item.location
        newTemp.querySelector('.address-inner__destination').textContent = item.destination
        newTemp.querySelector('.address-inner__btn').href = item.geolacation

        let images = JSON.parse(item.images)
        images.forEach((img, index) => {
            newTemp.querySelector('.address-carousel-img').src = img
        })


       
        elAddressInner.append(newTemp)
    })
    
}

address()







