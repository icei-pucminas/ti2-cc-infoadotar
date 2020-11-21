package constant;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import dal.DAO;
import model.UsuarioModel;
import spark.Request;

public class Constants {
	
	//DataBase
	public static String driverName = "org.postgresql.Driver";
	public static String serverName = "localhost";
	public static String dataBase = "InfoAdotar";
	public static int port = 5433;
	public static String url = "jdbc:postgresql://" + serverName + ":" + port +"/" + dataBase;
	public static String userName = "ti2cc";
	public static String password = "ti@cc";
	
	//Url
	public static String viewPath = "/public/";

	//Authentication
	public static String userTokenCookie = "usuario_token";
	public static String userNameCookie = "usuario_nome";
	public static String userEmailCookie = "usuario_email";
	public static int sessionCookiesDuration = 3600;
	public static String loginPath = "/login";
	public static UsuarioModel getUser(Request req, DAO dao) {
		UsuarioModel result = null;
		
		String token = req.cookie(userTokenCookie);
		if (token != null) {
				
			dao.conectar();
			List<UsuarioModel> users = dao.<UsuarioModel>select(UsuarioModel.class, "token = '" + token + "'");
			dao.close();
				
			UsuarioModel user = users.get(0);
				
			if (token.equals(user.token) &&
			Timestamp.valueOf(LocalDateTime.now())
			.compareTo(user.tokenValidade) <= 0) {
				result = user;
			}
		}
		
		return result;
	}
}