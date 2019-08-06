// deck of cards
const backofDealerCard = 'Red_back.jpg';
const deck = [
['ace of spades', 1, 'AS.jpg'],['ace of clubs', 1, 'AC.jpg'], ['ace of diamonds', 1, 'AD.jpg'], ['ace of hearts', 1, 'AH.jpg'],
['two of spades', 2, '2S.jpg'], ['two of clubs', 2, '2C.jpg'], ['two of diamonds', 2, '2D.jpg'], ['two of hearts', 2, '2H.jpg'],
['three of spades', 3, '3S.jpg'], ['three of clubs', 3, '3C.jpg'], ['three of diamonds', 3, '3D.jpg'], ['three of hearts', 3, '3H.jpg'],
['four of spades', 4, '4S.jpg'], ['four of clubs', 4, '4C.jpg'], ['four of diamonds', 4, '4D.jpg'], ['four of hearts', 4, '4H.jpg'],
['five of spades', 5, '5S.jpg'], ['five of clubs', 5, '5C.jpg'], ['five of diamonds', 5, '5D.jpg'], ['five of hearts', 5, '5H.jpg'],
['six of spades', 6, '6S.jpg'], ['six of clubs', 6, '6C.jpg'], ['six of diamonds', 6, '6D.jpg'], ['six of hearts', 6, '6H.jpg'],
['seven of spades', 7, '7S.jpg'], ['seven of clubs', 7, '7C.jpg'], ['seven of diamonds', 7, '7D.jpg'], ['seven of hearts', 7, '7H.jpg'],
['eight of spades', 8, '8S.jpg'], ['eight of clubs', 8, '8C.jpg'], ['eight of diamonds', 8, '8D.jpg'], ['eight of hearts', 8, '8H.jpg'],
['nine of spades', 9, '9S.jpg'], ['nine of clubs', 9, '9C.jpg'], ['nine of diamonds', 9, '9D.jpg'], ['nine of hearts', 9, '9H.jpg'],
['ten of spades', 10, '10S.jpg'], ['ten of clubs', 10, '10C.jpg'], ['ten of diamonds', 10, '10D.jpg'], ['ten of hearts', 10, '10H.jpg'],
['jack of spades', 10, 'JS.jpg'], ['jack of clubs', 10, 'JC.jpg'], ['jack of diamonds', 10, 'JD.jpg'], ['jack of hearts', 10, 'JH.jpg'],
['queen of spades', 10, 'QS.jpg'], ['queen of clubs', 10, 'QC.jpg'], ['queen of diamonds', 10, 'QD.jpg'], ['queen of hearts', 10, 'QH.jpg'],
['king of spades', 10, 'KS.jpg'], ['king of clubs', 10, 'KC.jpg'], ['king of diamonds', 10, 'KD.jpg'], ['king of hearts', 10, 'KH.jpg']
]
// Captures index of deck so that cards are not repeated
let pol = [];
// dealer and player both push deck arrays to hold their cards
let dealer = [];
let player = [];
// playerTotal and DealerTotal hold values of hands and right index holds possible ace as 11 values
let playerTotal = [0,0];
let dealerTotal = [0,0];
// betAmount is amount wagered on current hand
let betAmount = 0;
// acnt is amount of money player has 
let acnt = 100;
// hand Number count the number of hands
let handNumber = 0;

// betA captures elemnt used to grap bet amount
let betA = document.getElementById('betAmnt');
// acntAmnt is used to show accnt Balance
let acntAmnt = document.getElementById('accntBal');
acntAmnt.innerText = " Account balence : " + acnt;
// starHand capture button to start new game
let startHand = document.getElementById('button');
// Turn startHand addEventListener so new hand can be started
startHand.addEventListener('click', beginPlay);
// playCards and dealerCards holds element that posts players cards to screen
let playCards = document.getElementById('plrCrds');
let dealerCards = document.getElementById('dlrCrds');
// hitHand and stayHand capture element used for hit and stay buttons
let hitHand = document.getElementById('hit-btn');
let stayHand = document.getElementById('stay-btn');

