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