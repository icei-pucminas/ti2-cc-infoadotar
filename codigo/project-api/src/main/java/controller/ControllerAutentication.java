package controller;

import controller.util.*;

public class LoginController extends Controller {
	
	ConexaoBD con = new ConexaoBD;

	public LoginController {
		super();
	}
	
	@ControllerAnnotation (method = HTTPMethod.post, path = "/")
	public void Login (Request req, Response res) {
		try {
			con.executaSql ("select email from usuarios where usuarioEmail = '"+ fieldEmail.getText() +"'");
			con.rs.first();
			if (con.rs.getString("usuarioSenha").equals("fieldPassword.getText()")) {
				//Mandar pra tela principal
			}
			else {
				//Email ou senha invalidos
			}
		
		} catch (SQLException ex) {
			//Email ou senha invalidos e exibe o erro
		}
	}

}