let div = document.getElementById('image1P');
let div2 = document.getElementById('image2P');
let div3 = document.getElementById('image3P');
let div4 = document.getElementById('image4P');
let div5 = document.getElementById('image5P');
let div6 = document.getElementById('image6P');
let divD = document.getElementById('image1D');
let divD2 = document.getElementById('image2D');
let divD3 = document.getElementById('image3D');
let divD4 = document.getElementById('image4D');
let divD5 = document.getElementById('image5D');
let divD6 = document.getElementById('image6D');

// First function that starts game
// uses setNewHand(), randomGen(),checkTwoCardWin()
function beginPlay(){    
    // Turn off startHand.removeEventListener
    startHand.removeEventListener('click', beginPlay);     
    // Capture the ammount wagered  
    betAmount = betA.lastElementChild.value;
    // Check is the ammount wagered is greater than the ammount available in their funds
    if(betAmount > acnt){
        // If bet ammount is improper, turn startHand.addEventListener back on, do not continue current hand
        startHand.addEventListener('click', beginPlay);       
    } else{
        // Bet ammount is proper, start to deal first hand
        // Increase handNumber
        handNumber += 1;
        console.log('HAND NUMBER : '+handNumber);
        console.log(acntAmnt.innerText);
        console.log('Bet amount : '+betAmount);
        // Reset values for new hand
        setNewHand();         
        // Turn acnt and betAmount into Int so that they can be subtracted
        let poiDDDD = parseInt(acnt);
        let poi2DDDD = parseInt(betAmount);
        let combine = poiDDDD - poi2DDDD;
        // Update new account balance
        acnt = combine;
        // Update new accoutnt balance to screen
        acntAmnt.innerText = " Account balence1 : " + acnt;
        console.log(acntAmnt.innerText);
        // Deal the first four cards
        dealer.push(randomGen());
        player.push(randomGen());
        dealer.push(randomGen());
        player.push(randomGen());       
        // Update the Player cards  to screen
        
        div.src = player[0][2];        
        div2.src = player[1][2];        
        playCards.innerText = "Player showing  a "+ player[0][0] + ", "+ player[1][0];    
        console.log(playCards.innerText);
        // Update the dealer card to screen
                       
        divD.src = dealer[0][2];
        dealerCards.innerText = "Dealer showing a "+ dealer[1][0];
        console.log(dealerCards.innerText);
        // Adjust playerTotal[1] if either of first two cards are an ace
        playerTotal[0] = player[0][1] + player[1][1];
        if(1 == player[0][1] || 1 == player[1][1]){
            playerTotal[1] = playerTotal[0] + 10;
        }
        dealerTotal[0] = dealer[0][1] + dealer[1][1];
        if(1 == dealer[0][1] || 1 == dealer[1][1]){
            dealerTotal[1] = dealerTotal[0] + 10;
        }        
        // Check if either dealer or player wins game in their first two cards
        checkTwoCardWin();
    }    
}
// Reset important variables for a new hand 
function setNewHand(){          
    pol.length = 0;
    dealer.length = 0;
    player.length = 0;
    playerTotal = [0,0];
    dealerTotal = [0,0];
    playCards.innerText = ""; 
    dealerCards.innerText = "";
    div.src = '';
    div2.src = '';
    div3.src = '';
    div4.src = '';
    div5.src = '';
    div6.src = '';
    divD.src = '';
    divD2.src = '';
    divD3.src = '';
    divD4.src = '';
    divD5.src = '';
    divD6.src = '';
}
// Generate a random card and return it
function randomGen(){    
    let lock = true;
    do{
        let iop = Math.floor(Math.random() * 52);
        let allow = true;
        for(let i = 0; i < pol.length; i++){
            if(iop == pol[i]){
                allow = false;
                break;
            }
        }        
        if(allow == true){
            pol.push(iop);
            let sub = deck[iop];
            return sub;
        }
    } while(lock == true);
}
// Check if either the player or dealer win the game in their first two cards
// Uses outputDealerPlayerValues()
function checkTwoCardWin(){    
    let bool = false;    
    if((21 == playerTotal[0] || 21 == playerTotal[1]) && (21 != dealerTotal[0] || 21 != dealerTotal[1])){
        // Setup for if player had 21 and dealer does not
        bool = true;
        
        divD2.src = dealer[1][2];        
        dealerCards.innerText = "Dealer showing a "+ dealer[1][0]+', '+dealer[0][0];
        console.log(dealerCards.innerText);
        outputDealerPlayerValues();
        let poiAA = parseInt(acnt);
        let poi2AA = parseInt(betAmount);
        let combine = poiAA + 2*poi2AA;
        acnt = combine;
        acntAmnt.innerText = " Account balence3 : " + acnt;   
        console.log(acntAmnt.innerText);     
    } else if((21 != playerTotal[0] || 21 != playerTotal[1]) && (21 == dealerTotal[0] || 21 == dealerTotal[1])){
        // Setup for if dealer has 21 and the player does not
        bool = true;
        divD2.src = dealer[0][2];
        dealerCards.innerText = "Dealer showing a "+ dealer[1][0]+', '+dealer[0][0];
        console.log(dealerCards.innerText);
        outputDealerPlayerValues();
        console.log(acntAmnt.innerText);
        startHand.addEventListener('click', beginPlay);
    } else if((21 == playerTotal[0] || 21 == playerTotal[1]) && (21 == dealerTotal[0] || 21 == dealerTotal[1])){
        // Setup for if player and dealer both have 21
        bool = true;
        divD2.src = dealer[0][2];
        dealerCards.innerText = "Dealer showing a "+ dealer[1][0]+', '+dealer[0][0];
        console.log(dealerCards.innerText);
        outputDealerPlayerValues();
        let poi = parseInt(acnt);
        let poi2 = parseInt(betAmount);
        let combine = poi + poi2;
        acnt = combine;
        acntAmnt.innerText = " Account balence2 : " + acnt;
        console.log(acntAmnt.innerText);
    }    
    if(bool != true){        
        // If bool != true, neither the dealer nor player have 21 in their first two cards, so turn
        // the hitHand and stayHand .addEventListener on to continue the hand
        hitHand.addEventListener('click', hitPlay);
        stayHand.addEventListener('click', stayPlay);
    }else{
        // If bool == true, hand is over, turn startHand.addEVentListener on to allow a new hand to be started
        startHand.addEventListener('click', beginPlay);
    }    
}
// Player chooses to stay, stayHand.EventListener is pushed for stayPlay()
// Uses updateDlrHnd(), checkWinner()
function stayPlay(){    
    // Turn off the hit and stay buttons
    hitHand.removeEventListener('click', hitPlay);
    stayHand.removeEventListener('click',stayPlay);
    // Function that checks if dealer should hit or stay
    updateDlrHnd();
    // Function that checks who wins the game
    checkWinner();
}
// Player chooses to hit, hitHand.addEventListener is pushed for hitPlay()
// Uses randomGen(), outputDealerPlayerValues(), updateDlrHnd(),checkWinner()
function hitPlay(){    
    // Turn off, ability to press hit and stay buttons
    hitHand.removeEventListener('click', hitPlay);
    stayHand.removeEventListener('click', stayPlay);
    // Deal a new card to player using randomGen()
    player.push(randomGen());



    // Find index of last card player was dealt
    let i = player.length - 1;
    // Add value of card to previous value
    playerTotal[0] += player[i][1];
    // Adjust if last card dealt was an ace
    if(1 == player[i][1]){
        playerTotal[1] = playerTotal[0] + 10;        
        if(21 < playerTotal[1]){
            // If using ace as an 11 goes over 21, use ace as a 1 and change playerTotal[1] value
            playerTotal[1] -= 10;
        }
    }
    // Add player card to the screen
    playCards.innerText += ", "+player[i][0];
    console.log(playCards.innerText);    
    if(21 < playerTotal[0]){
        // Check if player busted
        dealerCards.innerText = "Dealer showing a "+ dealer[1][0]+', '+dealer[0][0];
        console.log(dealerCards.innerText);
        outputDealerPlayerValues();
        console.log(acntAmnt.innerText);
        startHand.addEventListener('click', beginPlay);
    }else if(21 != playerTotal[0] && 21 != playerTotal[1]){
        // Player does not have 21, turn on hit and stay buttons so game can continue
        hitHand.addEventListener('click', hitPlay);
        stayHand.addEventListener('click',stayPlay);
    } else if(21 == playerTotal[0] || 21 == playerTotal[1]){
        // Player has 21
        // Function updateFlrHnd() adjust dealer hand till it is done
        updateDlrHnd();
        // Function checkWinner() checks to see who wins
        checkWinner();
    }    
}
// Function that updates dealer's hand to completion 
// Uses checkDealerHits(), randomGen() 
function updateDlrHnd(){    
    let doesDlrHt = true;
    // Show both dealer cards to the screen
    divD.src = dealer[0][2];
    dealerCards.innerText = "Dealer showing a "+ dealer[1][0]+', '+dealer[0][0];
    console.log(dealerCards.innerText);
    dealer.length = 0;

    let cnt = 0;
    // while loop repeats till dealer does not need to draw another card
    while(doesDlrHt == true){
        // Function checkDealerHits() checks if dealer has a value that he should stay or hit on
        if(checkDealerHits()){
            // If dealer should hit, us randomGen() to get next card
            dealer.push(randomGen());
            // Find the indec of last dealer card
            let i = dealer.length - 1;
            // Take the value of last dealer card and add it the dealerTotal
            dealerTotal[0] += dealer[i][1];
            dealerTotal[1] += dealer[i][1];
            // Adjust dealerTotal[1] is player has an ace, BUT, adjust it back if using ace as 11 goes over 21
            if(1 == dealer[i][1]){
                dealerTotal[1] = dealerTotal[0] + 10;
                if(21 < dealerTotal[1]){
                    dealerTotal[1] -= 10;
                }
            }
            cnt += 1;
            // Add dealer card to screen            
            dealerCards.innerText += ', '+dealer[i][0];
            console.log(dealerCards.innerText);
        } else{
            // Stop the while loop, no more cards need to be drawn
            doesDlrHt = false;
        }
    }
}
// Function that figures out who wins the game
// Uses outputDealerPlayerValues()
function checkWinner(){    
    // Find out which playerTotal and dealerTotal is better [0] or [1] and put value in pT and dT
    let pT = playerValue();
    let dT = dealerValueNoOver21();
    // Output dealer and player values to console
    outputDealerPlayerValues();    
    // Compare dT and pT
    if(pT == dT){
        // If there is a tie, Update acnt with returned bet
        let poiD = parseInt(acnt);
        let poi2D = parseInt(betAmount);
        let combine = poiD + poi2D;
        acnt = combine;
        // Update account balance to screen
        acntAmnt.innerText = " Account balence2 : " + acnt;
        console.log(acntAmnt.innerText);
    } else if(pT > dT){
        // If player wins update acnt with player bet back and players winning
        let poiDD = parseInt(acnt);
        let poi2DD = parseInt(betAmount);
        let combine = poiDD + 2*poi2DD;
        acnt = combine;
        // Update account balance to screen
        acntAmnt.innerText = " Account balence3 : " + acnt;
        console.log(acntAmnt.innerText);
    } else{
        // If player losses
        console.log(acntAmnt.innerText);
    }    
    // Hand is now over, turn on startHand.addEventListener to allow new game to start
    startHand.addEventListener('click', beginPlay);
}
// Output dealer and player values to console
// uses playerValue(), dealerValue
function outputDealerPlayerValues(){
    // Get best dealer and player values
    let pT = playerValue();
    let dT = dealerValue();
    console.log("Dealer Value : "+dT+"    Player Value : "+pT);
}
// Gets true value of dealers hand
function dealerValue(){
    let dT = 0;
    if(dealerTotal[0] >= dealerTotal[1]){
        dT = dealerTotal[0];
    } else{
        dT = dealerTotal[1];
    } 
    return dT;
}
// Gets best dealer value, does if dealer busts changes value to 1
function dealerValueNoOver21(){
    let dT = 0;
    if(dealerTotal[0] >= dealerTotal[1]){
        dT = dealerTotal[0];
    } else{
        dT = dealerTotal[1];
    } 
    if(21 < dT){
        dT = 1;
    }
    return dT;
}
// Get best player value
function playerValue(){
    let pT = 0;
    if(playerTotal[0] >= playerTotal[1]){
        pT = playerTotal[0];
    } else{
        pT = playerTotal[1];
    }
    return pT;
}
// Function that checks if dealer had value above 17
function checkDealerHits(){
    if(0 == dealerTotal[1]){
        if(17 > dealerTotal[0]){
            return true;
        }
        return false;
    }else{
        if(17 > dealerTotal[0] && 17 > dealerTotal[1]){
            return true;
        }
    }    
}