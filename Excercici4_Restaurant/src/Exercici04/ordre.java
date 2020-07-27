package Exercici04;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ordre {
	
	/**
	 * default constructor
	 */
	public ordre() {
		super();
	}

	/**
	 * list declaration to store orders
	 */
	private List<String> ordres = new ArrayList<String>();
	
	
// SCANNER method declaration to capture inputs
	private Scanner menjar = new Scanner(System.in);
	
	
// declaration of auxiliary variables for imputing and validating the order
	private String plat;
	private boolean verify = false;
	
	
// 5 METHODS (Private:3, Public:2) of interaction with the ORDRE class -> GETTERS, SETTERS and OTHERS
	
	/**
	 * METHOD[1/5] > 
	 * GET THE LIST THAT STORES ALL ORDERS
	 * @return List String ordres
	 */
	public List<String> getOrdres() {
		return ordres;
	}
	
	
	/**
	 * METHOD[2/5] > 
	 * SET ONE ORDER INPUT AND FORMAT ITS TEXT TO TITLE CASE AND REMOVE UNNECESSARY SPACES
	 */
	private void setPlat() {
		if (plat != null) {System.out.print("\nQue més vol per menjar: ");}
		plat = menjar.nextLine().trim();
		if (plat.isEmpty()) {plat = "erro";}
		plat = plat.substring(0,1).toUpperCase() + plat.substring(1).toLowerCase(); 	
	}
	
	/**
	 * METHOD[3/5] > 
	 * CHECKS IF THE ORDER INPUT EXISTS IN THE MENU >
	 * with method that ignores the case
	 */
	private void verifyPlat() {
		for (String m:menu.getMenuPlats()) {
			if (m.equalsIgnoreCase(plat)) {
				verify = true;}
		}
	}
	
	/**
	 * METHOD[4/5] > 
	 * ADD THE ORDER MADE TO THE LIST IF IT EXISTS,
	 * IF IT DOES NOT POINT AN ERROR
	 */
	private void ordrePlat() {
		if (verify) {
			ordres.add(plat);
			verify = false;
		} 
		else {System.out.println("\n"+"ERROR! el menjar demanat no existeix");}
	}
	

	/**
	 * METHOD[5/5] > 
	 * CONGREGES THE AUXILIARY METHODS 2,3,4/5 OF INPUT AND VALIDATION
	 * AND CREATES SYSTEMATIC LOOPING OF ORDERS BY WHILE
	 */
	public void setOrdres() {
		String pregunta = "";
		while (pregunta.isEmpty() || !"n".equalsIgnoreCase(String.valueOf(pregunta.trim().charAt(0)))) {
			setPlat();
			verifyPlat();
			ordrePlat();
			
			System.out.print("\n"+"Vol seguir demanant [si/no]: ");
			
			// asks if you want to keep ordering, eliminating unnecessary spaces
			pregunta = menjar.nextLine().trim();	

		} 
	}
}