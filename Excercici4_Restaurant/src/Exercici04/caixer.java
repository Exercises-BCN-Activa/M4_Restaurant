package Exercici04;

import java.util.List;

public class caixer {
	
// declaration of variable to store total purchase value
	private int total;
	
// declaration of variables to store the amount of notes for each euro value
	private int bitllet5, bitllet10, bitllet20, bitllet50, bitllet100, bitllet500;
	

	/**
	 * default constructor
	 */
	public caixer() {
		super();
	}


// 4 METHODS (Private:1, Public:3) of interaction with the CAIXER class -> GETTERS, SETTERS and two others
	
	/**
	 * METHOD[1/4] > 
	 * GET THE VARIABLE THAT STORES THE TOTAL PURCHASE VALUE
	 * @return int total
	 */
	public int getTotal() {
		return total;
	}


	/**
	 * METHOD[2/4] > 
	 * SET THE VARIABLE THAT STORES THE TOTAL PURCHASE VALUE
	 * @param ordres (list of strings)
	 */
	public void calculaOrdre(List<String> ordres) {
		for (String i:ordres) {
			for (int m = 0; m<5;m++) {
				if (menu.getMenuPlats()[m].equals(i)) {
					total += menu.getMenuPreus()[m];
				}
			}
		}
	}
	
	/**
	 * METHOD[3/4] > 
	 * SET THE VARIABLES THAT STORES THE AMOUT OF NOTES FOR EACH EURO VALUE
	 * this method is auxiliary and uses SWITCH 
	 * to assign value for each variable and print its value and quantity
	 * @param bitllet (number integer)
	 * @param quantitatBitllet (number integer)
	 */
	private void quantitatBitllets(int bitllet, int quantitatBitllet) {
		switch (bitllet) {
			case 500:
				bitllet500 = quantitatBitllet;
				System.out.println(bitllet500 + " bitllets de € 500,00");
				break;
			case 100:
				bitllet100 = quantitatBitllet;
				System.out.println(bitllet100 + " bitllets de € 100,00");
				break;
			case 50:
				bitllet50 = quantitatBitllet;
				System.out.println(bitllet50 + " bitllets de €  50,00");
				break;
			case 20:
				bitllet20 = quantitatBitllet;
				System.out.println(bitllet20 + " bitllets de €  20,00");
				break;
			case 10:
				bitllet10 = quantitatBitllet;
				System.out.println(bitllet10 + " bitllets de €  10,00");
				break;
			case 5:
				bitllet5 = quantitatBitllet;
				System.out.println(bitllet5 + " bitllets de €   5,00");
				break;
		}	
	}
	
	
	/**
	 * METHOD[4/4] > 
	 * calculates the value of each note from the TOTAL value,
	 * declares auxiliary variables to preserve total,
	 * uses buckle while to deduct the amount of each note,
	 * the bitllet variable has initial value of the highest note,
	 * then reduces its value as needed through IF,
	 * uses auxiliary method (quantitatBitllets) to store
	 * quantity of each note and print in console.
	 */
	public void quinsBitllets() {
		int resta = getTotal();
		int bitllet = 500;
		int quantitatBitllet = 0;
		while (bitllet > 0) {
			// condition that reduces the value of each note from the total
			// and calculates the amount of each one
			if (resta >= bitllet) {
				resta -= bitllet;
				quantitatBitllet++;}
			// condition that reduces the value of the note and invokes auxiliary method
			else {
				// condition to auxiliary method invocation
				if (quantitatBitllet > 0) {
					quantitatBitllets(bitllet, quantitatBitllet);
					quantitatBitllet = 0;}
				
				// sequence of conditions that reduces the value of the note
				if (bitllet == 500) {bitllet = 100;}
				else if (bitllet == 100) {bitllet = 50;} 
				else if (bitllet == 50) {bitllet = 20;}
				else if (bitllet == 20) {bitllet = 10;}
				else if (bitllet == 10) {bitllet = 5;}
				else if (bitllet == 5) {bitllet = 0;}
			}
		}
	}
	
	
}
