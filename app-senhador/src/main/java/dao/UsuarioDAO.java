package dao;

import model.Usuario;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


public class UsuarioDAO extends DAO {	
	public UsuarioDAO() {
		super();
		conectar();
	}
	
	
	public void finalize() {
		close();
	}
	
	
	public boolean insert(Usuario usuario) {
		boolean status = false;
		try {
			String sql = "INSERT INTO usuario (email, senhamestra, plano) "
		               + "VALUES ('"+ usuario.getEmail() +"', '"+ usuario.getSenhamestra() +"',"
		               + " '" + usuario.getPlano() + "');";
			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}

	
	public  Usuario get(int id_usuario) {
		Usuario usuario = null;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM usuario WHERE id_usuario="+id_usuario;
			ResultSet rs = st.executeQuery(sql);	
	        if(rs.next()){            
	        	 usuario = new Usuario(rs.getInt("id_usuario"), rs.getString("email"), rs.getString("senhamestra"), rs.getString("plano"));
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return usuario;
	}
	
	public  Usuario getEmail(String email_usuario) {
		Usuario usuario = null;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM usuario WHERE email='"+email_usuario+"'";
			ResultSet rs = st.executeQuery(sql);	
	        if(rs.next()){            
	        	 usuario = new Usuario(rs.getInt("id_usuario"), rs.getString("email"), rs.getString("senhamestra"), rs.getString("plano"));
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return usuario;
	}
	
	
	public List<Usuario> get() {
		return get("");
	}

	
	public List<Usuario> getOrderByID() {
		return get("id_usuario");		
	}
	
	
	public List<Usuario> getOrderByEmail() {
		return get("email");		
	}
	
	
	public List<Usuario> getOrderByPlano() {
		return get("plano");		
	}
	
	
	private List<Usuario> get(String orderBy) {
		List<Usuario> usuarios = new ArrayList<Usuario>();
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM usuario" + ((orderBy.trim().length() == 0) ? "" : (" ORDER BY " + orderBy));
			ResultSet rs = st.executeQuery(sql);	           
	        while(rs.next()) {	            	
	        	Usuario p = new Usuario(rs.getInt("id_usuario"), rs.getString("email"), rs.getString("senhamestra"), 
	        			                rs.getString("plano"));
	            usuarios.add(p);
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return usuarios;
	}
	
	
	public boolean update(Usuario usuario) {
		boolean status = false;
		try {  
			String sql = "UPDATE usuario SET email = '" + usuario.getEmail() + "', "
					   + "senhamestra = '" + usuario.getSenhamestra() + "', " 
					   + "plano = '" + usuario.getPlano() +"' "
					   + "WHERE id_usuario = " + usuario.getIdUsuario();
			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
	
	
	public boolean delete(int id) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			st.executeUpdate("DELETE FROM usuario WHERE id_usuario = " + id);
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
	
	public String toMD5(String senha) throws Exception {
		MessageDigest m = MessageDigest.getInstance("MD5");
		m.update(senha.getBytes(), 0, senha.length());
		
		return new BigInteger(1,m.digest()).toString(16);
	}
	
	public Usuario getByEmailESenha(String em, String senha) {
		Usuario usuario = null;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM usuario WHERE email ='" + em + "' AND senhamestra ='" + senha + "'";
			ResultSet rs = st.executeQuery(sql);	
	        if(rs.next()){            
	        	 usuario = new Usuario(rs.getInt("id_usuario"), rs.getString("email"), rs.getString("senhamestra"), rs.getString("plano"));
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return usuario;
	}
}