package classes;//package com.ti2cc;

import java.sql.*;

public class DAO {
	private Connection conexao;
	
	public DAO() {
		conexao = null;
	}

	public boolean conectar() {
		String driverName = "org.postgresql.Driver";
		String serverName = "localhost";
		String mydatabase = "infoAdotar";
		int porta = 5432;
		String url = "jdbc:postgresql://" + serverName + ":" + porta +"/" + mydatabase;
		String username = "postgres";
		String password = "ti@cc";
		boolean status = false;

		try {
			Class.forName(driverName);
			conexao = DriverManager.getConnection(url, username, password);
			status = (conexao == null);
			System.out.println("==============================================\n  Conexão estabelecida com o banco de dados.\n==============================================\n");
		} catch (ClassNotFoundException e) {
			System.err.println("Erro na conexão com o banco de dados (Driver não encontrado):" + e.getMessage());
		} catch (SQLException e) {
			System.err.println("Erro na conexão com o banco de dados: " + e.getMessage());
		}

		return status;
	}

	public boolean insertUsuario(Usuario usuario) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			st.executeUpdate("INSERT INTO \"USUARIO\" (email, nome, hash) VALUES" +
					"('"+usuario.getEmail()+"', '"+usuario.getNome()+"', '" + usuario.getHash() + "');");
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		if(status) System.out.println("Usuario cadastrado com sucesso");
		else System.out.println("Erro no cadastro");
		return status;
	}

	public boolean changeEmail(Usuario usuario) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			String sql = "UPDATE \"USUARIO\" SET email = '" + usuario.getEmail()
					+ "WHERE email = " + usuario.getEmail();
			st.executeUpdate(sql);
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}
	public boolean changeNome(Usuario usuario) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			String sql = "UPDATE \"USUARIO\" SET nome = '" + usuario.getNome()
					+ "WHERE email = " + usuario.getEmail();
			st.executeUpdate(sql);
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}
	public boolean changeSenha(Usuario usuario) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			String sql = "UPDATE \"USUARIO\" SET hash = '" + usuario.getHash()
					+ "WHERE email = " + usuario.getEmail();
			st.executeUpdate(sql);
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}

	public boolean deleteUsuario(String email) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			st.executeUpdate("DELETE FROM \"USUARIO\" WHERE email = " + email);
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}
	public Usuario getUsuario(String email) {
		Usuario[] usuarios = getUsuarios();
		Usuario usuario = null;

		if(usuarios != null) {
			for(int i=0 ; i < usuarios.length ; i++) {
				if(usuarios[i].getEmail().equals(email)) {
					usuario = usuarios[i];
					i = usuarios.length;
				}
			}
		}

		return  usuario;
	}

	public boolean close() {
		boolean status = false;
		
		try {
			conexao.close();
			status = true;
			System.out.println("++++++++++++++++++++++++++++++++++++++++++++\n  Conexão fechada.\n++++++++++++++++++++++++++++++++++++++++++++\n");
		} catch (SQLException e) {
			System.err.println(e.getMessage());
		}
		return status;
	}

	public Usuario[] getUsuarios() {
		Usuario[] usuarios = null;

		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM \"USUARIO\"");
			if(rs.next()) {
				rs.last();
				usuarios = new Usuario[rs.getRow()];
				rs.beforeFirst();

				for(int i = 0; rs.next(); i++) {
					usuarios[i] = new Usuario(rs.getString("email"), rs.getString("nome"), rs.getString("hash"));
				}
			}
			st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return usuarios;
	}
	public int numUsuarios() {
		return getUsuarios().length;
	}
}
