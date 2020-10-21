package constant;

public class DataBaseData {
	public static String driverName = "org.postgresql.Driver";
	public static String serverName = "localhost";
	public static String dataBase = "infoAdotar";
	public static int port = 5432;
	public static String url = "jdbc:postgresql://" + serverName + ":" + port +"/" + dataBase;
	public static String userName = "postgres";
	public static String password = "ti@cc";
}