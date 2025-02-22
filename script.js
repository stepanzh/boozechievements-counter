function setCounterProperties(node, maxCount, icon){
    Object.defineProperty(node, "maxCount",
        {value: maxCount}
    );
    Object.defineProperty(node, "currentCount",
        {
            get: function(){
                return this._currentCount;
            },
            set: function(a){
                if (a < 0 || a > this.maxCount){
                    console.log("the value " + a + " out of range: " + "0 " + this.maxCount);
                    return
                }
                this.innerText = a;// + " / " + this.maxCount;
                this._currentCount = a;
            }
        }
    );
    Object.defineProperty(node, "currentTurn",
        {
            get: function() { return this._currentTurns },
            set: function(a) {
                    this._currentTurns = a;
                    // this._icon.style.transform = "translate(-50%,-50%) rotate(" + this._currentTurns + "turn)";
                 }
        }
    );
    Object.defineProperty(node, "_icon", {value: icon});
    node.tick_up = function(){
        this.currentCount += 1;
        this.currentTurn  += 1;
    }
    node.tick_down = function(){
        this.currentCount -= 1;
        this.currentTurn  -= 1;
    }
    node.currentTurn = 0;
    node.currentCount = 0;
}

function defineCountHandlersForCheckBox(checkbox, handler){
    checkbox.countHandler = handler;
    checkbox.onchange = function(){
        if (this.checked){ // count++
            this.countHandler.tick_up();
        } else {
            this.countHandler.tick_down();
        }
    }
}

function syncCardStatus(card, checkbox) {
  if (checkbox.checked) {
    card.classList.add("checked");
  } else {
    card.classList.remove("checked");
  }
}

// ------------------------------ //

{
    let Counters = {};

    let Statuses = document.getElementsByClassName("class-counter");
    for (let i = 0; i < Statuses.length; i++){
        let counter = Statuses[i];
        for (let j = 0; j < counter.childNodes.length; j++){
            let node = counter.childNodes[j];
            if (node.className == "class-counter__counter"){
                Counters[counter.id] = node;
                let iconObj = node.previousSibling.previousSibling;
                setCounterProperties(
                    node,
                    parseInt(counter.dataset["maxCount"]),
                    iconObj
                );
                break;
            }
        }
    }

    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++){
        let card = cards[i];
        let checkbox = card.getElementsByTagName("input")[0];
        let counterClass = card.dataset["cardType"];

        let handler = Counters[counterClass];

        defineCountHandlersForCheckBox(checkbox, handler);

        // DEBUG.
        // checkbox.checked = true;

        if (checkbox.checked){ // is this slow?
            handler.tick_up();
        }
        checkbox.addEventListener("change", function () {
          syncCardStatus(card, this);
        });
        syncCardStatus(card, checkbox);
    }
}

console.log("Оригинал .png:\n'Special for 2ch.hk @2015. Создано Механиком для блага и во имя Легиона при содействии Анонимуса. Версия 3.2, исправленная.'")
