package model;

import model.annotation.*;
import java.sql.*;

@TableAnnotation(name = "\"USUARIO\"")
public class UsuarioModel {
	@ColumnAnnotation(isPK = true, name = "email")
	public String email;
	public String nome;
	public String hash;
	public String token;
	@ColumnAnnotation(isPK = false, name = "token_validade")
	public Timestamp tokenValidade;
}