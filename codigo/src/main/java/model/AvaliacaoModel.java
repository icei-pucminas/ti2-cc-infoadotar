package model;

import model.annotation.ColumnAnnotation;
import model.annotation.TableAnnotation;

@TableAnnotation(name = "\"POST_AVALIACAO\"")
public class AvaliacaoModel {
	@ColumnAnnotation(isPK = true, name = "usuario_email")
	public String usuario_email;
	@ColumnAnnotation(isPK = true, name = "post_id")
	public int post_id;
	public int nota;
}