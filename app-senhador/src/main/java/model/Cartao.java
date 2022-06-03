package model;

import java.util.*;

public class Cartao {
	private int id_usuario;
	private int id_cartao;
	private String numero;
	private String nome_impresso;
	private Date data_validade;	
	private int numero_seguranca;
	
	public Cartao() {
		id_usuario = -1;
		id_cartao = -1;
		numero = "";
		nome_impresso = "";
		data_validade = new Date();
		numero_seguranca = -1;
		
	}

	public Cartao(int idUsuario, int id_cartao, String numero, String nomeImpresso, Date v, int numeroDeSeguranca) {
		setIdUsuario(idUsuario);
		setIdCartao(id_cartao);
		setNumero(numero);
		setNomeImpresso(nomeImpresso);
		setDataValidade(v);
		setNumeroDeSeguranca(numeroDeSeguranca);
	}		
	
	public int getIdUsuario() {
		return id_usuario;
	}

	public void setIdUsuario(int idUsuario) {
		this.id_usuario = idUsuario;
	}
	
	public int getIdCartao() {
		return id_cartao;
	}
	
	public void setIdCartao(int idCartao) {
		this.id_cartao = idCartao;
	}
	
	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getNomeImpresso() {
		return nome_impresso;
	}

	public void setNomeImpresso(String nomeImpresso) {
		this.nome_impresso = nomeImpresso;
	}

	public Date getDataValidade() {
		return data_validade;
	}

	public void setDataValidade(Date dataValidade) {
		this.data_validade = dataValidade;
	}

	public int getNumeroDeSeguranca() {
		return numero_seguranca;
	}

	public void setNumeroDeSeguranca(int numeroDeSeguranca) {
		this.numero_seguranca = numeroDeSeguranca;
	}


	
	@Override
	public String toString() {
		return "Cartao: " + numero + "   Nome Impresso: " + nome_impresso +  "   Data de Validade: " + data_validade + "   Numero De Seguranca: "
				+ numero_seguranca;
	}
	
	@Override
	public boolean equals(Object obj) {
		return (this.getIdUsuario() == ((Cartao) obj).getIdUsuario());
	}	
}