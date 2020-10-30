package dal;

import constant.Constants;
import model.annotation.ColumnAnnotation;
import model.annotation.TableAnnotation;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DAO {
	
	private Connection conexao;
	
	public DAO() {
		conexao = null;
	}
	
	public boolean conectar() {
		boolean status = false;

		try {
			Class.forName(Constants.driverName);
			conexao = DriverManager.getConnection(
					Constants.url, 
					Constants.userName, 
					Constants.password);
			status = (conexao != null);
			System.out.println("Conex�o efetuada com o postgres!");
		} catch (ClassNotFoundException e) { 
			System.err.println("Conex�o N�O efetuada com o postgres -- Driver n�o encontrado -- " + e.getMessage());
		} catch (SQLException e) {
			System.err.println("Conex�o N�O efetuada com o postgres -- " + e.getMessage());
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
	
	public static String getFieldData (Field f, Object obj) throws IllegalArgumentException, IllegalAccessException {
		String result;
		Object aux = f.get(obj);
		
		Class<?> type = aux.getClass();
		if (aux != null) {
			if (type == String.class || type == Timestamp.class) {
				result = "'" + aux.toString() + "'";
			} else {
				result = aux.toString();
			}
		} else {
			result = "NULL";
		}
		
		return result;
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
			Object aux;

			for (Field f : fields) {
				try {
					//Add only valid fields
					valueAux = getFieldData(f, obj) + ",";
					
					column = f.getAnnotation(ColumnAnnotation.class);
					columns += (column == null? f.getName() : column.name()) + ",";
					values += valueAux;
				} catch (IllegalArgumentException e) {
				} catch (IllegalAccessException e) {}
			}
			
			columns = columns.substring(0, columns.length()-1);
			values = values.substring(0, values.length()-1);
			
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
			System.out.println("catch");
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
					valueAux = getFieldData(f, obj);
					
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
			
			where = where.substring(0, where.length()-5);
			values = values.substring(0, values.length()-1);
			
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
					valueAux = getFieldData(f, obj);
					
					column = f.getAnnotation(ColumnAnnotation.class);
					
					if (column != null && column.isPK()) {
							where += String.format("%s = %s AND ", column.name(), valueAux);
					}
				} catch (IllegalArgumentException e) {
				} catch (IllegalAccessException e) {}
			}
			
			if (where.length() == 0)
				throw new SQLException("Object has no primary key");
			
			where = where.substring(0, where.length()-5);
			
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
	public <T> List<T> select(Class<T> model) {
		try {
			TableAnnotation table = model.getAnnotation(TableAnnotation.class);
			Statement st = conexao.createStatement();
			ResultSet rs = st.executeQuery(
				String.format("SELECT * FROM %s", 
						(table == null? model.getName() : table.name())));
			st.close();
			
			T tmp;
			ArrayList<T> values = new ArrayList<T>();
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
			
			return values;
		} catch (SQLException | InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException u) {  
			throw new RuntimeException(u);
		}
	}
	
	@SuppressWarnings("unchecked")
	public <T> List<T> select(Class<T> model, String where) {
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
			
			return values;
		} catch (SQLException | InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException u) {  
			throw new RuntimeException(u);
		}
	}
}