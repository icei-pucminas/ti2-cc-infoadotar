package dal;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.*;
import java.util.*;

import model.annotation.*;
import constant.*;

public class DAO {
	
	private Connection conexao;
	
	public DAO() {
		conexao = null;
	}
	
	public boolean conectar() {
		boolean status = false;

		try {
			Class.forName(DataBaseData.driverName);
			conexao = DriverManager.getConnection(
					DataBaseData.url, 
					DataBaseData.userName, 
					DataBaseData.password);
			status = (conexao == null);
			System.out.println("Conexão efetuada com o postgres!");
		} catch (ClassNotFoundException e) { 
			System.err.println("Conexão NÃO efetuada com o postgres -- Driver não encontrado -- " + e.getMessage());
		} catch (SQLException e) {
			System.err.println("Conexão NÃO efetuada com o postgres -- " + e.getMessage());
		}

		return status;
	}
	
	public boolean close() {
		boolean status = false;
		
		try {
			conexao.close();
			status = true;
		} catch (SQLException e) {
			System.err.println(e.getMessage());
		}
		return status;
	}
	
	public boolean insert(Object obj) {
		
		boolean status = false;
		
		try {
			Class<?> type = obj.getClass();
			Field[] fields = type.getFields();
			String columns = "";
			String values = "";
			
			ColumnAnnotation column;
			String valueAux;
			
			for (Field f : fields) {
				try {
					//Add only valid fields
					valueAux = f.get(obj).toString() + ",";
					
					column = f.getAnnotation(ColumnAnnotation.class);
					columns += (column == null? f.getName() : column.name()) + ",";
					values += valueAux;
				} catch (IllegalArgumentException e) {
				} catch (IllegalAccessException e) {}
			}
			
			columns.substring(0, columns.length()-1);
			values.substring(0, values.length()-1);
			
			TableAnnotation table = type.getAnnotation(TableAnnotation.class);
			
			Statement st = conexao.createStatement();
			st.executeUpdate(
				String.format("INSERT INTO %s (%s) VALUES(%s)", 
						(table == null? obj.getClass().getName() : table.name()),
						columns,
						values));
			st.close();
			status = true;
			
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		
		return status;
	}
	
	public boolean update(Object obj) {
		
		boolean status = false;
		
		try {
			Class<?> type = obj.getClass();
			Field[] fields = type.getFields();
			String values = "";
			String where = "";
			
			ColumnAnnotation column;
			String valueAux;
			
			for (Field f : fields) {
				try {
					//Add only valid fields
					valueAux = f.get(obj).toString();
					
					column = f.getAnnotation(ColumnAnnotation.class);
					
					if (column != null) { 
						if (column.isPK()) {
							where += String.format("%s = %s AND ", column.name(), valueAux);
						} else {
							values += String.format("%s = %s,", column.name(), valueAux);
						}
					} else {
						values += String.format("%s = %s,", f.getName(), valueAux);
					}
				} catch (IllegalArgumentException | IllegalAccessException e) {}
			}
			
			if (where.length() == 0)
				throw new SQLException("Object has no primary key");
			
			where.substring(0, where.length()-5);
			values.substring(0, values.length()-1);
			
			TableAnnotation table = type.getAnnotation(TableAnnotation.class);
			
			Statement st = conexao.createStatement();
			st.executeUpdate(
				String.format("UPDATE %s SET %s WHERE %s", 
						(table == null? obj.getClass().getName() : table.name()),
						values,
						where));
			st.close();
			status = true;
			
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		
		return status;
	}
	
	public boolean delete(Object obj) {
		
		boolean status = false;
		
		try {
			Class<?> type = obj.getClass();
			Field[] fields = type.getFields();
			String where = "";
			
			ColumnAnnotation column;
			String valueAux;
			
			for (Field f : fields) {
				try {
					//Add only valid fields
					valueAux = f.get(obj).toString();
					
					column = f.getAnnotation(ColumnAnnotation.class);
					
					if (column != null && column.isPK()) {
							where += String.format("%s = %s AND ", column.name(), valueAux);
					}
				} catch (IllegalArgumentException e) {
				} catch (IllegalAccessException e) {}
			}
			
			if (where.length() == 0)
				throw new SQLException("Object has no primary key");
			
			where.substring(0, where.length()-5);
			
			TableAnnotation table = type.getAnnotation(TableAnnotation.class);
			
			Statement st = conexao.createStatement();
			st.executeUpdate(
				String.format("DELETE FROM %s WHERE %s", 
						(table == null? obj.getClass().getName() : table.name()),
						where));
			st.close();
			status = true;
			
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		
		return status;
	}

	@SuppressWarnings("unchecked")
	public <T> T[] select(Class<T> model) {
		try {
			TableAnnotation table = model.getAnnotation(TableAnnotation.class);
			Statement st = conexao.createStatement();
			ResultSet rs = st.executeQuery(
				String.format("SELECT * FROM %s", 
						(table == null? model.getName() : table.name())));
			st.close();
			
			T tmp;
			List<T> values = new ArrayList<T>();
			Field[] fields = model.getFields();
			ColumnAnnotation column;
			while (rs.next()) {
				tmp = model.getConstructor().newInstance();
				for (Field f : fields) {
					column = f.getAnnotation(ColumnAnnotation.class);
					f.set(tmp, rs.getObject((column == null? f.getName() : column.name())));
				}
				values.add(tmp);
			}
			
			return (T[]) values.toArray();
		} catch (SQLException | InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException u) {  
			throw new RuntimeException(u);
		}
	}
	
	@SuppressWarnings("unchecked")
	public <T> T[] select(Class<T> model, String where) {
		try {
			TableAnnotation table = model.getAnnotation(TableAnnotation.class);
			Statement st = conexao.createStatement();
			ResultSet rs = st.executeQuery(
				String.format("SELECT * FROM %s WHERE %s", 
						(table == null? model.getName() : table.name()),
						where));
			st.close();
			
			T tmp;
			List<T> values = new ArrayList<T>();
			Field[] fields = model.getFields();
			ColumnAnnotation column;
			while (rs.next()) {
				tmp = model.getConstructor().newInstance();
				for (Field f : fields) {
					column = f.getAnnotation(ColumnAnnotation.class);
					f.set(tmp, rs.getObject((column == null? f.getName() : column.name())));
				}
				values.add(tmp);
			}
			
			return (T[]) values.toArray();
		} catch (SQLException | InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException u) {  
			throw new RuntimeException(u);
		}
	}
}