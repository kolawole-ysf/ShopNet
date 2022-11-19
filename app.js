//Toggle buttons
const toggleBtn = document.querySelectorAll('.toggle');
const nav = document.querySelector('.navbar');

toggleBtn.forEach(btn => {
        btn.addEventListener('click', () => {
                if (btn.classList.contains('open')) {
                        nav.classList.add('active');
                }
                else {
                        nav.classList.remove('active');
                }
        })
})
// Cart count
const cartBag = document.querySelector('.cart-count');
const cartBtns = document.querySelectorAll('.cart');

cartBtns.forEach(cartBtn => {
        cartBtn.addEventListener('click', () => {
                let totalcartCount = localStorage.getItem('productCount');
                totalcartCount = parseInt(totalcartCount);
                if (totalcartCount && cartBtn) {
                        localStorage.setItem('productCount', totalcartCount + 1);
                        cartBtn.classList.add('active');
                        cartBag.innerText = totalcartCount + 1;
                } else {
                        localStorage.setItem('productCount', 1);
                        cartBag.innerText = totalcartCount = 1;
                        cartBtn.classList.add('active');
                }
        })
})

function cartContent() {
        let totalcartCount = localStorage.getItem('productCount');
        if (totalcartCount) {
                cartBag.innerText = totalcartCount;
        }
}
cartContent();

//record product details in local storage
const cartButtons = document.querySelectorAll('.cart');

// let products = []; //this should not be here
cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
                //This
                const product = {
                        image: e.target.parentElement.children[0].src,
                        name: e.target.parentElement.children[1].children[1].innerText,
                        quantity: 1,
                        totalQuantity: 1,
                        price: parseInt(e.target.parentElement.children[1].children[3].innerText),
                        totalPrice: parseInt(e.target.parentElement.children[1].children[3].innerText),
                        cartTotal: parseInt(e.target.parentElement.children[1].children[3].innerText)
                }
                storeProduct(product);
                //This
                // this should be moved to line 21
        })
    
})

function storeProduct(product) {
         let products = [];
        let cartItem = JSON.parse(localStorage.getItem('prdInCart'));
        if (cartItem === null) {
                products.push(product);
                // localStorage.setItem('prdInCart', JSON.stringify(products));
        } else {
                cartItem.forEach(item => {
                        if (product.image == item.image) {
                                product.quantity = item.quantity += 1;
                                product.totalQuantity = item.totalQuantity += 1;
                                product.totalPrice = product.price * product.quantity;
                                const arr = cartItem.map(o => o.totalPrice);
                                product.cartTotal = arr.reduce(function (a, x) {
                                        return a += x;
                                });

                        } else {
                                product.totalQuantity = item.totalQuantity += 1;
                                const arr = cartItem.map(o => o.totalPrice);
                                product.cartTotal = arr.reduce(function (a, x) {
                                        return a += x;
                                });
                                products.push(item)
                        }
                })
                products.push(product);
        }
        localStorage.setItem('prdInCart', JSON.stringify(products));
        // window.location.reload();
}

//display local storage content
function displayCart() {
        let cartCard = '';
        let cartItem = JSON.parse(localStorage.getItem('prdInCart'));
        cartItem.forEach(item => {
                cartCard += `
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
        document.querySelector('.cart-container').innerHTML = cartCard;
};
//  function displayPayment(){
//         let cartItem= JSON.parse(localStorage.getItem('prdInCart'));

//         console.log({cartItem})
//         cartItem.forEach(item=>{
//                 let payment='';
//                 if(cartItem){
//                         payment+=`
//                         <div class="total-cost">
//                         <h4>Cart Total</h4>
//                         <table>
//                             <tr>
//                                 <td>Total Quantity</td>
//                                 <td>${item.totalQuantity}</td>
//                             </tr>
//                             <tr>
//                                 <td>Cart Total</td>
//                                 <td>$${item.cartTotal}</td>
//                             </tr>
//                         </table>
//                         <a href="" class="normal-btn2">Make payment</a>
//                     </div>
//                         ` ;
//                 };
//                 document.querySelector('.payment-card').innerHTML=payment;
//         })
//  };

function displayPayment() {
        let cartItem = JSON.parse(localStorage.getItem('prdInCart'));

        if (!cartItem) return;
        const initialValue = { totalPrice: 0, totalQuantity: 0 }

        const totals = cartItem.reduce((prev, curr) => {
                console.log({ prev, curr })
                return {
                        totalQuantity: parseInt(prev.totalQuantity) + parseInt(curr.quantity),
                        totalPrice: parseFloat(prev.totalPrice) + parseFloat(curr.totalPrice)
                } //the format should be the same as the initial value

        }, initialValue)
        console.log({ totals })
        document.getElementById('total-quantity').innerText = totals.totalQuantity;
        document.getElementById('cart-total').innerText = totals.totalPrice;
};
document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.cart-container') && document.querySelector('.payment-card')) {
                displayCart();
                displayPayment();
        }
});
