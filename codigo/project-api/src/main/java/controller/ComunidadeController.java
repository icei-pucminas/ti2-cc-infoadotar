package controller;

import com.google.gson.Gson;
import controller.annotation.ControllerAnnotation;
import controller.util.HTTPMethod;
import controller.util.Resposta;
import dal.DAO;
import model.AvaliacaoModel;
import model.PostModel;
import spark.Request;
import spark.Response;

import java.util.List;

public class ComunidadeController extends Controller {
    public static DAO dao = new DAO();
    public static Gson gson	= new Gson();

    public ComunidadeController() {
        super();
    }

    // retorna todos os posts da comunidade
    @ControllerAnnotation(method = HTTPMethod.get, path = "/comunidade")
    public String all(Request req, Response res) {
        dao.conectar();
        res.header("Content-Type", "application/json");

        List<PostModel> x = dao.<PostModel>select(PostModel.class);
        String listagem = gson.toJson(x);

        dao.close();
        return listagem;
    }

    @ControllerAnnotation(method = HTTPMethod.get, path = "/comunidade/:query")
    public String search(Request req, Response res) {
        dao.conectar();
        res.header("Content-Type", "application/json");

        List<PostModel> x = dao.<PostModel>select(PostModel.class, String.format("LOWER(texto) LIKE '%%" + req.params("query").toLowerCase() + "%%'"));
        String listagem = gson.toJson(x);

        dao.close();
        return listagem;
    }

    // insere um post na comunidade
    @ControllerAnnotation(method = HTTPMethod.post, path = "/postar")
    public String insert(Request req, Response res) {
        dao.conectar();
        res.header("Content-Type", "application/json");

        String resposta;
        try {
            PostModel post = gson.fromJson(req.body(), PostModel.class);
            dao.insert(post);
            resposta = gson.toJson(new Resposta(200, "Postagem criada com sucesso."));
        } catch (Exception e) {
            resposta = gson.toJson(new Resposta(500, "Erro na criação da postagem."));
            System.out.println(e.getMessage());
        }

        dao.close();
        return resposta;
    }

    // avalia um post
    @ControllerAnnotation(method = HTTPMethod.post, path = "/avaliar")
    public String rate(Request req, Response res) {
        dao.conectar();
        res.header("Content-Type", "application/json");

        String resposta;
        try {
            AvaliacaoModel avaliacao = gson.fromJson(req.body(), AvaliacaoModel.class);
            if(avaliacao.nota < 1 || avaliacao.nota > 5) {
                resposta = gson.toJson(new Resposta(500, "Nota inválida. Intervalo permitido (1-5)."));
            } else {
                dao.insert(avaliacao);
                resposta = gson.toJson(new Resposta(200, "Postagem avaliada com sucesso."));
            }
        } catch (Exception e) {
            resposta = gson.toJson(new Resposta(500, "Erro na avaliação da postagem."));
            System.out.println(e.getMessage());
        }

        dao.close();
        return resposta;
    }
}
