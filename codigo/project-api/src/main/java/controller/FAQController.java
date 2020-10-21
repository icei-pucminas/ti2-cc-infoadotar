package controller;

import com.google.gson.Gson;
import controller.annotation.ControllerAnnotation;
import controller.util.HTTPMethod;
import controller.util.Resposta;
import dal.DAO;
import model.FAQModel;
import spark.Request;
import spark.Response;

import java.util.List;

public class FAQController extends Controller {
    public static DAO dao = new DAO();
    public static Gson gson	= new Gson();

    public FAQController() {
        super();
    }

    @ControllerAnnotation(method = HTTPMethod.get, path = "/faq")
    public String all(Request req, Response res) {
        dao.conectar();
        res.header("Content-Type", "application/json");

        List<FAQModel> x = dao.<FAQModel>select(FAQModel.class);
        String listagem = gson.toJson(x);

        dao.close();
        return listagem;
    }

    @ControllerAnnotation(method = HTTPMethod.get, path = "/faq/:query")
    public String search(Request req, Response res) {
        dao.conectar();
        res.header("Content-Type", "application/json");

        List<FAQModel> x = dao.<FAQModel>select(FAQModel.class, String.format("LOWER(pergunta) LIKE '%%" + req.params("query").toLowerCase() + "%%'"));
        String listagem = gson.toJson(x);

        dao.close();
        return listagem;
    }

    @ControllerAnnotation(method = HTTPMethod.post, path = "/faq")
    public String insert(Request req, Response res) {
        dao.conectar();
        res.header("Content-Type", "application/json");

        String resposta;
        try {
            FAQModel faq = gson.fromJson(req.body(), FAQModel.class);
            dao.insert(faq);
            resposta = gson.toJson(new Resposta(200, "FAQ inserida com sucesso."));
        } catch (Exception e) {
            resposta = gson.toJson(new Resposta(500, "Erro na inserção da FAQ."));
            System.out.println(e.getMessage());
        }

        dao.close();
        return resposta;
    }
}
