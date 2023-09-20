package br.com.bubblesolutions.mybujo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PostgreSQLConnection {
    public static void main(String[] args) throws SQLException {
        Connection postgreSQLConnection = null;

        try {
            Class.forName("org.postgresql.Driver");
            postgreSQLConnection = DriverManager.getConnection("jdbc:postgresql://localhost/mybujo", "", "");
            ResultSet rsClient = postgreSQLConnection.createStatement().executeQuery("SELECT * FROM ITEMS");
            while (rsClient.next()) {
                System.out.println("Item: " + rsClient.getString("content"));
            }
        } catch(ClassNotFoundException exception) {
            System.out.println("Driver do banco de dados não encontrado.");
        } catch (SQLException e) {
            System.out.println("Conexão com o banco de dados falhou: " + e.getMessage());
        } finally {
            if(postgreSQLConnection != null) {
                postgreSQLConnection.close();
            }
        }
    }
}
