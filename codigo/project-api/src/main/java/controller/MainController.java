package controller;

import controller.annotation.ControllerAnnotation;
import controller.util.*;
import spark.*;

public class MainController extends Controller {
	public static Render render = new Render();

	public MainController() {
		super();
	}

	@ControllerAnnotation (method = HTTPMethod.get, path = "/")
	public String index(Request req, Response res) {
		res.type("text/html");
		try {
			return render.renderContent("pages/index/index.html");
		} catch (Exception e) {
			return e.getMessage();
		}
	}
}
