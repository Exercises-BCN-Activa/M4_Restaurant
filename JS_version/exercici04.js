//capturing constants for html elements
const OUTPUTMENU = document.getElementById("outputMENU");
const OUTPUTCLIENT = document.getElementById("outputCLIENT");
const OUTPUTORDRE = document.getElementById("outputORDRE");

/* 
* declaration of letter and number validation constants
* letters to validate customer names and dishes
* numbers to validate array and table positions
*/
const PARAULAS = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ·'\s]+$/;
const NUMEROS = /^[0-9]/;

/* 
* declaration of constant arrays to store everyday
* @CLIENTSACTIUS = active clients
* @menuPlats = menu dishes names
* @menuPreus = price of menu dishes
*/
const CLIENTSACTIUS = new Array();
const menuPlats = new Array(), menuPreus = new Array();

/* 
* function that checks the status of the menu
* returns information if menu is empty or not
* if menu is empty it suggests the possibility of
* inserting dishes invoking the method @inserir()
*/
function consultar() {
    if (menuPlats.length == 0) {
        const quest = confirm("No hi ha plats disponibles.\nVols inserir plats al menú?");
        if (quest == true) {
            inserir();
            printMenu(OUTPUTMENU);
        } else {
            OUTPUTMENU.innerHTML = "<h4>no hi ha plats disponibles</h4>";
        }
    } else {
        printMenu(OUTPUTMENU);
    }
} // END: consultar()

/* 
* function that inserts menu items within a limit of 5 positions
* asks if you want specific or not for generic position:
* it would be either empty or the last replacing the first
* after inserting the dish invokes the method @consultar()
*/
function inserir() {
    const quest = confirm("Voleu establir una posició de menú específica?")
    let PLAT, PREU, POSICIO;

    do {
        PLAT = prompt("Nom del plat").trim();
        PLAT = PLAT.charAt(0).toUpperCase() + PLAT.slice(1).toLowerCase();
    } while (!PARAULAS.test(PLAT));
    do {
        PREU = prompt(`Preu del plat ${PLAT}`).trim();
    } while (!NUMEROS.test(PREU));

    if (quest == true) {
        do {
            POSICIO = prompt("Posició del plat al menú: 1 a 5").trim();
        } while (!NUMEROS.test(POSICIO));
        setMenuEspecificPosition(PLAT, PREU, POSICIO);
    } else {
        setMenuUndefinedPosition(PLAT, PREU);
    }
    consultar()
} // END: inserir() 

/* 
* function that inserts a generic everyday menu
* when finished inserting shows inserted items
*/
function patro() {
    setMenuLastPosition("Escudella", 55);
    setMenuLastPosition("Escalivada", 95);
    setMenuLastPosition("Butifarra", 50);
    setMenuLastPosition("Fideua", 160);
    setMenuLastPosition("Calçotada", 320);
    alert(`Menú Estàndard:
    ${menuPlats[0]} - €${menuPreus[0]}
    ${menuPlats[1]} - €${menuPreus[1]}
    ${menuPlats[2]} - €${menuPreus[2]}
    ${menuPlats[3]} - €${menuPreus[3]}
    ${menuPlats[4]} - €${menuPreus[4]}`);
} // END: patro()

/* 
* function that empties the menu
* cleans not only the arrays but also the screen
*/
function buidar() {
    menuPlats.splice(0, menuPlats.length);
    menuPreus.splice(0, menuPreus.length);
    OUTPUTMENU.innerHTML = "";
    alert("ja no hi ha plats al menú")
} // END: buidar()

