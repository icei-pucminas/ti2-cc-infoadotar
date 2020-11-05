package controller;

import controller.annotation.ControllerAnnotation;
import controller.util.Render;
import dal.DAO;
import spark.Route;
import constant.Constants;

import java.lang.reflect.Method;

import static spark.Spark.*;

public class Controller {
	
	public static DAO dao = new DAO();
	public static Render render = new Render();
	
	public static Route auth (Route exeIfTrue) {
		return (req, res) -> {
			if (Constants.isLoggedIn(req, dao)) {
				exeIfTrue.handle(req, res);
			} else {
				res.redirect(Constants.loginPath, 401);
			}
			
			return res;
		};
	}

	public Controller() {

		for (Method m: this.getClass().getMethods()) {
			ControllerAnnotation endpoint = m.getAnnotation(ControllerAnnotation.class);
			Class<?>[] params = m.getParameterTypes();
			if (endpoint != null && params.length == 2 
			&& params[0].getName().equals("spark.Request")
			&& params[1].getName().equals("spark.Response")) {
				if (endpoint.isPrivate()) {
					switch (endpoint.method()) {
						case get:
							get(endpoint.path(), 	
								auth((req, res) -> m.invoke(this, req, res)));
							break;
						case post:
							post(endpoint.path(), 
								auth((req, res) -> m.invoke(this, req, res)));
							break;  
						case put:
							put(endpoint.path(), 
								auth((req, res) -> m.invoke(this, req, res)));
							break; 
						case delete:
							delete(endpoint.path(), 
								auth((req, res) -> m.invoke(this, req, res)));
							break; 
						case head:
							head(endpoint.path(), 
								auth((req, res) -> m.invoke(this, req, res)));
							break; 
						case trace:
							trace(endpoint.path(), 
								auth((req, res) -> m.invoke(this, req, res)));
							break; 
						case connect:
							connect(endpoint.path(), 
								auth((req, res) -> m.invoke(this, req, res)));
							break; 
						case options:
							options(endpoint.path(), 
								auth((req, res) -> m.invoke(this, req, res)));
							break; 
					}
				} else {
					switch (endpoint.method()) {
						case get:
							get(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break;
						case post:
							post(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break;  
						case put:
							put(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break; 
						case delete:
							delete(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break; 
						case head:
							head(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break; 
						case trace:
							trace(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break; 
						case connect:
							connect(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break; 
						case options:
							options(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break; 
					}
				}
			}
		}
	}
}
