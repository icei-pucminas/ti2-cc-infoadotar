package controller;

import constant.Constants;
import controller.annotation.ControllerAnnotation;
import controller.util.FormReader;
import controller.util.HTTPMethod;
import controller.util.Resposta;
import model.CadastroUsuarioModel;
import model.UsuarioModel;
import spark.Request;
import spark.Response;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class AuthenticationController extends Controller {

	public AuthenticationController(List<Controller> controllers) {
		super(controllers);
	}

	@ControllerAnnotation (method = HTTPMethod.get, path = "/login", isPrivate = false)
	public String loginGet (Request req, Response res) {
		res.type("text/html");
		try {
			return render.renderContent("login.html");
		} catch (Exception e) {
			return e.getMessage();
		}
	}
	
	@ControllerAnnotation(method = HTTPMethod.post, path = "/login", isPrivate = false)
	public Object loginPost (Request req, Response res) {
		
		Object result = null;
		
		try {
		
			FormReader fr = new FormReader(req);
			String email = fr.readValue("email");
			String senha = fr.readValue("senha");
			
			MessageDigest m=MessageDigest.getInstance("MD5");
			m.update(email.getBytes(),0,email.length());
			m.update(senha.getBytes(),0,senha.length());
			String hash  = new BigInteger(1,m.digest()).toString(16);
			
			//4 - Verificação
			dao.conectar();
			List<UsuarioModel> usuario = dao.<UsuarioModel>select(UsuarioModel.class, "hash = '" + hash + "'");
			
			if (usuario.size() == 0) {
				//validação de erro
				result = this.loginGet(req, res);
			} else {
					
				// 5 - Cookies
				// Gerando Usuario Tokens
		
				UsuarioModel usuarioLogado = usuario.get(0);
				m.update(usuarioLogado.email.getBytes(),0,usuarioLogado.email.length());
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
				String time = LocalDateTime.now().format(formatter);
				m.update(time.getBytes(),0,time.length());
				String usuario_token = new BigInteger(1,m.digest()).toString(16);

				String updated = usuarioLogado.nome.replace(" ", "_");
				System.out.println(updated);
					
				res.cookie(Constants.userTokenCookie, usuario_token, Constants.sessionCookiesDuration);
				System.out.println("nome = " + usuarioLogado.email);
				System.out.println("nome = " + usuarioLogado.nome);

				//Salvando dados para exibição
				res.cookie(Constants.userEmailCookie, usuarioLogado.email.replace(" ", ""), Constants.sessionCookiesDuration);
				res.cookie(Constants.userNameCookie, usuarioLogado.nome.replace(" ", "_"), Constants.sessionCookiesDuration);

				// 6 - Armazenamento
				usuarioLogado.token = usuario_token;
				usuarioLogado.tokenValidade = Timestamp.valueOf(LocalDateTime.now().plusHours(1));
				dao.update(usuarioLogado);
				dao.close();
				
				res.type("text/html");
				result = "<script>window.location.assign(\"/home\")</script>";
			}
		} catch (Exception e) {
			result = this.loginGet(req, res);
		}
		
		return result;
	}

	@ControllerAnnotation(method = HTTPMethod.post, path = "/cadastrarUsuario", isPrivate = false)
	public Object cadastro (Request req, Response res) {
		dao.conectar();
	    res.header("Content-Type", "application/json");

	    String resposta;
	    try {
	    	CadastroUsuarioModel cadUser = gson.fromJson(req.body(), CadastroUsuarioModel.class);
	    	
			MessageDigest m = MessageDigest.getInstance("MD5");
			m.update(cadUser.email.getBytes(), 0, cadUser.email.length());
			m.update(cadUser.senha.getBytes(), 0, cadUser.senha.length());
			String hash  = new BigInteger(1,m.digest()).toString(16);
			
			UsuarioModel user = new UsuarioModel();
			user.nome = cadUser.nome;
			user.email = cadUser.email;
			user.hash = hash;
			user.token = null;
			user.tokenValidade = null;
			
	        dao.insert(user);
	        resposta = gson.toJson(new Resposta(200, "Usuário cadastrado com sucesso."));
	    } catch (Exception e) {
	    	resposta = gson.toJson(new Resposta(500, "Erro no cadastro de usuário."));
	        System.out.println(e.getMessage());
	    }

	    dao.close();
	    return resposta;
	}
}
