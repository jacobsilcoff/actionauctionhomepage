let x = document.querySelector("#x")
let box = document.querySelector('#participatebox')
let p = document.querySelector("#participate")

p.addEventListener('click',e=>{
    box.classList.remove('hidden')
})

x.addEventListener('click',e=>{
    box.classList.add('hidden')
})

function myFunction() {
  var copyText = document.getElementById("myInput");
  copyText.select();
  document.execCommand("copy");
  
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied: " + copyText.value;
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}