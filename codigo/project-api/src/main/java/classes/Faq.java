package classes;

public class Faq{
    private int id;
    private String pergunta;
    private String resposta;
    public Faq(int id, String pergunta, String resposta) throws Exception{
        if(isValid(id, pergunta, resposta))
        {
            this.id = id;
            this.pergunta = pergunta;
            this.resposta = resposta;
        }
    }
    public static boolean isValid(int id, String pergunta, String resposta) throws Exception{
        boolean resp = false;
        boolean cond1 = pergunta.length() <= 200;
        boolean cond2 = resposta.length() <= 400;
        if(cond1 && cond2) resp = true;
        else{
            if(!cond1) throw new Exception("ERRO: pergunta invalida");
            if(!cond2) throw new Exception("ERRO: resposta invalida");
        }
        return resp;
    }
    /**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) throws Exception{
        this.id = id;
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