/* 
* function that inserts a new customer or show active customers
* if it is to show, prints the clients and their tables on the screen
* if inserting, request name and table of client
* there cannot be two customers at the same table, with the same name
*/
function registrar() {
    // asks if the user wants to register a new customer
    // if the answer is no it will show active customers
    const quest = confirm("vols registrar un nou client?")

    if (quest == true) {
        let NOM, TAULA, CLIENT;

        do { // initializes the name variable
            NOM = prompt("Nom del client").trim();
            NOM = NOM.charAt(0).toUpperCase() + NOM.slice(1).toLowerCase();
        } while (!PARAULAS.test(NOM) || NomsTaulasActius().includes(NOM)); 
        // condition of being letters or does not already exist in the register

        do { // initializes the table variable
            TAULA = prompt(`Taula del client ${NOM}`).trim();
        } while (!NUMEROS.test(TAULA) || NomsTaulasActius().includes(TAULA)); 
        // condition of being numbers or does not already exist in the register

        CLIENT = new client(); //instantiate new client
        CLIENT.setNom(NOM); // assign customer name
        CLIENT.setTaula(TAULA); // assign customer table
        CLIENTSACTIUS.push(CLIENT); // adds the customer to the daily list of active calls
        clientsActius(); //after adding invokes method that displays active clients
    } else {
        clientsActius();
    }
} // END: registrar()

/* 
* function that introduces customer orders
* first asks if you want to select a customer by name or table
* then asks which dish you want to be inserted into the account
* confirm after inserting customer order
*/
function demanar() {
    //first check for active customers
    // if you don’t invoke the method that shows active customers
    if (NomsTaulasActius().length == 0) {
        clientsActius();
    } else {
        // method that prompts the user to enter a list by name or table
        let CLIENT = quinClient(); 
        let PLAT, NOM, TAULA;
        // then assign the variables name and table of the client
        NOM = CLIENT.getNom();
        TAULA = CLIENT.getTaula();

        do { //shows the menu and ask the user to assign a dish to the customer
            // receives user input
            PLAT = prompt(`Plat per al client ${NOM}:
            ${menuPlats[0]} - €${menuPreus[0]}
            ${menuPlats[1]} - €${menuPreus[1]}
            ${menuPlats[2]} - €${menuPreus[2]}
            ${menuPlats[3]} - €${menuPreus[3]}
            ${menuPlats[4]} - €${menuPreus[4]}`).trim();

            //format the input
            PLAT = PLAT.charAt(0).toUpperCase() + PLAT.slice(1).toLowerCase();
        } while (!menuPlats.includes(PLAT));
        // validates if the dish exists in the menu

        //add the order to the customer list
        CLIENT.getSollicituds().setOrdres(PLAT);

        //alerts the user that the order has been executed
        alert(`${NOM} de la Taula ${TAULA} va ordenar: ` +
             CLIENT.getSollicituds().getOrdres().slice(-1)[0]);
    }
} // END: demanar()

/* 
* function that checks customer orders
* first asks if you want to select a customer by name or table
* prints on-screen customer orders that are still active
*/
function comandes() {
    //first check for active customers
    // if you don’t invoke the method that shows active customers
    if (NomsTaulasActius().length == 0) {
        clientsActius();
    } else {
        // method that prompts the user to enter a client by name or table
        let CLIENT = quinClient();
        
        //sequence of commands to print on the screen
        //header
        OUTPUTORDRE.innerHTML = "--------------------"
        OUTPUTORDRE.innerHTML += `<p><strong>Comandes de ${CLIENT.getNom()} -
                                Taula: ${CLIENT.getTaula()}<strong></p><ol>`;

        //buckle FOR to scan the active order list
        for (let x=0;x<CLIENT.getSollicituds().getOrdres().length;x++){
            OUTPUTORDRE.innerHTML += `<li>${CLIENT.getSollicituds().getOrdres()[x]}</li>`;
        }

        //conditional that evaluates whether the order list is null 
        //because the customer has paid part of the bill
        if (CLIENT.getSollicituds().getOrdres().length == 0) {
            OUTPUTORDRE.innerHTML += "<li>cap comandes noves</li>";

            //conditional warning that the customer still has debts despite the empty list
            if (CLIENT.getDebit() > 0) {
                alert(`${CLIENT.getNom()} té part pagada del seu compte i encara té una deute de ${CLIENT.getDebit()} euros`)
            }
        }
        // end of sequence of commands to print on the screen
        OUTPUTORDRE.innerHTML += "</ol>"+"--------------------";
    }
} // END: comandes()

