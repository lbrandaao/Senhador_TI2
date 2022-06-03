package dao;

import model.Cartao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;


public class CartaoDAO extends DAO {	
	
	private SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM");
	
	public CartaoDAO() {
		super();
		conectar();
	}
	
	
	public void finalize() {
		close();
	}
	
	
	public boolean insert(Cartao cartao) {
		boolean status = false;
		try {
			String sql = "INSERT INTO cartao (id_usuario, numero, nome_impresso, data_validade, numero_seguranca) "
		               + "VALUES ('" + cartao.getIdUsuario() + "', '"
		               + cartao.getNumero() + "', '"
		               + cartao.getNomeImpresso() + "', '"
					   + cartao.getDataValidade() + "', '"
					   + cartao.getNumeroDeSeguranca() + "');";
			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}

	
	public Cartao get(int id_usuario, int id_cartao) {
		Cartao Cartao = null;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM Cartao WHERE id_usuario='"+id_usuario+"' AND id_cartao='"+id_cartao+"' ;";
			ResultSet rs = st.executeQuery(sql);	
	        if(rs.next()){            
				Cartao = new Cartao(rs.getInt("id_usuario"), rs.getInt("id_cartao"), rs.getString("numero"), rs.getString("nome_impresso"), 
									formato.parse(rs.getString("data_validade")), rs.getInt("numero_seguranca"));
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return Cartao;
	}
	
	public List<Cartao> getCartoesByUsuario(int id_usuario) {
		List<Cartao> cartoes = new ArrayList<Cartao>();
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM cartao WHERE id_usuario="+id_usuario+";";
			ResultSet rs = st.executeQuery(sql);	
	        while(rs.next()){            
	        	 Cartao cartao = new Cartao(rs.getInt("id_usuario"), rs.getInt("id_cartao"), rs.getString("numero"), rs.getString("nome_impresso"), 
											formato.parse(rs.getString("data_validade")), rs.getInt("numero_seguranca"));
	        	 cartoes.add(cartao);
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return cartoes;
	}
	
	
	public List<Cartao> get() {
		return get("");
	}

	
	public List<Cartao> getOrderByIdUsuario() {
		return get("id_usuario");		
	}
	
	
	public List<Cartao> getOrderByNumero() {
		return get("numero");		
	}
	
	
	public List<Cartao> getOrderByNomeImpresso() {
		return get("nome_impresso");		
	}
	
	
	private List<Cartao> get(String orderBy) {
		List<Cartao> cartoes = new ArrayList<Cartao>();
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM cartao" + ((orderBy.trim().length() == 0) ? "" : (" ORDER BY " + orderBy));
			ResultSet rs = st.executeQuery(sql);	           
	        while(rs.next()) {	            	
	        	Cartao p = new Cartao(rs.getInt("id_usuario"), rs.getInt("id_cartao"), rs.getString("numero"), rs.getString("nome_impresso"), 
	        						  formato.parse(rs.getString("data_validade")), rs.getInt("numero_seguranca"));
	            cartoes.add(p);
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return cartoes;
	}
	
	
	public boolean update(Cartao cartao) {
		boolean status = false;
		try {  
			String sql = "UPDATE cartao SET numero = '" + cartao.getNumero() + "', "
					   + "nome_impresso = '" + cartao.getNomeImpresso() + "', " 
					   + "data_validade = '" + cartao.getDataValidade() +"', "
					   + "numero_seguranca = '" + cartao.getNumeroDeSeguranca() + "'" 
					   + " WHERE id_cartao = '" + cartao.getIdCartao()+"' AND id_usuario = '" + cartao.getIdUsuario() + "' ;" ;
			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
	
	
	public boolean delete(int id_usuario, int id_cartao) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			st.executeUpdate("DELETE FROM cartao WHERE id_usuario = '" + id_usuario + "' AND id_cartao = '" + id_cartao + "' ;");
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
}