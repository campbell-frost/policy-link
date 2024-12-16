package router

import (
	"github.com/campbell-frost/policy-link-solutions/service/auth"
	"github.com/campbell-frost/policy-link-solutions/service/policy"
	"github.com/campbell-frost/policy-link-solutions/service/user"
)

func Register(r *Router) {
	user.Register(r)
	auth.Register(r)
	policy.Register(r)
}
