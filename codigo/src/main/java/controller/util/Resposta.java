package controller.util;

public class Resposta {
    private int status;
    private String message;
    private String data;

    public Resposta(int status) {
        this.status = status;
    }
    public Resposta(int status, String message) {
        this.status = status;
        this.message = message;
    }
//    public Resposta(StatusResponse status, String data) {
//        this.status = status;
//        this.data = data;
//    }

    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getData() {
        return data;
    }
    public void setData(String data) {
        this.data = data;
    }
}
