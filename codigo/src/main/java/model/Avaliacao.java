package model;

import java.math.BigDecimal;

public class Avaliacao {
    public int post_id;
    public BigDecimal media;
    public Avaliacao() {
        this(-1, null);
    }
    public Avaliacao(int post_id, BigDecimal media) {
        this.post_id = post_id;
        this.media = media;
    }

    @Override
    public String toString() {
        return ("id = " + post_id + " / media = " + media);
    }
}
