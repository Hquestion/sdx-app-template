const getters = {
    sidebar: state => state.app.sidebar,
    livenewsChannels: state => state.app.livenewsChannels,
    session: state => state.user && state.user.session,
    role: state => state.user && state.user.role,
    userId: state => state.user && state.user.token.user.uuid,
    userName: state => state.user && state.user.token.user.fullName
};
export default getters;
