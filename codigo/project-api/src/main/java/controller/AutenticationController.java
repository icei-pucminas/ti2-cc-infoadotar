package controller;

import controller.annotation.*;
import controller.util.*;
import spark.*;
import model.*;
import dal.*;

import java.security.*;
import java.util.*;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.math.*;
import java.sql.Timestamp;

import org.eclipse.jetty.util.MultiMap;
import org.eclipse.jetty.util.UrlEncoded;



public class AutenticationController extends Controller {
	
	public static DAO dao = new DAO();
	public static Render render = new Render();


	@ControllerAnnotation (method = HTTPMethod.get, path = "/login")
	public String loginGet (Request req, Response res) {
		res.type("text/html");
		try {
			return render.renderView("login");
		} catch (Exception e) {
			return e.getMessage();
		}
	}
	
	@ControllerAnnotation(method = HTTPMethod.post, path = "/login")
	public void loginPost (Request req, Response res) {
		
		try {
		
		FormReader fr = new FormReader(req);
		String email = fr.readValue("email");
		String senha = fr.readValue("senha");
		
		MessageDigest m=MessageDigest.getInstance("MD5");
		m.update(email.getBytes(),0,email.length());
		m.update(senha.getBytes(),0,senha.length());
		String hash  = new BigInteger(1,m.digest()).toString(16);
		
		// 4 - Verificação
		dao.conectar();
		List<UsuarioModel> usuario = dao.<UsuarioModel>select(UsuarioModel.class, "hash = '" + hash + "'");
		
		if (usuario.size() == 0) {
			
			//validação de erro
			res.status(401);
			res.body("Email ou Senha incorretos");
			
			
		} else {
			
			// 5 - Cookies
			// Gerando Usuario Tokens

			UsuarioModel usuarioLogado = usuario.get(0);
			m.update(usuarioLogado.email.getBytes(),0,usuarioLogado.email.length());
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			String time = LocalDateTime.now().format(formatter);
			m.update(time.getBytes(),0,time.length());
			String usuario_token = new BigInteger(1,m.digest()).toString(16);
			
			res.cookie("usuario_token", usuario_token, 3600 );
			
			// 6 - Armazenamento
			usuarioLogado.token = usuario_token;
			usuarioLogado.tokenValidade = Timestamp.valueOf(LocalDateTime.now().plusHours(1));
			dao.update(usuarioLogado);
			
			// 7 - Requisições
			
			String valida = LocalDateTime.now().format(formatter);
			
			if (usuarioLogado.token == usuario.get(0).token && Timestamp.valueOf(valida).before(usuarioLogado.tokenValidade) ) {
				
			}
			
		}
		
		
		} catch (Exception e) {
			
			System.out.println(e.getMessage());
		}
		
	}
	
}
