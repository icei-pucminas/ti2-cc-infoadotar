package constant;

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
	public static String viewPath = "/public/views/";
}