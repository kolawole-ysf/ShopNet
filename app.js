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
                totalQuantity: 1,
                price: parseInt(e.target.parentElement.children[1].children[3].innerText),
                totalPrice: parseInt(e.target.parentElement.children[1].children[3].innerText),
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
                                product.totalQuantity = item.totalQuantity+=1;
                                product.totalPrice=product.price*product.quantity;                                                              
                        }else{
                                product.totalQuantity = item.totalQuantity+=1;
                               products.push(item);
                        }
                })
                products.push(product);
        }
        localStorage.setItem('prdInCart',JSON.stringify(products));
        document.location.reload();
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
                                <li class="item">Price:<span>$${item.price}</span></li>
                                <li class="item">Total Price:<span>$${item.totalPrice}</span></li>
                           </ul>
                        </div>
                
                ` ;

        });
        document.querySelector('.cart-container').innerHTML=cartCard; 
 };

 function displayPayment() {
        let cartItem = JSON.parse(localStorage.getItem('prdInCart'));

        if (!cartItem) return;
        const initialValue = { totalPrice: 0, totalQuantity: 0 }

        const totals = cartItem.reduce((prev, curr) => {
                console.log({ prev, curr })
                return {
                        totalQuantity: parseInt(curr.totalQuantity),
                        totalPrice: parseFloat(prev.totalPrice) + parseFloat(curr.totalPrice)
                } //the format should be the same as the initial value
        }, initialValue)
        console.log({ totals })
        document.getElementById('total-quantity').innerText = totals.totalQuantity;
        document.getElementById('cart-total').innerText = totals.totalPrice;
};

 
 document.addEventListener('DOMContentLoaded',()=>{
        if(document.querySelector('.cart-container') && document.querySelector('.payment-card')){
                displayCart();
                displayPayment();
        }
 });

//displaying product description

        const ProductImgs=document.querySelectorAll('.shop-card');
        const productDetails=[];

        ProductImgs.forEach(productImg=>{
                productImg.addEventListener('click',(e)=>{
                        console.log(e.target)
                        const productDesc={
                                image1: e.target.src,
                                name: e.target.nextElementSibling.children[1].innerText,
                                price: e.target.nextElementSibling.children[3].innerText,
                                description: e.target.nextElementSibling.children[4].innerText,
                                brand: e.target.nextElementSibling.children[0].innerText 
                        }
                 storeDesc(productDesc)
                })
        
        });

     //store product description in LS

        function storeDesc(productDesc){
                let productItem= JSON.parse(localStorage.getItem('prdDesc'));
        if(productItem===null){
                productDetails.push(productDesc);
                localStorage.setItem('prdDesc',JSON.stringify(productDesc));
        }else{
                productItem.forEach(pItem=>{
                        productDetails.push(pItem)
                })

                productDetails.push(productDesc);
        }
        localStorage.setItem('prdDesc',JSON.stringify(productDetails));
        window.location.reload();
        }
      
//Display product details

function displayProdGal(){
        let galCard='';
        let productItem= JSON.parse(localStorage.getItem('prdDesc'));
        productItem.forEach(pItem=>{
                galCard=`
                <div class="product-display">
                <img src="${pItem.image1}" alt="" id="mainImg">
                </div>
                <div class="product-description">
                <h5>${pItem.brand}</h5>
                <h3>${pItem.name}</h3>
                <span>$${pItem.price}</span><br>
                <select>
                    <option>Select size</option>
                    <option>XXL</option>
                    <option>XL</option>
                    <option>L</option>
                    <option>M</option>
                </select>
                <input type="number" value="1">
                <button class="normal-btn">Add To Cart</button>
                <h4>product Details</h4>
                <p>${pItem.description}</p>

            </div>
                ` ;
        });
        
        document.querySelector('.product-desc').innerHTML=galCard;
 };

 document.addEventListener('DOMContentLoaded',()=>{
        if(document.querySelector('.shop')){
                displayProdGal();
        }
 });

//display gallery
//  const mainImg=document.querySelector('#mainImg');
// const galImgs=document.querySelectorAll('.gal-img');

// galImgs.forEach(galImg=>{
//         galImg.addEventListener('click',(e)=>{
//                 console.log(e.target.src)
//                 mainImg.src=e.target.src;
//         })
// })