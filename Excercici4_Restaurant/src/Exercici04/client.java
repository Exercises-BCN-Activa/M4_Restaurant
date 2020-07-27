package Exercici04;

public class client {
	private ordre pedido = new ordre();
	private caixer pressupost = new caixer();
	private String nom;
	private int taula;
	

	/**
	 * Generic Constructor
	 */
	public client() {
		super();
		nom = "Client X";
		taula = 999;

	}

	/**
	 * Constructor with name and table number
	 * @param nom > string name, between double quotes "name"
	 * @param taula > integer number
	 */
	public client(String nom, int taula) {
		super();
		this.nom = nom;
		this.taula = taula;
	}

	/**
	 * prints the customer's order list
	 */
	public void getPedido() {
		if (pedido.getOrdres().size() == 0) {
			System.out.println("el client " + getNom() + " no va demanar res");
		}
		else {
			System.out.println("El client " + getNom() + " va ordenar els següents plats:");
			int number = 1;
			for (String iten:pedido.getOrdres()) {
				System.out.println(number + " - " + iten);
				number++;
			}
			System.out.println("-------______-------\n");
		}
		
	}

	/**
	 * Prints the total amount of the customer's purchase
	 * and which tickets to use to pay
	 */
	public void getPressupost() {
		setPressupost();
		if (pressupost.getTotal() == 0) {
			System.out.println("la taula " + getTaula() + " no ha de pagar res");
		}
		else {
			System.out.println("L’import total de la taula " + getTaula() + " va ser:");
			System.out.printf("%s%d%s\n",">>>>>> € ",pressupost.getTotal(),",00 <<<<<<");
			pressupost.quinsBitllets();
			System.out.println("-------______-------\n");
		}
	}

	/**
	 * @return string client name
	 */
	public String getNom() {
		return nom;
	}

	/**
	 * @return integer table number
	 */
	public int getTaula() {
		return taula;
	}

	/**
	 * triggers the ordering and validation methods in looping
	 */
	public void setPedido() {
		System.out.print(getNom() + ", que es vol per menjar: ");
		pedido.setOrdres();
	}

	/**
	 * reviews customer orders and calculates their total value
	 */
	public void setPressupost() {
		pressupost.calculaOrdre(pedido.getOrdres());
	}

	/**
	 * assign name
	 * @param nom > string client name
	 */
	public void setNom(String nom) {
		this.nom = nom;
	}

	/**
	 * assign table number
	 * @param taula > integer number
	 */
	public void setTaula(int taula) {
		this.taula = taula;
	}
	
	
	
	

}
