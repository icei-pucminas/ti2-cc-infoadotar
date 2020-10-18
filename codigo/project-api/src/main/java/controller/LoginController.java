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
	public void login(Request req, Response res) {
		dao.conectar();
		res.header("Content-Type", "application/json");

		String email = req.queryParams("email");
		String senha = req.queryParams("senha");
		Usuario usuario = dao.getUsuario(email);

		// nenhum usuario encontrado com esse email
		if(usuario == null) res.status(400);
		// checa se a senha é a correta
		else res.status(usuario.getHash().equals(senha) ? 200 : 403);

		dao.close();
	}
}
