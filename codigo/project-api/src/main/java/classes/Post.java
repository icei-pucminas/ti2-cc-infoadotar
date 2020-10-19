package classes;

public class Post{
    private String sigla;
    private String usuario_cpf;
    private String answer_to;
    private String texto;

    public Post(String sigla, String usuario_cpf, String answer_to, String texto) throws Exception{
        if(isValid(sigla, usuario_cpf, answer_to, texto)){
            this.sigla = sigla;
            this.usuario_cpf = usuario_cpf;
            this.answer_to = answer_to;
            this.texto = texto;
        }
    }
    public Post(String sigla, String usuario_cpf, String texto) throws Exception{
        this(sigla, usuario_cpf, null, texto);
    }
    public static boolean isValid(String sigla, String usuario_cpf, String answer_to, String texto) throws Exception{
        boolean resp = false;
        boolean cond1 = sigla.length() <= 10;
        boolean cond2 = usuario_cpf.length() == 11;
        boolean cond3 = answer_to == null || answer_to.length() <= 10;
        boolean cond4 = texto.length() <= 500;
        if(cond1 && cond2 && cond3 && cond4) resp = true;
        else{
            if(!cond1) throw new Exception("ERRO: sigla invalida");
            if(!cond2) throw new Exception("ERRO: usuario_cpf invalido");
            if(!cond3) throw new Exception("ERRO: answer_to invalido");
            if(!cond4) throw new Exception("ERRO: texto invalido");
        }
        return resp;
    }
    /**
	 * @return the sigla
	 */
	public String getSigla() {
		return sigla;
	}
	/**
	 * @param sigla the sigla to set
	 */
	public void setSigla(String sigla) throws Exception{
        if(sigla.length() <= 10) this.sigla = sigla;
        else throw new Exception("ERRO: sigla invalida");
	}
	/**
	 * @return the usuario_cpf
	 */
	public String getUsuario_cpf() {
		return usuario_cpf;
	}
	/**
	 * @param usuario_cpf the usuario_cpf to set
	 */
	public void setUsuario_cpf(String usuario_cpf) throws Exception{
        if(usuario_cpf.length() == 11) this.usuario_cpf = usuario_cpf;
        else throw new Exception("ERRO: usuario_cpf invalido");
	}
	/**
	 * @return the answer_to
	 */
	public String getAnswer_to() {
		return answer_to;
	}
	/**
	 * @param answer_to the answer_to to set
	 */
	public void setAnswer_to(String answer_to) throws Exception{
        if(answer_to == null || answer_to.length() <= 10) this.answer_to = answer_to;
        else throw new Exception("ERRO: answer_to invalido");
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