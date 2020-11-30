package model.annotation;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;

@Retention(RUNTIME)
public @interface ColumnAnnotation {
	String name();
	boolean isPK();
}
