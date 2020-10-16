package controller;

import controller.util.*;
import spark.*;

public class TesteController extends Controller {

	public TesteController() {
		super();
	}
	
	@ControllerAnnotation (method = HTTPMethod.get, path = "/")
	public String Teste(Request req, Response res) {
		return "Olá mundo";
	}
}
