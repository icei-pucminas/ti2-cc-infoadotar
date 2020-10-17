import java.time.LocalDateTime;

public class Usuario{
    
    private String cpf;
    private String email;
    private String nome;
    private String estado_civil;
    private char sexo;
    private String hash;
    private String token = null;
    private LocalDateTime token_validade = null;
    public Usuario(String cpf, String email, String nome, String estado_civil, char sexo, String hash)throws Exception{
        estado_civil = estado_civil.toLowerCase();
        if(estado_civil.charAt(estado_civil.length()-1) == 'a'){
            String aux = "";
            for(int i = 0; i < estado_civil.length() - 1; i++){
                aux += estado_civil.charAt(i);
            }    
			aux += "o";
			estado_civil = aux;
			aux = null;
        }
        sexo = Character.toUpperCase(sexo);
        if(isValid(cpf, email, nome, estado_civil, sexo, hash)){
            this.cpf = cpf;
            this.email = email;
            this.nome = nome;
            this.estado_civil = estado_civil;
            this.sexo = sexo;
            this.hash = hash;
        }
    }

    public static boolean isValid(String cpf, String email, String nome, String estado_civil, char sexo, String hash) throws Exception{
        boolean resp = false;
        boolean cond1 = cpf.length() == 11;
        boolean cond2 = email.length() <= 50;
        boolean cond3 = nome.length() >= 5 && nome.length() <= 100;
        boolean cond4 = estado_civil.compareTo("solteiro") == 0 || estado_civil.compareTo("casado") == 0;
        boolean cond5 = sexo == 'M' || sexo == 'F' || sexo == 'O';
        boolean cond6 = hash.length() <= 250;
        if(cond1 && cond2 && cond3 && cond4 && cond5 && cond6) resp = true;
        if(!cond1) throw new Exception("ERRO: cpf invalido");
        if(!cond2) throw new Exception("ERRO: email invalido");
        if(!cond3) throw new Exception("ERRO: nome invalido");
        if(!cond4) throw new Exception("ERRO: estado_civil invalido");
        if(!cond5) throw new Exception("ERRO: sexo invalido");
        if(!cond6) throw new Exception("ERRO: hash invalido");
        return resp;
    }

    /**
	 * @return the cpf
	 */
	public String getCpf() {
		return cpf;
	}

	/**
	 * @param cpf the cpf to set
	 */
	public void setCpf(String cpf) throws Exception{
        if(cpf.length() == 11) this.cpf = cpf;
        else throw new Exception("ERRO: cpf invalido");
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
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
	public String getNome() {
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
	 * @return the estado_civil
	 */
	public String getEstado_civil() {
		return estado_civil;
	}

	/**
	 * @param estado_civil the estado_civil to set
	 */
	public void setEstado_civil(String estado_civil) throws Exception{
        if(estado_civil.compareTo("solteiro") == 0 || estado_civil.compareTo("casado") == 0) this.estado_civil = estado_civil;
		else throw new Exception("ERRO: estado_civil invalido");
	}

	/**
	 * @return the sexo
	 */
	public char getSexo() {
		return sexo;
	}

	/**
	 * @param sexo the sexo to set
	 */
	public void setSexo(char sexo) throws Exception{
        if(sexo == 'M' || sexo == 'F' || sexo == 'O') this.sexo = sexo;
        throw new Exception("ERRO: sexo invalido");
	}

	/**
	 * @return the hash
	 */
	public String getHash() {
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
	public String getToken() {
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
	public LocalDateTime getToken_validade() {
		return token_validade;
	}

	/**
	 * @param token_validade the token_validade to set
	 */
	public void setToken_validade(LocalDateTime token_validade) {
		this.token_validade = token_validade;
	}

}