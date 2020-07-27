package Exercici04;


public class Restaurant_App {

	public static void main(String[] args) {
		
		// SET MENU (one method of three)
		menu.setMenuPlatsPreus("Escalivada", 95);
		menu.setMenuPlatsPreus("Butifarra", 50);
		menu.setMenuPlatsPreus("Fideua", 75);
		menu.setMenuPlatsPreus("Calçotada", 120);
		menu.setMenuPlatsPreus("Escudella", 175);
		
		// SHOW THE MENU IN CONSOLE
		menu.printMenu();
		
		// INSTANCES NEW CUSTOMERS AND GIVES THEM NAME AND TABLE
		client cliente1 = new client("Fauno", 12);
		client cliente2 = new client("Jose", 05);
		
		// TRIGGERS ORDERS METHOD
		cliente1.setPedido();
		cliente2.setPedido();
		
		// DISPLAY EACH CUSTOMER'S ORDERS, THEN YOUR DEBTS
		cliente1.getPedido();
		cliente1.getPressupost();
		cliente2.getPedido();
		cliente2.getPressupost();
		
		
		
	}
}
