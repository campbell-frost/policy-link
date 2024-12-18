package auth

import (
	"crypto/rand"
	"encoding/base64"
	"time"

	"github.com/campbell-frost/policy-link/database"
	"github.com/campbell-frost/policy-link/model"
	"github.com/google/uuid"
)

func makeSession(userId uuid.UUID) (string, error) {
	b := make([]byte, 64)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}

	db, err := database.Connect()
	if err != nil {
		return "", err
	}

	token := base64.URLEncoding.EncodeToString(b)
	expiresAt := time.Now().Add(time.Hour * 24).Unix()

	db.Create(&model.Session{
		ID:        uuid.New(),
		Token:     token,
		UserID:    userId,
		ExpiresAt: expiresAt,
	})

	return token, nil
}
