package controller;

import java.util.List;

import controller.annotation.ControllerAnnotation;
import controller.util.*;
import spark.*;

public class MainController extends Controller {
	public static Render render = new Render();

	public MainController(List<Controller> controllers) {
		super(controllers);
	}

	@ControllerAnnotation (method = HTTPMethod.get, path = "/", isPrivate = false)
	public String index(Request req, Response res) {
		res.type("text/html");
		try {
			return render.renderContent("index.html");
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	@ControllerAnnotation (method = HTTPMethod.get, path = "/home", isPrivate = true)
	public String home(Request req, Response res) {
		res.type("text/html");
		try {
			return render.renderContent("home.html");
		} catch (Exception e) {
			return e.getMessage();
		}
	}
}