/* 
* accessory function that returns:
* an array of the names and tables of active customers
* scans the list of customers for the day, finds active customers
*/
function NomsTaulasActius() {
    //creates new array to store names and tables
    let arrayNomsTaulasActius = new Array();

    // buckle FOR to fill array if client is active
    for (let x=0;x<CLIENTSACTIUS.length;x++) {
        if (CLIENTSACTIUS[x].getStatus()) {
        arrayNomsTaulasActius.push(CLIENTSACTIUS[x].getNom());
        arrayNomsTaulasActius.push(CLIENTSACTIUS[x].getTaula());
        }
    }

    //returns array after filling condition
    return arrayNomsTaulasActius;
} // END: NomsTaulasActius()

/* 
* function that prints active clients on the screen
* when the customers button is clicked,
* if you do not want to insert a new customer
*/
function clientsActius(){
    //first check for active customers
    // if you don’t shows on the screen that there are no active customers
    //print commands only
    if (NomsTaulasActius().length == 0) {
        OUTPUTCLIENT.innerHTML = "--------------------"
                                + "<h4>Cap Clients Actius</h4>"
                                + "--------------------";
    } else {
        OUTPUTCLIENT.innerHTML = "--------------------"
                                + "<p><strong>Clients Actius</strong></p><ol>";
        
        // buckle FOR to fill array if client is active
        for (let x=0;x<CLIENTSACTIUS.length;x++) {
            if (CLIENTSACTIUS[x].getStatus()) {
            OUTPUTCLIENT.innerHTML += `<li>Client: <strong>${CLIENTSACTIUS[x].getNom()}</strong> 
            - Taula: <strong>${CLIENTSACTIUS[x].getTaula()}</strong></li>`;
            }
        }
        OUTPUTCLIENT.innerHTML += "</ol>"+"--------------------";
    }
} // END: clientsActius()

/* 
* accessory function that returns the client to a variable
* is used in the functions that need to define the client
* place and consult orders, close and pay bills
*/
function quinClient() {
    //asks if user wants to define customer by name
    //if not, asks the user to enter the table price
    const quest = confirm("Voleu seleccionar el client pel seu nom?");
    let CLIENT; // declares the customer variable

    if (quest == true) {
        let NOM; // declares the name variable

        do { //ask the user to enter the customer's name
            NOM = prompt("nom del client").trim(); //input that clears spaces
            // formatting for first uppercase character
            NOM = NOM.charAt(0).toUpperCase() + NOM.slice(1).toLowerCase(); 
        } while (!NomsTaulasActius().includes(NOM));
        //condition is the name of the customer exists in the list of active customers

        // buckle FOR to fill name variable if has the same name input by the user
        for (let x=0;x<CLIENTSACTIUS.length;x++) {
            if (CLIENTSACTIUS[x].getNom() == NOM) {
                CLIENT = CLIENTSACTIUS[x];
            }
        }
    } else { 
        let TAULA; //declares the table variable

        do { // ask the user to enter the customer's table
            TAULA = prompt("taula del client").trim(); //input that clears spaces
        } while (!NomsTaulasActius().includes(TAULA));
        //condition is the table of the customer exists in the list of active customers

        // buckle FOR to fill table variable if has the same table input by the user
        for (let x=0;x<CLIENTSACTIUS.length;x++) {
            if (CLIENTSACTIUS[x].getTaula() == TAULA) {
                CLIENT = CLIENTSACTIUS[x];
            }
        }
    }
    return CLIENT;
}// END: quinClient()

