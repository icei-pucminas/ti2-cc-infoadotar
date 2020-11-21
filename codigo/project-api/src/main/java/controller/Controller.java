package controller;

import controller.annotation.ControllerAnnotation;
import controller.util.*;
import dal.DAO;
import model.UsuarioModel;
import spark.*;
import constant.Constants;

import java.lang.reflect.Method;
import java.util.List;

import com.google.gson.Gson;

public class Controller {
	
	public static final DAO dao = new DAO();
	public static final Render render = new Render();
    public static final Gson gson = new Gson();
    
    protected UsuarioModel user;
    protected final List<Controller> controllers;
	
	private Route auth (Route exeIfTrue) {
		return (req, res) -> {
			Object result = null;
			this.user = Constants.getUser(req, dao);
			if (user != null) {
				result = exeIfTrue.handle(req, res);
			} else {
				res.redirect(Constants.loginPath, 401);
			}
			return result;
		};
	}
	
	public Controller(List<Controller> controllers) {
		this.controllers = controllers;
		this.ignite();
	}

	private void ignite() {
		for (Method m: this.getClass().getMethods()) {
			ControllerAnnotation endpoint = m.getAnnotation(ControllerAnnotation.class);
			Class<?>[] params = m.getParameterTypes();
			if (endpoint != null && params.length == 2 
			&& params[0].getName().equals("spark.Request")
			&& params[1].getName().equals("spark.Response")) {
				if (endpoint.isPrivate()) {
					switch (endpoint.method()) {
						case get:
							Spark.get(endpoint.path(), 	
								this.auth((req, res) -> m.invoke(this, req, res)));
							break;
						case post:
							Spark.post(endpoint.path(), 
								this.auth((req, res) -> m.invoke(this, req, res)));
							break;  
						case put:
							Spark.put(endpoint.path(), 
								this.auth((req, res) -> m.invoke(this, req, res)));
							break; 
						case delete:
							Spark.delete(endpoint.path(), 
								this.auth((req, res) -> m.invoke(this, req, res)));
							break; 
						case head:
							Spark.head(endpoint.path(), 
								this.auth((req, res) -> m.invoke(this, req, res)));
							break; 
						case trace:
							Spark.trace(endpoint.path(), 
								this.auth((req, res) -> m.invoke(this, req, res)));
							break; 
						case connect:
							Spark.connect(endpoint.path(), 
								this.auth((req, res) -> m.invoke(this, req, res)));
							break; 
						case options:
							Spark.options(endpoint.path(), 
								this.auth((req, res) -> m.invoke(this, req, res)));
							break; 
					}
				} else {
					switch (endpoint.method()) {
						case get:
							Spark.get(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break;
						case post:
							Spark.post(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break;  
						case put:
							Spark.put(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break; 
						case delete:
							Spark.delete(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break; 
						case head:
							Spark.head(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break; 
						case trace:
							Spark.trace(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break; 
						case connect:
							Spark.connect(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break; 
						case options:
							Spark.options(endpoint.path(), (req, res) -> m.invoke(this, req, res));
							break; 
					}
				}
			}
		}
	}
}
