//Toggle buttons
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

//record product details in local storage
const cartButtons=document.querySelectorAll('.cart');

let products=[];
cartButtons.forEach(button=>{
        button.addEventListener('click',(e)=>{
        const product={
                image: e.target.parentElement.children[0].src,
                name: e.target.parentElement.children[1].children[1].innerText,
                quantity: 1,
                price: parseInt(e.target.parentElement.children[1].children[3].innerText),
                totalPrice: parseInt(e.target.parentElement.children[1].children[3].innerText)
        }
        storeProduct(product);
        })
})

function storeProduct(product){
        let cartItem= JSON.parse(localStorage.getItem('prdInCart'));
        if(cartItem===null){
                products.push(product);
                localStorage.setItem('prdInCart',JSON.stringify(products));
        }else{
                cartItem.forEach(item=>{
                        if(product.image==item.image){
                                product.quantity = item.quantity +=1;
                                product.totalPrice=product.price*product.quantity;
                                
                        }else{

                                products.push(item)
                        }
                })
                products.push(product);
        }
        localStorage.setItem('prdInCart',JSON.stringify(products));
        window.location.reload();
}

 //display local storage content
 function displayCart(){
        let cartCard='';
        let cartItem= JSON.parse(localStorage.getItem('prdInCart'));
        cartItem.forEach(item=>{
                cartCard+=`
                        <div class="cart-card">
                        <img src="${item.image}" alt="">
                           <ul class="collection">
                                <li class="item">Product:<span>${item.name}</span></li>
                                <li class="item">QTY:<span>${item.quantity}</span></li>
                                <li class="item">Price:<span>${item.price}</span></li>
                                <li class="item">Total Price:<span>${item.totalPrice}</span></li>
                           </ul>
                        </div>
                
                `  
        });
        document.querySelector('.cart-container').innerHTML=cartCard; 
 };
 document.addEventListener('DOMContentLoaded',()=>{
        if(document.querySelector('.cart-container')){
                displayCart();
        }
 });
 
