package controller;

import classes.DAO;
import classes.Usuario;
import com.google.gson.Gson;
import controller.annotation.ControllerAnnotation;
import controller.util.HTTPMethod;
import controller.util.Render;
import controller.util.Resposta;
import spark.Request;
import spark.Response;

public class LoginController extends Controller {
	public static Render render = new Render();
	public static DAO dao = new DAO();
	public static Gson gson = new Gson();

	public LoginController() {
		super();
	}

	@ControllerAnnotation (method = HTTPMethod.get, path = "/login")
	public String loginPage(Request req, Response res) {
		res.type("text/html");
		try {
			return render.renderContent("/login.html");
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	@ControllerAnnotation (method = HTTPMethod.post, path = "/login")
	public String login(Request req, Response res) {
		dao.conectar();
		res.header("Content-Type", "application/json");

		String email = req.queryParams("email");
		String senha = req.queryParams("senha");
		Usuario usuario = dao.getUsuario(email);

		Resposta resposta = null;

		// nenhum usuario encontrado com esse email
		if(usuario == null) {
			res.status(400);
			resposta = new Resposta(400, "Usuário não encontrado");
		}
		// checa se a senha é a correta
		else {
			int status = usuario.getHash().equals(senha) ? 200 : 403;
			res.status(status);
			resposta = new Resposta(status, status == 200 ? "Sucesso no login" : "Senha incorreta");
		}
		dao.close();
		return gson.toJson(resposta);

	}
	@ControllerAnnotation (method = HTTPMethod.post, path = "/login-auth")
	public String auth(Request req, Response res) {
		dao.conectar();
		res.header("Content-Type", "application/json");

		LoginData data = gson.fromJson(req.body(), LoginData.class);
		Usuario usuario = dao.getUsuario(data.email);

		Resposta resposta = null;

		// nenhum usuario encontrado com esse email
		if(usuario == null) {
			res.status(400);
			resposta = new Resposta(400, "Usuário não encontrado");
		}
		// checa se a senha é a correta
		else {
			int status = usuario.getHash().equals(data.senha) ? 200 : 403;
			res.status(status);
			resposta = new Resposta(status, status == 200 ? "Sucesso no login" : "Senha incorreta");
		}
		dao.close();
		return gson.toJson(resposta);
	}

	class LoginData {
		public String email;
		public String senha;

		public LoginData() {}
	}
}
