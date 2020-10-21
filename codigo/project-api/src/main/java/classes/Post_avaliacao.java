package classes;

public class Post_avaliacao{
    private String usuario_email;
    private int post_id = -1;
    private int nota;
    public Pergunta_avaliacao(String usuario_email, int post_id, int nota) throws Exception{
        if(isValid(usuario_email, post_id, nota))
        {
            this.usuario_email = usuario_email;
            this.post_id = post_id;
            this.nota = nota;
        }
    }
    public static boolean isValid(String usuario_email, int post_id, int nota) throws Exception{
        boolean resp = false;
        boolean cond1 = usuario_email.length() <= 50;
        boolean cond2 = post_id != -1;
        boolean cond3 = nota >= 1 && nota <= 5;
        if(cond1 && cond2 && cond3) resp = true;
        else{
            if(!cond1) throw new Exception("ERRO: usuario_email invalido");
            if(!cond2) throw new Exception("ERRO: post_id invalido");
            if(!cond3) throw new Exception("ERRO: nota invalida");
        }
        return resp;
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
	 * @return the post_id
	 */
	public int getPost_id() {
		return post_id;
	}
	/**
	 * @param post_id the post_id to set
	 */
	public void setPost_id(int post_id) throws Exception{
        if(post_id != -1) this.post_id = post_id;
        else throw new Exception("ERRO: post_id invalido");
	}
	/**
	 * @return the nota
	 */
	public int getNota() {
		return nota;
	}
	/**
	 * @param nota the nota to set
	 */
	public void setNota(int nota) throws Exception{
        if(nota >= 1 && nota <= 5) this.nota = nota;
        else throw new Exception("ERRO: nota invalida");
	}
}