package controller;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.reflect.Method;
import static spark.Spark.*;

import controller.util.HTTPMethod;

@Retention(RetentionPolicy.RUNTIME)
@interface ControllerAnnotation { 
	HTTPMethod method();
	String path();
}

public class Controller {
	
	public Controller() {
		for (Method m: this.getClass().getMethods()) {
			ControllerAnnotation endpoint = m.getAnnotation(ControllerAnnotation.class);
			Class<?>[] params = m.getParameterTypes();
			if (endpoint != null && params.length == 2 
			&& params[0].getName().equals("spark.Request")
			&& params[1].getName().equals("spark.Response"))
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
