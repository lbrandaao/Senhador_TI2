package model;

import java.io.Serializable;

public class Senha implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id_usuario;
	private int id_senha;
	private String aplicacao;
	private String valor;
	
	public Senha() {
		id_usuario = -1;
		id_senha = -1;
		aplicacao = "";
		valor = "";
	}

	public Senha(int id_usuario, int id_senha, String aplicacao, String valor) {
		setIdUsuario(id_usuario);
		setIdSenha(id_senha);
		setAplicacao(aplicacao);
		setValor(valor);
	}		
	
	public int getIdUsuario() {
		return id_usuario;
	}

	public void setIdUsuario(int id_usuario) {
		this.id_usuario = id_usuario;
	}
	
	public int getIdSenha() {
		return id_senha;
	}

	public void setIdSenha(int id_senha) {
		this.id_senha = id_senha;
	}

	
	public String getAplicacao() {
		return aplicacao;
	}

	public void setAplicacao(String aplicacao) {
		this.aplicacao = aplicacao;
	}
	
	
	public String getValor() {
		return valor;
	}

	public void setValor(String valor) {
		this.valor = valor;
	}

	
	/**
	 * Método sobreposto da classe Object. É executado quando um objeto precisa
	 * ser exibido na forma de String.
	 */
	@Override
	public String toString() {
		return "Aplicação: " + aplicacao + "   Senha: " + valor;
	}
	
	@Override
	public boolean equals(Object obj) {
		return ((this.getIdUsuario() == ((Senha) obj).getIdUsuario()) && (this.getIdSenha() == ((Senha) obj).getIdSenha()));
	}	
}