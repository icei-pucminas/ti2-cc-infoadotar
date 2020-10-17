package controller;

import controller.annotation.ControllerAnnotation;
import controller.util.*;
import spark.*;

public class TesteController extends Controller {
	public static Render render = new Render();

	public TesteController() {
		super();
	}

	@ControllerAnnotation (method = HTTPMethod.get, path = "/")
	public String Teste(Request req, Response res) {
		return "Olá mundo";
	}
}