/* 
* function that sets the customer's total amount payable
* first asks if you want to select a customer by name or table
* then scans the customer's order list, compares it with menu and shows the total
* asks if the customer wants to offer you bank note suggestions to split the bill
*/
function tancar(){
    //first check for active customers
    // if you don’t invoke the method that shows active customers
    if (NomsTaulasActius().length == 0) {
        clientsActius();
    } else {
        // method that prompts the user to enter a client by name or table
        let CLIENT = quinClient();

        // invokes CLIENT method to set the total value
        CLIENT.getFactura().setTotal(CLIENT.getSollicituds().getOrdres());

        // value impression
        OUTPUTCLIENT.innerHTML = "--------------------"
        OUTPUTCLIENT.innerHTML += `<p><strong>Comandes de ${CLIENT.getNom()} -
                                Taula: ${CLIENT.getTaula()}<strong></p>`;
        OUTPUTCLIENT.innerHTML += `<p>TOTAL: €${CLIENT.getFactura().getTotal()}</p>`;
        OUTPUTCLIENT.innerHTML += "--------------------"

        // asks if the client wants a banknotes suggestion
        const quest = confirm("Vols suggeriment de bitllets?")
        if (quest == true) {
            CLIENT.getFactura().quinsBitllets(); //invokes CLIENT>CAIXER method
        }
    }
} // END: tancar()

/* 
* function that performs the payment itself
* first asks if you want to select a customer by name or table
* deduct from the total amount the amount paid
* check that there is some debt left over
* if you don't have any debts, you lose the status of active customer
* transfers order history to customer history list
* if debits are left, keep the account open, but empty active order list
*/
function pagar() {
    //first check for active customers
    // if you don’t invoke the method that shows active customers
    if (NomsTaulasActius().length == 0) {
        clientsActius();
    } else {
        // method that prompts the user to enter a client by name or table
        let CLIENT = quinClient();

        //asks if the customer wants to pay at that moment
        const quest = confirm(`${CLIENT.getNom()}, vols pagar ara?`);
        if (quest == true) {
            let VALOR;
            do { //declare the amount the customer will pay
                VALOR = prompt(`el vostre compte ha donat el total de €${CLIENT.getFactura().getTotal()}`).trim();
            } while (!NUMEROS.test(VALOR) && VALOR <= CLIENT.getFactura().getTotal());
            //condition of the amount that is number and less than or equal to the value of the bill

            // invoka method that performs payment process
            CLIENT.setStatus(VALOR);
            //conditional that checks if debts remain
            if (CLIENT.getStatus()) {
                alert(`${CLIENT.getNom()}, encara teniu deutes: ${CLIENT.getDebit()}`)
            } else {
                alert(`${CLIENT.getNom()}, tot està bé! Torni sovint!`)
            }
            OUTPUTORDRE.innerHTML = ""; // clears the screen after paying
        }
    }
} // END: pagar()

//                                      //
// OPERATING AND STRUCTURING FUNCTIONS //
//                                    //

/*
 * SETTER OF TWO ARRAYS (MEALS & PRICES) >
 * filling menu without specific position.
 * conditional IF searches for last position to replace
 * eliminating the first position and inserting the last
 * @plat (string dish name, between double quotes "name")
 * @preu (integer dish price, without comma or zero decimals)
 */
setMenuLastPosition = function(plat, preu) {
    let position;
    //condicional to set position variable if menu is full
    if (menuPlats.length >= 5) { 
        menuPlats.length = 5;
        position = 4;
        menuPlats.splice(0,1);
        menuPreus.splice(0,1);
    }
    // if there is still space for the 5 positions
    else {
        position = menuPlats.length
    };
    //add to the array of dishes and prices
    menuPlats[position] = plat; 
    menuPreus[position] = preu;
}; // END: setMenuLastPosition()

