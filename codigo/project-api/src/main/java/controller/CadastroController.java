package controller;

import classes.DAO;
import classes.Usuario;
import controller.annotation.ControllerAnnotation;
import controller.util.HTTPMethod;
import controller.util.Render;
import spark.Request;
import spark.Response;

public class CadastroController extends Controller {
	public static Render render = new Render();
	public static DAO dao = new DAO();

	public CadastroController() {
		super();
	}

	@ControllerAnnotation (method = HTTPMethod.post, path = "/cadastro")
	public String cadastro(Request req, Response res) {
		dao.conectar();
		String email = req.queryParams("email");
		String nome = req.queryParams("nome");
		String senha = req.queryParams("senha");

		res.header("Content-Type", "application/json");
		String retorno;
		try {
			Usuario usuario = dao.getUsuario(email);	// checa se o email ja está associado a um usuario
			if(usuario != null) {
				res.status( 400);
				retorno = "Email já cadastrado";
			}
			else {
				usuario = new Usuario(email, nome, senha);
				dao.insertUsuario(usuario);
				res.status( 200);
				retorno = "Usuário cadastrado com sucesso.";
			}
		} catch (Exception e) {
			res.status(500);
			return e.getMessage();
		}

		dao.close();
		return retorno;
	}
}
