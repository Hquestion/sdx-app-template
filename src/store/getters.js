const getters = {
    sidebar: state => state.app.sidebar,
    livenewsChannels: state => state.app.livenewsChannels,
    session: state => state.user && state.user.session,
    role: state => state.user && state.user.role,
    userId: state => state.user && state.user.userId,
    userName: state => state.user && state.user.userName
};
export default getters;
