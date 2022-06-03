package model;

public class Usuario {
	private int id_usuario;
	private String email;
	private String senhamestra;
	private String plano;
	
	public Usuario() {
		id_usuario = -1;
		email = "";
		senhamestra = "";
		plano = "";
	}

	public Usuario(int id, String email, String senhamestra, String plano) {
		setIdUsuario(id);
		setEmail(email);
		setSenhamestra(senhamestra);
		setPlano(plano);
	}		
	
	public int getIdUsuario() {
		return id_usuario;
	}

	public void setIdUsuario(int id) {
		this.id_usuario = id;
	}

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenhamestra() {
		return senhamestra;
	}

	public void setSenhamestra(String senhamestra) {
		this.senhamestra = senhamestra;
	}

	public String getPlano() {
		return plano;
	}
	
	public void setPlano(String plano) {
		this.plano = plano;
	}


	/**
	 * Método sobreposto da classe Object. É executado quando um objeto precisa
	 * ser exibido na forma de String.
	 */
	@Override
	public String toString() {
		return "ID: " + id_usuario + "  E-mail" + email + "   senhamestra: " + senhamestra+ "   Plano: "
				+ plano;
	}
	
	@Override
	public boolean equals(Object obj) {
		return (this.getIdUsuario() == ((Usuario) obj).getIdUsuario());
	}	
}