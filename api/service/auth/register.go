package auth

import (
	"github.com/campbell-frost/policy-link/service"
	"github.com/go-chi/chi/v5"
)

func Register(r chi.Router) {
	r.Post("/auth/signIn", service.RpcHandler(signIn))
	r.Post("/auth/signUp", service.RpcHandler(signUp))
	r.Post("/auth/getUser", service.RpcHandler(getUser))
}
