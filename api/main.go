package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/campbell-frost/policy-link/database"
	"github.com/campbell-frost/policy-link/router"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
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
	log.Fatal(http.ListenAndServe(":1738", r))
}
