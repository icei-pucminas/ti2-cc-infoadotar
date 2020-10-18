package controller;

import classes.Usuario;
import controller.annotation.ControllerAnnotation;
import controller.util.HTTPMethod;
import controller.util.Render;
import spark.Request;
import spark.Response;

public class CadastroController extends Controller {
	public static Render render = new Render();

	public CadastroController() {
		super();
	}

	@ControllerAnnotation (method = HTTPMethod.get, path = "/cadastrar")
	public String cadastro(Request req, Response res) {
//		dao.conectar();
		String email = req.queryParams("email");
		String nome = req.queryParams("nome");
		String senha = req.queryParams("senha");

		res.header("Content-Type", "application/json");
		try {
			Usuario usuario = new Usuario(email, nome, senha);
//			dao.insertUsuario(usuario);
		} catch (Exception e) {
			return e.getMessage();
		}

//		dao.close();
		return "Usuário cadastrado";
	}
}
