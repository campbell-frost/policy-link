package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/campbell-frost/policy-link/database"
	"github.com/campbell-frost/policy-link/router"
	"github.com/joho/godotenv"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "1738"
	}
	err := godotenv.Load()
	if err != nil {
		log.Fatalln("Failed to load .env file")
	}

	db, err := database.Connect()
	if err != nil {
		log.Fatalln(err)
	}

	db.AddAutoMigrations()

	r := router.CreateRouter()

	// Register routes
	router.Register(r)

	fmt.Println("Server running on port 1738.  I'm like hey what's up hello.")
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), r))
}
