package classes;

public class Post{
    private int id;
    private String usuario_email;
    private int answer_to = -1;
    private String texto;

    public Post(int id, String usuario_email, int answer_to, String texto) throws Exception{
        if(isValid(id, usuario_email, answer_to, texto)){
            this.id = id;
            this.usuario_email = usuario_email;
            this.answer_to = answer_to;
            this.texto = texto;
        }
    }
    public Post(int id, String usuario_email, String texto) throws Exception{
        this(id, usuario_email, null, texto);
    }
    public static boolean isValid(int id, String usuario_email, int answer_to, String texto) throws Exception{
        boolean resp = false;
        boolean cond1 = usuario_email.length() <= 50;
        boolean cond2 = texto.length() <= 500;
        if(cond1 && cond2) resp = true;
        else{
            if(!cond1) throw new Exception("ERRO: usuario_email invalido");
            if(!cond2) throw new Exception("ERRO: texto invalido");
        }
        return resp;
    }
    /**
	 * @return the id
	 */
	public int getid() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setid(int id){
        this.id = id;
	}
	/**
	 * @return the usuario_email
	 */
	public String getUsuario_email() {
		return usuario_email;
	}
	/**
	 * @param usuario_email the usuario_email to set
	 */
	public void setUsuario_email(String usuario_email) throws Exception{
        if(usuario_email.length() <= 50) this.usuario_email = usuario_email;
        else throw new Exception("ERRO: usuario_email invalido");
	}
	/**
	 * @return the answer_to
	 */
	public int getAnswer_to() {
		return answer_to;
	}
	/**
	 * @param answer_to the answer_to to set
	 */
	public void setAnswer_to(int answer_to){
        this.answer_to = answer_to;
	}
	/**
	 * @return the texto
	 */
	public String getTexto() {
		return texto;
	}
	/**
	 * @param texto the texto to set
	 */
	public void setTexto(String texto) throws Exception{
        if(texto.length() <= 500) this.texto = texto;
        else throw new Exception("ERRO: texto invalido");
	}
}