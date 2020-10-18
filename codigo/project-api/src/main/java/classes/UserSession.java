package classes;

public class UserSession {
    public String nome;
    public String email;
//	public String token;
//	public LocalDateTime validade_token;


    public UserSession(String nome, String email/*, String token, LocalDateTime validade_token*/) {
        this.nome = nome;
        this.email = email;
    }
    public UserSession() {}
}
