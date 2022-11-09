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

cartBtns.forEach(cartBtn=>{
                cartBtn.addEventListener('click',()=>{
                let totalcartCount=localStorage.getItem('productCount');
                totalcartCount=parseInt(totalcartCount);
                if(totalcartCount && cartBtn){
                        localStorage.setItem('productCount', totalcartCount+1);
                        cartBtn.classList.add('active');
                        cartBag.innerText=totalcartCount + 1;
                }else{
                        localStorage.setItem('productCount', 1);
                        cartBag.innerText=totalcartCount = 1;
                        cartBtn.classList.add('active');
                }
        })
})
 function cartContent(){
        let totalcartCount=localStorage.getItem('productCount');
        if(totalcartCount){
                cartBag.innerText=totalcartCount;
        }
 }
cartContent();





 //cart Records
 const proCard=document.querySelector('.product-card');
 const proImage=document.querySelector('.product-img');
 const proName=document.querySelector('.product-details h5');
 const proPrice=document.querySelector('.product-details h4');
 const cartContainer=document.querySelector('.cart-container');
 