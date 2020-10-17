public class Pergunta_avaliacao{
    private String usuario_cpf;
    private String faq_sigla;
    private int nota;
    public Pergunta_avaliacao(String usuario_cpf, String faq_sigla, int nota) throws Exception{
        if(isValid(usuario_cpf, faq_sigla, nota))
        {
            this.usuario_cpf = usuario_cpf;
            this.faq_sigla = faq_sigla;
            this.nota = nota;
        }
    }
    public static boolean isValid(String usuario_cpf, String faq_sigla, int nota) throws Exception{
        boolean resp = false;
        boolean cond1 = usuario_cpf.length() == 11;
        boolean cond2 = faq_sigla.length() <= 10;
        boolean cond3 = nota >= 1 && nota <= 5;
        if(cond1 && cond2 && cond3) resp = true;
        else{
            if(!cond1) throw new Exception("ERRO: usuario_cpf invalido");
            if(!cond2) throw new Exception("ERRO: faq_sigla invalido");
            if(!cond3) throw new Exception("ERRO: nota invalida");
        }
        return resp;
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
	 * @return the faq_sigla
	 */
	public String getFaq_sigla() {
		return faq_sigla;
	}
	/**
	 * @param faq_sigla the faq_sigla to set
	 */
	public void setFaq_sigla(String faq_sigla) throws Exception{
        if(faq_sigla.length() <= 10) this.faq_sigla = faq_sigla;
        else throw new Exception("ERRO: faq_sigla invalido");
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