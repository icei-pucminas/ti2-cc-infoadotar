package controller.util;

import spark.*;

public class Redirect {
	
	public static String to (Response res, String path) {
		res.type("text/html");
		return "<script>window.location.assign('" + path + "')</script>";
	}
}
