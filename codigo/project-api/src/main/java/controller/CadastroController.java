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

public class CadastroController extends Controller {
	public static Render render = new Render();
	public static DAO dao = new DAO();
	public static Gson gson = new Gson();

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
		Resposta resposta = null;
		try {
			Usuario usuario = dao.getUsuario(email);	// checa se o email ja está associado a um usuario
			if(usuario != null) {
				res.status( 400);
				resposta = new Resposta(400, "Email já cadastrado");
			}
			else {
				usuario = new Usuario(email, nome, senha);
				dao.insertUsuario(usuario);
				res.status( 200);
				resposta = new Resposta(200, "Usuário cadastrado com sucesso.");
			}
		} catch (Exception e) {
			res.status(500);
			return gson.toJson(new Resposta(200, e.getMessage()));
		}

		dao.close();
		return gson.toJson(resposta);
	}

	@ControllerAnnotation (method = HTTPMethod.post, path = "/cadastro-auth")
	public String auth(Request req, Response res) {
		dao.conectar();
		res.header("Content-Type", "application/json");

		CadastroData data = gson.fromJson(req.body(), CadastroData.class);
		Usuario usuario = dao.getUsuario(data.email);

		Resposta resposta = null;

		if(usuario != null) {
			res.status( 400);
			resposta = new Resposta(400, "Email já cadastrado");
		} else {
			resposta = new Resposta(200, "Processando requisição");
		}

		dao.close();
		return gson.toJson(resposta);
	}

	class CadastroData {
		public String nome;
		public String email;
		public String senha;
	}
}
