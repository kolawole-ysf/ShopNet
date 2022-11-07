//toggle button
// const toggleBtn=document.querySelector('.toggle');

// toggleBtn.addEventListener('click',()=>{
//         document.querySelector('.navbar').classList.toggle('active');
// })

const toggleBtn=document.querySelectorAll('.toggle');
const nav=document.querySelector('.navbar');

toggleBtn.forEach(btn=>{
        btn.addEventListener('click', ()=>{
                if(btn.classList.contains('open')){
                        nav.classList.add('active');
                }
                else{
                        nav.classList.remove('active');
                }
        })
})
// Cart count
const cartBag=document.querySelector('.cart-count');
const cartBtns=document.querySelectorAll('.cart');
let cartCount=0;
cartBtns.forEach(cartBtn=>{
        cartBtn.addEventListener('click',()=>{
                        if(cartBtn.classList.contains('active')){
                                cartBtn.classList.remove('active');
                                cartCount-=1;
                                cartBag.innerText=cartCount;
                        }else{
                                cartBtn.classList.add('active');
                                cartCount+=1;
                                cartBag.innerText=cartCount;
                        } 
                        if(cartCount>0){
                                cartBag.style.display='block';
                        }else{
                                cartBag.style.display='none';
                        }       
                             
                
        })
})