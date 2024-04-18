package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// User struct para mapear los datos del usuario
type User struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// DB es una instancia global de la conexión a la base de datos PostgreSQL
var DB *sql.DB

func main() {
	// Crea una nueva instancia de motor Gin
	r := gin.Default()

	// Ruta para servir archivos estáticos desde el directorio "src"
	r.StaticFS("/", http.Dir("./src"))

	// Inicia el servidor en el puerto 3000
	r.Run(":3000")
	//---------------------------------------------------------------------
	//aca empieza la api
	// Configura la conexión a la base de datos PostgreSQL
	var err error
	DB, err = sql.Open("postgres", "postgresql://postgrets:posgrest@localhost/dbtraductor?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	defer DB.Close()

	// Manejadores de las rutas
	http.HandleFunc("/register", registerHandler)

	// Inicia el servidor
	fmt.Println("Servidor iniciado en el puerto :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	// Decodifica el cuerpo de la solicitud JSON a la estructura User
	var newUser User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Inserta el nuevo usuario en la base de datos
	_, err = DB.Exec("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", newUser.Name, newUser.Email, newUser.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Responde con un mensaje de éxito
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "Usuario registrado exitosamente")

}
