window.addEventListener("load",()=>{

    setTimeout(()=>{

        const loader=document.getElementById("loader");

        loader.style.opacity="0";

        loader.style.transition=".8s";

        loader.style.pointerEvents="none";

        setTimeout(()=>{

            loader.remove();

        },800);

    },2000);

});