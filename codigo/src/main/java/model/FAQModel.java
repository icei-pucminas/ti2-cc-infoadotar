package model;

import model.annotation.ColumnAnnotation;
import model.annotation.TableAnnotation;

@TableAnnotation(name = "\"FAQ\"")
public class FAQModel {
	@ColumnAnnotation(isPK = true, name = "id")
	public int id;
	public String pergunta;
	public String resposta;
}