package classes;

import java.time.LocalDateTime;

public class Usuario{
    
//    private String cpf;
    private String email;
    private String nome;
    private String hash;
    private String token = null;
    private LocalDateTime token_validade = null;

    public Usuario(/*String cpf,*/ String email, String nome, String hash) throws Exception {
        if(isValid(/*cpf,*/ email, nome, hash)){
        //    this.cpf = cpf;
            this.email = email;
            this.nome = nome;
            this.hash = hash;
        }
    }
	/**
	 *  Verifica se os parametros passados para a criação de um novo usuario são validos.
	 * @param cpf Atributo cpf do BD (removido)
	 * @param email Atributo email do BD
	 * @param nome Atributo nome do BD
	 * @param hash Atributo hash(senha criptografada) do BD
	 * @return Retorna um valor booleano indicando se os valores passados são válidos
	 * @throws Exception informa caso algum valor seja invalido
	 */
    public static boolean isValid(/*String cpf,*/ String email, String nome, String hash) throws Exception {
        boolean resp = false;
//        boolean cond1 = cpf.length() == 11;
        boolean cond2 = email.length() <= 50;
        boolean cond3 = nome.length() >= 5 && nome.length() <= 100;
        boolean cond4 = hash.length() <= 250;
		if(/*cond1 &&*/ cond2 && cond3 && cond4) resp = true;
		else{
			//if(!cond1) throw new Exception("ERRO: cpf invalido");
			if(!cond2) throw new Exception("ERRO: email invalido");
			if(!cond3) throw new Exception("ERRO: nome invalido");
			if(!cond4) throw new Exception("ERRO: hash invalido");
		}
        return resp;
    }

	@Override
	public String toString() {
		return "Usuario{" +
				"email='" + email + '\'' +
				", nome='" + nome + '\'' +
				", hash='" + hash + '\'' +
				", token='" + token + '\'' +
				", token_validade=" + token_validade +
				'}';
	}

	/**
	 * @return the cpf
	 */
/*	public String getCpf(){
		return cpf;
	}
*/
	/**
	 * @param cpf the cpf to set
	 */
/*	public void setCpf(String cpf) throws Exception{
        if(cpf.length() == 11) this.cpf = cpf;
        else throw new Exception("ERRO: cpf invalido");
	}
*/
	/**
	 * @return the email
	 */
	public String getEmail(){
		return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) throws Exception{
        if(email.length() <= 50) this.email = email;
        else throw new Exception("ERRO: email invalido");	
	}

	/**
	 * @return the nome
	 */
	public String getNome(){
		return nome;
	}

	/**
	 * @param nome the nome to set
	 */
	public void setNome(String nome) throws Exception{
        if(nome.length() >= 5 && nome.length() <= 100) this.nome = nome;
        else throw new Exception("ERRO: nome invalido");
	}

	/**
	 * @return the hash
	 */
	public String getHash(){
		return hash;
	}

	/**
	 * @param hash the hash to set
	 */
	public void setHash(String hash) throws Exception{
        if(hash.length() <= 250) this.hash = hash;
        else throw new Exception("ERRO: hash invalido");
	}

	/**
	 * @return the token
	 */
	public String getToken(){
		return token;
	}

	/**
	 * @param token the token to set
	 */
	public void setToken(String token){
		this.token = token;
	}

	/**
	 * @return the token_validade
	 */
	public LocalDateTime getToken_validade(){
		return token_validade;
	}

	/**
	 * @param token_validade the token_validade to set
	 */
	public void setToken_validade(LocalDateTime token_validade){
		this.token_validade = token_validade;
	}

}
