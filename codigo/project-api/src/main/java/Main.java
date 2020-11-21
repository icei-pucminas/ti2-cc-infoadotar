import controller.*;
import spark.routematch.RouteMatch;

import static spark.Spark.*;

import java.util.*;

public final class Main {
	
	private static final List<Controller> controllers = new ArrayList<Controller>();
	
	public static void includeControllers() {
		controllers.add(new MainController(controllers));
		controllers.add(new AuthenticationController(controllers));
		controllers.add(new FAQController(controllers));
		controllers.add(new ComunidadeController(controllers));
	}

	public static void main(String[] args) {
		try {
			staticFiles.location("/public");
			includeControllers();
			List<RouteMatch> routes = routes();
			System.out.println("Server listening on port " + port() + "\nEndpoints:");
			for (RouteMatch r : routes) {
				System.out.println("\t" + r.getMatchUri() + " (" + r.getHttpMethod().toString() + ")");
			}

		} catch (Exception ex) {
			String stackTrace = "";
			for (StackTraceElement e : ex.getStackTrace()) {
				stackTrace += e.toString();
			}
			System.out.println("Error:\n\t" 
					+ ex.getMessage()
					+ "\nLocal:\n\t" 
					+ stackTrace
			);
		}
	}

}