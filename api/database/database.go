package database

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DB struct {
	*gorm.DB
}

func Connect() (*DB, error) {
	db, err := gorm.Open(postgres.Open(os.Getenv("DATABASE_DSN")), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("could not connect to DB: %w", err)
	}
	return &DB{db}, nil
}