/*
* SETTER OF TWO ARRAYS (MEALS & PRICES) >
* filling menu with specific position,
* user friendly position, starting with 1.
* @posicio (integer number from 1 to 5)
* @plat (string dish name, between double quotes "name")
* @preu (integer dish price, without comma or zero decimals)
*/
setMenuEspecificPosition = function (plat, preu, position) {
    //sets position for number in programmable position
    let pos = parseInt(position)-1;
    // condition that validates if the position is greater than the length
    if (pos > 4 || position == undefined) {
        //positive case calls for another method
        setMenuLastPosition(plat, preu);
    }
    //negative case add to the array of dishes and prices
    else {
        menuPlats[pos] = plat;
        menuPreus[pos] = preu;
    }
}; // END: setMenuEspecificPosition

/*
 * SETTER OF TWO ARRAYS (MEALS & PRICES) >
 * filling menu without specific position.
 * conditional IF searches for null position or invoke last position method
 * @plat (string dish name, between double quotes "name")
 * @preu (integer dish price, without comma or zero decimals)
 */
setMenuUndefinedPosition = function(plat, preu) {
    if (menuPlats[0] == undefined) {
        menuPlats[0] = plat;
        menuPreus[0] = preu;
    } else if (menuPlats[1] == undefined) {
        menuPlats[1] = plat;
        menuPreus[1] = preu;
    } else if (menuPlats[2] == undefined) {
        menuPlats[2] = plat;
        menuPreus[2] = preu;
    } else if (menuPlats[3] == undefined) {
        menuPlats[3] = plat;
        menuPreus[3] = preu;
    } else if (menuPlats[4] == undefined) {
        menuPlats[4] = plat;
        menuPreus[4] = preu;
    } else {
        setMenuLastPosition(plat, preu);
    }
}; // END: setMenuUndefinedPosition()

/*
 * PRINT(similar toString) with tabulation to display in console and screen,
 * use of formating print to insert the tabs and header/footer,
 * buckle FOR to print each meal with your specific price, with euro sign.
 * @output parameter required to perform the html transformation and print  
 */
printMenu = function(output) {
    console.log("------- MENU -------");
    console.log("--------------------");

    output.innerHTML = "------- MENU -------" + "<br>";
    output.innerHTML += "--------------------" + "<br>";

    for (let p=0; p<menuPlats.length; p++) {     
        console.log(`${p+1} | ${menuPlats[p]} - €${menuPreus[p]} |`);
        
        output.innerHTML += `${p+1} | ${menuPlats[p]} - €${menuPreus[p]} |` + "<br>";
    }
    
    console.log("--------------------");

    output.innerHTML += "--------------------" + "<br>";
}; // END: printMenu

/*
 * function creates in payment object and processes payment structures
 * has internal accessory functions that processes payment object
 * @getTotal: returns the total value at that time
 * @setTotal: scans order list and compares with menu setting price
 * @setPagament: deducts from the total amount the amount reported as payment
 * @quinsBitllets: verifies the subdivision of the total value in the euro banknotes values
 */
function caixer() {
    let total = new Number;
    let bitllet5, bitllet10, bitllet20, bitllet50, bitllet100, bitllet500;
    
    this.getTotal = function () {
        return total;
    };

    this.setTotal = function (ordres) {
        for (let p=0; p<ordres.length; p++) {
            for (let m=0; m<menuPlats.length; m++) {
                if (ordres[p] === menuPlats[m]) {
                    total += Number(menuPreus[m]);
                }
            }
        }
    };

    this.setPagament = function (valor) {
        total -= valor;
    }

    this.quinsBitllets = function() {
        let resta = total;
        let bitllet = 500;
        let quantitatBitllet = 0
        while (bitllet > 0) {
            if (resta >= bitllet) {
                resta -= bitllet;
                quantitatBitllet++;
            } else {
                if (quantitatBitllet > 0) {
                    // quantitatBitllets(bitllet, quantitatBitllet);
                    console.log(`${quantitatBitllet} bitllets de €${bitllet}`);
                    OUTPUTCLIENT.innerHTML += `<p>${quantitatBitllet} bitllets de €${bitllet}</p>`
                }
                if (bitllet == 500) {bitllet = 100; bitllet500 = quantitatBitllet}
				else if (bitllet == 100) {bitllet = 50; bitllet100 = quantitatBitllet} 
				else if (bitllet == 50) {bitllet = 20; bitllet50 = quantitatBitllet}
				else if (bitllet == 20) {bitllet = 10; bitllet20 = quantitatBitllet}
                else if (bitllet == 10) {bitllet = 5; bitllet10 = quantitatBitllet}
                else if (bitllet == 5) {bitllet = 0; bitllet5 = quantitatBitllet}
                quantitatBitllet = 0;
            } 
        } 
    }
    
} // caixer final

