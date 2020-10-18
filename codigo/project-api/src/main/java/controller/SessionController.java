package controller;

import classes.DAO;
import classes.UserSession;
import classes.Usuario;
import com.google.gson.Gson;
import controller.annotation.ControllerAnnotation;
import controller.util.HTTPMethod;
import spark.Request;
import spark.Response;

public class SessionController extends Controller {
	public static DAO dao = new DAO();
	public static Gson gson	= new Gson();

	public SessionController() {
		super();
	}

	@ControllerAnnotation (method = HTTPMethod.post, path = "/session")
	public String secao(Request req, Response res) {
		dao.conectar();
		res.header("Content-Type", "application/json");

		CadastroController.CadastroData data = gson.fromJson(req.body(), CadastroController.CadastroData.class);
		System.out.println("email -> " + data.email);

		Usuario usuario = dao.getUsuario(data.email);

		dao.close();
		return gson.toJson(new UserSession(usuario.getNome(), usuario.getEmail()));
	}
}