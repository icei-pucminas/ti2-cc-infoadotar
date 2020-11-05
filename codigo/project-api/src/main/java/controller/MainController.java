package controller;

import controller.annotation.ControllerAnnotation;
import controller.util.*;
import spark.*;

public class MainController extends Controller {

	public MainController() {
		super();
	}

	@ControllerAnnotation (method = HTTPMethod.get, path = "/", isPrivate = false)
	public String index(Request req, Response res) {
		res.type("text/html");
		try {
			return render.renderView("index");
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	@ControllerAnnotation (method = HTTPMethod.get, path = "/home", isPrivate = true)
	public String home(Request req, Response res) {
		res.type("text/html");
		try {
			return render.renderView("home");
		} catch (Exception e) {
			return e.getMessage();
		}
	}
}
