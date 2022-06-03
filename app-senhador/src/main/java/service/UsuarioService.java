package service;

import java.util.List;
import dao.UsuarioDAO;
import model.Usuario;
import spark.Request;
import spark.Response;
import com.google.gson.*;

public class UsuarioService {

	private UsuarioDAO usuarioDAO = new UsuarioDAO();
	private final int FORM_ORDERBY_ID = 1;
	private final int FORM_ORDERBY_EMAIL = 2;
	private final int FORM_ORDERBY_PLANO = 3;
	
	public Object insert(Request request, Response response) {
		String email = request.queryParams("email");
		String senhamestra = request.queryParams("senhamestra");
		try {
			senhamestra = usuarioDAO.toMD5(senhamestra);
		} catch (Exception e) {}
		
		String plano = request.queryParams("plano");
		Usuario usuario = new Usuario(-1, email, senhamestra, plano);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(usuario);
		if(usuarioDAO.insert(usuario) == true) {
            response.status(201); // 201 Created
		} else {
			response.status(404); // 404 Not found
		}
			return json;
	}

	
	public Object get(Request request, Response response) {
		int id = Integer.parseInt(request.params(":id"));
		Usuario usuario = (Usuario) usuarioDAO.get(id);
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(usuario);
		
		if (usuario != null) {
			response.status(200); // success
        } else {
            response.status(404); // 404 Not found		   
        }
		return json;
	}

	
	
	public Object getAll(Request request, Response response) {
		int orderBy = Integer.parseInt(request.params(":orderby"));
		List<Usuario> usuarios;
		if (orderBy == FORM_ORDERBY_ID) {                 	usuarios = usuarioDAO.getOrderByID();
		} else if (orderBy == FORM_ORDERBY_EMAIL) {		usuarios = usuarioDAO.getOrderByEmail();
		} else if (orderBy == FORM_ORDERBY_PLANO) {			usuarios = usuarioDAO.getOrderByPlano();
		} else {											usuarios = usuarioDAO.get();
		}
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(usuarios);
		return json;
	}			
	
	public Object update(Request request, Response response) {
        int id = Integer.parseInt(request.params(":id"));
		Usuario usuario = usuarioDAO.get(id);
        if (usuario != null) {
        	usuario.setEmail(request.queryParams("email"));
        	usuario.setSenhamestra(request.queryParams("senhamestra"));
        	usuario.setPlano(request.queryParams("plano"));
        	usuarioDAO.update(usuario);	
        	response.status(200); // success
        	 Gson gson = new GsonBuilder().setPrettyPrinting().create();
     		 String json = gson.toJson(usuario);
             return json;
        } else {
            response.status(404); // 404 Not found
            return "Not found";
        }
       
	}

	
	public Object delete(Request request, Response response) {
        int id = Integer.parseInt(request.params(":id"));
        Usuario usuario = usuarioDAO.get(id);
        
        if (usuario != null) {
            usuarioDAO.delete(id);
            response.status(200); // success
            return "Success";
        } else {
            response.status(404); // 404 Not found
            return "Not found";
        }
	}
	
	public Object login(Request request, Response response) {
		Usuario padrao = new Usuario();
		padrao.setIdUsuario(-2);
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(padrao);
		
		try {
			String senhamestra = usuarioDAO.toMD5(request.queryParams("senhamestra"));
			
			Usuario usuario = usuarioDAO.getByEmailESenha(request.queryParams("email"), senhamestra);	
			
			if (usuario != null) {
				json = gson.toJson(usuario);
				response.status(200); // success
				
			} else {
				response.status(404); // 404 Not found
			}
			
		} catch (Exception e) {}
		
		return json;
	}
	
	public Object validate(Request request, Response response) {
		String email = request.queryParams("email");
		Usuario usuario = (Usuario) usuarioDAO.getEmail(email);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(usuario);
		if (usuario != null) {
			response.status(200); // success
        } else {
            response.status(404); // 404 Not found		   
        }
		return json;
	}
}