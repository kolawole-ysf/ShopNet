const mainImg=document.querySelector('#mainImg');
const galImgs=document.querySelectorAll('.small-img');

galImgs.forEach(galImg=>{
        galImg.addEventListener('click',(e)=>{
                console.log(e.target.src)
                mainImg.src=e.target.src;
        })
})