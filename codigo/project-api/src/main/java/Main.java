import controller.MainController;

import static spark.Spark.init;
import static spark.Spark.port;

public final class Main {
	
	public static void includeControllers() {
//		new TesteController();
		new MainController();
	}

	public static void main(String[] args) {
		try {
			init();
			includeControllers();
			System.out.println("Server listening on port " + port());

//			Render render = new Render();
//			get("/", (req, res) -> render.renderContent("index.html"));

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