package service;

import java.util.List;
import dao.SenhaDAO;
import model.Senha;
import spark.Request;
import spark.Response;
import com.google.gson.*;

public class SenhaService {

	private SenhaDAO senhaDAO = new SenhaDAO();
	
	public Object insert(Request request, Response response) {
		int id_usuario = Integer.parseInt(request.queryParams("id_usuario"));
		String aplicacao = request.queryParams("aplicacao");
		String valor = request.queryParams("valor");
		Senha senha = new Senha(id_usuario, -1, aplicacao, valor);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(senha);
		if(senhaDAO.insert(senha) == true) {
            response.status(201); // 201 Created
		} else {
			response.status(404); // 404 Not found
		}
			return json;
	}

	
	public Object get(Request request, Response response) {
		String[] parametros = request.params(":id").split("-");		
		int id_usuario = Integer.parseInt(parametros[0]);
		int id_senha = Integer.parseInt(parametros[1]);
		
		Senha senha = (Senha) senhaDAO.get(id_usuario, id_senha);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(senha);
		if (senha != null) {
			response.status(200); // success
        } else {
            response.status(404); // 404 Not found		   
        }
		return json;
	}

	public Object getSenhasByUsuario(Request request, Response response) {		
		int id_usuario = Integer.parseInt(request.params(":id"));
		
		List<Senha> senhas = senhaDAO.getSenhasByUsuario(id_usuario);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(senhas);
		if (!senhas.isEmpty()) {
			response.status(200); // success
        } else {
            response.status(404); // 404 Not found		   
        }
		return json;
	}
	
	public Object getAll(Request request, Response response) {
		List<Senha> usuarios;
		usuarios = senhaDAO.getOrderByIDUsuario();
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(usuarios);
		return json;
	}			
	
	public Object update(Request request, Response response) {
		String[] parametros = request.params(":id").split("-");		
		int id_usuario = Integer.parseInt(parametros[0]);
		int id_senha = Integer.parseInt(parametros[1]);
		
		Senha senha = senhaDAO.get(id_usuario, id_senha);
        
		if (senha != null) {
        	senha.setValor(request.queryParams("valor"));
        	senha.setAplicacao(request.queryParams("aplicacao"));
        	senhaDAO.update(senha);	
        	response.status(200); // success
        	 Gson gson = new GsonBuilder().setPrettyPrinting().create();
     		 String json = gson.toJson(senha);
             return json;
        } else {
            response.status(404); // 404 Not found
            return "Not found";
        }
       
	}

	
	public Object delete(Request request, Response response) {
		String[] parametros = request.params(":id").split("-");		
		int id_usuario = Integer.parseInt(parametros[0]);
		int id_senha = Integer.parseInt(parametros[1]);
		Senha senha = senhaDAO.get(id_usuario, id_senha);     
        
		if (senha != null) {
            senhaDAO.delete(id_usuario, id_senha);
            response.status(200); // success
            return "Success";
        } else {
            response.status(404); // 404 Not found
            return "Not found";
        }

		
	}
}