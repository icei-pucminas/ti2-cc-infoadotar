public class Faq{
    private String sigla;
    private String pergunta;
    private String resposta;
    public Faq(String sigla, String pergunta, String resposta) throws Exception{
        if(isValid(sigla, pergunta, resposta))
        {
            this.sigla = sigla;
            this.pergunta = pergunta;
            this.resposta = resposta;
        }
    }
    public static boolean isValid(String sigla, String pergunta, String resposta) throws Exception{
        boolean resp = false;
        boolean cond1 = sigla.length() <= 10;
        boolean cond2 = pergunta.length() <= 200;
        boolean cond3 = resposta.length() <= 400;
        if(cond1 && cond2 && cond3) resp = true;
        else{
            if(!cond1) throw new Exception("ERRO: sigla invalida");
            if(!cond2) throw new Exception("ERRO: pergunta invalida");
            if(!cond3) throw new Exception("ERRO: resposta invalida");
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
	 * @return the pergunta
	 */
	public String getPergunta() {
		return pergunta;
	}
	/**
	 * @param pergunta the pergunta to set
	 */
	public void setPergunta(String pergunta) throws Exception{
        if(pergunta.length() <= 200) this.pergunta = pergunta;
        else throw new Exception("ERRO: pergunta invalida");
	}
	/**
	 * @return the resposta
	 */
	public String getResposta() {
		return resposta;
	}
	/**
	 * @param resposta the resposta to set
	 */
	public void setResposta(String resposta) throws Exception{
        if(resposta.length() <= 400) this.resposta = resposta;
        else throw new Exception("ERRO: resposta invalida");
	}
}