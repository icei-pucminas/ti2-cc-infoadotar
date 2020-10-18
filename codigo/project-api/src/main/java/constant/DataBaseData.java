package constant;

public class DataBaseData {
	public static String driverName = "org.postgresql.Driver";                    
	public static String serverName = "localhost";
	public static String dataBase = "infoAdotarDB";
	public static int port = 5432;
	public static String url = "jdbc:postgresql://" + serverName + ":" + port +"/" + dataBase;
	public static String userName = "ti2cc";
	public static String password = "ti@cc";
	//public static String password = "5442b7f5e799759beab8a62cb3cab4f1"; //'ti@cc' in MD5
}