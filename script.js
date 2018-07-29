let x = document.querySelector("#x")
let box = document.querySelector('#participatebox')
let p = document.querySelector("#participate")
let start = document.querySelector("#create")
p.addEventListener('click',e=>{
    box.classList.remove('hidden')
})

x.addEventListener('click',e=>{
    box.classList.add('hidden')
})

start.addEventListener('click', e=>{
  box.classList.remove('hidden')
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

$(document).ready(function(){
    console.log("READY")
    $("input#namein").on({
    keydown: function(e) {
      if (e.which === 32)
        return false;
    },
    change: function() {
      this.value = this.value.replace(/\s/g, "")
      this.value = this.value.toLowerCase()
    }
  });
})
