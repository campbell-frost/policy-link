package router

import (
	"net/http"
	"os"
	"time"

	"github.com/campbell-frost/policy-link/database"
	"github.com/campbell-frost/policy-link/model"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

type Router struct {
	chi.Router
}

func CreateRouter() *Router {
	r := chi.NewRouter()
	useCors(r)
	r.Use(authMiddleware)
	return &Router{r}
}

func useCors(r chi.Router) {
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{os.Getenv("CORS_ALLOWED_ORIGINS")},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
}

var whiteListedPaths = map[string]bool{
	"/auth/signUp": true,
}

func isWhiteListed(path string) bool {
	_, ok := whiteListedPaths[path]
	return ok
}

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if isWhiteListed(r.URL.Path) {
			next.ServeHTTP(w, r)
			return
		}

		token := r.Header.Get("Authorization")

		if len(token) < 7 || token[:7] != "Bearer " {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		token = token[7:]

		// Check if token is valid
		db, err := database.Connect()
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		var session model.Session
		// Check if token exists
		result := db.First(&session, "token = ?", token)
		if result.Error != nil || result.RowsAffected == 0 {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		if session.ExpiresAt < time.Now().Unix() {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Extend session
		session.ExpiresAt = time.Now().Add(time.Hour * 24).Unix()
		result.Save(&session)

		next.ServeHTTP(w, r)
	})
}
