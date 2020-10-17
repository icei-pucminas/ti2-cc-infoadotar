package controller;

import controller.annotation.ControllerAnnotation;
import controller.util.HTTPMethod;
import controller.util.Render;
import spark.Request;
import spark.Response;

public class MainController extends Controller {
	public static Render render = new Render();

	public MainController() {
		super();
//		staticFiles.location("/public");
	}

	@ControllerAnnotation (method = HTTPMethod.get, path = "/")
	public String index(Request req, Response res) {
		res.type("text/html");
		try {
			return render.renderContent("/public/index.html");
		} catch (Exception e) {
			return e.getMessage();
		}
	}
}
