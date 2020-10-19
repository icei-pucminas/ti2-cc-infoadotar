package controller;

import classes.DAO;
import classes.Usuario;
import controller.annotation.ControllerAnnotation;
import controller.util.*;
import spark.*;

public class LoginController extends Controller {
	public static Render render = new Render();
	public static DAO dao = new DAO();

	public LoginController() {
		super();
	}

//	@ControllerAnnotation (method = HTTPMethod.get, path = "/")
//	public String loginPage(Request req, Response res) {
//		res.type("text/html");
//		try {
//			return render.renderContent("/login.html");
//		} catch (Exception e) {
//			return e.getMessage();
//		}
//	}
	@ControllerAnnotation (method = HTTPMethod.post, path = "/login")
	public String login(Request req, Response res) {
		dao.conectar();
		res.header("Content-Type", "application/json");

		String email = req.queryParams("email");
		String senha = req.queryParams("senha");
		Usuario usuario = dao.getUsuario(email);

		String retorno;

		// nenhum usuario encontrado com esse email
		if(usuario == null) {
			res.status(400);;
			retorno = "Usuário não encontrado";
		}
		// checa se a senha é a correta
		else {
			int status = usuario.getHash().equals(senha) ? 200 : 403;
			res.status(status);
			retorno = status == 200 ? "Sucesso no login" : "Senha incorreta";
		}

		dao.close();
		return retorno;
	}
}
