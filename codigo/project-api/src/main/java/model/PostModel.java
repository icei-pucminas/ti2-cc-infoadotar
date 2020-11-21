package model;

import model.annotation.ColumnAnnotation;
import model.annotation.TableAnnotation;

@TableAnnotation(name = "\"POST\"")
public class PostModel {
	@ColumnAnnotation(isPK = true, name = "id")
	public int id;
	public String texto;
	public String usuario_email;
	public Integer answer_to;
}