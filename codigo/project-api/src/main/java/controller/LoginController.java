package controller;

import controller.annotation.ControllerAnnotation;
import controller.util.*;
import spark.*;

public class LoginController extends Controller {
	public static Render render = new Render();

	public LoginController() {
		super();
	}

	@ControllerAnnotation (method = HTTPMethod.get, path = "/")
	public String loginPage(Request req, Response res) {
		res.type("text/html");
		try {
			return render.renderContent("/login.html");
		} catch (Exception e) {
			return e.getMessage();
		}
	}
	@ControllerAnnotation (method = HTTPMethod.post, path = "/login")
	public void login(Request req, Response res) {
//		dao.conectar();
		res.header("Content-Type", "application/json");
//		dao.insertUsuario(usuario);

//		dao.close();

	}
}
