package router

import (
	"github.com/campbell-frost/policy-link/service/auth"
	"github.com/campbell-frost/policy-link/service/policy"
	"github.com/campbell-frost/policy-link/service/user"
)

func Register(r *Router) {
	user.Register(r)
	auth.Register(r)
	policy.Register(r)
}
