package controller;

import java.util.List;

import controller.annotation.ControllerAnnotation;
import controller.util.*;
import spark.*;
import model.*;

import dal.*;

public class TesteController extends Controller {

	public TesteController() {
		super();
	}
	
	@ControllerAnnotation(method = HTTPMethod.get, path = "/a")
	public String TesteDB (Request req, Response res) {
		String result = "";
		DAO con = new DAO();
		con.conectar();
		
		List<UsuarioModel> s;
		UsuarioModel newUsr = new UsuarioModel();
		newUsr.email = "fulano.ciclano@mail.com";
		newUsr.nome = "Fulano Ciclano";
		newUsr.hash = "12345";
		
		//P1
		try {
			if (con.insert(newUsr)) {
				result += "ok\t";
			} else {
				result += "er\t";
			}
		} catch (Exception e) {
			result += "er\t";
		}
		
		//P2
		try {
			s = con.<UsuarioModel>select(UsuarioModel.class);
			if (s.size() > 0) {
				result += "ok\t";
			} else {
				result += "er\t";
			}
		} catch (Exception e) {
			result += "er\t";
		}
		
		//P3
		try {
			newUsr.hash = "123456";
			if (con.update(newUsr)) {
				result += "ok\t";
			} else {
				result += "er\t";
			}
		} catch (Exception e) {
			result += "er\t";
		}

		//P4
		try {
			if (con.delete(newUsr)) {
				result += "ok\t";
			} else {
				result += "er\t";
			}
		} catch (Exception e) {
			result += "er\t";
		}

		//P5
		try {
			s = con.<UsuarioModel>select(UsuarioModel.class);
			if (s.size() == 0) {
				result += "ok\t";
			} else {
				result += "er\t";
			}
		} catch (Exception e) {
			result += "er\t";
		}
		
		return result;
	}
}
