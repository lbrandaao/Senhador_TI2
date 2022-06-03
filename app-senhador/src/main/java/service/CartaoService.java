package service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Date;
import dao.CartaoDAO;
import model.Cartao;
import spark.Request;
import spark.Response;
import com.google.gson.*;

public class CartaoService {

	private CartaoDAO cartaoDAO = new CartaoDAO();
	private SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM");
	
	private final int FORM_ORDERBY_IDUSUARIO = 1;
	private final int FORM_ORDERBY_NUMERO = 2;
	private final int FORM_ORDERBY_NOMEIMPRESSO = 3;
	
	
	
	public Object insert(Request request, Response response) throws Exception {
		int idUsuario = Integer.parseInt(request.queryParams("id_usuario"));
		String numero = request.queryParams("numero");
		String nomeImpresso = request.queryParams("nome_impresso");
		Date dataValidade = formato.parse(request.queryParams("data_validade"));
		int numeroDeSeguranca = Integer.parseInt(request.queryParams("numero_seguranca"));
		
		Cartao cartao = new Cartao(idUsuario, -1, numero, nomeImpresso, dataValidade, numeroDeSeguranca);
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(cartao);
		if(cartaoDAO.insert(cartao) == true) {
           
            response.status(201); // 201 Created
		} else {
			
			response.status(404); // 404 Not found
		}
			
		return json;

	}

	
	public Object get(Request request, Response response) {
		String[] parametros = request.params(":id").split("-");		
		int id_usuario = Integer.parseInt(parametros[0]);
		int id_cartao = Integer.parseInt(parametros[1]);
		
		Cartao cartao = (Cartao) cartaoDAO.get(id_usuario, id_cartao);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(cartao);
		if (cartao != null) {
			response.status(200); // success
			
        } else {
            response.status(404); // 404 Not found
            
		}

		return json;
	}
	
	public Object getCartoesByUsuario(Request request, Response response) {		
		int id_usuario = Integer.parseInt(request.params(":id"));
		
		List<Cartao> cartoes = cartaoDAO.getCartoesByUsuario(id_usuario);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(cartoes);
		if (!cartoes.isEmpty()){
			response.status(200); // success
        } else {
            response.status(404); // 404 Not found		   
        }
		return json;
	}

	
	public Object getAll(Request request, Response response) {
		int orderBy = Integer.parseInt(request.params(":orderby"));
		List<Cartao> cartoes;
		
		if (orderBy == FORM_ORDERBY_IDUSUARIO) {                 	cartoes = cartaoDAO.getOrderByIdUsuario();
		} else if (orderBy == FORM_ORDERBY_NUMERO) {		cartoes = cartaoDAO.getOrderByNumero();
		} else if (orderBy == FORM_ORDERBY_NOMEIMPRESSO) {			cartoes = cartaoDAO.getOrderByNomeImpresso();
		} else {											cartoes = cartaoDAO.get();
		}
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(cartoes);
		
		return json;
	}			
	
	public Object update(Request request, Response response) throws Exception {
		String[] parametros = request.params(":id").split("-");		
		int id_usuario = Integer.parseInt(parametros[0]);
		int id_cartao = Integer.parseInt(parametros[1]);
		
		Cartao cartao = (Cartao) cartaoDAO.get(id_usuario, id_cartao);
        
		if (cartao != null) {
        	cartao.setNumero(request.queryParams("numero"));
        	cartao.setNomeImpresso(request.queryParams("nome_impresso"));
        	cartao.setDataValidade(formato.parse(request.queryParams("data_validade")));
        	cartao.setNumeroDeSeguranca(Integer.parseInt(request.queryParams("numero_seguranca")));
        	cartaoDAO.update(cartao);
        	response.status(200); // success
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
     		 String json = gson.toJson(cartao);
             return json;
        } else {
            response.status(404); // 404 Not found
            return "Not found";
        }
	}

	
	public Object delete(Request request, Response response) {
		String[] parametros = request.params(":id").split("-");		
		int id_usuario = Integer.parseInt(parametros[0]);
		int id_cartao = Integer.parseInt(parametros[1]);
        
		Cartao cartao = cartaoDAO.get(id_usuario, id_cartao);      

        if (cartao != null) {
            cartaoDAO.delete(id_usuario, id_cartao);
            response.status(200); // success
            return "Success";
        } else {
            response.status(404); // 404 Not found
            return "Not found";
        }
		
	}
}