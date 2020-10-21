import controller.*;

import static spark.Spark.*;

public final class Main {
	
	public static void includeControllers() {
		new TesteController();
		new MainController();
		new LoginController();
		new CadastroController();
		new SessionController();
		new FAQController();
	}

	public static void main(String[] args) {
		try {
			staticFiles.location("/public");
			init();
			includeControllers();
			System.out.println("Server listening on port " + port());

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