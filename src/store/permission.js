const permission = {
    state: {
        permissionRoutes: []
    },
    init(data) {
        const isManager = data.isManager;
        const router = data.router;
        const permissionRoutes = router.filter(v => {
            if (isManager) return true;
            if (!v.meta) return true;
            if (!v.meta.needAuth) {
                if (v.children && v.children.length > 0) {
                    v.children = v.children.filter(child => {
                        if (!child.meta) return true;
                        if (!child.meta.needAuth) {
                            return child;
                        }
                        return false;
                    });
                    return v;
                } else {
                    return v;
                }
            }
            return false;
        });
        this.permissionRoutes = permissionRoutes;
    },
    get() {
        return this.permissionRoutes;
    },
    hasPermission(roles, route) {
        if (route.meta && route.meta.role) {
            return roles.some(role => route.meta.role.indexOf(role) >= 0);
        } else {
            return true;
        }
    }
};

export default permission;