/*
 * function creates in order object and processes order structures
 * has internal accessory functions that processes order object
 * @getOrdres: returns the orders values at that time
 * @setOrdres: uses internal methods to format, validate and configure the order in the active list
 *              @setPlat: formats so that the name of the dish is appropriate
 *              @verifyPlat: check if the dish exists in the menu
 * @setPagament: makes a copy of the active list to the history list r empties the active list
 * @getOrdresPassat: returns the list of past orders: array of arrays
 */
function ordre() {
    let ordres = new Array, ordresPassat = new Array;
    let verify = false;
    let plat = new String;
    this.getOrdres = function () {
        return ordres;
    }
    this.setOrdres = function(sollicitud) {
        plat = setPlat(sollicitud);
        verifyPlat();
        if (verify == true) {
            position = ordres.length;
            ordres[position] = plat;
            verify = false;
        } else {
            console.log(`erro! aquest menjar (${plat}) no exiteix al menú!`);   
        }  
    }
    function setPlat(menjar){
        let menjarF = menjar.trim().charAt(0).toUpperCase() + menjar.trim().slice(1).toLowerCase();
        return menjarF;
    }
    function verifyPlat() {
        for (let p=0; p<menuPlats.length; p++) {
            if (menuPlats[p] === plat) {
                verify = true;
            }
        }
    }

    this.setPagament = function() {
        ordresPassat.push(ordres);
        ordres.splice(0, ordres.length);
    }    

    this.getOrdresPassat = function () {
        return ordresPassat;
    }
} // ordre final

/*
 * function creates in client object, the principal funcition
 * has internal accessory public functions that processes all objects
 * stores name, table, payment amount, debits, active customer status,
 * date of creation, order object and payment object
 * only has 3 own set methods, all others are inherited or getters:
 * @setNom: receives parameter that is assigned to name
 * @setTaula: receives parameter that is assigned to table
 * @setStatus: receives parameter that is added to the amount paid, 
            * deducts from the total (payment object), 
            * activates the method of clearing the active list of orders, 
            * sets the variable debit and if it is equal to 0 
            * it eliminates the status of active customer.
 */
function client() {
    let nom, taula, pagat, debit, facturaActiu = true;
    let sollicituds = new ordre(), factura = new caixer();
    const data = new Date();

    this.getNom = function () {
        return nom;
    }
    this.setNom = function(name) {
        nom = name;
    }
    this.getTaula = function () {
        return taula;
    }
    this.setTaula = function(numero) {
        taula = numero;
    }
    this.getSollicituds = function() {
        return sollicituds;
    }
    this.getFactura = function() {
        return factura;
    }
    this.getData = function() {
        return data;
    }
    this.getStatus = function() {
        return facturaActiu;
    }
    this.setStatus = function(valor) {
        pagat += valor
        factura.setPagament(valor);
        debit = factura.getTotal();
        sollicituds.setPagament();
        if (debit == 0) {
            facturaActiu = false;
        }
    }
    this.getDebit = function() {
        return debit;
    }
} // client final