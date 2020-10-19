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

		Usuario usuario = dao.getUsuario(req.body());
		System.out.println(usuario);

		dao.close();
		return gson.toJson(new UserSession(usuario.getNome(), usuario.getEmail()));
	}
}
