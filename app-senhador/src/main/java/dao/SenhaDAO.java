package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.Senha;


public class SenhaDAO extends DAO {
	
	public SenhaDAO() {
		super();
		conectar();
	}
	
	
	public void finalize() {
		close();
	}
	
	public boolean insert(Senha senha) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			st.executeUpdate("INSERT INTO senha (id_usuario, aplicacao, valor) "
					       + "VALUES ("+ senha.getIdUsuario()+ ", '" + senha.getAplicacao() + "', '"  
					       + senha.getValor() + "');");
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
	
	
	public Senha get(int id_usuario, int id_senha) {
		Senha senha = null;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM senha WHERE id_usuario="+id_usuario+" AND id_senha="+id_senha+";";
			ResultSet rs = st.executeQuery(sql);	
	        if(rs.next()){            
	        	 senha = new Senha(rs.getInt("id_usuario"), rs.getInt("id_senha"), 
	        			 	   		 rs.getString("aplicacao"), rs.getString("valor"));
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return senha;
	}
	
	public List<Senha> getSenhasByUsuario(int id_usuario) {
		List<Senha> senhas = new ArrayList<Senha>();
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM senha WHERE id_usuario="+id_usuario+";";
			ResultSet rs = st.executeQuery(sql);	
	        while(rs.next()){            
	        	 Senha senha = new Senha(rs.getInt("id_usuario"), rs.getInt("id_senha"), 
	        			 	   		 rs.getString("aplicacao"), rs.getString("valor"));
	        	 senhas.add(senha);
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return senhas;
	}
	
	public List<Senha> get() {
		return get("");
	}

	
	public List<Senha> getOrderByIDUsuario() {
		return get("id_usuario");		
	}	
	
	private List<Senha> get(String orderBy) {
		List<Senha> usuarios = new ArrayList<Senha>();
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM senha" + ((orderBy.trim().length() == 0) ? "" : (" ORDER BY " + orderBy));
			ResultSet rs = st.executeQuery(sql);	           
	        while(rs.next()) {	            	
	        	Senha s = new Senha(rs.getInt("id_usuario"), rs.getInt("id_senha"), 
	        						rs.getString("aplicacao"), rs.getString("valor"));
	            
	        	usuarios.add(s);
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return usuarios;
	}
	
	public boolean update(Senha senha) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			String sql = "UPDATE senha SET valor = '" + senha.getValor() + "', "
					   + "aplicacao = '" + senha.getAplicacao() + "' " 
					   + "WHERE id_usuario =" + senha.getIdUsuario() + " AND id_senha="+ senha.getIdSenha() +" ;";
			
			st.executeUpdate(sql);
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
	
	public boolean delete(int id_usuario, int id_senha) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			st.executeUpdate("DELETE FROM senha WHERE id_usuario =" +id_usuario 
							+" AND id_senha ="+id_senha+" ;");
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
	
}