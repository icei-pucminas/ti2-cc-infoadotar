package controller.util;

import java.util.List;
import org.eclipse.jetty.util.MultiMap;
import org.eclipse.jetty.util.UrlEncoded;
import spark.Request;

public class FormReader {
	
	private MultiMap<String> params;
	
	public FormReader (Request req) {
		params = new MultiMap<String>();
		UrlEncoded.decodeTo(req.body(), params, "UTF-8");
	}
	
	public List<String> readList(String key) {
		return params.get(key);
	}
	
	public String readValue(String key) {
		return params.get(key).get(0);
	}
}
