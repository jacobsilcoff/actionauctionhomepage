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

let actionAuctions;
let userAccount;

//WEB 3 STUFF
window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
  } else {
    // Handle the case where the user doesn't have web3. Probably 
    // show them a message telling them to install Metamask in 
    // order to use our app.
  }

  // Now you can start your app & access web3js freely:
  startApp()

})

function startApp(){
  let contractAddress = "ADD ADDRESS HERE"
  actionAuctions = new web3js.eth.Contract(actionAuctionsAbi, contractAddress)
  
  let accountInterval = setInterval(function() {
  // Check if account has changed
  if (web3.eth.accounts[0] !== userAccount) {
    userAccount = web3.eth.accounts[0];
    // Call some function to update the UI with the new account
    //updateInterface();
  }
}, 100);
}

function getAuction(id) {
  return actionAuctions.methods.auctions(id).call()
}

function getCharityAddress(name) {
  return actionAuctions.methods.getCharity(name).call()
}

function createAuction(title, charity) {
  return actionAuctions.methods.createAuction(title, charity)
  .send( {from : userAccount} )
  .on("receipt", function(receipt){
    //Do something for success
  })
  .on("error", function(error){
    //Do something for error
  })
}

function placeBid(auctionId, amount) {
  return actionAuctions.methods.placeBid(auctionId)
  .send({ from: userAccount, value: web3js.utils.toWei(amount.toString(), "ether") })
  .on("receipt", function(receipt){
    //Do something for success
  })
  .on("error", function(error){
    console.log(error)
  })
}

function endAuction(auctionId) {
  return actionAuctions.methods.endAuction(auctionId)
  .send( {from : userAccount} )
  .on("receipt", function(receipt){
    //Do something for success
  })
  .on("error", function(error){
    console.log(error)
  })
}

function removeCharity(charity) {
  //check for ownership later
  actionAuctions.methods.removeCharity(charity)
  .send( {from : userAccount} )
  .on("receipt", function(receipt){
    //Do something for success
  })
  .on("error", function(error){
    console.log(error)
  })
  
}

function addCharity(charity, address) {
  //check for ownership later
  actionAuctions.methods.addCharity(charity, address)
  .send( {from : userAccount} )
  .on("receipt", function(receipt){
    //Do something for success
  })
  .on("error", function(error){
    console.log(error)
  })
}

//WEB 3 EVENTS
actionAuctions.events.AuctionCreated()
.on("data", function(event) {
  let data = event.returnValues
  // We can access this event's 3 return values on the `event.returnValues` object:
  console.log("Auction created!", data.auctionId, data.title, data.auctioneer)
}).on("error", console.error);

actionAuctions.events.AuctionEnded()
.on("data", function(event) {
  let data = event.returnValues
  // We can access this event's 3 return values on the `event.returnValues` object:
  console.log("Auction over!")
}).on("error", console.error);

actionAuctions.events.BidPlaced()
.on("data", function(event) {
  let data = event.returnValues
  // We can access this event's 3 return values on the `event.returnValues` object:
  console.log("Bid Placed!")
}).on("error", console.error);