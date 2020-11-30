package controller.annotation;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import controller.util.HTTPMethod;

@Retention(RUNTIME)
@Target(METHOD)
public @interface ControllerAnnotation {
	HTTPMethod method();
	String path();
	boolean isPrivate();
}
