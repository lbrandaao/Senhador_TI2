package app;
import static spark.Spark.*;
import service.*; 

public class App {
	
	private static UsuarioService usuarioService = new UsuarioService();
	private static SenhaService senhaService = new SenhaService();
	private static CartaoService cartaoService = new CartaoService();
	
    public static void main(String[] args) {
    	port(6788);
        staticFiles.location("/public");
        
        /**
         * Usuario services 
         * */
        post("/usuario/insert", (request, response) -> usuarioService.insert(request, response));
        
        get("/usuario/:id", (request, response) -> usuarioService.get(request, response));
        get("/login", (request, response) -> usuarioService.login(request, response));
        get("/usuariobyemail", (request, response) -> usuarioService.validate(request, response));
        
        get("/usuario/list/:orderby", (request, response) -> usuarioService.getAll(request, response));
        
        post("/usuario/update/:id", (request, response) -> usuarioService.update(request, response));
        
        get("/usuario/delete/:id", (request, response) -> usuarioService.delete(request, response));
        
        
        /**
         * Senha services
         * */
        post("/senha/insert", (request, response) -> senhaService.insert(request, response));
        
        get("/senha/:id", (request, response) -> senhaService.get(request, response));
        get("/senha/usuario/:id", (request, response) -> senhaService.getSenhasByUsuario(request, response));
        get("/senha/list/:orderby", (request, response) -> senhaService.getAll(request, response));
        
        post("/senha/update/:id", (request, response) -> senhaService.update(request, response));
       
        get("/senha/delete/:id", (request, response) -> senhaService.delete(request, response));
        
        
        /**
         * Cartao services
         * */
        post("/cartao/insert", (request, response) -> cartaoService.insert(request, response));
        
        get("/cartao/:id", (request, response) -> cartaoService.get(request, response));
        get("/cartao/usuario/:id", (request, response) -> cartaoService.getCartoesByUsuario(request, response));
        get("/cartao/list/:orderby", (request, response) -> cartaoService.getAll(request, response));
        
        post("/cartao/update/:id", (request, response) -> cartaoService.update(request, response));
        
        get("/cartao/delete/:id", (request, response) -> cartaoService.delete(request, response));
        
    }
}