export function authorizeLogin(response, _dispatch, _setLoading, _nav, setUser) {
    console.log('serviceResponse', response);
    if (
        typeof response === "object" &&
        response !== null &&
        response?.status
    ) {
        _dispatch(setUser({ user: response?.data?.result?.user, token: response?.data?.result?.accessToken }))
        _setLoading(false)
        return _nav("/")
    }
    return
}
