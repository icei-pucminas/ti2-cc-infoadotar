package constant;

import java.util.List;

import dal.DAO;
import model.UsuarioModel;
import spark.Request;
import java.sql.Timestamp;
import java.time.LocalDateTime;

public class Constants {
	
	//DataBase
	public static String dbDriverName = "org.postgresql.Driver";
	public static String dbServerName = "localhost";
	public static String dbDataBase = "InfoAdotar";
	public static int dbPort = 5433;
	public static String dbUrl = "jdbc:postgresql://" + dbServerName + ":" + dbPort +"/" + dbDataBase;
	public static String dbUserName = "ti2cc";
	public static String dbPassword = "ti@cc";
	
	//Resources Url
	public static String viewPath = "/public/views/";
	
	//Authentication
	public static String userToken = "usuario_token";
	public static String loginPath = "/login";
	public static boolean isLoggedIn(Request req, DAO dao) {
		boolean result = false;
		
		String token = req.cookie(userToken);
		if (token != null) {
				
			dao.conectar();
			List<UsuarioModel> users = dao.<UsuarioModel>select(UsuarioModel.class, "token = '" + token + "'");
			dao.close();
				
			UsuarioModel user = users.get(0);
				
			if (token == user.token &&
			Timestamp.valueOf(LocalDateTime.now())
			.compareTo(user.tokenValidade) <= 0) {
				result = true;
			}
		}
		
		return result;
	}
}