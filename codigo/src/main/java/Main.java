import controller.*;
import spark.routematch.RouteMatch;

import java.util.ArrayList;
import java.util.List;

import static spark.Spark.*;

public final class Main {
	
	private static final List<Controller> controllers = new ArrayList<Controller>();
	
	public static void includeControllers() {
		controllers.add(new MainController(controllers));
		controllers.add(new AuthenticationController(controllers));
		controllers.add(new FAQController(controllers));
		controllers.add(new ComunidadeController(controllers));
	}

	public static void main(String[] args) {
        port(getHerokuAssignedPort());
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

    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567; //return default port if heroku-port isn't set (i.e. on localhost)
    }

}