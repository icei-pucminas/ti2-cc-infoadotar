package constant;

import dal.DAO;
import model.UsuarioModel;
import spark.Request;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public class Constants {
	
	//DataBase
	public static String driverName = "org.postgresql.Driver";
	public static String serverName = "ec2-52-206-15-227.compute-1.amazonaws.com";
	public static String dataBase = "d3m765c4cdadqo";
	public static int port = 5432;
	public static String userName = "lsocucrdvtfvmg";
	public static String password = "a6693ddd35493a23bdd0cfeb403c4b0438bd1017dbc24891ab742e0f48339168";
	public static String url = "jdbc:postgresql://"+serverName+":"+port+"/"+dataBase+"?user="+userName+"&password="+password;
//	public static String url = "jdbc:postgresql://lsocucrdvtfvmg:a6693ddd35493a23bdd0cfeb403c4b0438bd1017dbc24891ab742e0f48339168@ec2-52-206-15-227.compute-1.amazonaws.com:5432/d3m765c4cdadqo";
//	public static String url = "jdbc:postgresql://" + serverName + ":" + port + "/" + dataBase + "?password=" + password + "sslmode=require&user=" + userName;
//	public static String url;

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