package database

import (
	"github.com/campbell-frost/policy-link/model"
)

func (db *DB) AddAutoMigrations() {
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.Policy{})
	db.AutoMigrate(&model.Session{})
	db.AutoMigrate(&model.Signature{})
}
